# 🔐 Guia de Configuração de Variáveis de Ambiente

## Dashboard Sabrina Costa - Backend

Este documento lista todas as variáveis de ambiente necessárias para o funcionamento do backend.

---

## 📋 Variáveis Obrigatórias

### 🗄️ Database (Supabase/PostgreSQL)

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
```

**Como obter:**
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em: Settings > Database > Connection String > URI
4. Copie a string de conexão

---

### 🔑 JWT (Autenticação)

```bash
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

**Como gerar JWT_SECRET:**
```bash
# No Linux/Mac:
openssl rand -base64 32

# Ou em Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### ⚙️ Server Configuration

```bash
PORT=3000
NODE_ENV=production
```

---

### 🌐 CORS (Cross-Origin Resource Sharing)

```bash
CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app
```

Adicione todas as URLs do frontend separadas por vírgula.

---

### 🛡️ Rate Limiting

```bash
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

### 🔗 Webhook Security

```bash
WEBHOOK_SECRET=your_webhook_secret_token_here
```

**Como gerar:**
```bash
openssl rand -hex 32
```

---

### 📱 Evolution API (WhatsApp)

```bash
EVOLUTION_API_URL=https://evolution.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key_here
WHATSAPP_NUMBER=+5531993676989
```

**Como obter:**
1. Acesse sua instância Evolution API
2. Crie uma nova sessão/instância
3. Copie a API Key gerada
4. Configure o número de WhatsApp

---

### 🤖 n8n Integration

```bash
# n8n API (para gerenciar workflows programaticamente)
N8N_API_URL=https://fluxos.macspark.dev
N8N_API_KEY=your_n8n_api_key_here

# Webhooks n8n (para receber eventos)
N8N_WEBHOOK_URL=https://fluxos.macspark.dev/webhook

# Backend URL (usado pelos workflows n8n para chamar suas APIs)
API_BASE_URL=https://seu-backend.vercel.app

# Evolution API Instance (nome da instância WhatsApp)
EVOLUTION_INSTANCE=sabrina-costa
```

**Como obter:**
1. **N8N_API_KEY:** Settings > API > Create API Key
2. **EVOLUTION_INSTANCE:** Nome da sua instância no Evolution API
3. **API_BASE_URL:** URL do seu backend no Vercel

---

## 📝 Configuração Local (Desenvolvimento)

1. Crie um arquivo `.env` na pasta `backend/`:

```bash
cd backend
touch .env
```

2. Copie o conteúdo abaixo e preencha com seus valores:

```bash
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

# JWT
JWT_SECRET=gere_uma_chave_secreta_aqui
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Webhook
WEBHOOK_SECRET=gere_um_token_secreto

# Evolution API (WhatsApp)
EVOLUTION_API_URL=https://evolution.macspark.dev
EVOLUTION_API_KEY=sua_chave_aqui
EVOLUTION_INSTANCE=sabrina-costa
WHATSAPP_NUMBER=+5531993676989

# n8n
N8N_API_URL=https://fluxos.macspark.dev
N8N_WEBHOOK_URL=https://fluxos.macspark.dev/webhook
N8N_API_KEY=sua_chave_n8n_aqui

# Backend URL (para workflows n8n)
API_BASE_URL=http://localhost:3000
```

3. Teste a conexão:

```bash
npm start
# ou
node test-connection.js
```

---

## ☁️ Configuração Vercel (Produção)

### Via Dashboard

1. Acesse [Vercel Dashboard](https://vercel.com)
2. Selecione seu projeto
3. Vá em: Settings > Environment Variables
4. Adicione cada variável:
   - **Key:** Nome da variável (ex: `DATABASE_URL`)
   - **Value:** Valor da variável
   - **Environment:** Production, Preview, Development

### Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Adicionar variável
vercel env add DATABASE_URL production
# Cole o valor quando solicitado
```

### Variáveis Essenciais para Produção

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | ✅ Sim | String de conexão PostgreSQL |
| `JWT_SECRET` | ✅ Sim | Chave secreta JWT (gerar nova!) |
| `JWT_EXPIRES_IN` | ❌ Não | Validade do token (padrão: 7d) |
| `NODE_ENV` | ✅ Sim | production |
| `CORS_ORIGIN` | ✅ Sim | URLs frontend autorizadas |
| `WEBHOOK_SECRET` | ✅ Sim | Token para validar webhooks |
| `EVOLUTION_API_URL` | ✅ Sim | URL Evolution API |
| `EVOLUTION_API_KEY` | ✅ Sim | Chave Evolution API |
| `EVOLUTION_INSTANCE` | ✅ Sim | Nome da instância WhatsApp |
| `WHATSAPP_NUMBER` | ✅ Sim | Número WhatsApp |
| `API_BASE_URL` | ✅ Sim | URL do seu backend (para n8n chamar) |
| `N8N_API_URL` | ⚠️ Opcional | URL API n8n |
| `N8N_WEBHOOK_URL` | ⚠️ Opcional | URL webhooks n8n |
| `N8N_API_KEY` | ⚠️ Opcional | Chave API n8n |

---

## 🔍 Verificação

### Testar Conexão com Banco

```bash
cd backend
node test-connection.js
```

### Testar API Local

```bash
cd backend
npm start

# Em outro terminal:
curl http://localhost:3000/api/health
```

Resposta esperada:
```json
{
  "success": true,
  "status": "online",
  "timestamp": "2025-10-31T...",
  "version": "1.0.0"
}
```

### Testar Autenticação

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'
```

---

## ⚠️ Segurança

### ✅ DO (Faça)

- ✅ Use senhas fortes e únicas
- ✅ Gere novas chaves JWT e WEBHOOK para produção
- ✅ Adicione `.env` no `.gitignore`
- ✅ Use HTTPS em produção
- ✅ Rotacione credenciais regularmente
- ✅ Mantenha NODE_ENV=production em produção

### ❌ DON'T (Não Faça)

- ❌ NUNCA commite `.env` no Git
- ❌ NUNCA compartilhe credenciais em chat/email
- ❌ NUNCA use as mesmas senhas de desenvolvimento em produção
- ❌ NUNCA exponha variáveis de ambiente no frontend

---

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Evolution API Docs](https://doc.evolution-api.com/)
- [n8n Documentation](https://docs.n8n.io/)

---

## 🆘 Troubleshooting

### Erro: "Database connection failed"

1. Verifique se `DATABASE_URL` está correta
2. Teste conexão: `psql $DATABASE_URL`
3. Verifique firewall/whitelist do Supabase

### Erro: "JWT secret not defined"

1. Certifique-se de que `JWT_SECRET` está definida
2. Em desenvolvimento: crie arquivo `.env`
3. Em produção: adicione no Vercel Dashboard

### Erro: "CORS policy blocked"

1. Verifique `CORS_ORIGIN` inclui a URL do frontend
2. Separe múltiplas URLs com vírgula
3. Não adicione `/` no final das URLs

---

**Última atualização:** 31 de Outubro de 2025
**Versão:** 1.0.0

