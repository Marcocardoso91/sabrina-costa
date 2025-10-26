# 🎨 Primeiro Deploy - Frontend e Backend

> **Tempo estimado:** 20 minutos  
> **Pré-requisitos:** [Quick Start](01-quickstart.md) concluído

Este tutorial detalha o processo completo de deploy do frontend e backend na Vercel, incluindo configurações avançadas e troubleshooting.

---

## 🎯 **O que você vai aprender**

✅ Deploy completo na Vercel  
✅ Configuração de variáveis de ambiente  
✅ Configuração de CORS  
✅ Monitoramento e logs  
✅ Troubleshooting comum  

---

## 🚀 **Deploy do Backend**

### 1.1 Preparação do Projeto

O backend já está configurado com:
- ✅ Express.js com middleware de segurança
- ✅ Autenticação JWT
- ✅ Rate limiting
- ✅ CORS configurável
- ✅ Health check endpoint

### 1.2 Configuração no Vercel

#### Variáveis de Ambiente Obrigatórias

```bash
# Database
DATABASE_URL=postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres

# Authentication
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
JWT_EXPIRES_IN=7d

# API Service Token (para n8n)
API_SERVICE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here

# Server
PORT=3000
NODE_ENV=production

# CORS (muito importante!)
CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app,https://sabrina-costa-frontend.vercel.app

# Webhook Security
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f

# n8n Integration
N8N_API_URL=https://fluxos.macspark.dev
N8N_API_KEY=your_n8n_api_key_here

# Alert Thresholds
CTR_MIN=1.5
CPC_MAX=0.70
CPM_MAX=10.0
FREQUENCY_MAX=3.0
COST_PER_FOLLOWER_MAX=1.30

# WhatsApp Integration
EVOLUTION_API_URL=https://qrcode.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key
WHATSAPP_INSTANCE=sabrina-instance
WHATSAPP_NUMBER=+5531993676989

# URLs
FRONTEND_URL=https://sabrina-costa.vercel.app
DASHBOARD_URL=https://sabrina-costa.vercel.app

# Localization
TZ=America/Sao_Paulo
LOCALE=pt-BR
CURRENCY=BRL
```

#### Como Adicionar no Vercel

1. Acesse: https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables
2. Clique em **"Add New"**
3. Cole cada variável (nome e valor)
4. Clique em **"Save"**
5. Repita para todas as variáveis

### 1.3 Redeploy

Após adicionar todas as variáveis:

1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deployment
3. Selecione **"Redeploy"**
4. Aguarde ~2 minutos

### 1.4 Verificação

```bash
# Health check
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health

# Resposta esperada:
{
  "status": "online",
  "timestamp": "2025-10-23T18:00:00Z",
  "version": "1.0.0"
}
```

---

## 🎨 **Deploy do Frontend**

### 2.1 Estrutura do Frontend

O frontend é um site estático com:
- ✅ HTML5 semântico
- ✅ Tailwind CSS (CDN)
- ✅ Alpine.js para reatividade
- ✅ Chart.js para gráficos
- ✅ Axios para requisições HTTP

### 2.2 Configuração no Vercel

#### Passo a Passo

1. **Acesse:** https://vercel.com/new
2. **Importar repositório:** `Marcocardoso91/sabrina-costa`
3. **Framework Preset:** `Other`
4. **Root Directory:** `frontend`

#### Configurações

```yaml
Project Name: sabrina-costa
Build Command: (deixe vazio - site estático)
Output Directory: .
Install Command: (deixe vazio)
```

### 2.3 Atualizar URL do Backend

**Arquivo:** `frontend/assets/js/api.js`

```javascript
// Antes (URL antiga)
const API_BASE_URL = 'https://backend-smoky-theta.vercel.app';

// Depois (URL nova)
const API_BASE_URL = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app';
```

**Como fazer:**
1. Edite o arquivo localmente
2. Commit e push:
```bash
git add frontend/assets/js/api.js
git commit -m "fix: atualizar URL do backend"
git push origin main
```
3. Aguarde redeploy automático (~1 minuto)

### 2.4 Verificação

1. Acesse: https://sabrina-costa.vercel.app
2. Teste o login:
   - Email: `gerente@macspark.dev`
   - Senha: `Sabrina2025!`
3. Verifique se o dashboard carrega dados

---

## 🗄️ **Configuração do Banco de Dados**

### 3.1 Aplicar Schema

1. **Acesse:** https://supabase.com/dashboard/project/obzijiqywctsjximhpmp
2. **Vá em:** SQL Editor
3. **Cole o conteúdo** de `backend/db/schema.sql`
4. **Execute** o script

### 3.2 Verificar Criação

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Resultado esperado:
-- alerts
-- config  
-- hooks
-- metrics
-- posts
-- users
```

### 3.3 Testar Dados

```sql
-- Verificar usuário admin criado
SELECT email, name, role FROM users;

-- Deve retornar:
-- gerente@macspark.dev | Marco | admin
```

---

## 🔧 **Configurações Avançadas**

### 4.1 CORS Configuration

O backend está configurado para aceitar requisições de:

```javascript
// backend/server.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

**URLs permitidas:**
- `http://localhost:3000` (desenvolvimento)
- `https://sabrina-costa.vercel.app` (produção)
- `https://sabrina-costa-frontend.vercel.app` (backup)

### 4.2 Rate Limiting

```javascript
// 100 requests por minuto por IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100,
  message: 'Muitas requisições, tente novamente em 1 minuto'
});
```

### 4.3 Security Headers

```javascript
// Helmet.js configurado
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

---

## 📊 **Monitoramento**

### 5.1 Logs do Backend

**Vercel Dashboard:**
1. Acesse: https://vercel.com/marcocardoso28s-projects/backend
2. Vá em **Functions**
3. Clique em **View Function Logs**

### 5.2 Métricas Importantes

```bash
# Health check (deve retornar 200)
curl -I https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/health

# Login test (deve retornar token)
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'

# API test (deve retornar dados)
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5.3 Alertas de Erro

Configure alertas no Vercel:
1. **Settings** → **Monitoring**
2. **Add Alert** para:
   - Function errors > 5%
   - Function duration > 10s
   - Function invocations > 1000/hora

---

## 🆘 **Troubleshooting**

### ❌ **Backend retorna 500**

**Possíveis causas:**
1. **Variáveis de ambiente faltando**
   ```bash
   # Verificar no Vercel Dashboard
   # Todas as variáveis devem estar presentes
   ```

2. **Database connection failed**
   ```bash
   # Verificar DATABASE_URL
   # Testar conexão no Supabase
   ```

3. **CORS errors**
   ```bash
   # Verificar CORS_ORIGIN
   # Deve incluir URL do frontend
   ```

**Solução:**
1. Verifique logs no Vercel
2. Confirme todas as variáveis
3. Teste database connection
4. Faça redeploy

### ❌ **Frontend não carrega dados**

**Possíveis causas:**
1. **URL do backend incorreta**
   ```javascript
   // Verificar em frontend/assets/js/api.js
   const API_BASE_URL = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app';
   ```

2. **CORS não configurado**
   ```bash
   # Backend deve incluir URL do frontend em CORS_ORIGIN
   ```

3. **API retornando erro**
   ```bash
   # Testar API diretamente no navegador
   # Verificar console do navegador
   ```

**Solução:**
1. Verificar console do navegador (F12)
2. Testar API diretamente
3. Confirmar CORS configuration
4. Atualizar URL se necessário

### ❌ **Login não funciona**

**Possíveis causas:**
1. **Schema não aplicado**
   ```sql
   -- Verificar se tabela users existe
   SELECT * FROM users;
   ```

2. **Usuário não criado**
   ```sql
   -- Verificar se admin existe
   SELECT email FROM users WHERE email = 'gerente@macspark.dev';
   ```

3. **JWT_SECRET incorreto**
   ```bash
   # Verificar se JWT_SECRET está correto no Vercel
   ```

**Solução:**
1. Aplicar schema.sql no Supabase
2. Verificar se usuário foi criado
3. Confirmar JWT_SECRET
4. Testar login com cURL

---

## ✅ **Checklist Final**

- [ ] Backend deployado e funcionando
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Frontend deployado e funcionando
- [ ] URL do backend atualizada no frontend
- [ ] Schema aplicado no Supabase
- [ ] Login funcionando
- [ ] Dashboard carregando dados
- [ ] CORS configurado corretamente
- [ ] Health check retornando 200
- [ ] Logs sem erros críticos

---

## 🎯 **Próximos Passos**

1. **[🤖 Primeiro Workflow n8n](03-primeiro-workflow-n8n.md)** - Configurar automações
2. **[📱 Conectar WhatsApp](04-conectar-whatsapp.md)** - Alertas automáticos
3. **[🔧 Configurações Avançadas](how-to-guides/deploy/vercel-backend.md)** - Deploy detalhado

---

## 📞 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev

---

**🎉 Excelente! Seu frontend e backend estão funcionando perfeitamente. Agora vamos configurar as automações n8n no [próximo tutorial](03-primeiro-workflow-n8n.md).**
