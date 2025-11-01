# ✅ Como Testar - Guia Prático Imediato
## Sistema de Automações IA

**Tempo total:** 30-45 minutos  
**Objetivo:** Validar tudo que foi implementado

---

## 🎯 O Que Você Vai Testar

1. ✅ Páginas frontend novas
2. ✅ APIs de automação e custos
3. ✅ Script de teste de APIs
4. ✅ Workflows N8N (estrutura)
5. ✅ Documentação

---

## 📋 TESTE 1: Páginas Frontend (5 min)

### A. Testar Configurações de Automação

**Executar backend (se não estiver rodando):**
```bash
cd backend
npm start
```

**Abrir no navegador:**
```
http://localhost:3000
ou
https://seu-dominio.vercel.app/configuracoes-automacao.html
```

**Validar:**
- [ ] Página carrega sem erros
- [ ] Lista de workflows aparece
- [ ] Kill Switch (botão vermelho) visível
- [ ] Monitor de custos IA aparece (pode estar em 0%)
- [ ] Toggles funcionam (ON/OFF)
- [ ] Seletor de modo funciona (Manual/Semi/Auto)

**Esperado:** Página profissional, sem erros console

---

### B. Testar Aprovações

**Abrir:**
```
http://localhost:3000/aprovacoes.html
ou
https://seu-dominio.vercel.app/aprovacoes.html
```

**Validar:**
- [ ] Página carrega
- [ ] Tabs (Pendentes/Histórico) funcionam
- [ ] Mostra "Nenhuma aprovação pendente" (normal - ainda não usou)

**Esperado:** Interface limpa, sem erros

---

## 📋 TESTE 2: APIs Backend (10 min)

### Testar via Postman ou cURL

**Pré-requisito:** Fazer login e obter token JWT

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu-email@example.com",
    "password": "sua-senha"
  }'

# Copiar o "token" da resposta
```

### A. Testar API de Automações

```bash
# Listar workflows
curl http://localhost:3000/api/automations \
  -H "Authorization: Bearer SEU_TOKEN"

# Esperado: Lista com 13 workflows
```

**Validar resposta:**
```json
{
  "success": true,
  "workflows": [
    {
      "workflow_name": "processar-metricas",
      "enabled": false,
      "automation_mode": "auto",
      "requires_approval": false,
      ...
    },
    ... (13 workflows total)
  ],
  "total": 13
}
```

### B. Testar API de Custos IA

```bash
# Ver custos do mês
curl http://localhost:3000/api/ai-costs/current-month \
  -H "Authorization: Bearer SEU_TOKEN"

# Esperado: R$ 0 (ainda não usou IA)
```

**Validar resposta:**
```json
{
  "success": true,
  "budget_brl": 50,
  "current_cost_brl": "0.0000",
  "percent_used": "0.00",
  "status": "ok",
  ...
}
```

### C. Testar Kill Switch (NÃO EXECUTE SE TEM WORKFLOWS ATIVOS!)

```bash
# Ver estatísticas antes
curl http://localhost:3000/api/automations/stats/overview \
  -H "Authorization: Bearer SEU_TOKEN"

# Kill switch (apenas se quiser testar - desliga tudo)
# curl -X POST http://localhost:3000/api/automations/kill-switch \
#   -H "Authorization: Bearer SEU_TOKEN"
```

---

## 📋 TESTE 3: Script de Teste de APIs (2 min)

**Executar:**

```bash
cd scripts/test
node test-apis.js
```

**Resultado Esperado (sem APIs configuradas ainda):**

```
🧪 TESTE DE APIS - Dashboard Sabrina Costa
============================================================

1️⃣  Testando Gemini Pro (Google AI)...
   ⚠️  GEMINI_API_KEY não configurada
   ℹ️  Configure em: https://aistudio.google.com/

2️⃣  Testando Meta Ads API...
   ⚠️  META_ADS_ACCESS_TOKEN não configurada

3️⃣  Testando Instagram Graph API...
   ⚠️  INSTAGRAM_ACCESS_TOKEN não configurada

4️⃣  Testando Evolution API (WhatsApp)...
   ✅ Evolution API funcionando

5️⃣  Testando Backend API...
   ✅ Backend API funcionando (ou ⚠️ se não iniciou)

📊 RESULTADO: 1-2/5 APIs funcionando
```

**Status:** ✅ Normal! Você ainda vai configurar as APIs.

---

## 📋 TESTE 4: Workflows N8N (10 min)

### Verificar Arquivos

```bash
# Listar workflows criados
cd n8n/workflows/production
ls -la *.json | grep -E "(05|06|09|12|13)-"
```

**Esperado:**
```
05-otimizar-campanhas.json
06-gerar-legendas-ia.json
09-reels-fund-tracker.json
12-busca-semanal-validacao.json
13-monitor-custos-ia.json
```

### Validar JSON

```bash
# Verificar se JSONs são válidos
node -e "console.log(JSON.parse(require('fs').readFileSync('13-monitor-custos-ia.json', 'utf8')).name)"
```

**Esperado:** `13 - Monitor Custos IA`

### Tentar Importar (Opcional)

Se tiver N8N rodando:
1. Acessar N8N
2. Workflows → Import from File
3. Selecionar `13-monitor-custos-ia.json`
4. Ver se importa sem erros
5. **NÃO ATIVAR** ainda

---

## 📋 TESTE 5: Documentação (5 min)

### Verificar Arquivos Criados

```bash
cd docs/automations
ls -la
```

**Esperado (8 arquivos):**
```
COMO-TESTAR-AGORA.md
CONFIGURAR-APIS.md
MANUAL-AUTOMACOES.md
master-plan.md
QUICK-START.md
RELATORIO-SPRINT-1.md
RESUMO-IMPLEMENTACAO.md
SEGURANCA-INSTAGRAM.md
SPRINT-1-COMPLETA.md
```

### Ler Documentos Principais

**Abrir e verificar se fazem sentido:**

1. **master-plan.md** - Lista de 13 workflows
2. **MANUAL-AUTOMACOES.md** - Guia de uso
3. **QUICK-START.md** - Como começar em 30 min

**Validar:** Documentos bem formatados, sem erros, completos

---

## 📋 TESTE 6: Banco de Dados (5 min)

### Verificar Tabelas Criadas

**Conectar ao PostgreSQL e executar:**

```sql
-- Ver tabelas de automação
SELECT tablename 
FROM pg_tables 
WHERE tablename IN (
  'automation_controls',
  'approval_queue',
  'ai_usage_tracking',
  'weekly_plan_updates',
  'content_generated'
)
ORDER BY tablename;
```

**Esperado:** 5 tabelas listadas

### Verificar Seeds

```sql
-- Ver workflows seeded
SELECT workflow_name, enabled, automation_mode, requires_approval
FROM automation_controls
ORDER BY workflow_name;
```

**Esperado:** 13 workflows, todos `enabled = FALSE` (desligados por padrão)

---

## ✅ CHECKLIST DE VALIDAÇÃO FINAL

### Backend
- [ ] Schema SQL tem 5 tabelas novas
- [ ] API `/api/automations` retorna 13 workflows
- [ ] API `/api/ai-costs/current-month` retorna budget R$ 50
- [ ] 90 testes passando (executar `npm test`)

### Frontend  
- [ ] configuracoes-automacao.html carrega
- [ ] aprovacoes.html carrega
- [ ] Kill Switch visível
- [ ] Monitor custos visível

### Workflows N8N
- [ ] 5 arquivos JSON criados (05, 06, 09, 12, 13)
- [ ] JSONs válidos (sem erro de sintaxe)
- [ ] Importáveis no N8N (testar pelo menos 1)

### Documentação
- [ ] 8 arquivos em docs/automations/
- [ ] master-plan.md lista 13 workflows
- [ ] MANUAL-AUTOMACOES.md tem instruções claras
- [ ] QUICK-START.md tem passos práticos

### Script
- [ ] scripts/test/test-apis.js existe
- [ ] Executa sem erro (pode avisar que APIs não configuradas)

---

## 🎯 RESULTADO ESPERADO

**Se TUDO acima está OK:**
✅ Sprint 1 validada com sucesso!

**Próximo passo:**
1. Configurar Gemini Pro API
2. Importar workflows no N8N
3. Ativar gradualmente
4. Usar por 1-2 semanas

**Depois:**
- Decidir se quer os 4 workflows restantes
- Decidir se quer bot WhatsApp dedicado
- Decidir se quer outras features

---

## ❓ Problemas?

### Frontend não carrega
```bash
# Verificar se backend está rodando
cd backend
npm start

# Verificar em http://localhost:3000/api/health
```

### API retorna 404
```bash
# Verificar se rotas foram registradas
cat backend/server.js | grep "automations"

# Deve conter:
# const automationsRoutes = require('./api/automations');
# app.use('/api/automations', automationsRoutes);
```

### Tabelas não existem
```bash
# Executar schema SQL no banco
psql -d seu_banco -f backend/db/schema.sql
```

---

## 📞 Próximos Passos Após Testes

**Se tudo funcionou:**
1. ⏳ Configurar Gemini Pro (QUICK-START.md)
2. ⏳ Importar workflows no N8N
3. ⏳ Ativar e usar por 1 semana
4. ⏳ Depois decidir se implementa os 4 restantes

**Se algo não funcionou:**
1. Me avisar qual teste falhou
2. Ver logs de erro
3. Consultar troubleshooting no manual

---

**Boa sorte nos testes! 🚀**

**Qualquer dúvida, consulte:** `MANUAL-AUTOMACOES.md`

