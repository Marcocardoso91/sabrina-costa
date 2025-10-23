# 🔧 Configuração do Arquivo .env

## Arquivo .env do Backend

Crie o arquivo `backend/.env` com o seguinte conteúdo:

```bash
# =================================
# DATABASE CONFIGURATION
# =================================
# SUBSTITUIR PELA DATABASE_URL DO SUPABASE
DATABASE_URL=postgresql://postgres:password@localhost:5432/sabrina_dashboard

# =================================
# JWT AUTHENTICATION
# =================================
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
JWT_EXPIRES_IN=7d

# =================================
# SERVICE TOKENS
# =================================
API_SERVICE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here

# =================================
# API SERVER
# =================================
PORT=3000
NODE_ENV=production

# =================================
# CORS CONFIGURATION
# =================================
CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app

# =================================
# WEBHOOK CONFIGURATION
# =================================
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f

# =================================
# n8n CONFIGURATION
# =================================
N8N_API_URL=https://fluxos.macspark.dev
N8N_API_KEY=your_n8n_api_key_here

# Overrides opcionais para thresholds (utilizados pelos workflows)
CTR_MIN=1.5
CPC_MAX=0.70
CPM_MAX=10.0
FREQUENCY_MAX=3.0
COST_PER_FOLLOWER_MAX=1.30

# =================================
# EVOLUTION API (WhatsApp)
# =================================
EVOLUTION_API_URL=https://qrcode.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key
WHATSAPP_INSTANCE=sabrina-instance
WHATSAPP_NUMBER=+5531993676989

# =================================
# FRONTEND URL
# =================================
FRONTEND_URL=https://sabrina-costa.vercel.app
DASHBOARD_URL=https://sabrina-costa.vercel.app

# =================================
# TIMEZONE & LOCALE
# =================================
TZ=America/Sao_Paulo
LOCALE=pt-BR
CURRENCY=BRL
```

## ⚠️ IMPORTANTE

1. **Substitua a DATABASE_URL** pela URL real do Supabase quando você criar o projeto
2. **Copie a EVOLUTION_API_KEY** do painel https://qrcode.macspark.dev/manager
3. **Copie a N8N_API_KEY** do painel https://fluxos.macspark.dev

## Próximos Passos

Após criar o arquivo .env:
1. Teste a conexão com o banco
2. Faça o deploy na Vercel
3. Configure as variáveis de ambiente na Vercel
