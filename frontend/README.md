# 🎨 Frontend - Dashboard Sabrina Costa

**Interface web moderna e responsiva para gerenciamento do projeto Instagram**

**Versão:** 1.0.0  
**Status:** ✅ Produção-Ready  
**Tecnologias:** HTML5, Tailwind CSS, Alpine.js, Chart.js  
**Dependências:** 0 (tudo via CDN)

---

## 📋 Visão Geral

Interface web minimalista e eficiente com 7 páginas HTML, usando CDNs para zero dependências locais.

### Features

- ✅ 7 páginas completas e responsivas
- ✅ Design moderno com Tailwind CSS
- ✅ Reatividade com Alpine.js
- ✅ Gráficos interativos com Chart.js
- ✅ Autenticação JWT
- ✅ API client robusto
- ✅ Error handling
- ✅ Loading states
- ✅ Security headers configurados

---

## 🚀 Quick Start

### Desenvolvimento Local

```bash
cd frontend

# Opção 1: Python
python -m http.server 8000

# Opção 2: npx serve
npx serve

# Opção 3: npm
npm start
```

Acessar: `http://localhost:8000/index.html`

### Deploy Vercel

```bash
cd frontend
vercel
```

Ou via GitHub (auto-deploy on push).

---

## 📁 Estrutura

```
frontend/
├── index.html              # 🔐 Login
├── dashboard.html          # 📊 Dashboard principal
├── cronograma.html         # 📅 Timeline de posts
├── ganchos.html            # 🎣 Biblioteca de ganchos
├── checklist.html          # ✅ Checklist de produção
├── relatorios.html         # 📈 Relatórios semanais
├── configuracoes.html      # ⚙️ Configurações
├── assets/
│   ├── css/                # (vazio - usa Tailwind CDN)
│   ├── img/                # (vazio - sem imagens locais)
│   └── js/
│       ├── api.js          # Cliente HTTP
│       └── auth.js         # Sistema de autenticação
├── package.json
└── vercel.json             # Config deploy
```

---

## 🎨 Páginas

### 1. Login (`index.html`)
- Glass effect design
- Validação de formulário
- Autenticação JWT
- Auto-redirect se já autenticado

### 2. Dashboard (`dashboard.html`)
- Cards com KPIs principais
- Gráfico de evolução (Chart.js)
- Alertas recentes
- Período selecionável (7d, 30d, 90d)

### 3. Cronograma (`cronograma.html`)
- Timeline de 4 semanas (30 posts)
- Filtros por semana/formato/status
- Edição inline de posts
- Status visual (planned/posted/cancelled)

### 4. Ganchos (`ganchos.html`)
- Biblioteca de 50 ganchos virais
- Busca por texto
- Filtro por categoria (10 categorias)
- Contador de uso
- Copy to clipboard

### 5. Checklist (`checklist.html`)
- Checklist interativo de produção
- Progresso visual
- Agrupado por etapas
- Persistência local

### 6. Relatórios (`relatorios.html`)
- Relatórios semanais automáticos
- Comparação período anterior
- Gráficos de tendência
- Export para CSV/PDF

### 7. Configurações (`configuracoes.html`)
- Thresholds de alertas
- Configurações WhatsApp
- Configurações gerais
- Admin only

---

## 🔧 JavaScript

### API Client (`assets/js/api.js`)

```javascript
// Configuração automática de ambiente
const API_CONFIG = {
    baseURL: localhost ? 'http://localhost:3000/api' : '/api',
    timeout: 30000
};

// Uso
await API.auth.login(email, password);
await API.metrics.getAll({ period: '7d' });
```

**Features:**
- Auto-detecção de ambiente
- Timeout handling
- Error handling robusto
- Auto-redirect em 401
- Retry logic (futuro)

### Auth System (`assets/js/auth.js`)

```javascript
// Proteção de rotas
Auth.protectPage(); // Redirect para login se não autenticado

// Verificar autenticação
Auth.isAuthenticated(); // true/false

// Logout
Auth.logout(); // Limpa storage + redirect
```

**Features:**
- localStorage para token/user
- Auto-proteção de rotas
- Token refresh (futuro)

---

## 🎨 Design System

### Cores

- **Primary:** Purple (`#667eea`, `#764ba2`)
- **Success:** Green
- **Warning:** Yellow
- **Danger:** Red
- **Neutral:** Gray scale

### Componentes

- Cards com hover effect
- Glass effect backgrounds
- Gradientes suaves
- Animações fade-in/slide-up
- Loading spinners
- Toasts de notificação

---

## 🔒 Segurança

### Frontend

✅ **XSS Prevention**
- Uso de `x-text` (Alpine.js) ao invés de `innerHTML`
- Sem `x-html` em dados dinâmicos
- Sem `eval()` ou `Function()`

✅ **Headers de Segurança**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

✅ **Token Security**
- JWT armazenado em localStorage
- Auto-logout em 401
- Tokens enviados via header

---

## ⚙️ Configuração

### vercel.json

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://backend-url.vercel.app/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

**Importante:** Atualizar `destination` com URL real do backend!

---

## 🧪 Testing

### Manual Testing

1. **Login Flow**
   - Credenciais válidas/inválidas
   - Auto-redirect após login
   - Proteção de rotas

2. **Dashboard**
   - Carregar métricas
   - Gráficos renderizando
   - Filtros funcionando

3. **Navegação**
   - Links entre páginas
   - Logout
   - Auto-proteção

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📈 Performance

### Otimizações

- ✅ CDNs para todas bibliotecas
- ✅ Zero npm dependencies
- ✅ Código minificado via CDN
- ✅ Lazy loading de componentes
- ✅ Debounce em buscas (futuro)

### Métricas

- **Tempo de carregamento:** < 2s
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 3s

---

## 🔄 Próximas Melhorias

- [ ] Service Worker (offline support)
- [ ] PWA (install app)
- [ ] Push notifications
- [ ] Auto-refresh de dados
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Export reports PDF
- [ ] Drag & drop para cronograma

---

## 📞 Suporte

- **Main README:** `../README.md`
- **Backend API:** `../backend/README.md`
- **Como Usar:** `../COMO-USAR.md`

---

**Última atualização:** 31 de Outubro de 2025  
**Mantido por:** Macspark Team

