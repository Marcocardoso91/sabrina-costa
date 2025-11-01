# 🤖 n8n Workflows - Dashboard Sabrina Costa

**Estrutura melhorada e modular para automação completa**

## 📁 Estrutura de Pastas

```
n8n/
├── workflows/
│   ├── production/       # Workflows ativos em produção
│   ├── development/      # Workflows em desenvolvimento/teste
│   └── archived/         # Workflows descontinuados
├── templates/            # Templates reutilizáveis
├── shared/               # Funções e recursos compartilhados
│   ├── functions/        # JavaScript functions
│   └── credentials/      # Templates de credenciais
├── monitoring/           # Workflows de monitoramento
├── docs/                 # Documentação adicional
└── config/               # Configurações por ambiente
```

## 🚀 Workflows Disponíveis

### Grupo 1: Workflows Básicos (Ativos)

| # | Nome | Trigger | Frequência | Status | Descrição |
|---|------|---------|------------|--------|-----------|
| 01 | Processar Métricas | Webhook | On-demand | ✅ Ativo | Recebe e processa métricas CSV/JSON |
| 02 | Alertas WhatsApp | Cron | 18:00 diário | ✅ Ativo | Envia alertas de métricas |
| 03 | Relatório Diário | Cron | 18:05 diário | ✅ Ativo | Compila e envia relatório |
| 04 | Lembretes Postagem | Cron | 11:00, 17:30 | ✅ Ativo | Lembra posts do dia |

### Grupo 2: Workflows IA - Campanhas (Desligados - Requer Aprovação)

| # | Nome | Trigger | Frequência | Status | Modo | Descrição |
|---|------|---------|------------|--------|------|-----------|
| 05 | Otimizar Campanhas | Cron | A cada 2h | ❌ Inativo | Manual | Analisa Meta Ads e sugere otimizações |

**Proteção:** 
- ✅ APENAS NOTIFICA (não pausa nada automaticamente)
- ✅ Requer aprovação para cada ação
- ✅ Modo manual por padrão

### Grupo 3: Workflows IA - Conteúdo (Desligados - Requer Aprovação)

| # | Nome | Trigger | Frequência | Status | Modo | Descrição |
|---|------|---------|------------|--------|------|-----------|
| 06 | Gerar Legendas IA | Webhook | On-demand | ❌ Inativo | Manual | Gera legendas com IA (Gemini/ChatGPT/Claude) |
| 07 | Recomendar Conteúdo | Cron | Diário 08:00 | ❌ Inativo | Manual | Recomenda temas baseado em análise |
| 08 | Análise Preditiva | Cron | Diário 19:00 | ❌ Inativo | Semi-Auto | Prevê métricas próximos 7 dias |
| 10 | Dicas Produtos IA | Webhook | On-demand | ❌ Inativo | Manual | Gera dicas de produtos com IA Vision |
| 11 | Análise Comentários | Cron | Diário 20:00 | ❌ Inativo | Semi-Auto | Sentiment analysis dos comentários |

**Proteção:**
- ✅ NUNCA posta automaticamente
- ✅ Sempre pede aprovação
- ✅ Você revisa tudo antes
- ✅ Zero risco Instagram

### Grupo 4: Workflows de Tracking (Desligados - Seguros)

| # | Nome | Trigger | Frequência | Status | Modo | Descrição |
|---|------|---------|------------|--------|------|-----------|
| 09 | Reels Fund Tracker | Cron | A cada 6h | ❌ Inativo | Auto | Monitora progresso meta 900 seguidores |
| 12 | Busca Semanal Validação | Cron | Segunda 09:00 | ❌ Inativo | Auto | Valida plano com Exa Search + Claude |
| 13 | Monitor Custos IA | Cron | Diário 08:00 | ❌ Inativo | Auto | Controla gastos IA (alertas 50%/75%/90%) |

**Proteção:**
- ✅ Apenas leitura (não modificam nada)
- ✅ Zero risco
- ✅ 100% seguros
- ✅ Podem ficar em modo auto

## 🛠️ Templates Reutilizáveis

### api-client.json
Template para requisições HTTP com:
- Retry logic automático
- Error handling global
- Logging estruturado
- Timeout configurável

### whatsapp-sender.json
Template para envio WhatsApp com:
- Formatação de número
- Retry em falhas
- Log de entregas
- Suporte a Evolution API

### data-validator.json
Validador genérico com:
- Schema validation
- Type checking
- Min/Max validation
- Pattern matching

## 📚 Funções Compartilhadas

Localizadas em `shared/functions/`:

- **validate-metrics.js** - Validação de métricas do Instagram
- **format-message.js** - Formatação de mensagens WhatsApp
- **calculate-thresholds.js** - Cálculo de alertas e thresholds
- **structured-logging.js** - Sistema de logs estruturados

## ⚙️ Configuração

### Ambientes

- **Production**: `config/env.production.json`
- **Development**: `config/env.development.json`

### Variáveis Obrigatórias

Ver `config/variables.md` para lista completa.

Principais:
- `API_BASE_URL` - URL da API backend
- `API_TOKEN` - Token JWT
- `WEBHOOK_SECRET` - Secret para webhooks
- `EVOLUTION_API_URL` - URL Evolution API
- `WHATSAPP_NUMBER` - Número WhatsApp

## 🚦 Começando

### 1. Configurar Variáveis

```bash
# No n8n, adicionar em Settings → Environment
API_BASE_URL=https://seu-backend.vercel.app
API_TOKEN=seu_token_jwt
# ... outras variáveis
```

### 2. Importar Workflows

1. Acessar https://fluxos.macspark.dev
2. Workflows → Import from File
3. Selecionar arquivo de `workflows/production/`
4. Ativar workflow

### 3. Testar em Development

1. Importar cópia em development
2. Ajustar variáveis para ambiente de teste
3. Executar manualmente (botão Play)
4. Verificar logs e output

### 4. Promover para Production

1. Validar funcionamento em development
2. Atualizar versão em production
3. Ativar workflow
4. Monitorar primeiras execuções

## 📖 Documentação

- **[Workflow Patterns](docs/workflow-patterns.md)** - Padrões de desenvolvimento
- **[Deployment Guide](docs/deployment-guide.md)** - Guia de deploy
- **[Troubleshooting](docs/troubleshooting.md)** - Solução de problemas
- **[Variables Reference](config/variables.md)** - Referência de variáveis

## 🔍 Monitoramento

### Logs

Todos workflows usam logging estruturado JSON:

```json
{
  "timestamp": "2025-10-23T10:30:00Z",
  "level": "info",
  "workflow": "Sabrina_01_ProcessarMetricas",
  "execution_id": "abc123",
  "message": "Métricas processadas com sucesso",
  "metadata": {...}
}
```

### Métricas

- Acessar `/metrics` endpoint (Workflow 06)
- Ver estatísticas de execução
- Monitorar uptime e falhas

### Alertas

Configurados via tabela `n8n_alert_config` no banco:
- Notificações de falha
- Alertas de performance
- Timeouts

## 🧪 Testes

### Testar Workflow Localmente

1. Duplicar workflow
2. Mudar para modo de teste
3. Executar com dados de exemplo
4. Verificar output de cada nó

### Testar Webhooks

```bash
curl -X POST https://fluxos.macspark.dev/webhook/sabrina/metricas \
  -H "X-Webhook-Token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-23","ctr":7.5,"cpc":0.09,...}'
```

## 🤖 Workflows com IA (Novos)

### ⚠️ IMPORTANTE: Segurança e Controle

**Todos workflows com IA seguem princípios rígidos de segurança:**

1. ❌ NUNCA postam automaticamente no Instagram
2. ❌ NUNCA pausam campanhas sem aprovação
3. ✅ SEMPRE modo manual por padrão
4. ✅ SEMPRE pedem aprovação antes de ações
5. ✅ SEMPRE controlam custos (max R$ 50/mês)

### Configuração dos Workflows IA

**ANTES de ativar qualquer workflow IA:**

1. Ler documentação: `docs/automations/MANUAL-AUTOMACOES.md`
2. Ler segurança: `docs/automations/SEGURANCA-INSTAGRAM.md`
3. Configurar APIs: `docs/automations/CONFIGURAR-APIS.md`
4. Ativar Monitor Custos PRIMEIRO
5. Testar em modo manual

### Como Usar Workflows IA

**Exemplo: Gerar Legenda**

```bash
# 1. Ativar workflow via frontend
# configuracoes-automacao.html > Toggle "gerar-legendas" ON

# 2. Enviar comando WhatsApp
/legenda Minha rotina de skincare matinal

# 3. Aguardar legenda (15-30s)

# 4. Revisar e aprovar
/aprovar-leg-123

# 5. Copiar manualmente para Instagram
# (NUNCA posta automaticamente!)
```

### APIs Necessárias

Para workflows IA funcionarem:

**Essencial (Configurar agora):**
- Gemini Pro API (Google) - R$ 0 (grátis)
- Evolution API (WhatsApp) - ✅ Já configurado

**Opcional (Configurar depois):**
- Meta Ads API - Para workflow 05
- Instagram Graph API - Para workflow 09
- Claude API ou ChatGPT API - Backup

**Ver:** `docs/automations/CONFIGURAR-APIS.md`

### Custo Estimado

**Total esperado: R$ 0-5/mês** ✅

Detalhes:
- Gemini Pro: R$ 0 (grátis)
- ChatGPT Pro: R$ 0 (já assinado)
- Claude Pro: R$ 0 (já assinado)
- OpenAI API (backup): ~R$ 2-5/mês

**Proteção:** Auto-pause em 90% do budget (R$ 45)

---

## 🛡️ Boas Práticas

### Segurança

- ✅ Usar variáveis de ambiente para secrets
- ✅ Nunca hardcodar tokens/senhas
- ✅ Validar input em todos webhooks
- ✅ Implementar rate limiting
- ✅ NUNCA ativar modo auto sem testar muito
- ✅ Sempre ter kill switch disponível

### Performance

- ✅ Usar retry logic com backoff
- ✅ Configurar timeouts adequados
- ✅ Evitar loops infinitos
- ✅ Limpar dados antigos regularmente

### Manutenção

- ✅ Documentar mudanças importantes
- ✅ Versionar workflows (Git)
- ✅ Testar antes de ativar
- ✅ Monitorar logs após mudanças

## 🆘 Suporte

### Problemas Comuns

**Workflow não executa:**
- Verificar se está ativo
- Verificar cron schedule
- Verificar logs de erro

**API retorna 401:**
- Verificar `API_TOKEN`
- Verificar expiração JWT
- Verificar `WEBHOOK_SECRET`

**WhatsApp não envia:**
- Verificar Evolution API online
- Verificar `EVOLUTION_API_KEY`
- Verificar formato do número

### Documentação Adicional

Ver `docs/N8N-WORKFLOWS.md` na raiz do projeto para documentação completa.

## 🔄 Versionamento

Workflows seguem convenção:
- `v1.0.0` - Versão inicial
- `v1.1.0` - Novas funcionalidades
- `v1.0.1` - Bug fixes

## 📝 Changelog

### v2.0.0 (2025-10-23)
- ✨ Reestruturação completa de pastas
- ✨ Adicionados templates reutilizáveis
- ✨ Funções compartilhadas
- ✨ Configuração por ambiente
- ✨ Sistema de monitoramento
- ✨ 5 novos workflows

### v1.0.0 (2025-10-20)
- 🎉 Versão inicial
- 4 workflows básicos

---

**🌟 Feito com ❤️ pela equipe Macspark**

*Última atualização: 23 de Outubro de 2025*

