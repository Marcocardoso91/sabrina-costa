<!-- e24a4eb6-1b9a-4321-922e-5d586e1a155f 7aa017d1-90f1-4502-962b-2c317258fd4d -->
# Plano: Implementar 11 Workflows N8N com IA

## Análise dos Documentos

Baseado nos 3 arquivos:

1. `plano-sabrina-blogueira-fases-1-4.md` - Estratégia de crescimento (4 fases)
2. `prd-tecnico-v2-detalhado.md` - 11 workflows n8n detalhados
3. `memoria-master-consolidada-v3.md` - Contexto completo + credenciais

## Gap Analysis

### Já Implementado (Dashboard Atual)

- Backend com 8 APIs REST
- Frontend com 7 páginas
- 4 workflows n8n básicos (métricas, alertas, relatórios, lembretes)
- Schema SQL completo
- Autenticação JWT

### Falta Implementar (dos documentos)

- 7 workflows n8n avançados com IA
- Integração OpenAI/Claude para geração de conteúdo
- Otimização automática de campanhas Meta Ads
- Análise preditiva de métricas
- Sistema de recomendações de conteúdo
- Dashboard de crescimento Reels Fund
- Alertas inteligentes contextuais

## Fase 1: Análise e Planejamento

### 1.1 Mapear workflows existentes vs necessários

Comparar:

- `n8n/workflows/production/` (4 workflows atuais)
- vs `prd-tecnico-v2-detalhado.md` (11 workflows desejados)

Identificar:

- Quais dos 4 atuais podem ser expandidos
- Quais 7 novos precisam ser criados
- Dependências e integrações necessárias

### 1.2 Validar credenciais e APIs necessárias

Verificar em `memoria-master-consolidada-v3.md`:

- Evolution API (WhatsApp) - já configurado
- OpenAI API - precisa configurar
- Claude API - precisa configurar
- Meta Ads API - precisa configurar
- Google Sheets API - precisa configurar
- Supabase - já configurado

### 1.3 Estimar escopo e priorizar

Priorização baseada em ROI:

1. Otimização automática campanhas (maior economia R$)
2. Geração de conteúdo IA (economiza tempo)
3. Alertas inteligentes (previne erros)
4. Dashboard Reels Fund (meta principal)
5. Análise preditiva (insights)

## Fase 2: Preparação Backend

### 2.1 Adicionar novos endpoints API

Criar em `backend/api/`:

- `campaigns.js` - CRUD campanhas Meta Ads
- `content.js` - Conteúdo gerado (legendas, dicas)
- `predictions.js` - Análises preditivas
- `recommendations.js` - Recomendações IA
- `reelsfund.js` - Progresso meta 900 seguidores

### 2.2 Estender schema SQL

Adicionar tabelas em `backend/db/schema.sql`:

- `campaigns` - Campanhas Meta Ads
- `content_generated` - Conteúdo IA
- `predictions` - Previsões e análises
- `recommendations` - Recomendações sistema
- `reels_fund_progress` - Tracking meta

### 2.3 Configurar variáveis ambiente

Adicionar em `backend/ENV_SETUP.md`:

- OPENAI_API_KEY
- CLAUDE_API_KEY (Anthropic)
- META_ADS_ACCESS_TOKEN
- META_ADS_APP_ID
- META_ADS_APP_SECRET
- GOOGLE_SHEETS_API_KEY

## Fase 3: Implementar Workflows N8N

### Workflow 05: Otimização Automática de Campanhas

**Trigger:** Cron (a cada 2 horas)

**Função:**

1. Buscar campanhas ativas Meta Ads API
2. Analisar performance (CTR, CPC, CPS)
3. Decisão automática:

- CTR < 2% → Pausar campanha
- CTR > 4% → Aumentar budget 20%
- CPC > R$ 1.00 → Ajustar targeting

4. Aplicar mudanças via API
5. Notificar Marco via WhatsApp

**Arquivo:** `n8n/workflows/production/05-otimizar-campanhas.json`

**Dependências:**

- Meta Ads API credentials
- Thresholds configuráveis
- Evolution API (WhatsApp)

### Workflow 06: Geração de Legendas com IA

**Trigger:** Webhook (Sabrina envia tema)

**Função:**

1. Receber tema do post
2. Consultar OpenAI GPT-4:

- Prompt: "Gere legenda autêntica para Instagram sobre [tema]"
- Tom: Leve, próximo, empoderador
- Inclui: 3-5 hashtags + CTA + emojis

3. Salvar em `content_generated`
4. Enviar para Sabrina via WhatsApp
5. (Opcional) Postar via Instagram API

**Arquivo:** `n8n/workflows/production/06-gerar-legendas-ia.json`

**Dependências:**

- OpenAI API
- Banco dados (salvar histórico)
- WhatsApp

### Workflow 07: Recomendações de Conteúdo IA

**Trigger:** Cron (diário 08:00)

**Função:**

1. Analisar últimos 30 posts (engagement)
2. Analisar tendências Instagram (hashtags, tópicos)
3. Claude API:

- Prompt: "Baseado nestes dados, recomende 5 temas para Sabrina"
- Contexto: Persona, pilares de conteúdo

4. Salvar recomendações
5. Enviar para Sabrina via WhatsApp

**Arquivo:** `n8n/workflows/production/07-recomendar-conteudo-ia.json`

### Workflow 08: Análise Preditiva de Métricas

**Trigger:** Cron (diário 19:00)

**Função:**

1. Buscar últimos 30 dias de métricas
2. Calcular tendências (CTR, CPC, crescimento)
3. IA predict próximos 7 dias
4. Identificar riscos (ex: "CPC vai aumentar 15%")
5. Gerar alertas preventivos
6. Enviar relatório preditivo

**Arquivo:** `n8n/workflows/production/08-analise-preditiva.json`

### Workflow 09: Dashboard Reels Fund Progress

**Trigger:** Cron (a cada 6 horas)

**Função:**

1. Consultar Instagram API (followers count)
2. Calcular progresso meta 900
3. Estimar ETA (dias restantes)
4. Atualizar `reels_fund_progress` table
5. Se > 900: 🎉 Notificar sucesso!
6. Dashboard mostra: 880/900 (97.7%) - ETA: 18 dias

**Arquivo:** `n8n/workflows/production/09-reels-fund-tracker.json`

**Dependências:**

- Instagram Graph API (ou scraping)
- Cálculos de tendência

### Workflow 10: Geração de Dicas de Produtos IA

**Trigger:** Webhook (Sabrina envia foto produto)

**Função:**

1. Receber imagem produto
2. OpenAI Vision API:

- Identificar produto
- Gerar 3-5 dicas de uso
- Tom: Honesto, testado por você

3. Formatar para Stories
4. Enviar para Sabrina

**Arquivo:** `n8n/workflows/production/10-dicas-produtos-ia.json`

### Workflow 11: Análise de Comentários (Sentiment)

**Trigger:** Cron (diário 20:00)

**Função:**

1. Buscar comentários últimos posts
2. IA sentiment analysis:

- Positivos/Negativos/Neutros
- Temas recorrentes
- Perguntas frequentes

3. Gerar insights
4. Sugerir temas para próximos posts

**Arquivo:** `n8n/workflows/production/11-analise-comentarios.json`

### Workflow 12-15: Extras (Backlog)

- Workflow 12: Backup automático Google Drive
- Workflow 13: Sync Google Sheets bidirecional
- Workflow 14: Competitor analysis (scraping)
- Workflow 15: A/B testing automático

## Fase 4: Estender Frontend

### 4.1 Nova página: Campanhas Meta Ads

**Arquivo:** `frontend/campanhas.html`

**Features:**

- Listar campanhas ativas
- Status (ativa/pausada/otimizada)
- Métricas por campanha (CTR, CPC, gasto)
- Botões: pausar/ativar manual
- Gráfico de performance
- Histórico de otimizações automáticas

### 4.2 Nova página: Conteúdo IA

**Arquivo:** `frontend/conteudo-ia.html`

**Features:**

- Histórico de legendas geradas
- Botão "Gerar nova legenda"
- Recomendações de temas (IA)
- Dicas de produtos geradas
- Copy to clipboard

### 4.3 Expandir Dashboard

**Arquivo:** `frontend/dashboard.html` (adicionar)

**Features:**

- Card "Progresso Reels Fund" (880/900 - 97.7%)
- Card "Previsão 7 dias" (análise preditiva)
- Card "Campanhas ativas" (resumo)
- Widget "Recomendações IA"

### 4.4 Nova página: Análises IA

**Arquivo:** `frontend/analises-ia.html`

**Features:**

- Análise preditiva (gráficos)
- Sentiment analysis comentários
- Tendências identificadas
- Insights acionáveis

## Fase 5: Integrações Externas

### 5.1 Meta Ads API

**Setup:**

- Criar Meta App em developers.facebook.com
- Obter access token
- Configurar permissions (ads_read, ads_management)
- Testar API calls

**Endpoints necessários:**

- GET /campaigns - Listar campanhas
- GET /adsets - Listar ad sets
- GET /ads - Listar ads
- POST /campaigns/{id} - Pausar/ativar
- PATCH /campaigns/{id} - Atualizar budget

### 5.2 OpenAI API

**Setup:**

- Criar conta OpenAI
- Gerar API key
- Configurar billing
- Testar GPT-4 e Vision API

**Modelos:**

- GPT-4 - Legendas, recomendações
- GPT-4 Vision - Análise de imagens produtos
- Whisper - Transcrição vídeos (futuro)

### 5.3 Claude API (Anthropic)

**Setup:**

- Criar conta Anthropic
- Gerar API key
- Testar Claude 3.5 Sonnet

**Uso:**

- Análises mais profundas
- Recomendações de conteúdo
- Sentiment analysis

### 5.4 Instagram Graph API

**Setup:**

- Conectar conta Instagram Business
- Obter long-lived access token
- Permissions: instagram_basic, instagram_manage_insights

**Endpoints:**

- GET /{user-id} - Followers count
- GET /{media-id}/comments - Comentários
- GET /{user-id}/media - Posts recentes

## Fase 6: Testing e Validação

### 6.1 Testes workflows n8n

Testar cada um dos 11 workflows:

- Execução manual (botão play)
- Validar inputs/outputs
- Verificar error handling
- Testar em ambiente dev primeiro

### 6.2 Testes integrações

- Meta Ads API → n8n → Backend
- OpenAI → n8n → WhatsApp
- Instagram API → Dashboard
- Backend → Frontend (novos endpoints)

### 6.3 Testes end-to-end

Fluxos completos:

1. Campanha underperforming → Auto-pausar → Notificar
2. Tema enviado → IA gerar legenda → Receber WhatsApp
3. 900 followers atingido → Celebração → Dashboard atualizado

## Fase 7: Documentação

### 7.1 Atualizar docs

- README.md - Mencionar 11 workflows IA
- n8n/README.md - Documentar novos workflows
- backend/README.md - Novos endpoints
- frontend/README.md - Novas páginas

### 7.2 Criar guias

- Como configurar Meta Ads API
- Como configurar OpenAI
- Como usar geração de legendas
- Como interpretar análises preditivas

## Estimativa

### Tempo Total: 40-60 horas

- Fase 1 (Análise): 4h
- Fase 2 (Backend): 8h
- Fase 3 (N8N workflows): 20h
- Fase 4 (Frontend): 10h
- Fase 5 (Integrações): 12h
- Fase 6 (Testing): 4h
- Fase 7 (Docs): 2h

### Priorização

**MVP (20h - 1 semana):**

- Workflow 05: Otimização campanhas
- Workflow 06: Legendas IA
- Workflow 09: Reels Fund tracker
- Frontend: Card Reels Fund no dashboard

**Fase 2 (20h - 1 semana):**

- Workflows 07, 08, 10, 11
- Páginas frontend novas
- Testes completos

**Backlog:**

- Workflows 12-15 extras
- Mobile app
- Advanced analytics

## Questões para o Usuário

Antes de começar a implementação, preciso saber:

1. Você tem acesso às APIs necessárias?

- Meta Ads API (access token)
- OpenAI API (key + billing)
- Claude API (key)
- Instagram Graph API (token)

2. Qual prioridade?

- a) Implementar tudo (40-60h)
- b) Apenas MVP (20h): Otimização + IA legendas + Reels Fund
- c) Apenas workflows n8n (sem backend/frontend)

3. Quer que eu comece agora ou prefere revisar o plano primeiro?

### To-dos

- [ ] Auditar código backend completo (8 APIs, utils, db) usando Exa Search e Context7
- [ ] Auditar código frontend completo (7 páginas HTML, 2 JS)
- [ ] Revisar 4 workflows n8n production
- [ ] Revisar documentação em docs/ identificar obsoletos
- [ ] Criar backend/__tests__/auth.test.js completo
- [ ] Criar backend/__tests__/metrics.test.js completo
- [ ] Criar backend/__tests__/webhook.test.js completo
- [ ] Criar testes para schedule, hooks, config APIs
- [ ] Refatorar backend: extrair queries duplicadas, melhorar error handling
- [ ] Refatorar frontend: componentes repetidos, loading states
- [ ] Remover código morto, imports não usados, console.logs
- [ ] Atualizar PRD com estado atual do projeto
- [ ] Atualizar OpenAPI specs (openapi.json/yaml)
- [ ] Melhorar todos READMEs (principal, backend, frontend, n8n)
- [ ] Testar manualmente todos 8 endpoints backend
- [ ] Testar manualmente todas 7 páginas frontend
- [ ] Testar integrações (Backend↔Frontend, n8n, Supabase)
- [ ] Testes de performance (100+ métricas, memory leaks)
- [ ] Auditoria de segurança completa (SQL injection, XSS, JWT, secrets)
- [ ] npm audit e atualizar dependências vulneráveis
- [ ] Corrigir todos problemas encontrados nas fases anteriores
- [ ] Validação final: todos testes passando, 0 linter errors
- [ ] Organização final: criar .archive/ para obsoletos, limpar tudo
- [ ] Gerar relatórios finais (testes, segurança, performance)
- [ ] Criar RELATORIO-AUDITORIA-COMPLETA.md e atualizar outros
- [ ] Checklist pre-deploy e validar configs Vercel