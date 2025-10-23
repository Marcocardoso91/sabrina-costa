# 🚀 DEPLOY COMPLETO - 3 PASSOS SIMPLES

**Data:** 21 de Outubro de 2025  
**Tempo total:** 15-20 minutos

---

## ✅ PASSO 1: APLICAR SCHEMA NO SUPABASE (5 min)

### 1.1 Acesse o painel do Supabase:
```
https://supabase.com/dashboard/project/ddadyebnnbwqrjjtvgca
```

### 1.2 Vá em "SQL Editor" no menu lateral

### 1.3 Clique em "New Query"

### 1.4 Copie TODO o conteúdo do arquivo:
```
backend/db/schema.sql
```

### 1.5 Cole na query e clique em "RUN"

**✅ Resultado esperado:** 6 tabelas criadas + 50 ganchos inseridos + 2 usuários

---

## ✅ PASSO 2: CONFIGURAR VARIÁVEIS NO BACKEND (5 min)

### 2.1 Acesse seu projeto backend na Vercel:
```
https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables
```

### 2.2 Adicione estas variáveis (clique em "Add" para cada uma):

**Banco de Dados:**
```
DATABASE_URL
postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres
```

**JWT e Segurança:**
```
JWT_SECRET
ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=

JWT_EXPIRES_IN
7d

WEBHOOK_SECRET
57caa76b0e0ea535231231d8559c9c8f
```

**Servidor:**
```
PORT
3000

NODE_ENV
production
```

**CORS (ajustar conforme necessário):**
```
CORS_ORIGIN
https://sabrina-costa.vercel.app,https://sabrina-costa-frontend.vercel.app
```

**n8n:**
```
N8N_API_URL
https://fluxos.macspark.dev

N8N_API_KEY
sua_chave_n8n_aqui
```

**Evolution API (WhatsApp):**
```
EVOLUTION_API_URL
https://qrcode.macspark.dev

EVOLUTION_API_KEY
sua_chave_evolution_aqui

WHATSAPP_INSTANCE
sabrina-instance

WHATSAPP_NUMBER
+5531993676989
```

**Thresholds:**
```
CTR_MIN
1.5

CPC_MAX
0.70

CPM_MAX
10.0

FREQUENCY_MAX
3.0

COST_PER_FOLLOWER_MAX
1.30
```

**URLs:**
```
FRONTEND_URL
https://sabrina-costa.vercel.app

DASHBOARD_URL
https://sabrina-costa.vercel.app

TZ
America/Sao_Paulo

LOCALE
pt-BR

CURRENCY
BRL
```

### 2.3 Depois de adicionar TODAS as variáveis:
- Vá em "Deployments"
- Clique nos 3 pontinhos do último deployment
- Clique em "Redeploy"
- Aguarde 1-2 minutos

---

## ✅ PASSO 3: DEPLOY DO FRONTEND (5 min)

### Opção A: Via Web (Recomendado)

1. Acesse: https://vercel.com/new
2. Conecte o repositório: `Marcocardoso91/sabrina-costa`
3. Configure:
   - **Project Name:** `sabrina-costa`
   - **Framework Preset:** Other
   - **Root Directory:** `frontend`
   - **Build Command:** (deixe vazio)
   - **Output Directory:** `.`
   - **Install Command:** (deixe vazio)
4. Clique em **"Deploy"**
5. Aguarde 1-2 minutos

### Opção B: Via CLI (Alternativa)

```bash
cd frontend
npx vercel --prod
```

---

## 🎯 VERIFICAR SE ESTÁ FUNCIONANDO

### Backend:
```bash
# Testar health check
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health

# Testar login
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'
```

### Frontend:
Abra no navegador:
```
https://sabrina-costa.vercel.app
```

Faça login com:
- **Email:** gerente@macspark.dev
- **Senha:** Sabrina2025!

---

## 🤖 PRÓXIMO: CONFIGURAR N8N (Opcional - 10 min)

### 4.1 Acesse: https://fluxos.macspark.dev

### 4.2 Vá em Settings → Variables e adicione:

```
API_BASE_URL = https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
API_TOKEN = (gerar token JWT para o n8n)
WEBHOOK_SECRET = 57caa76b0e0ea535231231d8559c9c8f
EVOLUTION_API_URL = https://qrcode.macspark.dev
EVOLUTION_API_KEY = sua_chave_evolution
WHATSAPP_NUMBER = +5531993676989
WHATSAPP_INSTANCE = sabrina-instance
DASHBOARD_URL = https://sabrina-costa.vercel.app
```

### 4.3 Importar workflows:

Vá em "Workflows" → "Import from File" e importe os 4 arquivos:
1. `n8n/workflows/01-receber-metricas.json`
2. `n8n/workflows/02-alertas-whatsapp.json`
3. `n8n/workflows/03-relatorio-diario.json`
4. `n8n/workflows/04-lembretes-postagem.json`

### 4.4 Ativar cada workflow

---

## ✅ CHECKLIST FINAL

- [ ] Schema aplicado no Supabase (6 tabelas criadas)
- [ ] Variáveis configuradas no backend Vercel
- [ ] Backend redployado
- [ ] Frontend deployado
- [ ] Login funciona no frontend
- [ ] Dashboard carrega
- [ ] (Opcional) Workflows n8n importados
- [ ] (Opcional) WhatsApp testado

---

## 🎉 PRONTO!

Seu Dashboard Sabrina Costa estará 100% funcional!

**URLs finais:**
- Frontend: https://sabrina-costa.vercel.app
- Backend: https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
- Banco: db.ddadyebnnbwqrjjtvgca.supabase.co

---

**Usuários de teste:**
1. **Admin:** gerente@macspark.dev / Sabrina2025!
2. **Viewer:** sabrina@example.com / Sabrina2025!

---

**Dúvidas?** Leia `README.md` ou `docs/DEPLOY.md`

