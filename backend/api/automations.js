/**
 * Automations API
 * Dashboard Sabrina Costa
 * 
 * Gerencia workflows N8N e automações com IA
 * - Controle de ativação/desativação de workflows
 * - Fila de aprovações
 * - Histórico de ações
 * - Kill switch master
 */

const express = require('express');
const { query } = require('../db/connection');
const { authenticateJWT, requireAdmin } = require('../utils/jwt');
const router = express.Router();

/**
 * GET /api/automations
 * Lista todos os workflows e seus status
 * Auth: JWT required
 */
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const result = await query(`
            SELECT 
                id,
                workflow_name,
                workflow_id,
                enabled,
                automation_mode,
                requires_approval,
                auto_execute,
                never_post,
                use_free_ai_first,
                last_execution,
                last_action,
                total_executions,
                total_actions,
                config,
                description,
                created_at,
                updated_at
            FROM automation_controls
            ORDER BY 
                CASE automation_mode
                    WHEN 'auto' THEN 1
                    WHEN 'semi-auto' THEN 2
                    WHEN 'manual' THEN 3
                END,
                workflow_name
        `);

        res.json({
            success: true,
            workflows: result.rows,
            total: result.rowCount
        });
    } catch (error) {
        console.error('Error listing automations:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar automações'
        });
    }
});

/**
 * PUT /api/automations/:workflow_name/toggle
 * Ativa ou desativa um workflow
 * Auth: JWT required, Admin only
 */
router.put('/:workflow_name/toggle', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { workflow_name } = req.params;
        const { enabled } = req.body;

        if (typeof enabled !== 'boolean') {
            return res.status(400).json({
                success: false,
                error: 'Campo "enabled" deve ser boolean'
            });
        }

        const result = await query(
            `UPDATE automation_controls 
             SET enabled = $1, updated_at = NOW()
             WHERE workflow_name = $2
             RETURNING *`,
            [enabled, workflow_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Workflow não encontrado'
            });
        }

        res.json({
            success: true,
            message: `Workflow ${enabled ? 'ativado' : 'desativado'} com sucesso`,
            workflow: result.rows[0]
        });
    } catch (error) {
        console.error('Error toggling automation:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao alterar status da automação'
        });
    }
});

/**
 * PUT /api/automations/:workflow_name/mode
 * Altera o modo de automação (manual, semi-auto, auto)
 * Auth: JWT required, Admin only
 */
router.put('/:workflow_name/mode', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { workflow_name } = req.params;
        const { automation_mode } = req.body;

        const validModes = ['manual', 'semi-auto', 'auto'];
        if (!validModes.includes(automation_mode)) {
            return res.status(400).json({
                success: false,
                error: `Modo inválido. Use: ${validModes.join(', ')}`
            });
        }

        const result = await query(
            `UPDATE automation_controls 
             SET automation_mode = $1, updated_at = NOW()
             WHERE workflow_name = $2
             RETURNING *`,
            [automation_mode, workflow_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Workflow não encontrado'
            });
        }

        res.json({
            success: true,
            message: `Modo alterado para ${automation_mode}`,
            workflow: result.rows[0]
        });
    } catch (error) {
        console.error('Error changing automation mode:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao alterar modo da automação'
        });
    }
});

/**
 * POST /api/automations/kill-switch
 * DESLIGA TODOS OS WORKFLOWS (emergência)
 * Auth: JWT required, Admin only
 */
router.post('/kill-switch', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const result = await query(
            `UPDATE automation_controls 
             SET enabled = FALSE, updated_at = NOW()
             WHERE enabled = TRUE
             RETURNING workflow_name`
        );

        const disabledWorkflows = result.rows.map(r => r.workflow_name);

        res.json({
            success: true,
            message: '🔴 KILL SWITCH ATIVADO - Todos workflows desligados',
            disabled_count: result.rowCount,
            disabled_workflows: disabledWorkflows
        });
    } catch (error) {
        console.error('Error activating kill switch:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao ativar kill switch'
        });
    }
});

/**
 * GET /api/automations/pending-approvals
 * Lista todas as aprovações pendentes
 * Auth: JWT required
 */
router.get('/pending-approvals/list', authenticateJWT, async (req, res) => {
    try {
        const result = await query(`
            SELECT 
                aq.*,
                u.name as approved_by_name,
                u.email as approved_by_email
            FROM approval_queue aq
            LEFT JOIN users u ON aq.approved_by = u.id
            WHERE aq.status = 'pending' AND (aq.expires_at IS NULL OR aq.expires_at > NOW())
            ORDER BY 
                CASE aq.priority
                    WHEN 'urgent' THEN 1
                    WHEN 'high' THEN 2
                    WHEN 'normal' THEN 3
                    WHEN 'low' THEN 4
                END,
                aq.created_at DESC
        `);

        res.json({
            success: true,
            pending: result.rows,
            count: result.rowCount
        });
    } catch (error) {
        console.error('Error listing pending approvals:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar aprovações pendentes'
        });
    }
});

/**
 * GET /api/automations/approvals/history
 * Histórico de aprovações (últimas 50)
 * Auth: JWT required
 */
router.get('/approvals/history', authenticateJWT, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const result = await query(`
            SELECT 
                aq.*,
                u.name as approved_by_name
            FROM approval_queue aq
            LEFT JOIN users u ON aq.approved_by = u.id
            WHERE aq.status IN ('approved', 'rejected', 'expired', 'executed')
            ORDER BY aq.updated_at DESC
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

        res.json({
            success: true,
            history: result.rows,
            count: result.rowCount,
            limit,
            offset
        });
    } catch (error) {
        console.error('Error getting approval history:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar histórico'
        });
    }
});

/**
 * POST /api/automations/approve/:id
 * Aprova uma ação pendente
 * Auth: JWT required, Admin only
 */
router.post('/approve/:id', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verificar se existe e está pendente
        const checkResult = await query(
            'SELECT * FROM approval_queue WHERE id = $1 AND status = $1',
            [id, 'pending']
        );

        if (checkResult.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Aprovação não encontrada ou já processada'
            });
        }

        const approval = checkResult.rows[0];

        // Verificar se expirou
        if (approval.expires_at && new Date(approval.expires_at) < new Date()) {
            await query(
                'UPDATE approval_queue SET status = $1, updated_at = NOW() WHERE id = $2',
                ['expired', id]
            );
            return res.status(400).json({
                success: false,
                error: 'Esta aprovação expirou'
            });
        }

        // Aprovar
        const result = await query(
            `UPDATE approval_queue 
             SET status = $1, approved_at = NOW(), approved_by = $2, updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            ['approved', userId, id]
        );

        res.json({
            success: true,
            message: '✅ Ação aprovada com sucesso',
            approval: result.rows[0],
            note: 'A ação será executada pelo workflow N8N'
        });
    } catch (error) {
        console.error('Error approving action:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao aprovar ação'
        });
    }
});

/**
 * POST /api/automations/reject/:id
 * Rejeita uma ação pendente
 * Auth: JWT required, Admin only
 */
router.post('/reject/:id', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const result = await query(
            `UPDATE approval_queue 
             SET status = $1, rejected_at = NOW(), rejection_reason = $2, updated_at = NOW()
             WHERE id = $3 AND status = 'pending'
             RETURNING *`,
            ['rejected', reason || 'Sem motivo informado', id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Aprovação não encontrada ou já processada'
            });
        }

        res.json({
            success: true,
            message: '❌ Ação rejeitada',
            approval: result.rows[0]
        });
    } catch (error) {
        console.error('Error rejecting action:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao rejeitar ação'
        });
    }
});

/**
 * POST /api/automations/execute/:id
 * Marca uma ação como executada (chamado pelo N8N após executar)
 * Auth: JWT required
 */
router.post('/execute/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const { execution_result } = req.body;

        const result = await query(
            `UPDATE approval_queue 
             SET status = $1, executed_at = NOW(), execution_result = $2, updated_at = NOW()
             WHERE id = $3 AND status = 'approved'
             RETURNING *`,
            ['executed', JSON.stringify(execution_result || {}), id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Aprovação não encontrada ou não está aprovada'
            });
        }

        // Incrementar contador de ações do workflow
        const approval = result.rows[0];
        await query(
            `UPDATE automation_controls 
             SET total_actions = total_actions + 1, last_action = NOW()
             WHERE workflow_name = $1`,
            [approval.workflow_name]
        );

        res.json({
            success: true,
            message: 'Ação executada com sucesso',
            approval: result.rows[0]
        });
    } catch (error) {
        console.error('Error marking as executed:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao marcar como executada'
        });
    }
});

/**
 * POST /api/automations/log-execution/:workflow_name
 * Registra execução de um workflow (chamado pelo N8N)
 * Auth: JWT required
 */
router.post('/log-execution/:workflow_name', authenticateJWT, async (req, res) => {
    try {
        const { workflow_name } = req.params;

        const result = await query(
            `UPDATE automation_controls 
             SET total_executions = total_executions + 1, 
                 last_execution = NOW(),
                 updated_at = NOW()
             WHERE workflow_name = $1
             RETURNING *`,
            [workflow_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Workflow não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Execução registrada',
            workflow: result.rows[0]
        });
    } catch (error) {
        console.error('Error logging execution:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao registrar execução'
        });
    }
});

/**
 * GET /api/automations/stats
 * Estatísticas gerais de automações
 * Auth: JWT required
 */
router.get('/stats/overview', authenticateJWT, async (req, res) => {
    try {
        const statsResult = await query(`
            SELECT 
                COUNT(*) as total_workflows,
                SUM(CASE WHEN enabled = TRUE THEN 1 ELSE 0 END) as enabled_workflows,
                SUM(CASE WHEN automation_mode = 'auto' THEN 1 ELSE 0 END) as auto_workflows,
                SUM(CASE WHEN automation_mode = 'manual' THEN 1 ELSE 0 END) as manual_workflows,
                SUM(total_executions) as total_executions,
                SUM(total_actions) as total_actions
            FROM automation_controls
        `);

        const approvalsResult = await query(`
            SELECT 
                COUNT(*) as total_approvals,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN status = 'executed' THEN 1 ELSE 0 END) as executed,
                SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired
            FROM approval_queue
        `);

        res.json({
            success: true,
            stats: {
                workflows: statsResult.rows[0],
                approvals: approvalsResult.rows[0]
            }
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar estatísticas'
        });
    }
});

/**
 * GET /api/automations/:workflow_name
 * Busca detalhes de um workflow específico
 * Auth: JWT required
 * 
 * IMPORTANTE: Esta rota DEVE estar no final do arquivo
 * para não interceptar rotas mais específicas
 */
router.get('/:workflow_name', authenticateJWT, async (req, res) => {
    try {
        const { workflow_name } = req.params;

        const result = await query(
            'SELECT * FROM automation_controls WHERE workflow_name = $1',
            [workflow_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'Workflow não encontrado'
            });
        }

        res.json({
            success: true,
            workflow: result.rows[0]
        });
    } catch (error) {
        console.error('Error getting automation:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar automação'
        });
    }
});

module.exports = router;

