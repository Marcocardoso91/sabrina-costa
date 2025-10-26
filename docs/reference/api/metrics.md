# 📊 Métricas API - Reference

> **Base URL:** `https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics`

Documentação completa dos endpoints de métricas do Instagram, incluindo exemplos práticos em múltiplas linguagens.

---

## 🎯 **Visão Geral**

Os endpoints de métricas permitem gerenciar dados de performance do Instagram, incluindo CTR, CPC, alcance, seguidores e investimento.

**Recursos disponíveis:**
- ✅ Listar métricas com filtros
- ✅ Criar nova métrica
- ✅ Atualizar métrica existente
- ✅ Deletar métrica
- ✅ Resumo estatístico

---

## 📋 **Endpoints**

### **GET** `/metrics` - Listar Métricas

Lista todas as métricas com filtros opcionais e paginação.

#### **Parâmetros de Query**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | integer | 1 | Página atual |
| `limit` | integer | 10 | Itens por página |
| `start_date` | string | - | Data inicial (YYYY-MM-DD) |
| `end_date` | string | - | Data final (YYYY-MM-DD) |
| `sort` | string | date | Campo para ordenação |
| `order` | string | desc | Direção (asc/desc) |
| `ctr_min` | number | - | CTR mínimo |
| `cpc_max` | number | - | CPC máximo |

#### **Headers**

```bash
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

#### **Exemplos Práticos**

##### **Exemplo 1: Listar todas as métricas**

```bash
# cURL
curl -X GET https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

```javascript
// JavaScript (Fetch)
const response = await fetch('/api/metrics', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const metrics = await response.json();
```

```python
# Python (Requests)
import requests

headers = {
    'Authorization': f'Bearer {token}'
}

response = requests.get(
    'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
    headers=headers
)
metrics = response.json()
```

```php
<?php
// PHP (cURL)
$headers = [
    'Authorization: Bearer ' . $token
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$metrics = json_decode($response, true);
?>
```

##### **Exemplo 2: Filtrar por data**

```bash
# cURL - Últimos 30 dias
curl -X GET "https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics?start_date=2025-10-01&end_date=2025-10-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

```javascript
// JavaScript - Filtrar por data
const startDate = '2025-10-01';
const endDate = '2025-10-31';

const response = await fetch(`/api/metrics?start_date=${startDate}&end_date=${endDate}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

##### **Exemplo 3: Paginação**

```bash
# cURL - Página 2, 20 itens
curl -X GET "https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics?page=2&limit=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

```python
# Python - Paginação
def get_metrics_page(page=1, limit=10):
    params = {
        'page': page,
        'limit': limit
    }
    
    response = requests.get(
        'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
        headers=headers,
        params=params
    )
    return response.json()

# Uso
metrics_page_1 = get_metrics_page(page=1, limit=20)
```

##### **Exemplo 4: Ordenação**

```bash
# cURL - Ordenar por CTR decrescente
curl -X GET "https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics?sort=ctr&order=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

##### **Exemplo 5: Filtros de performance**

```bash
# cURL - CTR mínimo 2%, CPC máximo R$0.50
curl -X GET "https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics?ctr_min=2.0&cpc_max=0.50" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

##### **Exemplo 6: Com Axios (JavaScript)**

```javascript
// JavaScript (Axios)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Listar métricas
const metrics = await api.get('/metrics');

// Com filtros
const filteredMetrics = await api.get('/metrics', {
  params: {
    start_date: '2025-10-01',
    end_date: '2025-10-31',
    ctr_min: 2.0,
    sort: 'date',
    order: 'desc'
  }
});
```

##### **Exemplo 7: Com retry logic**

```javascript
// JavaScript - Com retry automático
async function getMetricsWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/metrics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      if (i === maxRetries - 1) {
        throw new Error('Máximo de tentativas excedido');
      }
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}
```

##### **Exemplo 8: Com error handling**

```javascript
// JavaScript - Tratamento de erros
async function getMetrics() {
  try {
    const response = await fetch('/api/metrics', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token inválido - faça login novamente');
      }
      if (response.status === 429) {
        throw new Error('Muitas requisições - aguarde um momento');
      }
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
}
```

##### **Exemplo 9: Batch processing**

```python
# Python - Processar múltiplas páginas
def get_all_metrics():
    all_metrics = []
    page = 1
    limit = 100
    
    while True:
        response = requests.get(
            'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
            headers=headers,
            params={'page': page, 'limit': limit}
        )
        
        data = response.json()
        metrics = data.get('data', [])
        
        if not metrics:
            break
            
        all_metrics.extend(metrics)
        page += 1
        
        # Evitar rate limiting
        time.sleep(0.1)
    
    return all_metrics
```

##### **Exemplo 10: Com cache**

```javascript
// JavaScript - Com cache local
class MetricsCache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutos
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  async getMetrics(filters = {}) {
    const key = JSON.stringify(filters);
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    const response = await fetch(`/api/metrics?${new URLSearchParams(filters)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
}

const metricsCache = new MetricsCache();
const metrics = await metricsCache.getMetrics({ start_date: '2025-10-01' });
```

#### **Resposta de Sucesso**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2025-10-23",
      "reach": 1091,
      "ctr": 7.5,
      "cpc": 0.09,
      "cpm": 2.15,
      "frequency": 1.02,
      "profile_visits": 80,
      "new_followers": 45,
      "cost": 20.00,
      "created_at": "2025-10-23T18:00:00Z",
      "updated_at": "2025-10-23T18:00:00Z"
    }
  ],
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

#### **Resposta de Erro**

```json
{
  "success": false,
  "error": "Token inválido ou expirado",
  "code": "INVALID_TOKEN"
}
```

---

### **POST** `/metrics` - Criar Métrica

Cria uma nova métrica do Instagram.

#### **Headers**

```bash
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

#### **Body (JSON)**

```json
{
  "date": "2025-10-23",
  "reach": 1091,
  "ctr": 7.5,
  "cpc": 0.09,
  "cpm": 2.15,
  "frequency": 1.02,
  "profile_visits": 80,
  "new_followers": 45,
  "cost": 20.00
}
```

#### **Exemplos Práticos**

##### **Exemplo 1: Métrica básica**

```bash
# cURL
curl -X POST https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-23",
    "ctr": 7.5,
    "cpc": 0.09,
    "cost": 20.00
  }'
```

```javascript
// JavaScript (Fetch)
const newMetric = {
  date: '2025-10-23',
  ctr: 7.5,
  cpc: 0.09,
  cost: 20.00
};

const response = await fetch('/api/metrics', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newMetric)
});

const result = await response.json();
```

##### **Exemplo 2: Métrica completa**

```python
# Python - Métrica com todos os campos
metric_data = {
    "date": "2025-10-23",
    "reach": 1091,
    "ctr": 7.5,
    "cpc": 0.09,
    "cpm": 2.15,
    "frequency": 1.02,
    "profile_visits": 80,
    "new_followers": 45,
    "cost": 20.00
}

response = requests.post(
    'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
    headers=headers,
    json=metric_data
)

result = response.json()
```

##### **Exemplo 3: Com validação**

```javascript
// JavaScript - Com validação de dados
function validateMetric(metric) {
  const errors = [];
  
  if (!metric.date) {
    errors.push('Data é obrigatória');
  }
  
  if (metric.ctr && (metric.ctr < 0 || metric.ctr > 100)) {
    errors.push('CTR deve estar entre 0 e 100');
  }
  
  if (metric.cpc && metric.cpc < 0) {
    errors.push('CPC deve ser positivo');
  }
  
  if (metric.cost && metric.cost < 0) {
    errors.push('Custo deve ser positivo');
  }
  
  return errors;
}

async function createMetric(metric) {
  const errors = validateMetric(metric);
  if (errors.length > 0) {
    throw new Error(`Dados inválidos: ${errors.join(', ')}`);
  }
  
  const response = await fetch('/api/metrics', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metric)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar métrica');
  }
  
  return await response.json();
}
```

##### **Exemplo 4: Com tratamento de erro**

```python
# Python - Com tratamento de erro
def create_metric_safe(metric_data):
    try:
        response = requests.post(
            'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
            headers=headers,
            json=metric_data
        )
        
        if response.status_code == 201:
            return response.json()
        elif response.status_code == 400:
            error_data = response.json()
            raise ValueError(f"Dados inválidos: {error_data.get('error')}")
        elif response.status_code == 401:
            raise ValueError("Token inválido - faça login novamente")
        else:
            raise ValueError(f"Erro {response.status_code}: {response.text}")
            
    except requests.exceptions.RequestException as e:
        raise ValueError(f"Erro de conexão: {e}")
```

##### **Exemplo 5: Batch insert**

```javascript
// JavaScript - Inserir múltiplas métricas
async function createMultipleMetrics(metrics) {
  const results = [];
  
  for (const metric of metrics) {
    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metric)
      });
      
      if (response.ok) {
        const result = await response.json();
        results.push({ success: true, data: result });
      } else {
        const error = await response.json();
        results.push({ success: false, error: error.error });
      }
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
    
    // Evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

// Uso
const metrics = [
  { date: '2025-10-23', ctr: 7.5, cpc: 0.09, cost: 20.00 },
  { date: '2025-10-24', ctr: 8.2, cpc: 0.08, cost: 25.00 }
];

const results = await createMultipleMetrics(metrics);
```

##### **Exemplo 6: Com retry logic**

```python
# Python - Com retry automático
import time
from functools import wraps

def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    time.sleep(delay * (attempt + 1))
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def create_metric_with_retry(metric_data):
    response = requests.post(
        'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
        headers=headers,
        json=metric_data
    )
    response.raise_for_status()
    return response.json()
```

##### **Exemplo 7: Com formatação de data**

```javascript
// JavaScript - Formatação automática de data
function formatMetricData(rawData) {
  const metric = { ...rawData };
  
  // Formatar data se necessário
  if (metric.date instanceof Date) {
    metric.date = metric.date.toISOString().split('T')[0];
  }
  
  // Arredondar números decimais
  if (metric.ctr) metric.ctr = Math.round(metric.ctr * 100) / 100;
  if (metric.cpc) metric.cpc = Math.round(metric.cpc * 100) / 100;
  if (metric.cost) metric.cost = Math.round(metric.cost * 100) / 100;
  
  return metric;
}

// Uso
const rawData = {
  date: new Date(),
  ctr: 7.56789,
  cpc: 0.09123,
  cost: 20.456
};

const formattedData = formatMetricData(rawData);
const result = await createMetric(formattedData);
```

##### **Exemplo 8: Com validação de negócio**

```python
# Python - Validações de negócio
def validate_business_rules(metric):
    errors = []
    
    # CTR deve estar entre 0.1% e 50%
    if metric.get('ctr') and (metric['ctr'] < 0.1 or metric['ctr'] > 50):
        errors.append('CTR deve estar entre 0.1% e 50%')
    
    # CPC deve ser positivo
    if metric.get('cpc') and metric['cpc'] <= 0:
        errors.append('CPC deve ser positivo')
    
    # Custo deve ser positivo
    if metric.get('cost') and metric['cost'] <= 0:
        errors.append('Custo deve ser positivo')
    
    # Data não pode ser futura
    if metric.get('date'):
        from datetime import datetime, date
        metric_date = datetime.strptime(metric['date'], '%Y-%m-%d').date()
        if metric_date > date.today():
            errors.append('Data não pode ser futura')
    
    return errors

def create_metric_with_validation(metric_data):
    errors = validate_business_rules(metric_data)
    if errors:
        raise ValueError(f"Regras de negócio violadas: {'; '.join(errors)}")
    
    response = requests.post(
        'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
        headers=headers,
        json=metric_data
    )
    
    if response.status_code == 201:
        return response.json()
    else:
        error_data = response.json()
        raise ValueError(f"Erro ao criar métrica: {error_data.get('error')}")
```

##### **Exemplo 9: Com logging**

```javascript
// JavaScript - Com logging detalhado
class MetricsLogger {
  constructor() {
    this.logs = [];
  }
  
  log(level, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
    
    this.logs.push(logEntry);
    console.log(`[${level.toUpperCase()}] ${message}`, data);
  }
  
  async createMetric(metric) {
    this.log('info', 'Iniciando criação de métrica', metric);
    
    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metric)
      });
      
      if (response.ok) {
        const result = await response.json();
        this.log('success', 'Métrica criada com sucesso', result);
        return result;
      } else {
        const error = await response.json();
        this.log('error', 'Erro ao criar métrica', error);
        throw new Error(error.error);
      }
    } catch (error) {
      this.log('error', 'Exceção ao criar métrica', error.message);
      throw error;
    }
  }
}

const logger = new MetricsLogger();
const result = await logger.createMetric(metric);
```

##### **Exemplo 10: Com cache de validação**

```python
# Python - Cache de validações
from functools import lru_cache
import re

@lru_cache(maxsize=128)
def validate_date_format(date_string):
    """Valida formato de data YYYY-MM-DD"""
    pattern = r'^\d{4}-\d{2}-\d{2}$'
    return bool(re.match(pattern, date_string))

@lru_cache(maxsize=128)
def validate_number_range(value, min_val, max_val):
    """Valida se número está no range"""
    return min_val <= value <= max_val

def create_metric_with_cached_validation(metric_data):
    # Validações com cache
    if not validate_date_format(metric_data.get('date', '')):
        raise ValueError('Formato de data inválido (use YYYY-MM-DD)')
    
    if metric_data.get('ctr') and not validate_number_range(metric_data['ctr'], 0, 100):
        raise ValueError('CTR deve estar entre 0 e 100')
    
    # Criar métrica
    response = requests.post(
        'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics',
        headers=headers,
        json=metric_data
    )
    
    return response.json()
```

#### **Resposta de Sucesso**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "date": "2025-10-23",
    "reach": 1091,
    "ctr": 7.5,
    "cpc": 0.09,
    "cpm": 2.15,
    "frequency": 1.02,
    "profile_visits": 80,
    "new_followers": 45,
    "cost": 20.00,
    "created_at": "2025-10-23T18:00:00Z",
    "updated_at": "2025-10-23T18:00:00Z"
  }
}
```

#### **Resposta de Erro**

```json
{
  "success": false,
  "error": "Dados inválidos",
  "details": {
    "field": "ctr",
    "value": 150.5,
    "message": "CTR deve estar entre 0 e 100"
  }
}
```

---

### **PUT** `/metrics/:id` - Atualizar Métrica

Atualiza uma métrica existente.

#### **Parâmetros**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `id` | integer | Sim | ID da métrica |

#### **Exemplos Práticos**

##### **Exemplo 1: Atualização básica**

```bash
# cURL
curl -X PUT https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ctr": 8.2,
    "cpc": 0.08
  }'
```

##### **Exemplo 2: Atualização parcial**

```javascript
// JavaScript - Atualizar apenas campos específicos
async function updateMetric(id, updates) {
  const response = await fetch(`/api/metrics/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return await response.json();
}

// Uso
const updates = {
  ctr: 8.2,
  cpc: 0.08,
  new_followers: 50
};

const result = await updateMetric(1, updates);
```

##### **Exemplo 3: Atualização com validação**

```python
# Python - Com validação antes da atualização
def update_metric_safe(metric_id, updates):
    # Validar campos obrigatórios
    required_fields = ['date']
    for field in required_fields:
        if field not in updates:
            raise ValueError(f"Campo obrigatório '{field}' não fornecido")
    
    # Validar ranges
    if 'ctr' in updates and not (0 <= updates['ctr'] <= 100):
        raise ValueError('CTR deve estar entre 0 e 100')
    
    response = requests.put(
        f'https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics/{metric_id}',
        headers=headers,
        json=updates
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        error_data = response.json()
        raise ValueError(f"Erro ao atualizar métrica: {error_data.get('error')}")
```

---

### **DELETE** `/metrics/:id` - Deletar Métrica

Remove uma métrica do sistema.

#### **Exemplos Práticos**

##### **Exemplo 1: Deletar métrica**

```bash
# cURL
curl -X DELETE https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

##### **Exemplo 2: Deletar com confirmação**

```javascript
// JavaScript - Com confirmação
async function deleteMetricWithConfirmation(id) {
  const confirmed = confirm(`Tem certeza que deseja deletar a métrica ${id}?`);
  
  if (!confirmed) {
    return { cancelled: true };
  }
  
  const response = await fetch(`/api/metrics/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    return { success: true };
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
}
```

---

### **GET** `/metrics/summary` - Resumo das Métricas

Retorna estatísticas resumidas das métricas.

#### **Exemplos Práticos**

##### **Exemplo 1: Resumo básico**

```bash
# cURL
curl -X GET https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app/api/metrics/summary \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

##### **Exemplo 2: Resumo com filtros**

```javascript
// JavaScript - Resumo com filtros de data
async function getMetricsSummary(startDate, endDate) {
  const params = new URLSearchParams();
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  
  const response = await fetch(`/api/metrics/summary?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
}

// Uso
const summary = await getMetricsSummary('2025-10-01', '2025-10-31');
```

#### **Resposta de Sucesso**

```json
{
  "success": true,
  "data": {
    "total_records": 150,
    "date_range": {
      "start": "2025-10-01",
      "end": "2025-10-31"
    },
    "averages": {
      "ctr": 6.8,
      "cpc": 0.12,
      "cpm": 3.45,
      "frequency": 1.15
    },
    "totals": {
      "reach": 45000,
      "profile_visits": 3200,
      "new_followers": 1200,
      "cost": 1500.00
    },
    "performance": {
      "best_day": "2025-10-15",
      "best_ctr": 12.5,
      "best_cpc": 0.05,
      "worst_day": "2025-10-08",
      "worst_ctr": 2.1,
      "worst_cpc": 0.25
    }
  }
}
```

---

## 🆘 **Troubleshooting**

### **Erros Comuns**

#### **401 Unauthorized**
```json
{
  "success": false,
  "error": "Token inválido ou expirado",
  "code": "INVALID_TOKEN"
}
```

**Solução:**
1. Verificar se token está correto
2. Fazer novo login
3. Verificar se token não expirou

#### **400 Bad Request**
```json
{
  "success": false,
  "error": "Dados inválidos",
  "details": {
    "field": "ctr",
    "value": 150.5,
    "message": "CTR deve estar entre 0 e 100"
  }
}
```

**Solução:**
1. Verificar formato dos dados
2. Validar ranges (CTR: 0-100, CPC: >0)
3. Confirmar tipos de dados

#### **404 Not Found**
```json
{
  "success": false,
  "error": "Métrica não encontrada",
  "code": "RESOURCE_NOT_FOUND"
}
```

**Solução:**
1. Verificar se ID existe
2. Confirmar se usuário tem acesso
3. Verificar se métrica não foi deletada

#### **429 Too Many Requests**
```json
{
  "success": false,
  "error": "Muitas requisições, tente novamente em 1 minuto",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

**Solução:**
1. Aguardar 1 minuto
2. Implementar retry logic
3. Reduzir frequência de requests

---

## 📚 **Referências**

- **[🔐 Autenticação](authentication.md)** - Como fazer login
- **[📅 Cronograma](schedule.md)** - Gestão de posts
- **[🚨 Alertas](alerts.md)** - Sistema de alertas
- **[🎣 Ganchos](hooks.md)** - Ganchos virais

---

## 📞 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev
- 📖 **Docs:** [Documentação Completa](../README.md)

---

**📊 API de Métricas completa! Use os exemplos acima para integrar com seu sistema.**
