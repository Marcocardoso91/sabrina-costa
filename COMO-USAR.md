# 🚀 COMO USAR O DASHBOARD SABRINA COSTA

## ✅ STATUS ATUAL

| Componente | Status | URL |
|------------|--------|-----|
| 🎨 **Frontend** | 🟡 Protegido | https://frontend-9kn1xaumf-marcocardoso28s-projects.vercel.app |
| ⚙️ **Backend** | 🟡 Precisa config | https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app |
| 🗄️ **Banco** | ⏳ Precisa schema | Supabase (ddadyebnnbwqrjjtvgca) |
| 🤖 **n8n** | ✅ Online | https://fluxos.macspark.dev |

---

## 🎯 3 PASSOS PARA FINALIZAR (10 min)

### 1️⃣ CONFIGURAR BACKEND (5 min)
**Acesse:** https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables

**Adicione estas variáveis:**
```env
DATABASE_URL=postgresql://postgres.ddadyebnnbwqrjjtvgca:MAcs@234786msc@aws-0-us-west-1.pooler.supabase.com:5432/postgres
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=production
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f
CORS_ORIGIN=https://frontend-9kn1xaumf-marcocardoso28s-projects.vercel.app
EVOLUTION_API_URL=https://evolution.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key_here
WHATSAPP_NUMBER=+5531993676989
```

**Depois:** Deployments → Redeploy

### 2️⃣ APLICAR SCHEMA (3 min)
**Acesse:** https://supabase.com/dashboard/project/ddadyebnnbwqrjjtvgca/editor

1. SQL Editor → New Query
2. Copie TODO o conteúdo de `backend/db/schema.sql`
3. Cole e clique RUN
4. Aguarde confirmação ✅

### 3️⃣ CONFIGURAR FRONTEND (2 min)
O frontend está com proteção de autenticação. Você precisa:

1. **Acessar:** https://vercel.com/marcocardoso28s-projects/frontend/settings/security
2. **Desabilitar** Password Protection
3. **Ou** configurar um bypass token

---

## 🧪 TESTAR O SISTEMA

### Login
**URL:** https://frontend-9kn1xaumf-marcocardoso28s-projects.vercel.app
```
Email: gerente@macspark.dev
Senha: Sabrina2025!
```

### Testar API
```bash
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health
```

---

## 🎯 O QUE VOCÊ TERÁ APÓS FINALIZAR

### ✅ Dashboard Completo
- Login seguro com JWT
- 7 páginas funcionais
- Métricas em tempo real
- Gráficos interativos
- Cronograma de posts
- 50 ganchos virais
- Checklist de produção
- Relatórios automáticos

### ✅ Backend API
- 8 endpoints REST
- Autenticação JWT
- Banco PostgreSQL
- Webhooks para n8n
- Alertas WhatsApp

### ✅ Automação n8n
- 4 workflows prontos
- Processamento de métricas
- Alertas automáticos
- Relatórios diários
- Lembretes de postagem

---

## 🆘 SE ALGO DER ERRADO

### ❌ Backend retorna erro 500
- Verificar se todas as variáveis foram adicionadas
- Fazer redeploy do backend

### ❌ Login não funciona
- Verificar se schema foi aplicado no Supabase
- Verificar se usuário admin foi criado

### ❌ Frontend não carrega
- Verificar se CORS_ORIGIN inclui a URL do frontend
- Verificar se backend está respondendo

---

## 📚 DOCUMENTAÇÃO TÉCNICA

- **README.md** - Documentação completa do projeto
- **docs/** - Documentação técnica detalhada
- **backend/db/schema.sql** - Schema do banco de dados
- **n8n/workflows/** - Workflows de automação

---

**Status:** 95% completo - faltam apenas configurações  
**Tempo restante:** 10 minutos  
**Você consegue! Siga os 3 passos acima! 🚀**
