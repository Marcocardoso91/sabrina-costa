# 🏗️ Arquitetura do Sistema

> **Versão:** 1.0 | **Última atualização:** 23 de Outubro de 2025

Visão completa da arquitetura do Dashboard Sabrina Costa, incluindo decisões de design, fluxos de dados e estratégias de escalabilidade.

> **📊 Diagramas Interativos:** Esta página contém diagramas Mermaid interativos. Você pode clicar nos diagramas para editá-los ou baixá-los.

---

## 🎯 **Visão Geral**

O Dashboard Sabrina Costa é um sistema completo de gestão de métricas do Instagram, composto por 4 camadas principais:

1. **Frontend** - Interface web responsiva
2. **Backend API** - Servidor REST com autenticação
3. **Database** - PostgreSQL com otimizações
4. **Automação** - n8n workflows + WhatsApp

---

## 🏛️ **Arquitetura de Alto Nível**

```mermaid
graph TB
    subgraph "Usuários"
        U1[👤 Sabrina Costa]
        U2[👤 Equipe]
    end
    
    subgraph "Frontend (Vercel)"
        F1[🌐 Dashboard Web]
        F2[📱 Mobile Responsive]
    end
    
    subgraph "Backend (Vercel Functions)"
        B1[🔐 Auth API]
        B2[📊 Metrics API]
        B3[📅 Schedule API]
        B4[🚨 Alerts API]
        B5[🎣 Hooks API]
        B6[🔗 Webhook API]
    end
    
    subgraph "Database (Supabase)"
        D1[(🗄️ PostgreSQL)]
        D2[📊 Metrics Table]
        D3[📅 Posts Table]
        D4[🚨 Alerts Table]
        D5[🎣 Hooks Table]
        D6[👤 Users Table]
    end
    
    subgraph "Automação (n8n)"
        N1[🤖 Processar Métricas]
        N2[🚨 Alertas WhatsApp]
        N3[📈 Relatório Diário]
        N4[📅 Lembretes Posts]
    end
    
    subgraph "WhatsApp (Evolution API)"
        W1[📱 WhatsApp Business]
        W2[💬 Alertas]
        W3[📊 Relatórios]
        W4[📅 Lembretes]
    end
    
    U1 --> F1
    U2 --> F1
    F1 --> B1
    F1 --> B2
    F1 --> B3
    F1 --> B4
    F1 --> B5
    
    B1 --> D1
    B2 --> D2
    B3 --> D3
    B4 --> D4
    B5 --> D5
    B6 --> D1
    
    N1 --> B6
    N2 --> W1
    N3 --> W1
    N4 --> W1
    
    W1 --> U1
```

---

## 🔧 **Camadas da Aplicação**

### 1. **Frontend (Vercel)**

**Tecnologias:**
- HTML5 semântico
- Tailwind CSS (CDN)
- Alpine.js para reatividade
- Chart.js para gráficos
- Axios para HTTP

**Estrutura:**
```
frontend/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos customizados
│   └── js/
│       ├── api.js          # Cliente HTTP
│       ├── auth.js         # Autenticação
│       ├── dashboard.js    # Dashboard principal
│       ├── metrics.js      # Gestão de métricas
│       ├── schedule.js     # Cronograma
│       ├── hooks.js        # Ganchos virais
│       └── alerts.js       # Alertas
└── pages/
    ├── login.html          # Página de login
    ├── dashboard.html      # Dashboard
    ├── metrics.html        # Métricas
    ├── schedule.html       # Cronograma
    ├── hooks.html          # Ganchos
    └── settings.html       # Configurações
```

**Características:**
- ✅ Site estático (sem build)
- ✅ CDN global (Vercel)
- ✅ HTTPS automático
- ✅ Cache otimizado
- ✅ Mobile-first design

### 2. **Backend API (Vercel Functions)**

**Tecnologias:**
- Node.js 18
- Express.js
- PostgreSQL (Supabase)
- JWT authentication
- Rate limiting
- CORS configurável

**Estrutura:**
```
backend/
├── server.js              # Servidor principal
├── middleware/
│   ├── auth.js            # Autenticação JWT
│   ├── cors.js            # CORS configurável
│   └── rateLimit.js       # Rate limiting
├── routes/
│   ├── auth.js            # Autenticação
│   ├── metrics.js         # Métricas
│   ├── schedule.js        # Cronograma
│   ├── alerts.js          # Alertas
│   ├── hooks.js           # Ganchos
│   └── webhook.js         # Webhooks
├── models/
│   ├── User.js            # Modelo usuário
│   ├── Metric.js          # Modelo métrica
│   └── Post.js            # Modelo post
├── utils/
│   ├── database.js        # Conexão DB
│   ├── validation.js      # Validação
│   └── helpers.js         # Helpers
└── db/
    └── schema.sql         # Schema do banco
```

**Endpoints:**
```bash
# Autenticação
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh

# Métricas
GET    /api/metrics
POST   /api/metrics
PUT    /api/metrics/:id
DELETE /api/metrics/:id
GET    /api/metrics/summary

# Cronograma
GET    /api/schedule
POST   /api/schedule
PUT    /api/schedule/:id
DELETE /api/schedule/:id

# Alertas
GET    /api/alerts
POST   /api/alerts
PUT    /api/alerts/config
GET    /api/alerts/config

# Ganchos
GET    /api/hooks
POST   /api/hooks
PUT    /api/hooks/:id
DELETE /api/hooks/:id
PUT    /api/hooks/:id/increment
GET    /api/hooks/categories/list

# Webhooks
POST   /api/webhook/metrics
POST   /api/webhook/metrics/csv

# Configurações
GET    /api/config
GET    /api/config/:key
PUT    /api/config
```

### 3. **Database (Supabase PostgreSQL)**

**Schema:**
```sql
-- Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Métricas
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  reach INTEGER,
  ctr DECIMAL(5,2),
  cpc DECIMAL(10,2),
  cpm DECIMAL(10,2),
  frequency DECIMAL(5,2),
  profile_visits INTEGER,
  new_followers INTEGER,
  cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Posts do cronograma
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  week_number INTEGER,
  format VARCHAR(50),
  theme TEXT,
  hook TEXT,
  cta TEXT,
  status VARCHAR(50) DEFAULT 'planned',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Alertas
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  threshold_value DECIMAL(10,2),
  actual_value DECIMAL(10,2),
  date DATE NOT NULL,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ganchos virais
CREATE TABLE hooks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Configurações
CREATE TABLE config (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Índices otimizados:**
```sql
-- Índices para performance
CREATE INDEX idx_metrics_date ON metrics(date);
CREATE INDEX idx_metrics_ctr ON metrics(ctr);
CREATE INDEX idx_posts_date ON posts(date);
CREATE INDEX idx_alerts_date ON alerts(date);
CREATE INDEX idx_hooks_category ON hooks(category);
```

### 4. **Automação (n8n)**

**Workflows:**

#### Workflow 1: Processar Métricas
```mermaid
graph LR
    A[Webhook Trigger] --> B[Parse JSON/CSV]
    B --> C[Validate Data]
    C --> D[Calculate Derived]
    D --> E[Save to DB]
    E --> F[Check Thresholds]
    F --> G[Send Alert if Needed]
```

#### Workflow 2: Alertas WhatsApp
```mermaid
graph LR
    A[Cron 18h] --> B[Fetch Metrics]
    B --> C[Check Thresholds]
    C --> D[Format Message]
    D --> E[Send WhatsApp]
    E --> F[Log Alert]
```

#### Workflow 3: Relatório Diário
```mermaid
graph LR
    A[Cron 18h05] --> B[Compile Data]
    B --> C[Calculate Stats]
    C --> D[Format Report]
    D --> E[Send WhatsApp]
```

#### Workflow 4: Lembretes de Postagem
```mermaid
graph LR
    A[Cron 11h/17h30] --> B[Check Schedule]
    B --> C[Filter Posts]
    C --> D[Format Reminder]
    D --> E[Send WhatsApp]
```

---

## 🔄 **Fluxos de Dados**

### 1. **Fluxo de Login**

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Email + Senha
    F->>B: POST /auth/login
    B->>D: Verificar credenciais
    D-->>B: Dados do usuário
    B->>B: Gerar JWT
    B-->>F: Token + User data
    F->>F: Armazenar token
    F-->>U: Redirecionar para dashboard
```

### 2. **Fluxo de Métricas**

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant D as Database
    participant N as n8n
    participant W as WhatsApp
    
    U->>F: Adicionar métrica
    F->>B: POST /metrics
    B->>D: Salvar métrica
    D-->>B: Confirmação
    B-->>F: Métrica criada
    
    Note over N,W: Automação
    N->>B: GET /metrics
    B-->>N: Dados das métricas
    N->>N: Verificar thresholds
    N->>W: Enviar alerta (se necessário)
```

### 3. **Fluxo de Webhook**

```mermaid
sequenceDiagram
    participant E as External System
    participant N as n8n
    participant B as Backend
    participant D as Database
    participant W as WhatsApp
    
    E->>N: CSV/JSON metrics
    N->>N: Parse & Validate
    N->>B: POST /webhook/metrics
    B->>D: Save metrics
    D-->>B: Confirmation
    B-->>N: Success response
    N->>N: Check thresholds
    N->>W: Send alert (if needed)
```

---

## 🎯 **Decisões de Arquitetura**

### 1. **Por que Vercel?**

**Vantagens:**
- ✅ Deploy automático via Git
- ✅ CDN global (Edge Network)
- ✅ Serverless Functions (sem servidor)
- ✅ HTTPS automático
- ✅ Integração com GitHub
- ✅ Preview deployments
- ✅ Analytics integrado

**Alternativas consideradas:**
- **Netlify:** Menos flexibilidade para backend
- **Railway:** Mais caro, menos features
- **Heroku:** Mais complexo, mais caro

### 2. **Por que PostgreSQL (Supabase)?**

**Vantagens:**
- ✅ SQL completo (relacional)
- ✅ ACID compliance
- ✅ Índices otimizados
- ✅ Backup automático
- ✅ Dashboard web
- ✅ API REST automática
- ✅ Real-time subscriptions

**Alternativas consideradas:**
- **MongoDB:** Menos estruturado para métricas
- **MySQL:** Menos features modernas
- **SQLite:** Não escalável

### 3. **Por que n8n?**

**Vantagens:**
- ✅ Visual workflow builder
- ✅ 200+ integrações
- ✅ Self-hosted (controle total)
- ✅ Cron jobs nativos
- ✅ Webhooks
- ✅ Error handling
- ✅ Logs detalhados

**Alternativas consideradas:**
- **Zapier:** Mais caro, menos controle
- **Make (Integromat):** Mais complexo
- **Custom scripts:** Mais trabalho

### 4. **Por que Evolution API?**

**Vantagens:**
- ✅ WhatsApp Business API
- ✅ Múltiplas instâncias
- ✅ Webhooks
- ✅ Self-hosted
- ✅ Custo baixo
- ✅ Controle total

**Alternativas consideradas:**
- **WhatsApp Cloud API:** Mais caro, menos controle
- **Twilio:** Muito caro
- **Custom integration:** Muito trabalho

---

## 🔒 **Segurança**

### 1. **Autenticação JWT**

```javascript
// Configuração JWT
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  algorithm: 'HS256'
};

// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
```

### 2. **Proteção contra Ataques**

**SQL Injection:**
```javascript
// Usar prepared statements
const query = 'SELECT * FROM metrics WHERE date = $1';
const result = await db.query(query, [date]);
```

**XSS (Cross-Site Scripting):**
```javascript
// Sanitizar inputs
const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

**CSRF (Cross-Site Request Forgery):**
```javascript
// Verificar origin
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true
};
```

**Rate Limiting:**
```javascript
// 100 requests por minuto
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições, tente novamente em 1 minuto'
});
```

### 3. **Variáveis de Ambiente**

```bash
# Segurança
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# APIs
EVOLUTION_API_KEY=your_evolution_api_key
N8N_API_KEY=your_n8n_api_key

# URLs
CORS_ORIGIN=http://localhost:3000,https://sabrina-costa.vercel.app
```

---

## ⚡ **Performance**

### 1. **Frontend**

**Otimizações:**
- ✅ CDN global (Vercel Edge)
- ✅ Cache de assets
- ✅ Lazy loading de imagens
- ✅ Minificação de CSS/JS
- ✅ Compressão gzip
- ✅ HTTP/2

**Métricas:**
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **TTFB:** < 600ms

### 2. **Backend**

**Otimizações:**
- ✅ Connection pooling
- ✅ Índices otimizados
- ✅ Query optimization
- ✅ Caching de responses
- ✅ Compression
- ✅ Rate limiting

**Métricas:**
- **Response time:** < 200ms
- **Throughput:** 1000 req/min
- **Uptime:** 99.9%

### 3. **Database**

**Otimizações:**
```sql
-- Índices para performance
CREATE INDEX idx_metrics_date ON metrics(date);
CREATE INDEX idx_metrics_ctr ON metrics(ctr);
CREATE INDEX idx_posts_date ON posts(date);

-- Queries otimizadas
SELECT * FROM metrics 
WHERE date >= '2025-10-01' 
AND date <= '2025-10-31'
ORDER BY date DESC
LIMIT 20;
```

---

## 📊 **Monitoramento**

### 1. **Métricas de Sistema**

**Vercel Analytics:**
- Page views
- Unique visitors
- Bounce rate
- Core Web Vitals

**Backend Metrics:**
- Response times
- Error rates
- Function invocations
- Memory usage

**Database Metrics:**
- Query performance
- Connection count
- Storage usage
- Backup status

### 2. **Alertas**

**Configuração:**
```yaml
# Vercel Alerts
Function errors > 5%
Function duration > 10s
Function invocations > 1000/hour

# Database Alerts
Connection count > 80%
Storage usage > 90%
Query time > 5s
```

### 3. **Logs**

**Estrutura de logs:**
```javascript
// Log format
{
  timestamp: '2025-10-23T18:00:00Z',
  level: 'info',
  service: 'backend',
  endpoint: '/api/metrics',
  method: 'POST',
  status: 200,
  duration: 150,
  user_id: 1,
  ip: '192.168.1.1'
}
```

---

## 🚀 **Escalabilidade**

### 1. **Cenário Atual**

**Carga estimada:**
- **Usuários:** 1-5 simultâneos
- **Requests:** 100-500/dia
- **Métricas:** 10-50/dia
- **Alertas:** 0-5/dia

### 2. **Crescimento Previsto**

**6 meses:**
- **Usuários:** 5-20 simultâneos
- **Requests:** 500-2000/dia
- **Métricas:** 50-200/dia
- **Alertas:** 5-20/dia

**1 ano:**
- **Usuários:** 20-100 simultâneos
- **Requests:** 2000-10000/dia
- **Métricas:** 200-1000/dia
- **Alertas:** 20-100/dia

### 3. **Estratégias de Escala**

**Frontend:**
- ✅ CDN global (já implementado)
- ✅ Cache de assets
- ✅ Lazy loading
- ✅ Code splitting

**Backend:**
- ✅ Serverless (auto-scaling)
- ✅ Connection pooling
- ✅ Caching (Redis)
- ✅ Load balancing

**Database:**
- ✅ Read replicas
- ✅ Partitioning
- ✅ Indexing
- ✅ Query optimization

**Automação:**
- ✅ Multiple n8n instances
- ✅ Queue system (Redis)
- ✅ Error handling
- ✅ Retry logic

---

## 🔮 **Roadmap Técnico**

### **Fase 1 (Q4 2025)**
- ✅ Deploy inicial
- ✅ Automações básicas
- ✅ WhatsApp integration
- 🔄 Monitoring básico

### **Fase 2 (Q1 2026)**
- 🔄 Redis caching
- 🔄 Advanced analytics
- 🔄 Mobile app
- 🔄 Real-time updates

### **Fase 3 (Q2 2026)**
- 🔄 Machine learning
- 🔄 Predictive analytics
- 🔄 Advanced automation
- 🔄 Multi-tenant

---

## 📚 **Referências**

- **[🔐 Segurança](security.md)** - Políticas de segurança
- **[⚡ Performance](performance.md)** - Otimizações
- **[🔄 Data Flow](data-flow.md)** - Fluxos de dados
- **[🎯 Design Decisions](design-decisions.md)** - ADRs

---

**🏗️ Arquitetura robusta e escalável! O sistema está preparado para crescer e evoluir com as necessidades do negócio.**

---

## 📊 **Diagramas Interativos**

Esta documentação inclui diagramas Mermaid interativos que podem ser editados e baixados. Para ativar a funcionalidade completa dos diagramas, inclua o seguinte script:

```html
<!-- Incluir em páginas com diagramas -->
<script src="/assets/js/mermaid-diagrams.js"></script>
<link rel="stylesheet" href="/assets/mermaid.html">
```

### **Funcionalidades dos Diagramas:**

- ✏️ **Editar:** Clique no botão "Editar" para modificar diagramas
- 📥 **Download:** Baixe diagramas como imagens PNG
- 🎨 **Temas:** Suporte a temas claro/escuro
- 📱 **Responsivo:** Diagramas se adaptam a diferentes tamanhos de tela
- 🔍 **Zoom:** Amplie diagramas para melhor visualização

### **Exemplos de Uso:**

```javascript
// Renderizar diagrama programaticamente
window.diagramManager.renderDiagram('meu-diagrama', `
  graph TD
      A[Início] --> B[Processo]
      B --> C[Fim]
`, 'Meu Diagrama');

// Adicionar exemplo de diagrama
window.addDiagramExample('architecture');
```

### **Tipos de Diagramas Suportados:**

- **Flowcharts:** Fluxos de processo
- **Sequence:** Diagramas de sequência
- **Gantt:** Cronogramas
- **Class:** Diagramas de classes
- **State:** Diagramas de estado
- **Journey:** Jornadas do usuário
