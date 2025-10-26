# 🚀 Quick Start - Dashboard Sabrina Costa

> **Tempo estimado:** 30 minutos  
> **Pré-requisitos:** Conta GitHub, Vercel, Supabase

Este guia te levará do zero ao Dashboard Sabrina Costa funcionando em produção em apenas 3 passos!

---

## 📋 **O que você vai ter ao final**

✅ Dashboard web funcionando  
✅ Backend API rodando  
✅ Banco de dados configurado  
✅ Automações n8n ativas  
✅ Alertas WhatsApp funcionando  

---

## 🎯 **Passo 1: Deploy do Backend (15 min)**

### 1.1 Configurar Variáveis no Vercel

1. Acesse: https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables

2. Adicione estas variáveis (uma por uma):

```bash
DATABASE_URL=postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres

JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=

JWT_EXPIRES_IN=7d

API_SERVICE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here

PORT=3000

NODE_ENV=production

CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app,https://sabrina-costa-frontend.vercel.app

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

### 1.2 Fazer Redeploy

1. Vá em **Deployments**
2. Clique em **"Redeploy"** no último deployment
3. Aguarde ~2 minutos

### 1.3 Testar Backend

```bash
# Health check
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health

# Deve retornar: {"status":"online","timestamp":"2025-10-23T..."}
```

---

## 🎨 **Passo 2: Deploy do Frontend (10 min)**

### 2.1 Criar Projeto Vercel

1. Acesse: https://vercel.com/new
2. **Importar repositório:** `Marcocardoso91/sabrina-costa`
3. **Framework Preset:** `Other`
4. **Root Directory:** `frontend`

### 2.2 Configurar Deploy

- **Project Name:** `sabrina-costa`
- **Build Command:** (deixe vazio)
- **Output Directory:** `.`
- **Install Command:** (deixe vazio)

### 2.3 Deploy

1. Clique em **"Deploy"**
2. Aguarde ~1 minuto
3. Anote a URL gerada (ex: `https://sabrina-costa.vercel.app`)

### 2.4 Atualizar URL do Backend

1. Edite `frontend/assets/js/api.js`
2. Substitua a URL do backend pela nova:

```javascript
// Antes
const API_BASE_URL = 'https://backend-smoky-theta.vercel.app';

// Depois  
const API_BASE_URL = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app';
```

3. Faça commit e push
4. Aguarde redeploy automático

---

## 🗄️ **Passo 3: Configurar Banco de Dados (5 min)**

### 3.1 Aplicar Schema

1. Acesse: https://supabase.com/dashboard/project/obzijiqywctsjximhpmp
2. Vá em **SQL Editor**
3. Cole o conteúdo de `backend/db/schema.sql`
4. Execute o script

### 3.2 Verificar Tabelas

```sql
-- Verificar se as tabelas foram criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Deve retornar: users, metrics, alerts, posts, hooks, config
```

### 3.3 Testar Conexão

```bash
# Testar login (usar credenciais do seed)
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'

# Deve retornar token JWT
```

---

## 🎉 **Pronto! Seu Dashboard está funcionando**

### ✅ **URLs Finais**

- **Frontend:** https://sabrina-costa.vercel.app
- **Backend:** https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
- **API Health:** https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health

### 🔑 **Credenciais de Teste**

- **Email:** gerente@macspark.dev
- **Senha:** Sabrina2025!

### 🎯 **Próximos Passos**

1. **[🎨 Primeiro Deploy](02-primeiro-deploy.md)** - Detalhes do deploy
2. **[🤖 Primeiro Workflow n8n](03-primeiro-workflow-n8n.md)** - Configurar automações
3. **[📱 Conectar WhatsApp](04-conectar-whatsapp.md)** - Alertas automáticos

---

## 🆘 **Problemas Comuns**

### ❌ **Backend retorna 500**
- Verifique se todas as variáveis de ambiente foram adicionadas
- Confirme se o banco Supabase está ativo
- Verifique logs no Vercel

### ❌ **Frontend não carrega dados**
- Confirme se a URL do backend está correta em `api.js`
- Verifique CORS no backend
- Teste API diretamente no navegador

### ❌ **Login não funciona**
- Confirme se o schema foi aplicado no Supabase
- Verifique se o usuário foi criado no seed
- Teste com credenciais: gerente@macspark.dev / Sabrina2025!

---

## 📞 **Precisa de Ajuda?**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev

---

**🎉 Parabéns! Seu Dashboard Sabrina Costa está no ar! Agora vamos configurar as automações no [próximo tutorial](02-primeiro-deploy.md).**
