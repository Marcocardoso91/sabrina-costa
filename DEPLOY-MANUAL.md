# 🚀 Deploy Manual na Vercel

## ✅ O que já está pronto:

- ✅ **Backend:** Código 100% funcional
- ✅ **Frontend:** Código 100% funcional  
- ✅ **Banco:** Supabase configurado e funcionando
- ✅ **Conexão:** Testada e validada

## 📋 Deploy Backend na Vercel:

### **1. Acesse:** https://vercel.com/new

### **2. Importe o repositório:**
- **GitHub:** `Marcocardoso91/sabrina-costa`
- **Framework Preset:** `Other`
- **Root Directory:** `backend`

### **3. Configure as variáveis de ambiente:**
```
DATABASE_URL=postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
JWT_EXPIRES_IN=7d
API_SERVICE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here
PORT=3000
NODE_ENV=production
CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f
N8N_API_URL=https://fluxos.macspark.dev
N8N_API_KEY=your_n8n_api_key_here
CTR_MIN=1.5
CPC_MAX=0.70
CPM_MAX=10.0
FREQUENCY_MAX=3.0
COST_PER_FOLLOWER_MAX=1.30
EVOLUTION_API_URL=https://qrcode.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key
WHATSAPP_INSTANCE=sabrina-instance
WHATSAPP_NUMBER=+5531993676989
FRONTEND_URL=https://sabrina-costa.vercel.app
DASHBOARD_URL=https://sabrina-costa.vercel.app
TZ=America/Sao_Paulo
LOCALE=pt-BR
CURRENCY=BRL
```

### **4. Deploy:**
- Clique em **"Deploy"**
- Aguarde o build (2-3 minutos)
- **Anote a URL** que será gerada (ex: `https://sabrina-costa-backend.vercel.app`)

## 📋 Deploy Frontend na Vercel:

### **1. Acesse:** https://vercel.com/new

### **2. Importe o repositório:**
- **GitHub:** `Marcocardoso91/sabrina-costa`
- **Framework Preset:** `Other`
- **Root Directory:** `frontend`

### **3. Deploy:**
- Clique em **"Deploy"**
- Aguarde o build (1-2 minutos)
- **Anote a URL** que será gerada (ex: `https://sabrina-costa.vercel.app`)

## 🎯 Próximos Passos:

1. **Fazer ambos os deploys**
2. **Me informar as URLs** geradas
3. **Configurar n8n** com as URLs
4. **Testar integração** completa

## ⏱️ Tempo estimado: 10-15 minutos

---

**Depois dos deploys, me responda com:**
```
✅ "Backend deployado"
BACKEND_URL: https://sabrina-costa-backend.vercel.app

✅ "Frontend deployado"  
FRONTEND_URL: https://sabrina-costa.vercel.app
```
