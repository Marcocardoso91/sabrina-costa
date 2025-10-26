# 🔌 API Reference - Dashboard Sabrina Costa

> **Versão:** 1.0.0 | **Base URL:** `https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api`

Documentação completa da API REST do Dashboard Sabrina Costa. Todos os endpoints, parâmetros, respostas e exemplos práticos.

---

## 🚀 **Quick Start**

### Base URLs

```bash
# Produção
https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api

# Desenvolvimento (se configurado)
http://localhost:3000/api
```

### Autenticação

```bash
# Header obrigatório para rotas protegidas
Authorization: Bearer YOUR_JWT_TOKEN
```

### Exemplo Rápido

```bash
# 1. Fazer login
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@macspark.dev","password":"Sabrina2025!"}'

# 2. Usar token em requisições
curl https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 **Índice de Endpoints**

### 🔐 **Autenticação**
- [POST /auth/login](authentication.md#post-authlogin) - Fazer login
- [POST /auth/logout](authentication.md#post-authlogout) - Fazer logout
- [GET /auth/me](authentication.md#get-authme) - Verificar usuário atual
- [POST /auth/refresh](authentication.md#post-authrefresh) - Renovar token

### 📊 **Métricas**
- [GET /metrics](metrics.md#get-metrics) - Listar métricas
- [POST /metrics](metrics.md#post-metrics) - Criar métrica
- [PUT /metrics/:id](metrics.md#put-metricsid) - Atualizar métrica
- [DELETE /metrics/:id](metrics.md#delete-metricsid) - Deletar métrica
- [GET /metrics/summary](metrics.md#get-metricssummary) - Resumo das métricas

### 📅 **Cronograma**
- [GET /schedule](schedule.md#get-schedule) - Listar posts
- [POST /schedule](schedule.md#post-schedule) - Criar post
- [PUT /schedule/:id](schedule.md#put-scheduleid) - Atualizar post
- [DELETE /schedule/:id](schedule.md#delete-scheduleid) - Deletar post

### 🚨 **Alertas**
- [GET /alerts](alerts.md#get-alerts) - Listar alertas
- [POST /alerts](alerts.md#post-alerts) - Criar alerta
- [PUT /alerts/config](alerts.md#put-alertsconfig) - Configurar alertas
- [GET /alerts/config](alerts.md#get-alertsconfig) - Obter configuração

### 🎣 **Ganchos Virais**
- [GET /hooks](hooks.md#get-hooks) - Listar ganchos
- [POST /hooks](hooks.md#post-hooks) - Criar gancho
- [PUT /hooks/:id](hooks.md#put-hooksid) - Atualizar gancho
- [DELETE /hooks/:id](hooks.md#delete-hooksid) - Deletar gancho
- [PUT /hooks/:id/increment](hooks.md#put-hooksidincrement) - Incrementar uso
- [GET /hooks/categories/list](hooks.md#get-hookscategorieslist) - Listar categorias

### 🔗 **Webhooks**
- [POST /webhook/metrics](webhook.md#post-webhookmetrics) - Receber métricas
- [POST /webhook/metrics/csv](webhook.md#post-webhookmetricscsv) - Receber CSV

### ⚙️ **Configurações**
- [GET /config](config.md#get-config) - Listar configurações
- [GET /config/:key](config.md#get-configkey) - Obter configuração
- [PUT /config](config.md#put-config) - Atualizar configuração

---

## 🔧 **Configuração**

### Headers Padrão

```bash
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
X-Webhook-Token: YOUR_WEBHOOK_SECRET  # Para webhooks
```

### Rate Limiting

```bash
# Limites gerais
100 requests por minuto por IP

# Headers de resposta
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698086400
```

### Códigos de Resposta

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Token inválido ou ausente |
| 403 | Forbidden | Permissão insuficiente |
| 404 | Not Found | Recurso não encontrado |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Erro interno do servidor |

---

## 📝 **Exemplos Práticos**

### JavaScript (Fetch)

```javascript
// Configuração base
const API_BASE_URL = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api';
const token = localStorage.getItem('token');

// Função helper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    },
    ...options
  };
  
  const response = await fetch(url, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }
  
  return data;
}

// Exemplos de uso
const metrics = await apiRequest('/metrics');
const newMetric = await apiRequest('/metrics', {
  method: 'POST',
  body: JSON.stringify({
    date: '2025-10-23',
    ctr: 7.5,
    cpc: 0.09,
    cost: 20.00
  })
});
```

### Python (Requests)

```python
import requests
import json

# Configuração
API_BASE_URL = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api'
token = 'YOUR_JWT_TOKEN'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {token}'
}

# Exemplos
def get_metrics():
    response = requests.get(f'{API_BASE_URL}/metrics', headers=headers)
    return response.json()

def create_metric(data):
    response = requests.post(
        f'{API_BASE_URL}/metrics', 
        headers=headers,
        data=json.dumps(data)
    )
    return response.json()

# Uso
metrics = get_metrics()
print(metrics)
```

### PHP (cURL)

```php
<?php
// Configuração
$apiBaseUrl = 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api';
$token = 'YOUR_JWT_TOKEN';

// Função helper
function apiRequest($endpoint, $method = 'GET', $data = null) {
    global $apiBaseUrl, $token;
    
    $url = $apiBaseUrl . $endpoint;
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Exemplos
$metrics = apiRequest('/metrics');
$newMetric = apiRequest('/metrics', 'POST', [
    'date' => '2025-10-23',
    'ctr' => 7.5,
    'cpc' => 0.09,
    'cost' => 20.00
]);
?>
```

---

## 🔍 **Busca e Filtros**

### Parâmetros de Query

```bash
# Paginação
?page=1&limit=10

# Filtros de data
?start_date=2025-10-01&end_date=2025-10-31

# Ordenação
?sort=date&order=desc

# Busca
?search=instagram

# Filtros específicos
?ctr_min=1.5&cpc_max=0.70
```

### Exemplo Completo

```bash
GET /api/metrics?page=1&limit=20&start_date=2025-10-01&end_date=2025-10-31&sort=date&order=desc&ctr_min=1.5
```

---

## 📊 **Paginação**

### Formato de Resposta

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| page | integer | 1 | Página atual |
| limit | integer | 10 | Itens por página |
| sort | string | id | Campo para ordenação |
| order | string | desc | Direção (asc/desc) |

---

## 🚨 **Tratamento de Erros**

### Formato de Erro

```json
{
  "success": false,
  "error": "Mensagem de erro",
  "code": "ERROR_CODE",
  "details": {
    "field": "Campo com erro",
    "value": "Valor inválido"
  }
}
```

### Códigos de Erro Comuns

| Código | Descrição | Solução |
|--------|-----------|---------|
| INVALID_TOKEN | Token inválido | Fazer novo login |
| EXPIRED_TOKEN | Token expirado | Renovar token |
| INVALID_CREDENTIALS | Credenciais inválidas | Verificar email/senha |
| VALIDATION_ERROR | Dados inválidos | Verificar formato |
| RATE_LIMIT_EXCEEDED | Rate limit excedido | Aguardar e tentar novamente |
| RESOURCE_NOT_FOUND | Recurso não encontrado | Verificar ID |
| PERMISSION_DENIED | Permissão negada | Verificar role do usuário |

---

## 🔧 **SDKs e Bibliotecas**

### JavaScript/Node.js

```bash
# Instalar
npm install axios

# Uso
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const metrics = await api.get('/metrics');
```

### Python

```bash
# Instalar
pip install requests

# Uso
import requests

api = requests.Session()
api.headers.update({
    'Authorization': f'Bearer {token}'
})

response = api.get('https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics')
```

---

## 📚 **Documentação Detalhada**

- **[🔐 Autenticação](authentication.md)** - Login, logout, tokens
- **[📊 Métricas](metrics.md)** - CRUD de métricas
- **[📅 Cronograma](schedule.md)** - Gestão de posts
- **[🚨 Alertas](alerts.md)** - Sistema de alertas
- **[🎣 Ganchos](hooks.md)** - Ganchos virais
- **[🔗 Webhooks](webhook.md)** - Integração n8n
- **[⚙️ Configurações](config.md)** - Configurações do sistema

---

## 🆘 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev
- 📖 **Docs:** [Documentação Completa](../README.md)

---

**🔌 API Reference completa! Use os links acima para acessar a documentação detalhada de cada endpoint.**
