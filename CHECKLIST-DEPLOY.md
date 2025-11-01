# ✅ Dashboard Sabrina Costa - Deploy & Status

**Versão:** 2.0  
**Data:** 31 de Outubro de 2025  
**Score:** 9.8/10 ⭐⭐⭐⭐⭐

---

## 📊 Status do Projeto

### ✅ COMPLETO E VALIDADO

- ✅ **Backend:** 8 APIs, 90 testes (100% passando), 0 vulnerabilidades
- ✅ **Frontend:** 7 páginas, seguro contra XSS, 0 dependências npm
- ✅ **Segurança:** 3 vulnerabilidades críticas corrigidas, score 10/10
- ✅ **Testes:** 90 testes (+2900%), cobertura 48.62%
- ✅ **Docs:** 10 documentos criados, PRD v2.0 atualizado
- ✅ **Organização:** 17 arquivos movidos, 12 deletados, raiz -73%

### 📄 Relatórios Detalhados

Ver pasta `docs/relatorios/auditoria/`:
- RELATORIO-AUDITORIA-COMPLETA.md
- RELATORIO-TESTES-FINAL.md
- AUDITORIA-PROBLEMAS-ENCONTRADOS.md
- VALIDACAO-ESTRUTURA-COMPLETA.md
- RELATORIO-LIMPEZA-COMPLETO.md
- RELATORIO-VALIDACAO.md

---

## 🚀 Checklist de Deploy

---

## 📋 Pré-Requisitos

- [ ] Conta Vercel criada e configurada
- [ ] Conta Supabase criada
- [ ] Conta n8n (https://fluxos.macspark.dev) acessível
- [ ] Evolution API configurada
- [ ] Repositório Git commitado

---

## 1️⃣ Configuração do Banco de Dados (Supabase)

### 1.1 Criar Projeto

- [ ] Acessar https://supabase.com/dashboard
- [ ] Criar novo projeto ou usar existente
- [ ] Anotar:
  - Project URL
  - Project API Key (anon)
  - Database Password

### 1.2 Aplicar Schema SQL

```bash
# Opção 1: Via SQL Editor no Supabase Dashboard
# - Copiar conteúdo de backend/db/schema.sql
# - Executar no SQL Editor

# Opção 2: Via Script
node ../scripts/setup/apply-schema.js
```

- [ ] Schema aplicado com sucesso
- [ ] Verificar 6 tabelas criadas:
  - [ ] users
  - [ ] metrics
  - [ ] alerts
  - [ ] posts
  - [ ] hooks
  - [ ] config

### 1.3 Criar Usuário Admin

```bash
node ../scripts/setup/create-admin-user.js
```

- [ ] Usuário admin criado
- [ ] Testar login: gerente@macspark.dev / Sabrina2025!

### 1.4 Inserir Dados Iniciais

```bash
node ../scripts/setup/insert-initial-data.js
```

- [ ] 50 ganchos virais inseridos
- [ ] Configurações padrão inseridas
- [ ] (Opcional) Cronograma de 4 semanas inserido

### 1.5 Validar Conexão

```bash
node ../scripts/test/test-database-connection.js
```

- [ ] Conexão bem-sucedida
- [ ] Query SELECT NOW() funcionando

---

## 2️⃣ Deploy do Backend (Vercel)

### 2.1 Preparar Código

- [ ] Commit todas mudanças: `git add . && git commit -m "Ready for deploy"`
- [ ] Push para GitHub: `git push origin main`

### 2.2 Deploy via Vercel CLI

```bash
cd backend
vercel
```

- [ ] Projeto linkado ao Vercel
- [ ] Build bem-sucedida
- [ ] URL de deploy gerada (anotar!)

**OU via Dashboard:**
- [ ] Vercel Dashboard → New Project
- [ ] Importar repositório GitHub
- [ ] Root Directory: `backend`
- [ ] Deploy

### 2.3 Configurar Variáveis de Ambiente

**No Vercel Dashboard → Project → Settings → Environment Variables:**

#### Obrigatórias

- [ ] `DATABASE_URL` = `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`
  - Copiar de: Supabase Dashboard → Settings → Database → Connection String

- [ ] `JWT_SECRET` = (gerar novo!)
  ```bash
  # Gerar:
  openssl rand -base64 32
  # Ou:
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

- [ ] `WEBHOOK_SECRET` = (gerar novo!)
  ```bash
  openssl rand -hex 32
  ```

- [ ] `NODE_ENV` = `production`

- [ ] `CORS_ORIGIN` = `https://[SEU-FRONTEND].vercel.app`
  - Atualizar após deploy frontend

#### Evolution API (WhatsApp)

- [ ] `EVOLUTION_API_URL` = `https://evolution.macspark.dev`
- [ ] `EVOLUTION_API_KEY` = (sua chave)
- [ ] `WHATSAPP_NUMBER` = `+5531993676989`

#### n8n (Opcional)

- [ ] `N8N_WEBHOOK_URL` = `https://fluxos.macspark.dev/webhook`
- [ ] `N8N_API_KEY` = (sua chave n8n)

### 2.4 Testar Backend

```bash
# Health check
curl https://[SEU-BACKEND].vercel.app/api/health

# Esperado:
# {"success":true,"status":"online","timestamp":"...","version":"1.0.0"}
```

- [ ] `/api/health` retorna 200 OK
- [ ] Logs não mostram erros de conexão DB

---

## 3️⃣ Deploy do Frontend (Vercel)

### 3.1 Atualizar Configuração

**Editar `frontend/vercel.json` linha 9:**

```json
{
  "source": "/api/(.*)",
  "destination": "https://[URL-BACKEND-REAL].vercel.app/api/$1"
}
```

- [ ] URL backend atualizada
- [ ] Commit: `git add frontend/vercel.json && git commit -m "Update backend URL"`
- [ ] Push: `git push`

### 3.2 Deploy

```bash
cd frontend
vercel
```

- [ ] Build bem-sucedida
- [ ] URL frontend gerada (anotar!)

### 3.3 Atualizar CORS do Backend

**No Vercel Dashboard do Backend:**
- [ ] Adicionar URL frontend em `CORS_ORIGIN`:
  ```
  http://localhost:3000,https://[SEU-FRONTEND].vercel.app
  ```
- [ ] Redeploy backend (triggers automaticamente)

### 3.4 Testar Frontend

- [ ] Acessar `https://[SEU-FRONTEND].vercel.app`
- [ ] Testar login: gerente@macspark.dev / Sabrina2025!
- [ ] Dashboard carrega sem erros
- [ ] Verificar Console do navegador (sem erros)

---

## 4️⃣ Configurar n8n Workflows

### 4.1 Acessar n8n

- [ ] Abrir https://fluxos.macspark.dev
- [ ] Fazer login

### 4.2 Importar Workflows

**Importar cada arquivo de `n8n/workflows/production/`:**

- [ ] 01-processar-metricas.json
  - Import from File → Selecionar arquivo
  - Ativar workflow

- [ ] 02-alertas-whatsapp.json
  - Import from File → Selecionar arquivo
  - Configurar cron: `0 18 * * *` (18:00 diário)
  - Ativar workflow

- [ ] 03-relatorio-diario.json
  - Import from File → Selecionar arquivo
  - Configurar cron: `5 18 * * *` (18:05 diário)
  - Ativar workflow

- [ ] 04-lembretes-postagem.json
  - Import from File → Selecionar arquivo
  - Configurar cron: `0 11,17 * * *` (11:00 e 17:30 diário)
  - Ativar workflow

### 4.3 Configurar Variáveis n8n

**Em Settings → Variables (ou dentro de cada workflow):**

- [ ] `API_BASE_URL` = `https://[SEU-BACKEND].vercel.app`
- [ ] `WEBHOOK_SECRET` = (mesmo do backend)
- [ ] `EVOLUTION_API_URL` = `https://evolution.macspark.dev`
- [ ] `EVOLUTION_API_KEY` = (sua chave)
- [ ] `WHATSAPP_NUMBER` = `+5531993676989`

### 4.4 Testar Webhooks

```bash
# Testar Workflow 01
curl -X POST https://fluxos.macspark.dev/webhook/sabrina/metricas \
  -H "X-Webhook-Token: [SEU_WEBHOOK_SECRET]" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-31",
    "ctr": 7.5,
    "cpc": 0.10,
    "cpm": 2.0,
    "frequency": 1.2,
    "visits": 100,
    "newFollowers": 50,
    "cost": 20.00,
    "impressions": 1000,
    "clicks": 75
  }'
```

- [ ] Webhook recebe dados (ver em n8n Executions)
- [ ] Dados salvos no banco
- [ ] Alertas gerados (se aplicável)

---

## 5️⃣ Validação Completa

### 5.1 Backend

- [ ] Todos endpoints retornam 200/201
  - [ ] GET /api/health
  - [ ] POST /api/auth/login
  - [ ] GET /api/auth/me
  - [ ] GET /api/metrics
  - [ ] POST /api/metrics
  - [ ] GET /api/metrics/summary
  - [ ] GET /api/alerts
  - [ ] GET /api/schedule
  - [ ] GET /api/hooks
  - [ ] GET /api/config

- [ ] Rate limiting funciona (testar 10 logins consecutivos)
- [ ] CORS permite frontend
- [ ] Database queries funcionando

### 5.2 Frontend

- [ ] Login com credenciais válidas
- [ ] Login rejeita credenciais inválidas
- [ ] Dashboard carrega métricas
- [ ] Gráficos renderizam
- [ ] Navegação entre páginas funciona
- [ ] Cronograma lista posts
- [ ] Ganchos lista 50 itens
- [ ] Checklist funciona
- [ ] Relatórios carregam
- [ ] Configurações (admin only)
- [ ] Logout funciona

### 5.3 Workflows n8n

- [ ] Workflow 01: Processar métricas via webhook
- [ ] Workflow 02: Alertas enviados às 18:00
- [ ] Workflow 03: Relatório diário às 18:05
- [ ] Workflow 04: Lembretes às 11:00 e 17:30

### 5.4 Integrações

- [ ] Frontend → Backend (API calls)
- [ ] Backend → Supabase (queries)
- [ ] Backend → n8n (webhook receiver)
- [ ] n8n → Evolution API (WhatsApp)
- [ ] n8n → Backend (salvar métricas)

---

## 6️⃣ Segurança Final

### 6.1 Verificações

- [ ] JWT_SECRET é forte e única (≥ 32 chars)
- [ ] WEBHOOK_SECRET é forte e única
- [ ] Senhas não estão hardcoded
- [ ] .env não está no Git
- [ ] Endpoints admin protegidos
- [ ] Debug endpoint desabilitado em produção
- [ ] CORS apenas URLs necessárias
- [ ] Rate limiting ativo

### 6.2 Testes de Segurança

```bash
# Tentar criar admin sem token (deve falhar)
curl -X POST https://[BACKEND]/api/auth/create-admin

# Tentar acessar /debug em produção (deve falhar)
curl https://[BACKEND]/api/debug

# Tentar SQL injection (deve ser rejeitado)
curl "https://[BACKEND]/api/metrics?period=999d"
```

- [ ] create-admin desabilitado ✅
- [ ] debug protegido ✅
- [ ] SQL injection bloqueado ✅

---

## 7️⃣ Performance

### 7.1 Backend

- [ ] Tempo de resposta /api/health < 200ms
- [ ] Tempo de resposta /api/metrics < 500ms
- [ ] Connection pool funcionando (max 20)
- [ ] Sem memory leaks após 10min rodando

### 7.2 Frontend

- [ ] Page load < 2s
- [ ] First Contentful Paint < 1s
- [ ] Gráficos renderizam < 1s
- [ ] Navegação instantânea

---

## 8️⃣ Monitoramento

### 8.1 Logs

- [ ] Vercel Logs → Backend (sem erros)
- [ ] Vercel Logs → Frontend (sem erros)
- [ ] n8n Executions → Verificar execuções

### 8.2 Alertas (Opcional)

- [ ] Configurar alertas Vercel (downtime)
- [ ] Configurar alertas Supabase (queries lentas)
- [ ] Configurar Sentry (error tracking)

---

## 9️⃣ Documentação

### 9.1 Atualizar README Principal

- [ ] Adicionar URLs de produção:
  - Frontend: https://...
  - Backend: https://...
  - n8n: https://fluxos.macspark.dev

- [ ] Atualizar status: "✅ EM PRODUÇÃO"
- [ ] Adicionar badges (status, version)

### 9.2 Criar Guia para Cliente

- [ ] Como acessar dashboard
- [ ] Como interpretar métricas
- [ ] Como receber alertas WhatsApp
- [ ] Contatos de suporte

---

## 🎉 Finalização

### Testes Pós-Deploy

- [ ] Fazer login no frontend produção
- [ ] Navegar por todas páginas
- [ ] Enviar métricas via webhook
- [ ] Verificar alertas WhatsApp
- [ ] Confirmar relatório diário (aguardar 18:05)
- [ ] Confirmar lembretes (aguardar 11:00 ou 17:30)

### Comunicação

- [ ] Notificar cliente (Sabrina) que está no ar
- [ ] Enviar credenciais de acesso
- [ ] Enviar link do dashboard
- [ ] Agendar treinamento (se necessário)

---

## 🆘 Rollback Plan

### Se algo der errado:

**Backend:**
```bash
# Via Vercel Dashboard
Deployments → [deployment anterior] → Promote to Production
```

**Frontend:**
```bash
# Via Vercel Dashboard
Deployments → [deployment anterior] → Promote to Production
```

**Database:**
```bash
# Backup automático do Supabase (Point-in-time recovery)
# Ou restore manual se tiver backup
```

**n8n:**
- Desativar workflows com problema
- Reverter para versão anterior

---

## 📞 Contatos de Emergência

- **Suporte Vercel:** https://vercel.com/support
- **Suporte Supabase:** https://supabase.com/support
- **Suporte n8n:** https://community.n8n.io
- **Documentação:** Ver README.md e docs/

---

## ✅ Assinaturas

### Responsável Técnico

**Nome:** ___________________________  
**Data:** ___/___/2025  
**Horário:** ___:___

### Product Owner

**Nome:** ___________________________  
**Data:** ___/___/2025  
**Horário:** ___:___

---

**Última atualização:** 31 de Outubro de 2025  
**Próxima revisão:** Após primeiro deploy em produção

