/**
 * AI Costs API
 * Dashboard Sabrina Costa
 * 
 * Rastreamento e controle de custos de APIs de IA
 * - Monitorar gastos mensais
 * - Alertas de threshold (50%, 75%, 90%)
 * - Previsão de gastos
 * - Auto-pause quando atingir 90%
 */

const express = require('express');
const { query } = require('../db/connection');
const { authenticateJWT, requireAdmin } = require('../utils/jwt');
const router = express.Router();

// Budget mensal padrão (R$ 50)
const DEFAULT_BUDGET_BRL = 50.00;

/**
 * GET /api/ai-costs/current-month
 * Retorna gastos do mês atual
 * Auth: JWT required
 */
router.get('/current-month', authenticateJWT, async (req, res) => {
    try {
        // Buscar budget configurado
        const budgetResult = await query(
            `SELECT value FROM config WHERE key = 'ai_budget_monthly_brl'`
        );
        const budgetBrl = budgetResult.rowCount > 0 
            ? parseFloat(budgetResult.rows[0].value) 
            : DEFAULT_BUDGET_BRL;

        // Buscar gastos do mês atual por serviço
        const costsResult = await query(`
            SELECT * FROM ai_costs_current_month
            ORDER BY cost_brl DESC
        `);

        // Calcular total
        const totalCost = costsResult.rows.reduce((sum, row) => sum + parseFloat(row.cost_brl || 0), 0);
        const percentUsed = (totalCost / budgetBrl) * 100;

        // Calcular projeção para fim do mês
        const today = new Date();
        const dayOfMonth = today.getDate();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const avgDaily = dayOfMonth > 0 ? totalCost / dayOfMonth : 0;
        const projectedTotal = avgDaily * daysInMonth;

        res.json({
            success: true,
            month: today.toISOString().slice(0, 7), // YYYY-MM
            budget_brl: budgetBrl,
            current_cost_brl: totalCost.toFixed(4),
            percent_used: percentUsed.toFixed(2),
            projected_total_brl: projectedTotal.toFixed(4),
            by_service: costsResult.rows,
            status: getStatusFromPercent(percentUsed),
            days_elapsed: dayOfMonth,
            days_in_month: daysInMonth,
            avg_cost_per_day: avgDaily.toFixed(4)
        });
    } catch (error) {
        console.error('Error getting current month costs:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar custos do mês'
        });
    }
});

/**
 * GET /api/ai-costs/by-service
 * Custos detalhados por serviço (mês atual e histórico)
 * Auth: JWT required
 */
router.get('/by-service', authenticateJWT, async (req, res) => {
    try {
        const service = req.query.service;
        const months = parseInt(req.query.months) || 3; // Últimos 3 meses por padrão

        let sql = `
            SELECT * FROM ai_costs_monthly
            WHERE month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '${months} months')
        `;
        
        if (service) {
            sql += ` AND service = $1`;
        }
        
        sql += ` ORDER BY month DESC, total_cost_brl DESC`;

        const result = await query(sql, service ? [service] : []);

        res.json({
            success: true,
            months,
            service_filter: service || 'all',
            data: result.rows,
            total_rows: result.rowCount
        });
    } catch (error) {
        console.error('Error getting costs by service:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar custos por serviço'
        });
    }
});

/**
 * GET /api/ai-costs/forecast
 * Previsão de gastos para próxima semana
 * Auth: JWT required
 */
router.get('/forecast', authenticateJWT, async (req, res) => {
    try {
        // Calcular média dos últimos 7 dias
        const last7DaysResult = await query(`
            SELECT 
                service,
                workflow_name,
                COUNT(*) as calls,
                SUM(tokens_total) as tokens,
                SUM(cost_brl) as cost_brl,
                AVG(cost_brl) as avg_cost_per_call
            FROM ai_usage_tracking
            WHERE date >= CURRENT_DATE - INTERVAL '7 days'
            GROUP BY service, workflow_name
            ORDER BY cost_brl DESC
        `);

        // Projetar próxima semana (assumindo mesmo padrão)
        const forecast = last7DaysResult.rows.map(row => ({
            service: row.service,
            workflow_name: row.workflow_name,
            last_week_cost: parseFloat(row.cost_brl).toFixed(4),
            projected_next_week: parseFloat(row.cost_brl).toFixed(4), // Assumindo mesmo padrão
            calls_per_week: parseInt(row.calls),
            avg_cost_per_call: parseFloat(row.avg_cost_per_call).toFixed(4)
        }));

        const totalLastWeek = last7DaysResult.rows.reduce((sum, row) => sum + parseFloat(row.cost_brl || 0), 0);
        const projectedNextWeek = totalLastWeek; // Assumindo mesmo padrão

        res.json({
            success: true,
            period: 'next_7_days',
            total_last_week_brl: totalLastWeek.toFixed(4),
            projected_next_week_brl: projectedNextWeek.toFixed(4),
            by_service: forecast
        });
    } catch (error) {
        console.error('Error forecasting costs:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao prever custos'
        });
    }
});

/**
 * POST /api/ai-costs/log
 * Registra uso de API de IA (chamado pelos workflows N8N)
 * Auth: JWT required
 */
router.post('/log', authenticateJWT, async (req, res) => {
    try {
        const {
            service,
            model,
            workflow_name,
            operation,
            tokens_input,
            tokens_output,
            cost_brl,
            is_free,
            response_time_ms,
            success,
            error_message
        } = req.body;

        // Validações básicas
        if (!service) {
            return res.status(400).json({
                success: false,
                error: 'Campo "service" é obrigatório'
            });
        }

        const tokens_total = (tokens_input || 0) + (tokens_output || 0);

        const result = await query(`
            INSERT INTO ai_usage_tracking (
                service,
                model,
                workflow_name,
                operation,
                tokens_input,
                tokens_output,
                tokens_total,
                cost_brl,
                is_free,
                response_time_ms,
                success,
                error_message,
                date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_DATE)
            RETURNING *
        `, [
            service,
            model || null,
            workflow_name || null,
            operation || null,
            tokens_input || 0,
            tokens_output || 0,
            tokens_total,
            cost_brl || 0,
            is_free || false,
            response_time_ms || null,
            success !== undefined ? success : true,
            error_message || null
        ]);

        // Verificar se atingiu threshold e precisa alertar
        const currentMonthResult = await query(`
            SELECT SUM(cost_brl) as total_cost
            FROM ai_usage_tracking
            WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
        `);

        const totalCost = parseFloat(currentMonthResult.rows[0].total_cost || 0);
        
        // Buscar budget
        const budgetResult = await query(
            `SELECT value FROM config WHERE key = 'ai_budget_monthly_brl'`
        );
        const budgetBrl = budgetResult.rowCount > 0 
            ? parseFloat(budgetResult.rows[0].value) 
            : DEFAULT_BUDGET_BRL;

        const percentUsed = (totalCost / budgetBrl) * 100;

        res.json({
            success: true,
            message: 'Uso registrado com sucesso',
            usage: result.rows[0],
            budget_status: {
                total_cost_month_brl: totalCost.toFixed(4),
                budget_brl: budgetBrl,
                percent_used: percentUsed.toFixed(2),
                status: getStatusFromPercent(percentUsed)
            }
        });
    } catch (error) {
        console.error('Error logging AI usage:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao registrar uso de IA'
        });
    }
});

/**
 * GET /api/ai-costs/alerts
 * Verificar se precisa enviar alertas de threshold
 * Auth: JWT required
 */
router.get('/alerts', authenticateJWT, async (req, res) => {
    try {
        // Buscar budget e thresholds configurados
        const configResult = await query(`
            SELECT key, value FROM config
            WHERE key IN (
                'ai_budget_monthly_brl',
                'ai_alert_threshold_50',
                'ai_alert_threshold_75',
                'ai_auto_pause_threshold_90'
            )
        `);

        const config = {};
        configResult.rows.forEach(row => {
            config[row.key] = row.value;
        });

        const budgetBrl = parseFloat(config.ai_budget_monthly_brl || DEFAULT_BUDGET_BRL);
        const alert50Enabled = config.ai_alert_threshold_50 === true || config.ai_alert_threshold_50 === 'true';
        const alert75Enabled = config.ai_alert_threshold_75 === true || config.ai_alert_threshold_75 === 'true';
        const autoPause90Enabled = config.ai_auto_pause_threshold_90 === true || config.ai_auto_pause_threshold_90 === 'true';

        // Calcular custo atual do mês
        const currentMonthResult = await query(`
            SELECT SUM(cost_brl) as total_cost
            FROM ai_usage_tracking
            WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
        `);

        const totalCost = parseFloat(currentMonthResult.rows[0].total_cost || 0);
        const percentUsed = (totalCost / budgetBrl) * 100;

        const alerts = [];

        // Verificar alertas
        if (percentUsed >= 90 && autoPause90Enabled) {
            alerts.push({
                level: 'critical',
                threshold: 90,
                percent_used: percentUsed.toFixed(2),
                message: '🔴 LIMITE CRÍTICO: Budget IA em 90%! Auto-pause ativado.',
                action_required: 'pause_ai_workflows',
                workflows_to_pause: ['gerar-legendas', 'analise-preditiva', 'recomendar-conteudo']
            });
        } else if (percentUsed >= 75 && alert75Enabled) {
            alerts.push({
                level: 'warning',
                threshold: 75,
                percent_used: percentUsed.toFixed(2),
                message: '🟠 ATENÇÃO: Budget IA em 75%',
                action_required: 'monitor_closely'
            });
        } else if (percentUsed >= 50 && alert50Enabled) {
            alerts.push({
                level: 'info',
                threshold: 50,
                percent_used: percentUsed.toFixed(2),
                message: '🟡 ALERTA: Budget IA em 50%',
                action_required: 'none'
            });
        }

        res.json({
            success: true,
            budget_brl: budgetBrl,
            current_cost_brl: totalCost.toFixed(4),
            percent_used: percentUsed.toFixed(2),
            alerts,
            has_critical_alert: alerts.some(a => a.level === 'critical'),
            should_notify: alerts.length > 0
        });
    } catch (error) {
        console.error('Error checking alerts:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao verificar alertas'
        });
    }
});

/**
 * POST /api/ai-costs/pause-workflows
 * Pausa workflows que geram custo variável (quando atingir 90%)
 * Auth: JWT required, Admin only
 */
router.post('/pause-workflows', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const workflowsToPause = [
            'gerar-legendas',
            'analise-preditiva',
            'recomendar-conteudo',
            'dicas-produtos',
            'analise-comentarios'
        ];

        const result = await query(
            `UPDATE automation_controls 
             SET enabled = FALSE, updated_at = NOW()
             WHERE workflow_name = ANY($1) AND enabled = TRUE
             RETURNING workflow_name`,
            [workflowsToPause]
        );

        res.json({
            success: true,
            message: '⚠️ Workflows com custo variável pausados automaticamente (budget 90%)',
            paused_workflows: result.rows.map(r => r.workflow_name),
            paused_count: result.rowCount
        });
    } catch (error) {
        console.error('Error pausing workflows:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao pausar workflows'
        });
    }
});

/**
 * GET /api/ai-costs/weekly-report
 * Relatório semanal de estimativa de custos
 * Auth: JWT required
 */
router.get('/weekly-report', authenticateJWT, async (req, res) => {
    try {
        // Custos da semana passada
        const lastWeekResult = await query(`
            SELECT 
                service,
                COUNT(*) as calls,
                SUM(tokens_total) as tokens,
                SUM(cost_brl) as cost_brl,
                SUM(CASE WHEN is_free THEN cost_brl ELSE 0 END) as free_cost,
                SUM(CASE WHEN NOT is_free THEN cost_brl ELSE 0 END) as paid_cost
            FROM ai_usage_tracking
            WHERE date >= CURRENT_DATE - INTERVAL '7 days'
            AND date < CURRENT_DATE
            GROUP BY service
            ORDER BY cost_brl DESC
        `);

        const totalLastWeek = lastWeekResult.rows.reduce((sum, row) => sum + parseFloat(row.cost_brl || 0), 0);

        // Projeção próxima semana (mesmo padrão)
        const projectedNextWeek = totalLastWeek;

        // Custos por workflow
        const workflowCostsResult = await query(`
            SELECT 
                workflow_name,
                COUNT(*) as calls,
                SUM(cost_brl) as cost_brl,
                AVG(cost_brl) as avg_cost
            FROM ai_usage_tracking
            WHERE date >= CURRENT_DATE - INTERVAL '7 days'
            AND workflow_name IS NOT NULL
            GROUP BY workflow_name
            ORDER BY cost_brl DESC
        `);

        // Budget mensal e projeção
        const budgetResult = await query(
            `SELECT value FROM config WHERE key = 'ai_budget_monthly_brl'`
        );
        const budgetBrl = budgetResult.rowCount > 0 
            ? parseFloat(budgetResult.rows[0].value) 
            : DEFAULT_BUDGET_BRL;

        // Calcular custo total do mês até agora
        const monthResult = await query(`
            SELECT SUM(cost_brl) as total_cost
            FROM ai_usage_tracking
            WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
        `);
        const totalMonth = parseFloat(monthResult.rows[0].total_cost || 0);

        // Projeção para fim do mês
        const today = new Date();
        const dayOfMonth = today.getDate();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const avgDaily = dayOfMonth > 0 ? totalMonth / dayOfMonth : 0;
        const projectedMonth = avgDaily * daysInMonth;

        res.json({
            success: true,
            period: 'last_7_days',
            last_week: {
                total_cost_brl: totalLastWeek.toFixed(4),
                by_service: lastWeekResult.rows.map(r => ({
                    service: r.service,
                    calls: parseInt(r.calls),
                    cost_brl: parseFloat(r.cost_brl).toFixed(4),
                    free_cost: parseFloat(r.free_cost || 0).toFixed(4),
                    paid_cost: parseFloat(r.paid_cost || 0).toFixed(4)
                }))
            },
            next_week_projection: {
                estimated_cost_brl: projectedNextWeek.toFixed(4)
            },
            workflows: workflowCostsResult.rows.map(r => ({
                workflow: r.workflow_name,
                calls: parseInt(r.calls),
                cost_brl: parseFloat(r.cost_brl).toFixed(4),
                avg_cost_per_call: parseFloat(r.avg_cost).toFixed(4)
            })),
            month_projection: {
                current_cost_brl: totalMonth.toFixed(4),
                projected_total_brl: projectedMonth.toFixed(4),
                budget_brl: budgetBrl,
                percent_used: ((totalMonth / budgetBrl) * 100).toFixed(2),
                status: getStatusFromPercent((totalMonth / budgetBrl) * 100)
            }
        });
    } catch (error) {
        console.error('Error generating weekly report:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao gerar relatório semanal'
        });
    }
});

/**
 * Helper: Determinar status baseado em percentual
 */
function getStatusFromPercent(percent) {
    if (percent >= 90) return 'critical';
    if (percent >= 75) return 'warning';
    if (percent >= 50) return 'caution';
    return 'ok';
}

module.exports = router;

