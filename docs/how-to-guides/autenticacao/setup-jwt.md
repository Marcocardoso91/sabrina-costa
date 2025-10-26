# 🔐 Setup JWT - Autenticação

> **Tempo estimado:** 10 minutos  
> **Pré-requisitos:** Backend deployado

Este guia te ensina a configurar e gerenciar autenticação JWT no sistema, incluindo criação de tokens, renovação e troubleshooting.

---

## 🎯 **O que você vai aprender**

✅ Como funciona JWT no sistema  
✅ Configurar JWT_SECRET  
✅ Criar e validar tokens  
✅ Renovar tokens expirados  
✅ Troubleshooting de autenticação  

---

## 🔧 **Configuração Básica**

### 1.1 JWT_SECRET

O JWT_SECRET é usado para assinar e verificar tokens. **Nunca compartilhe este valor!**

**Configuração atual:**
```bash
JWT_SECRET=ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
JWT_EXPIRES_IN=7d
```

**Para gerar novo secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64

# Online (não recomendado para produção)
# https://generate-secret.vercel.app/64
```

### 1.2 Estrutura do Token

```javascript
// Payload do JWT
{
  "userId": 1,
  "email": "gerente@macspark.dev",
  "role": "admin",
  "iat": 1698086400,  // Issued at
  "exp": 1698691200   // Expires at (7 dias)
}
```

---

## 🔑 **Criar Token de Login**

### 2.1 Endpoint de Login

**POST** `/api/auth/login`

```javascript
// Request
{
  "email": "gerente@macspark.dev",
  "password": "Sabrina2025!"
}

// Response (sucesso)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "gerente@macspark.dev",
    "name": "Marco",
    "role": "admin"
  }
}

// Response (erro)
{
  "success": false,
  "error": "Credenciais inválidas"
}
```

### 2.2 Exemplo com cURL

```bash
# Login
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "gerente@macspark.dev",
    "password": "Sabrina2025!"
  }'

# Resposta
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2VyZW50ZUBtYWNzcGFyay5kZXYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTgwODY0MDAsImV4cCI6MTY5ODY5MTIwMH0.signature",
  "user": {
    "id": 1,
    "email": "gerente@macspark.dev",
    "name": "Marco",
    "role": "admin"
  }
}
```

### 2.3 Exemplo com JavaScript

```javascript
// Login e armazenar token
async function login(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Armazenar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}

// Uso
login('gerente@macspark.dev', 'Sabrina2025!')
  .then(data => console.log('Login realizado:', data))
  .catch(error => console.error('Erro:', error));
```

---

## 🔄 **Renovar Token**

### 3.1 Endpoint de Renovação

**POST** `/api/auth/refresh`

```javascript
// Request (token no header)
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (sucesso)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Novo token
  "user": {
    "id": 1,
    "email": "gerente@macspark.dev",
    "name": "Marco",
    "role": "admin"
  }
}

// Response (erro - token expirado)
{
  "success": false,
  "error": "Token expirado"
}
```

### 3.2 Implementação Automática

```javascript
// Função para renovar token automaticamente
async function refreshToken() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Token não encontrado');
  }
  
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Atualizar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } else {
      // Token expirado, redirecionar para login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    throw error;
  }
}
```

### 3.3 Interceptor Axios

```javascript
// Configurar interceptor para renovação automática
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshToken();
        // Retry da requisição original
        return axios.request(error.config);
      } catch (refreshError) {
        // Redirecionar para login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 🔍 **Validar Token**

### 4.1 Endpoint de Validação

**GET** `/api/auth/me`

```javascript
// Request (token no header)
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (sucesso)
{
  "success": true,
  "user": {
    "id": 1,
    "email": "gerente@macspark.dev",
    "name": "Marco",
    "role": "admin"
  }
}

// Response (erro)
{
  "success": false,
  "error": "Token inválido"
}
```

### 4.2 Verificar se Usuário está Logado

```javascript
// Função para verificar autenticação
async function checkAuth() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false;
  }
  
  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.user;
    } else {
      // Token inválido, limpar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
}

// Uso
checkAuth().then(user => {
  if (user) {
    console.log('Usuário logado:', user);
  } else {
    console.log('Usuário não logado');
    window.location.href = '/login';
  }
});
```

---

## 🛡️ **Middleware de Autenticação**

### 5.1 Como Funciona

O middleware `authenticateJWT` é aplicado em todas as rotas protegidas:

```javascript
// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Token de acesso requerido' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Token inválido ou expirado' 
      });
    }
    
    req.user = user;
    next();
  });
};
```

### 5.2 Aplicar em Rotas

```javascript
// Exemplo de uso
app.get('/api/metrics', authenticateJWT, getMetrics);
app.post('/api/metrics', authenticateJWT, createMetric);
app.put('/api/metrics/:id', authenticateJWT, updateMetric);
app.delete('/api/metrics/:id', authenticateJWT, deleteMetric);
```

---

## 🆘 **Troubleshooting**

### ❌ **Token inválido**

**Possíveis causas:**
1. **JWT_SECRET incorreto**
   ```bash
   # Verificar no Vercel Dashboard
   # Deve ser: ow9wgWFB1MGmEddVcSg7jUPgFYiF30jnph1nW1BCAF8=
   ```

2. **Token expirado**
   ```javascript
   // Verificar expiração
   const token = localStorage.getItem('token');
   const payload = JSON.parse(atob(token.split('.')[1]));
   console.log('Expira em:', new Date(payload.exp * 1000));
   ```

3. **Token malformado**
   ```javascript
   // Verificar formato
   const token = localStorage.getItem('token');
   const parts = token.split('.');
   console.log('Partes do token:', parts.length); // Deve ser 3
   ```

**Solução:**
1. Verificar JWT_SECRET no Vercel
2. Fazer novo login
3. Verificar formato do token
4. Limpar localStorage e tentar novamente

### ❌ **Login não funciona**

**Possíveis causas:**
1. **Credenciais incorretas**
   ```bash
   # Testar com cURL
   curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'
   ```

2. **Usuário não existe**
   ```sql
   -- Verificar no Supabase
   SELECT * FROM users WHERE email = 'gerente@macspark.dev';
   ```

3. **Senha incorreta**
   ```sql
   -- Verificar hash da senha
   SELECT password FROM users WHERE email = 'gerente@macspark.dev';
   ```

**Solução:**
1. Verificar credenciais
2. Confirmar usuário no banco
3. Testar com cURL
4. Verificar logs do backend

### ❌ **Token expira muito rápido**

**Configuração atual:**
```bash
JWT_EXPIRES_IN=7d  # 7 dias
```

**Para alterar:**
1. **Vercel Dashboard:** Environment Variables
2. **Alterar:** `JWT_EXPIRES_IN=30d` (30 dias)
3. **Redeploy** do backend

**Opções de expiração:**
- `1h` - 1 hora
- `1d` - 1 dia
- `7d` - 7 dias
- `30d` - 30 dias
- `90d` - 90 dias

---

## 🔧 **Configurações Avançadas**

### 6.1 Múltiplos Usuários

**Criar novo usuário:**
```sql
-- Inserir no Supabase
INSERT INTO users (email, password, name, role) 
VALUES (
  'novo@exemplo.com',
  '$2b$10$hash_da_senha',
  'Novo Usuário',
  'user'
);
```

**Hash da senha:**
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('NovaSenha123!', 10);
console.log(hashedPassword);
```

### 6.2 Roles e Permissões

**Estrutura atual:**
```javascript
// Roles disponíveis
const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  viewer: ['read']
};
```

**Middleware de autorização:**
```javascript
const authorize = (permissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = roles[userRole];
    
    if (!permissions.every(permission => userPermissions.includes(permission))) {
      return res.status(403).json({
        success: false,
        error: 'Permissão insuficiente'
      });
    }
    
    next();
  };
};

// Uso
app.delete('/api/metrics/:id', 
  authenticateJWT, 
  authorize(['delete']), 
  deleteMetric
);
```

---

## ✅ **Checklist Final**

- [ ] JWT_SECRET configurado
- [ ] Login funcionando
- [ ] Token sendo criado
- [ ] Validação funcionando
- [ ] Renovação automática
- [ ] Middleware aplicado
- [ ] Logout funcionando
- [ ] Tratamento de erros
- [ ] Interceptor configurado
- [ ] Testes realizados

---

## 🎯 **Próximos Passos**

1. **[🔄 Refresh Tokens](refresh-tokens.md)** - Renovação automática
2. **[🛡️ Segurança](explanation/security.md)** - Políticas de segurança
3. **[🔧 API Reference](reference/api/authentication.md)** - Documentação completa

---

## 📞 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev

---

**🔐 Perfeito! Sua autenticação JWT está configurada e funcionando. Agora você tem controle total sobre acesso e segurança do sistema.**
