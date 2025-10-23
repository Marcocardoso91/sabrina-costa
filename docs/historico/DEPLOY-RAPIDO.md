# 🚀 DEPLOY RÁPIDO - 10 MINUTOS

## 🎯 RESUMO DO QUE FAZER

Infelizmente os **MCPs têm limitações de permissão**. Aqui está o que você precisa fazer manualmente (é rápido!):

---

## ✅ PASSO 1: BANCO DE DADOS (3 min)

Acesse: **https://supabase.com/dashboard/project/ddadyebnnbwqrjjtvgca/editor**

1. Clique em "SQL Editor"
2. Clique em "New Query"
3. Copie e cole TODO o conteúdo de: `backend/db/schema.sql`
4. Clique em "RUN" (botão verde)

**✅ Vai criar:** 6 tabelas + 50 ganchos + 2 usuários

---

## ✅ PASSO 2: BACKEND - VARIÁVEIS (5 min)

Acesse: **https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables**

Clique em "Add" para cada variável abaixo:

### Essenciais (copie e cole):

```
DATABASE_URL
postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres
```

```
JWT_SECRET
ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
```

```
JWT_EXPIRES_IN
7d
```

```
PORT
3000
```

```
NODE_ENV
production
```

```
WEBHOOK_SECRET
57caa76b0e0ea535231231d8559c9c8f
```

```
CORS_ORIGIN
https://sabrina-costa.vercel.app
```

```
FRONTEND_URL
https://sabrina-costa.vercel.app
```

```
TZ
America/Sao_Paulo
```

Depois de adicionar todas:
- Vá em "Deployments"  
- Clique nos 3 pontinhos (⋯)
- "Redeploy"
- Aguarde 1-2 min

---

## ✅ PASSO 3: FRONTEND - DEPLOY (2 min)

### Opção 1: Via Web (MAIS FÁCIL)

Acesse: **https://vercel.com/new**

1. Selecione o repo: `Marcocardoso91/sabrina-costa`
2. Configure:
   - **Framework:** Other
   - **Root Directory:** `frontend`
   - **Build Command:** (vazio)
   - **Output Directory:** `.` (ponto)
3. Clique em "Deploy"

### Opção 2: Via Terminal

```bash
# 1. Fazer login
npx vercel login

# 2. Deploy
cd frontend
npx vercel --prod
```

---

## ✅ TESTAR

### Backend:
```bash
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health
```

### Frontend:
Abra: **https://sabrina-costa.vercel.app**

Login:
- Email: `gerente@macspark.dev`
- Senha: `Sabrina2025!`

---

## 🎉 PRONTO!

**Seu dashboard está online!** 🚀

---

## 📌 URLs FINAIS

- **Frontend:** https://sabrina-costa.vercel.app
- **Backend:** https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
- **Supabase:** https://supabase.com/dashboard/project/ddadyebnnbwqrjjtvgca

---

## 🔧 OPCIONAL: N8N (depois)

Se quiser configurar os alertas automáticos do WhatsApp:

1. Acesse: https://fluxos.macspark.dev
2. Importe os 4 arquivos de `n8n/workflows/`
3. Configure as credenciais
4. Ative os workflows

**Guia completo:** `docs/N8N-WORKFLOWS.md`

---

**Alguma dúvida? Consulte:** `DEPLOY-AGORA.md` (versão detalhada)

