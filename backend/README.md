# 🔧 Backend API - Dashboard Sabrina Costa

**Node.js/Express REST API para gerenciamento de métricas do Instagram**

**Versão:** 1.0.0  
**Status:** ✅ Produção-Ready  
**Testes:** 90/90 passando (100%)  
**Cobertura:** 50% (meta: 80%)  
**Segurança:** 10/10 - 0 vulnerabilidades

---

## 📋 Visão Geral

API REST completa com autenticação JWT, integração PostgreSQL (Supabase) e webhooks para n8n.

### Features

- ✅ 8 endpoints REST funcionais
- ✅ Autenticação JWT com bcrypt
- ✅ Rate limiting (geral + específico auth)
- ✅ Validação robusta de inputs
- ✅ SQL injection protection
- ✅ XSS prevention
- ✅ Error handling centralizado
- ✅ CORS configurado
- ✅ Helmet security headers
- ✅ Connection pooling PostgreSQL

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+ ou Supabase
- Variáveis de ambiente configuradas

### Instalação

```bash
cd backend
npm install
```

### Configuração

1. Copiar variáveis de ambiente:
```bash
# Ver ENV_SETUP.md para lista completa
```

2. Aplicar schema SQL:
```bash
node ../scripts/setup/apply-schema.js
```

3. Criar usuário admin:
```bash
node ../scripts/setup/create-admin-user.js
```

### Desenvolvimento

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start

# Rodar testes
npm test

# Testes com cobertura
npm test -- --coverage
```

---

## 📚 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/login` | Login do usuário | ❌ |
| POST | `/api/auth/logout` | Logout do usuário | ✅ |
| GET | `/api/auth/me` | Dados do usuário atual | ✅ |

### Métricas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/metrics` | Listar métricas (com filtros) | ✅ |
| POST | `/api/metrics` | Criar nova métrica | ✅ |
| PUT | `/api/metrics/:id` | Atualizar métrica | ✅ |
| DELETE | `/api/metrics/:id` | Deletar métrica (admin) | ✅ Admin |
| GET | `/api/metrics/summary` | Estatísticas agregadas | ✅ |

### Webhooks

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/webhook/metrics` | Receber métricas JSON | Webhook Token |
| POST | `/api/webhook/metrics/csv` | Receber métricas CSV | Webhook Token |

### Alertas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/alerts` | Listar alertas | ✅ |
| POST | `/api/alerts` | Criar alerta manual | ✅ |
| GET | `/api/alerts/config` | Config de alertas | ✅ |
| PUT | `/api/alerts/config` | Atualizar config | ✅ Admin |

### Cronograma

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/schedule` | Listar posts | ✅ |
| POST | `/api/schedule` | Criar post | ✅ Admin |
| PUT | `/api/schedule/:id` | Atualizar post | ✅ |

### Ganchos

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/hooks` | Listar ganchos | ✅ |
| GET | `/api/hooks/categories/list` | Listar categorias | ✅ |
| PUT | `/api/hooks/:id/increment` | Incrementar uso | ✅ |

### Configurações

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/config` | Todas configs | ✅ |
| GET | `/api/config/:key` | Config específica | ✅ |
| PUT | `/api/config` | Atualizar configs | ✅ Admin |

### Utilitários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/health` | Health check | ❌ |
| GET | `/api/debug` | Debug vars (dev only) | ✅ Admin |

---

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Cobertura Atual

```
File            | % Stmts | % Branch | % Funcs | % Lines
----------------|---------|----------|---------|--------
All files       |   50.00 |    69.44 |   22.22 |   50.00
db/             |   17.64 |    50.00 |    0.00 |   17.64
utils/          |   65.27 |    70.00 |   30.76 |   65.27
```

**Total:** 90 testes, 100% passando

### Arquivos de Teste

- `__tests__/auth.test.js` - Autenticação (19 testes)
- `__tests__/metrics.test.js` - Métricas (21 testes)
- `__tests__/webhook.test.js` - Webhooks (17 testes)
- `__tests__/alerts.test.js` - Alertas (3 testes)
- `__tests__/schedule.test.js` - Cronograma (13 testes)
- `__tests__/hooks.test.js` - Ganchos (9 testes)
- `__tests__/config.test.js` - Configurações (8 testes)

---

## 🏗️ Arquitetura

```
backend/
├── api/              # Rotas e controladores
│   ├── auth.js       # Autenticação
│   ├── metrics.js    # Métricas
│   ├── webhook.js    # Webhooks
│   ├── alerts.js     # Alertas
│   ├── schedule.js   # Cronograma
│   ├── hooks.js      # Ganchos
│   ├── config.js     # Configurações
│   └── debug.js      # Debug (dev only)
├── db/               # Database
│   ├── connection.js # Pool PostgreSQL
│   └── schema.sql    # Schema completo
├── utils/            # Utilitários
│   ├── jwt.js        # JWT helpers
│   ├── alerts.js     # Sistema de alertas
│   └── config.js     # Config helpers
├── __tests__/        # Testes Jest
├── server.js         # Express server
├── index.js          # Vercel entry point
└── package.json      # Dependencies
```

---

## 🔒 Segurança

### Implementações

✅ **Autenticação**
- JWT com expiração (7 dias)
- bcrypt (10 rounds)
- Tokens em headers Authorization

✅ **Rate Limiting**
- Geral: 100 req/min
- Auth: 5 tentativas/15min (brute-force protection)

✅ **SQL Injection Protection**
- Parameterized queries em todos endpoints
- Validação de inputs numéricos
- Whitelist de campos permitidos

✅ **CORS**
- Origins específicas configuradas
- Credentials habilitado

✅ **Security Headers**
- Helmet habilitado
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

### Endpoints Protegidos

- 🔴 `/api/debug` - ADMIN + DEV ONLY
- 🔴 `/api/auth/create-admin` - DESABILITADO (use script)

---

## 📊 Variáveis de Ambiente

Ver `ENV_SETUP.md` para lista completa e instruções.

**Essenciais:**
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_here
WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
```

---

## 🚀 Deploy

### Vercel

```bash
vercel

# Configurar variáveis:
# - DATABASE_URL
# - JWT_SECRET (gerar novo!)
# - WEBHOOK_SECRET (gerar novo!)
# - CORS_ORIGIN
# - EVOLUTION_API_KEY
```

### Railway/Render

```bash
# Configurar build command:
npm install

# Start command:
npm start
```

---

## 🐛 Troubleshooting

### Database connection failed
- Verificar `DATABASE_URL`
- Verificar SSL em produção
- Testar: `node ../scripts/test/test-database-connection.js`

### JWT errors
- Verificar `JWT_SECRET` está configurado
- Verificar token não expirou
- Verificar formato: `Bearer <token>`

### CORS blocked
- Adicionar origin em `CORS_ORIGIN`
- Separar múltiplas URLs com vírgula

---

## 📞 Suporte

- **Documentação API:** `docs/api/`
- **Tutoriais:** `docs/tutorials/`
- **Setup:** `ENV_SETUP.md`
- **Scripts:** `../scripts/README.md`

---

**Última atualização:** 31 de Outubro de 2025  
**Mantido por:** Macspark Team

