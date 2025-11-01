# ⚡ Quick Start - Automações IA em 30 Minutos
## Dashboard Sabrina Costa

**Tempo estimado:** 30 minutos  
**Pré-requisitos:** Backend e frontend deployados

---

## 🎯 Objetivo

Ter 3 workflows IA funcionando:
1. Monitor de Custos IA (proteção)
2. Reels Fund Tracker (tracking)
3. Gerar Legendas IA (conteúdo)

---

## 📋 Checklist Rápido

### ⏱️ Passo 1: Gemini Pro API (10 min)

```bash
✅ Acessar: https://aistudio.google.com/
✅ Login com Google
✅ "Get API Key"
✅ Copiar chave (AIza...)
✅ Adicionar ao backend/.env:
   GEMINI_API_KEY=AIza...
✅ Reiniciar backend (se rodando)
```

---

### ⏱️ Passo 2: Testar APIs (2 min)

```bash
cd scripts/test
node test-apis.js

# Esperar:
# ✅ Gemini Pro funcionando
# ✅ Evolution API funcionando
# ✅ Backend API funcionando
```

---

### ⏱️ Passo 3: Importar Workflows N8N (10 min)

**No seu N8N:**

1. Workflows → Import from File
2. Importar (nesta ordem):
   - `n8n/workflows/production/13-monitor-custos-ia.json`
   - `n8n/workflows/production/09-reels-fund-tracker.json`
   - `n8n/workflows/production/06-gerar-legendas-ia.json`

3. Para CADA workflow:
   - Configurar credenciais (API Auth, Evolution API, PostgreSQL)
   - Deixar INATIVO
   - Save

---

### ⏱️ Passo 4: Ativar Monitor Custos (1 min)

**Via WhatsApp:**
```
/ativar-monitor-custos
```

**OU via Frontend:**
```
configuracoes-automacao.html > Toggle "monitor-custos" ON
```

**Confirmação:** Receberá mensagem "Workflow ativado"

---

### ⏱️ Passo 5: Ativar Reels Fund Tracker (1 min)

**Via WhatsApp:**
```
/ativar-reels-fund-tracker
```

**Resultado:** Sistema começa a monitorar progresso 900 seguidores

---

### ⏱️ Passo 6: Testar Gerar Legenda (5 min)

**Via WhatsApp:**
```bash
# 1. Ativar
/ativar-gerar-legendas

# 2. Pedir legenda
/legenda Minha rotina de skincare matinal

# 3. Aguardar (15-30s)

# 4. Revisar legenda recebida

# 5. Aprovar
/aprovar-leg-123

# 6. Copiar e postar MANUALMENTE no Instagram
```

---

## ✅ Validação Final (1 min)

**Verificar via WhatsApp:**
```
/status
```

**Resposta esperada:**
```
📊 STATUS DOS WORKFLOWS

Ativos:
✅ processar-metricas
✅ alertas-whatsapp
✅ relatorio-diario
✅ lembrete-postagem
✅ monitor-custos-ia
✅ reels-fund-tracker
✅ gerar-legendas

Inativos:
❌ otimizar-campanhas
❌ busca-semanal-validacao

Total: 7/13 ativos
```

---

## 🎉 Pronto!

**Você agora tem:**

- ✅ Monitor de custos protegendo budget
- ✅ Tracking automático Reels Fund
- ✅ IA gerando legendas (com sua aprovação)
- ✅ Kill Switch disponível
- ✅ Custo: R$ 0/mês (Gemini gratuito)

---

## 💬 Comandos Essenciais

```bash
# Gerar legenda
/legenda {seu tema}

# Ver status
/status

# Ver gastos
/custos

# Emergência
/pausar-tudo
```

---

## 📚 Documentação

**Leia quando tiver tempo:**
- `master-plan.md` - Lista completa workflows
- `MANUAL-AUTOMACOES.md` - Guia detalhado
- `SEGURANCA-INSTAGRAM.md` - Evitar ban

---

## 🆘 Problemas?

**IA não gera legenda:**
- Verificar GEMINI_API_KEY no .env
- Testar: `node test-apis.js`
- Ver logs no N8N

**Não recebe WhatsApp:**
- Verificar Evolution API
- Testar: `curl EVOLUTION_URL/health`

**Kill Switch:**
```
/pausar-tudo
```

---

**Boa automação! 🚀**

**Tempo total:** ~30 minutos  
**Próximo passo:** Gerar 5-10 legendas na próxima semana

