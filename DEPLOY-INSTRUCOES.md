# 🚀 INSTRUÇÕES DE DEPLOY - Dashboard Sabrina Costa

## 📋 DEPLOY DO BACKEND

### 1️⃣ Acesse e Faça Upload

1. Abra: https://vercel.com/new
2. Clique em **"Upload Folder"** ou arraste a pasta `backend` inteira
3. Configure:
   - **Project Name**: `sabrina-costa-backend`
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)
   - **Install Command**: `npm install`

### 2️⃣ Adicione as Variáveis de Ambiente

Clique em "Environment Variables" e adicione uma por uma:

```
DATABASE_URL
postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres

JWT_SECRET
rUJv7+0OcFjmZgPEMt8LNmsNX/+i/Q69r3PReoTCtLA=

JWT_EXPIRES_IN
7d

API_SERVICE_TOKEN
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoibjhuIiwidHlwZSI6InNlcnZpY2UiLCJpYXQiOjE3NjA5OTQ2MDMsImV4cCI6MTc5MjUzMDYwM30.YF3dPhk56gGmAAZUqVV4JwZpIGzIKMGONXNqGHxketI

PORT
3000

NODE_ENV
production

CORS_ORIGIN
http://localhost:3000,https://sabrina-costa.vercel.app,https://sabrina-costa-frontend.vercel.app

WEBHOOK_SECRET
dDSZOjpUwqZiKeLXG9E9dbbKFK9Y2chAcg7a1wSF32A=

N8N_API_URL
https://fluxos.macspark.dev

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
buscEhfJ0H04QsSS4+aTq8ilcH4PSe7/DaZX6cR+tqg=

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

### 3️⃣ Clique em Deploy

Aguarde ~2 minutos. Quando terminar, copie a URL do backend.

---

## 🎨 DEPLOY DO FRONTEND

### 1️⃣ Acesse e Faça Upload

1. Abra: https://vercel.com/new (em nova aba)
2. Clique em **"Upload Folder"** ou arraste a pasta `frontend` inteira
3. Configure:
   - **Project Name**: `sabrina-costa` (ou `sabrina-costa-frontend`)
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio)
   - **Output Directory**: `.`
   - **Install Command**: (deixe vazio)

### 2️⃣ NÃO precisa adicionar variáveis de ambiente

### 3️⃣ Clique em Deploy

Aguarde ~1 minuto. Quando terminar, você terá seu dashboard no ar!

---

## ✅ URLs FINAIS

Após os deploys, você terá:

- **Frontend**: https://sabrina-costa.vercel.app (ou similar)
- **Backend**: https://sabrina-costa-backend.vercel.app (ou similar)

---

## 📲 PRÓXIMO PASSO: CONFIGURAR N8N

Depois dos deploys, configure o n8n:

### 1️⃣ Acesse https://fluxos.macspark.dev

### 2️⃣ Vá em Settings → Variables (ou Configurações → Variáveis)

### 3️⃣ Adicione estas variáveis:

```
API_BASE_URL = https://sabrina-costa-backend.vercel.app
EVOLUTION_API_URL = https://qrcode.macspark.dev
EVOLUTION_API_KEY = buscEhfJ0H04QsSS4+aTq8ilcH4PSe7/DaZX6cR+tqg=
WHATSAPP_NUMBER = +5531993676989
WHATSAPP_INSTANCE = sabrina-instance
WEBHOOK_SECRET = dDSZOjpUwqZiKeLXG9E9dbbKFK9Y2chAcg7a1wSF32A=
DASHBOARD_URL = https://sabrina-costa.vercel.app
API_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoibjhuIiwidHlwZSI6InNlcnZpY2UiLCJpYXQiOjE3NjA5OTQ2MDMsImV4cCI6MTc5MjUzMDYwM30.YF3dPhk56gGmAAZUqVV4JwZpIGzIKMGONXNqGHxketI
```

**IMPORTANTE**: Substitua `https://sabrina-costa-backend.vercel.app` pela URL real do seu backend!

### 4️⃣ Importe os workflows

1. Vá em **Workflows** → **Import from File**
2. Importe os 4 arquivos da pasta `n8n/workflows/`:
   - `01-receber-metricas.json`
   - `02-alertas-whatsapp.json`
   - `03-relatorio-diario.json`
   - `04-lembretes-postagem.json`

3. Para cada workflow importado:
   - Abra o workflow
   - Clique em **"Active"** (toggle no canto superior direito)

### 5️⃣ Teste o sistema

1. Acesse https://sabrina-costa.vercel.app
2. Faça login com:
   - Email: `gerente@macspark.dev`
   - Senha: `Sabrina2025!`

3. Teste enviar métricas via webhook do n8n

---

## 🎯 PRONTO!

Seu sistema está completo e rodando! 🎉

Se tiver dúvidas, me chame!
