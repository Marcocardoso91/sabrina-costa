# 🚀 DEPLOY MANUAL ATUALIZADO - Dashboard Sabrina Costa

## ✅ Status Atual:
- ✅ **Backend URL:** https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
- ⚠️ **Backend:** Deployado mas precisa configurar variáveis de ambiente
- ❌ **Frontend:** Precisa fazer deploy manual

## 📋 CONFIGURAR BACKEND (URGENTE):

### 1️⃣ Acesse: https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables

### 2️⃣ Adicione estas variáveis (uma por uma):

```
DATABASE_URL
postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres

JWT_SECRET
ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=

JWT_EXPIRES_IN
7d

API_SERVICE_TOKEN
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here

PORT
3000

NODE_ENV
production

CORS_ORIGIN
http://localhost:3000,https://sabrina-costa.vercel.app,https://sabrina-costa-frontend.vercel.app

WEBHOOK_SECRET
57caa76b0e0ea535231231d8559c9c8f

N8N_API_URL
https://fluxos.macspark.dev

N8N_API_KEY
your_n8n_api_key_here

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

EVOLUTION_API_URL
https://qrcode.macspark.dev

EVOLUTION_API_KEY
your_evolution_api_key

WHATSAPP_INSTANCE
sabrina-instance

WHATSAPP_NUMBER
+5531993676989

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

### 3️⃣ Após adicionar as variáveis, faça um novo deploy:
- Vá em **Deployments**
- Clique em **"Redeploy"** no último deployment

---

## 🎨 DEPLOY DO FRONTEND:

### 1️⃣ Acesse: https://vercel.com/new

### 2️⃣ Importe o repositório:
- **GitHub:** `Marcocardoso91/sabrina-costa`
- **Framework Preset:** `Other`
- **Root Directory:** `frontend`

### 3️⃣ Configure:
- **Project Name:** `sabrina-costa`
- **Build Command:** (deixe vazio)
- **Output Directory:** `.`
- **Install Command:** (deixe vazio)

### 4️⃣ Deploy:
- Clique em **"Deploy"**
- Aguarde ~1 minuto

---

## 🎯 URLs FINAIS:

Após completar os deploys:
- **Backend:** https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
- **Frontend:** https://sabrina-costa.vercel.app (ou similar)

---

## 📲 PRÓXIMO PASSO: CONFIGURAR N8N:

### 1️⃣ Acesse: https://fluxos.macspark.dev

### 2️⃣ Vá em Settings → Variables

### 3️⃣ Adicione estas variáveis:
```
API_BASE_URL = https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
EVOLUTION_API_URL = https://qrcode.macspark.dev
EVOLUTION_API_KEY = your_evolution_api_key
WHATSAPP_NUMBER = +5531993676989
WHATSAPP_INSTANCE = sabrina-instance
WEBHOOK_SECRET = 57caa76b0e0ea535231231d8559c9c8f
DASHBOARD_URL = https://sabrina-costa.vercel.app
API_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here
```

### 4️⃣ Importe os workflows:
- Importe os 4 arquivos da pasta `n8n/workflows/`
- Ative cada workflow

---

## 🎉 PRONTO!

Seu sistema estará 100% funcional! 🚀

**Me avise quando terminar cada etapa!** 😊
