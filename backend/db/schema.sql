-- Database Schema for Dashboard Sabrina Costa
-- PostgreSQL 15+
-- Versão: 1.0
-- Data: 20/10/2025

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: users
-- Descrição: Usuários do sistema (gerente, cliente)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- TABLE: metrics
-- Descrição: Métricas do Instagram (Meta Ads)
-- =====================================================
CREATE TABLE IF NOT EXISTS metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    ctr DECIMAL(5,2), -- Click-Through Rate (%)
    cpc DECIMAL(10,2), -- Custo Por Clique (R$)
    cpm DECIMAL(10,2), -- Custo Por Mil Impressões (R$)
    frequency DECIMAL(5,2), -- Frequência de exibição
    visits INTEGER, -- Visitas ao perfil
    new_followers INTEGER, -- Novos seguidores
    cost DECIMAL(10,2), -- Investimento do dia (R$)
    impressions INTEGER, -- Impressões totais
    clicks INTEGER, -- Cliques totais
    cost_per_follower DECIMAL(10,2), -- Custo por seguidor (calculado)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_metrics_date ON metrics(date DESC);
CREATE INDEX idx_metrics_created_at ON metrics(created_at DESC);

-- Constraint: data não pode ser futura
ALTER TABLE metrics ADD CONSTRAINT check_date_not_future 
    CHECK (date <= CURRENT_DATE);

-- =====================================================
-- TABLE: alerts
-- Descrição: Histórico de alertas enviados
-- =====================================================
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'ctr_low', 'cpc_high', 'frequency_high', etc
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'pending', 'failed')),
    metadata JSONB, -- Dados extras (valores que geraram alerta)
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_alerts_sent_at ON alerts(sent_at DESC);
CREATE INDEX idx_alerts_type ON alerts(type);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_metadata ON alerts USING GIN (metadata);

-- =====================================================
-- TABLE: posts
-- Descrição: Cronograma de posts (4 semanas)
-- =====================================================
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 4),
    format VARCHAR(50) NOT NULL CHECK (format IN ('reel', 'carousel', 'stories')),
    theme VARCHAR(255) NOT NULL,
    hook TEXT,
    cta TEXT,
    objective VARCHAR(100),
    stories_ideas TEXT,
    status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'posted', 'cancelled')),
    posted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_posts_date ON posts(date);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_week_number ON posts(week_number);
CREATE INDEX idx_posts_format ON posts(format);

-- =====================================================
-- TABLE: hooks
-- Descrição: Biblioteca de ganchos virais
-- =====================================================
CREATE TABLE IF NOT EXISTS hooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_hooks_category ON hooks(category);
CREATE INDEX idx_hooks_usage_count ON hooks(usage_count DESC);

-- =====================================================
-- TABLE: config
-- Descrição: Configurações do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS config (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS: Update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_config_updated_at BEFORE UPDATE ON config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA: Configuration defaults
-- =====================================================
INSERT INTO config (key, value) VALUES
('thresholds', '{
    "ctr_min": 1.5,
    "cpc_max": 0.70,
    "cpm_max": 10.0,
    "frequency_max": 3.0,
    "cost_per_follower_max": 1.30
}'::jsonb),
('whatsapp', '{
    "number": "+5531993676989",
    "enabled": true
}'::jsonb),
('alerts_schedule', '{
    "daily_report": "18:00",
    "post_reminders": ["11:00", "17:30"]
}'::jsonb),
('general', '{
    "timezone": "America/Sao_Paulo",
    "currency": "BRL",
    "language": "pt-BR"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- SEED DATA: Admin user (senha: Sabrina2025!)
-- Hash gerado com: bcrypt.hashSync('Sabrina2025!', 10)
-- =====================================================
INSERT INTO users (email, password_hash, name, role) VALUES
('gerente@macspark.dev', '$2a$10$LaIQpqCuEs/jqVPVNCYiXe2O.Ebr3A15jlTSBdgTLRgZdoarE19u.', 'Marco', 'admin'),
('sabrina@example.com', '$2a$10$LaIQpqCuEs/jqVPVNCYiXe2O.Ebr3A15jlTSBdgTLRgZdoarE19u.', 'Sabrina', 'viewer')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- SEED DATA: 50 Ganchos Virais
-- =====================================================
INSERT INTO hooks (category, text) VALUES
-- Curiosidade (5)
('Curiosidade', 'O que NINGUÉM te conta sobre...'),
('Curiosidade', 'Esse segredo mudou TUDO para mim'),
('Curiosidade', 'Você não vai acreditar no que descobri'),
('Curiosidade', 'Por que ninguém fala sobre isso?'),
('Curiosidade', 'A verdade que escondem de você'),

-- Urgência (5)
('Urgência', 'PARE de fazer isso AGORA'),
('Urgência', 'Se você faz isso, ESTÁ ERRANDO'),
('Urgência', 'Você está fazendo isso ERRADO (e eu vou te mostrar)'),
('Urgência', 'Último aviso: não faça mais isso'),
('Urgência', 'Se continuar assim, NUNCA vai conseguir [resultado]'),

-- Transformação (5)
('Transformação', 'Como eu fui de [antes] para [depois]'),
('Transformação', 'Isso mudou minha vida em [X dias]'),
('Transformação', 'Olha só o que [X dias] fizeram...'),
('Transformação', 'Antes eu era assim... Hoje sou assim'),
('Transformação', 'A transformação que você precisa ver'),

-- Identificação (5)
('Identificação', 'Se você também é assim, me segue'),
('Identificação', 'Quem nunca passou por isso?'),
('Identificação', 'Eu pensei que era só EU...'),
('Identificação', 'Você também se sente assim às vezes?'),
('Identificação', 'Se identifica? Então esse perfil é pra você'),

-- Lista/Número (5)
('Lista/Número', '3 coisas que NINGUÉM te conta'),
('Lista/Número', '5 erros que TODO MUNDO comete'),
('Lista/Número', '7 sinais de que você precisa [ação]'),
('Lista/Número', 'Os 3 segredos de [resultado]'),
('Lista/Número', '10 coisas que eu faria diferente'),

-- Desafio (5)
('Desafio', 'Você tem CORAGEM de tentar?'),
('Desafio', 'Faz isso HOJE e me conta o resultado'),
('Desafio', 'Testa isso e me agradeça depois'),
('Desafio', 'Se fizer isso, sua vida muda'),
('Desafio', 'Grave esse vídeo EXATAMENTE assim'),

-- Comparação (5)
('Comparação', 'Você faz assim OU assim?'),
('Comparação', 'O jeito CERTO vs o jeito ERRADO'),
('Comparação', 'Antes eu fazia assim... Hoje faço ASSIM'),
('Comparação', 'Expectativa vs Realidade'),
('Comparação', 'Profissional vs Amador'),

-- História (5)
('História', 'Deixa eu te contar uma história...'),
('História', 'Eu nunca vou esquecer o dia que...'),
('História', 'Era uma vez... (no meu caso foi assim)'),
('História', 'Lembro como se fosse hoje...'),
('História', 'A história que mudou tudo'),

-- Pergunta (5)
('Pergunta', 'Você já parou pra pensar nisso?'),
('Pergunta', 'Por que [situação] acontece?'),
('Pergunta', 'Qual o seu maior desafio com [tema]?'),
('Pergunta', 'Me responde com sinceridade...'),
('Pergunta', 'Se pudesse voltar no tempo, você...?'),

-- Autoridade (5)
('Autoridade', 'Depois de [X anos] fazendo isso...'),
('Autoridade', 'Testei TUDO e só isso funcionou'),
('Autoridade', 'A ciência comprova: [afirmação]'),
('Autoridade', 'Isso que vou te contar NINGUÉM sabe'),
('Autoridade', 'Como profissional, eu te garanto...')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VIEWS: Useful queries
-- =====================================================

-- View: Métricas recentes com cálculos
CREATE OR REPLACE VIEW v_metrics_recent AS
SELECT 
    id,
    date,
    ctr,
    cpc,
    cpm,
    frequency,
    visits,
    new_followers,
    cost,
    impressions,
    clicks,
    CASE 
        WHEN new_followers > 0 THEN ROUND(cost / new_followers, 2)
        ELSE NULL
    END as cost_per_follower_calculated,
    created_at,
    -- Status indicators
    CASE WHEN ctr < 1.5 THEN 'warning' ELSE 'ok' END as ctr_status,
    CASE WHEN cpc > 0.70 THEN 'warning' ELSE 'ok' END as cpc_status,
    CASE WHEN frequency > 3.0 THEN 'warning' ELSE 'ok' END as frequency_status
FROM metrics
ORDER BY date DESC
LIMIT 30;

-- View: Resumo semanal
CREATE OR REPLACE VIEW v_weekly_summary AS
SELECT 
    DATE_TRUNC('week', date) as week_start,
    COUNT(*) as days_with_data,
    ROUND(AVG(ctr), 2) as avg_ctr,
    ROUND(AVG(cpc), 2) as avg_cpc,
    ROUND(AVG(cpm), 2) as avg_cpm,
    ROUND(AVG(frequency), 2) as avg_frequency,
    SUM(visits) as total_visits,
    SUM(new_followers) as total_new_followers,
    SUM(cost) as total_cost,
    SUM(impressions) as total_impressions,
    SUM(clicks) as total_clicks
FROM metrics
WHERE date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE_TRUNC('week', date)
ORDER BY week_start DESC;

-- =====================================================
-- FUNCTIONS: Useful functions
-- =====================================================

-- Function: Get metrics summary
CREATE OR REPLACE FUNCTION get_metrics_summary(period_days INTEGER DEFAULT 7)
RETURNS TABLE (
    period_start DATE,
    period_end DATE,
    total_days INTEGER,
    avg_ctr DECIMAL,
    avg_cpc DECIMAL,
    avg_cpm DECIMAL,
    total_visits INTEGER,
    total_followers INTEGER,
    total_cost DECIMAL,
    avg_cost_per_follower DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CURRENT_DATE - period_days::INTEGER as period_start,
        CURRENT_DATE as period_end,
        COUNT(*)::INTEGER as total_days,
        ROUND(AVG(m.ctr), 2) as avg_ctr,
        ROUND(AVG(m.cpc), 2) as avg_cpc,
        ROUND(AVG(m.cpm), 2) as avg_cpm,
        SUM(m.visits)::INTEGER as total_visits,
        SUM(m.new_followers)::INTEGER as total_followers,
        SUM(m.cost) as total_cost,
        CASE 
            WHEN SUM(m.new_followers) > 0 
            THEN ROUND(SUM(m.cost) / SUM(m.new_followers), 2)
            ELSE NULL
        END as avg_cost_per_follower
    FROM metrics m
    WHERE m.date >= CURRENT_DATE - period_days::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TABLE: automation_controls
-- Descrição: Controle de workflows e automações N8N
-- =====================================================
CREATE TABLE IF NOT EXISTS automation_controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_name VARCHAR(100) UNIQUE NOT NULL,
    workflow_id VARCHAR(50), -- ID do workflow no n8n (se aplicável)
    enabled BOOLEAN DEFAULT FALSE, -- Workflow ativo/inativo
    automation_mode VARCHAR(50) DEFAULT 'manual' CHECK (automation_mode IN ('manual', 'semi-auto', 'auto')),
    requires_approval BOOLEAN DEFAULT TRUE, -- Requer aprovação antes de executar ações
    auto_execute BOOLEAN DEFAULT FALSE, -- Se TRUE, executa automaticamente (perigoso)
    never_post BOOLEAN DEFAULT TRUE, -- Proteção Instagram: nunca postar automaticamente
    use_free_ai_first BOOLEAN DEFAULT TRUE, -- Priorizar APIs gratuitas
    last_execution TIMESTAMP, -- Última execução do workflow
    last_action TIMESTAMP, -- Última ação executada (após aprovação)
    total_executions INTEGER DEFAULT 0, -- Total de execuções
    total_actions INTEGER DEFAULT 0, -- Total de ações executadas
    config JSONB, -- Configurações específicas do workflow
    description TEXT, -- Descrição do workflow
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_automation_controls_enabled ON automation_controls(enabled);
CREATE INDEX idx_automation_controls_mode ON automation_controls(automation_mode);
CREATE INDEX idx_automation_controls_name ON automation_controls(workflow_name);

-- Seed automation controls (todos desligados por padrão - SEGURANÇA)
INSERT INTO automation_controls (workflow_name, automation_mode, requires_approval, auto_execute, never_post, description) VALUES
('processar-metricas', 'auto', FALSE, TRUE, TRUE, 'Workflow básico: processar métricas recebidas via webhook'),
('alertas-whatsapp', 'auto', FALSE, TRUE, TRUE, 'Workflow básico: enviar alertas quando métricas fora do padrão'),
('relatorio-diario', 'auto', FALSE, TRUE, TRUE, 'Workflow básico: gerar relatório diário automaticamente'),
('lembrete-postagem', 'auto', FALSE, TRUE, TRUE, 'Workflow básico: lembrete de postagem via WhatsApp'),
('otimizar-campanhas', 'manual', TRUE, FALSE, TRUE, 'IA: Analisar campanhas e sugerir otimizações (APENAS NOTIFICAR)'),
('gerar-legendas', 'manual', TRUE, FALSE, TRUE, 'IA: Gerar legendas com IA (APROVAÇÃO OBRIGATÓRIA)'),
('recomendar-conteudo', 'manual', TRUE, FALSE, TRUE, 'IA: Recomendar temas de conteúdo baseado em análise'),
('analise-preditiva', 'semi-auto', FALSE, FALSE, TRUE, 'IA: Análise preditiva de métricas (próximos 7 dias)'),
('reels-fund-tracker', 'auto', FALSE, TRUE, TRUE, 'Tracking: Monitorar progresso meta 900 seguidores (SEGURO)'),
('dicas-produtos', 'manual', TRUE, FALSE, TRUE, 'IA: Gerar dicas de produtos com IA Vision'),
('analise-comentarios', 'semi-auto', FALSE, FALSE, TRUE, 'IA: Análise de sentimento dos comentários'),
('busca-semanal-validacao', 'auto', FALSE, TRUE, TRUE, 'IA: Busca semanal para validar plano estratégico'),
('monitorar-custos-ia', 'auto', FALSE, TRUE, TRUE, 'Monitor: Controlar custos de IA e alertar thresholds')
ON CONFLICT (workflow_name) DO NOTHING;

-- =====================================================
-- TABLE: approval_queue
-- Descrição: Fila de aprovações para ações de automação
-- =====================================================
CREATE TABLE IF NOT EXISTS approval_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_name VARCHAR(100) NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- 'pause_campaign', 'post_content', 'send_message', 'update_budget'
    action_data JSONB NOT NULL, -- Detalhes completos da ação proposta
    reason TEXT, -- Por que esta ação foi sugerida
    impact TEXT, -- Impacto esperado (ex: "Economia R$ 20/dia")
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'executed')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    expires_at TIMESTAMP, -- Tempo limite para decisão (default 24h)
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    executed_at TIMESTAMP,
    approved_by UUID REFERENCES users(id),
    rejection_reason TEXT, -- Motivo da rejeição (se aplicável)
    execution_result JSONB, -- Resultado da execução (sucesso/erro)
    notified_via VARCHAR(50) DEFAULT 'whatsapp', -- Como foi notificado: whatsapp, email, frontend
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_approval_queue_status ON approval_queue(status);
CREATE INDEX idx_approval_queue_workflow ON approval_queue(workflow_name);
CREATE INDEX idx_approval_queue_priority ON approval_queue(priority);
CREATE INDEX idx_approval_queue_expires_at ON approval_queue(expires_at);
CREATE INDEX idx_approval_queue_created_at ON approval_queue(created_at DESC);

-- Função para expirar aprovações automaticamente
CREATE OR REPLACE FUNCTION expire_old_approvals()
RETURNS void AS $$
BEGIN
    UPDATE approval_queue
    SET status = 'expired', updated_at = NOW()
    WHERE status = 'pending' 
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TABLE: ai_usage_tracking
-- Descrição: Rastreamento de uso e custos de APIs de IA
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_usage_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service VARCHAR(50) NOT NULL, -- 'openai', 'claude', 'gemini', 'openrouter', 'local-vps'
    model VARCHAR(100), -- 'gpt-4o', 'claude-3.5-sonnet', 'gemini-pro', 'llama-3.1-70b'
    workflow_name VARCHAR(100), -- Qual workflow usou
    operation VARCHAR(100), -- 'generate_caption', 'analyze_sentiment', 'predict_metrics'
    tokens_input INTEGER, -- Tokens de entrada
    tokens_output INTEGER, -- Tokens de saída
    tokens_total INTEGER, -- Total de tokens
    cost_brl DECIMAL(10,4), -- Custo em reais
    is_free BOOLEAN DEFAULT FALSE, -- Se foi usando tier gratuito/assinatura
    response_time_ms INTEGER, -- Tempo de resposta em ms
    success BOOLEAN DEFAULT TRUE, -- Se a chamada foi bem-sucedida
    error_message TEXT, -- Mensagem de erro (se falhou)
    date DATE DEFAULT CURRENT_DATE, -- Data da operação
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ai_usage_service ON ai_usage_tracking(service);
CREATE INDEX idx_ai_usage_workflow ON ai_usage_tracking(workflow_name);
CREATE INDEX idx_ai_usage_date ON ai_usage_tracking(date DESC);
CREATE INDEX idx_ai_usage_is_free ON ai_usage_tracking(is_free);
CREATE INDEX idx_ai_usage_created_at ON ai_usage_tracking(created_at DESC);

-- View: Custos mensais por serviço
CREATE OR REPLACE VIEW ai_costs_monthly AS
SELECT 
    DATE_TRUNC('month', date) as month,
    service,
    COUNT(*) as total_calls,
    SUM(tokens_total) as total_tokens,
    SUM(cost_brl) as total_cost_brl,
    SUM(CASE WHEN is_free THEN 1 ELSE 0 END) as free_calls,
    SUM(CASE WHEN NOT is_free THEN 1 ELSE 0 END) as paid_calls,
    AVG(response_time_ms) as avg_response_time_ms
FROM ai_usage_tracking
GROUP BY DATE_TRUNC('month', date), service
ORDER BY month DESC, total_cost_brl DESC;

-- View: Custos do mês atual
CREATE OR REPLACE VIEW ai_costs_current_month AS
SELECT 
    service,
    COUNT(*) as calls,
    SUM(tokens_total) as tokens,
    SUM(cost_brl) as cost_brl,
    SUM(CASE WHEN is_free THEN cost_brl ELSE 0 END) as free_cost,
    SUM(CASE WHEN NOT is_free THEN cost_brl ELSE 0 END) as paid_cost
FROM ai_usage_tracking
WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY service;

-- Inserir configuração de budget IA
INSERT INTO config (key, value) VALUES
('ai_budget_monthly_brl', '50.00'::jsonb),
('ai_alert_threshold_50', 'true'::jsonb),
('ai_alert_threshold_75', 'true'::jsonb),
('ai_auto_pause_threshold_90', 'true'::jsonb),
('ai_prefer_free_tiers', 'true'::jsonb),
('ai_use_vps_models', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- TABLE: weekly_plan_updates
-- Descrição: Mudanças detectadas na busca semanal de validação
-- =====================================================
CREATE TABLE IF NOT EXISTS weekly_plan_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    week_start DATE NOT NULL, -- Segunda-feira da semana
    week_end DATE NOT NULL, -- Domingo da semana
    has_changes BOOLEAN DEFAULT FALSE, -- Se foram detectadas mudanças relevantes
    urgency VARCHAR(20) CHECK (urgency IN ('baixa', 'media', 'alta')), -- Urgência das mudanças
    summary TEXT, -- Resumo das descobertas
    changes_detected JSONB, -- Array de mudanças detectadas
    recommendations JSONB, -- Array de recomendações
    impact VARCHAR(20) CHECK (impact IN ('positivo', 'negativo', 'neutro')), -- Impacto nas metas
    sources JSONB, -- URLs e fontes das descobertas
    ai_analysis TEXT, -- Análise completa gerada pela IA
    plan_diff TEXT, -- Diff do master-plan.md (se atualizado)
    notified_at TIMESTAMP, -- Quando foi notificado via WhatsApp
    user_feedback TEXT, -- Feedback do usuário sobre as recomendações
    applied_changes JSONB, -- Quais mudanças foram aplicadas
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_weekly_plan_week_start ON weekly_plan_updates(week_start DESC);
CREATE INDEX idx_weekly_plan_has_changes ON weekly_plan_updates(has_changes);
CREATE INDEX idx_weekly_plan_urgency ON weekly_plan_updates(urgency);

-- =====================================================
-- TABLE: content_generated
-- Descrição: Conteúdo gerado por IA (legendas, dicas, etc)
-- =====================================================
CREATE TABLE IF NOT EXISTS content_generated (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('legenda', 'dica_produto', 'recomendacao', 'story_idea')),
    theme VARCHAR(255), -- Tema/tópico do conteúdo
    content TEXT NOT NULL, -- Conteúdo gerado
    status VARCHAR(20) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'approved', 'rejected', 'posted')),
    ai_service VARCHAR(50), -- 'gemini', 'chatgpt', 'claude', etc
    model VARCHAR(100), -- Nome do modelo usado
    tokens_used INTEGER, -- Tokens gastos
    cost_brl DECIMAL(10,4), -- Custo em reais
    is_free BOOLEAN DEFAULT TRUE, -- Se foi usando tier gratuito
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    posted_at TIMESTAMP, -- Quando foi postado (manualmente)
    posted_url VARCHAR(255), -- URL do post no Instagram
    engagement_data JSONB, -- Dados de engagement (se postado)
    metadata JSONB, -- Dados extras (hashtags, CTAs, etc)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_content_generated_type ON content_generated(type);
CREATE INDEX idx_content_generated_status ON content_generated(status);
CREATE INDEX idx_content_generated_created_at ON content_generated(created_at DESC);
CREATE INDEX idx_content_generated_ai_service ON content_generated(ai_service);
CREATE INDEX idx_content_generated_approved_by ON content_generated(approved_by);

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE users IS 'Usuários do sistema com autenticação';
COMMENT ON TABLE metrics IS 'Métricas diárias do Instagram / Meta Ads';
COMMENT ON TABLE alerts IS 'Histórico de alertas enviados via WhatsApp';
COMMENT ON TABLE posts IS 'Cronograma de posts planejados (4 semanas)';
COMMENT ON TABLE hooks IS 'Biblioteca de ganchos virais para Reels';
COMMENT ON TABLE config IS 'Configurações gerais do sistema';
COMMENT ON TABLE automation_controls IS 'Controle de workflows e automações N8N com IA';
COMMENT ON TABLE approval_queue IS 'Fila de aprovações para ações de automação';
COMMENT ON TABLE ai_usage_tracking IS 'Rastreamento de uso e custos de APIs de IA';
COMMENT ON TABLE weekly_plan_updates IS 'Mudanças detectadas na busca semanal de validação do plano';
COMMENT ON TABLE content_generated IS 'Conteúdo gerado por IA (legendas, dicas) - NUNCA posta automaticamente';

-- =====================================================
-- GRANTS (ajustar conforme necessário)
-- =====================================================
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

