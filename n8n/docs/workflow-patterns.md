# 🎯 Workflow Patterns - n8n

Padrões recomendados para desenvolvimento de workflows no projeto Sabrina Costa.

## 📋 Índice

1. [Error Handling Pattern](#error-handling-pattern)
2. [Retry Pattern](#retry-pattern)
3. [Validation Pattern](#validation-pattern)
4. [Logging Pattern](#logging-pattern)
5. [Testing Pattern](#testing-pattern)

---

## 1. Error Handling Pattern

### Problema
Workflows sem tratamento de erro falham silenciosamente ou param completamente.

### Solução
Implementar error handler global em todos workflows.

### Implementação

```javascript
// Error Handler Node
const error = $json.error || $input.item.json.error;
const workflow = $workflow.name;
const timestamp = new Date().toISOString();

// Log estruturado
console.error(JSON.stringify({
  workflow,
  timestamp,
  error: error.message,
  stack: error.stack,
  execution_id: $execution.id
}));

// Notificar se crítico
if (error.critical || $env.ENABLE_MONITORING === 'true') {
  return [{
    json: {
      message: `🚨 Erro Crítico\\n${workflow}\\n${error.message}`,
      number: $env.ADMIN_WHATSAPP
    }
  }];
}

return [];
```

### Configurações do Nó
- `continueOnFail`: `true`
- `alwaysOutputData`: `true`
- Conectar como fallback de nós HTTP

---

## 2. Retry Pattern

### Problema
Requisições HTTP falhando por problemas temporários de rede.

### Solução
Retry automático com backoff exponencial.

### Implementação

```json
{
  "name": "HTTP Request com Retry",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "={{$env.API_BASE_URL}}/api/endpoint",
    "options": {
      "retry": {
        "maxRetries": 3,
        "retryOnStatusCodes": [408, 429, 500, 502, 503, 504],
        "waitBetweenRetries": 1000,
        "backoffMultiplier": 2
      },
      "timeout": 30000
    }
  }
}
```

### Configurações Recomendadas

| Ambiente | Max Retries | Backoff | Timeout |
|----------|-------------|---------|---------|
| Production | 3 | 2x | 30s |
| Development | 1 | 1x | 10s |

---

## 3. Validation Pattern

### Problema
Dados inválidos processados causam erros downstream.

### Solução
Validar todos inputs antes de processar.

### Implementação

```javascript
// Validation Node
function validateInput(data) {
  const errors = [];
  
  // Required fields
  const required = ['date', 'value', 'metric'];
  required.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Type validation
  if (data.value && typeof data.value !== 'number') {
    errors.push('Value must be number');
  }
  
  // Business rules
  if (data.value < 0) {
    errors.push('Value cannot be negative');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    data
  };
}

const result = validateInput($json);

if (!result.valid) {
  console.error('Validation failed:', result.errors);
  throw new Error(`Validation failed: ${result.errors.join(', ')}`);
}

return [{ json: result.data }];
```

### Template Pronto
Use `templates/data-validator.json` para validações genéricas.

---

## 4. Logging Pattern

### Problema
Logs inconsistentes dificultam debugging.

### Solução
Logging estruturado em JSON para todos eventos.

### Implementação

```javascript
// Structured Logging
function log(level, message, metadata = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level, // 'debug', 'info', 'warn', 'error'
    workflow: $workflow.name,
    execution_id: $execution.id,
    message,
    metadata: {
      ...metadata,
      environment: $env.ENVIRONMENT,
      node: $node.name
    }
  };
  
  // Console output baseado em level
  switch (level) {
    case 'error':
      console.error(JSON.stringify(logEntry));
      break;
    case 'warn':
      console.warn(JSON.stringify(logEntry));
      break;
    default:
      console.log(JSON.stringify(logEntry));
  }
  
  return logEntry;
}

// Uso
log('info', 'Processo iniciado', { recordCount: $items.length });
log('error', 'Falha na API', { statusCode: 500, endpoint: '/api/metrics' });
```

### Função Pronta
Use `shared/functions/structured-logging.js`.

---

## 5. Testing Pattern

### Problema
Difícil testar workflows sem afetar produção.

### Solução
Ambiente de development separado + dados de teste.

### Estrutura

```
workflows/
├── production/       # Workflows ativos
│   └── 01-processar-metricas.json
└── development/      # Cópias para teste
    └── 01-processar-metricas-dev.json
```

### Implementação

```javascript
// Detectar ambiente
const isProduction = $env.ENVIRONMENT === 'production';

// Usar config apropriada
const apiUrl = isProduction 
  ? $env.API_BASE_URL 
  : 'http://localhost:3000';

const notifyAdmin = isProduction;

// Dados de teste em dev
if (!isProduction) {
  // Usar dados mock
  return [{
    json: {
      date: '2025-10-23',
      ctr: 7.5,
      cpc: 0.09,
      // ... mock data
    }
  }];
}

// Processar dados reais em prod
return $items;
```

### Checklist de Teste

- [ ] Testar com dados válidos
- [ ] Testar com dados inválidos
- [ ] Testar com API offline
- [ ] Testar com timeout
- [ ] Testar retry logic
- [ ] Verificar logs
- [ ] Verificar notificações

---

## 🏗️ Padrões Arquiteturais

### 1. Separation of Concerns
- Cada workflow tem uma responsabilidade única
- Evitar workflows monolíticos
- Usar sub-workflows quando apropriado

### 2. Idempotência
- Executar o mesmo workflow múltiplas vezes produz o mesmo resultado
- Usar IDs únicos para rastreamento
- Evitar side-effects desnecessários

### 3. Graceful Degradation
- Sistema continua funcionando mesmo com falhas parciais
- Usar fallbacks
- Notificar mas não parar completamente

---

## 📝 Nomenclatura

### Workflows
```
Formato: [Projeto]_[Número]_[Nome]
Exemplo: Sabrina_01_ProcessarMetricas
```

### Nós
```
Formato: [Ação] [Recurso]
Exemplos:
- "GET Métricas Hoje"
- "Validar Campos"
- "Enviar WhatsApp"
- "Format Message"
```

### Variáveis
```
Formato: SCREAMING_SNAKE_CASE
Exemplos:
- API_BASE_URL
- WEBHOOK_SECRET
- MAX_RETRIES
```

---

## 🔒 Segurança

### 1. Secrets Management
```javascript
// ❌ ERRADO
const token = 'abc123hardcoded';

// ✅ CORRETO
const token = $env.API_TOKEN;
```

### 2. Input Sanitization
```javascript
// Sempre limpar inputs de webhooks
const cleanInput = {
  date: String($json.date).trim(),
  value: parseFloat($json.value),
  // Remover campos não esperados
};
```

### 3. Rate Limiting
```javascript
// Adicionar delays entre requisições
const delay = 1000; // 1 segundo
await new Promise(resolve => setTimeout(resolve, delay));
```

---

## 📊 Performance

### 1. Batch Processing
```javascript
// Processar em lotes
const batchSize = 10;
const batches = [];

for (let i = 0; i < $items.length; i += batchSize) {
  batches.push($items.slice(i, i + batchSize));
}

return batches.map(batch => ({ json: { items: batch } }));
```

### 2. Caching
```javascript
// Cache em variáveis de workflow
const cache = $workflow.staticData;

if (!cache.data || Date.now() - cache.timestamp > 3600000) {
  // Buscar novos dados
  cache.data = await fetchData();
  cache.timestamp = Date.now();
}

return [{ json: cache.data }];
```

---

## 🎓 Best Practices

1. **Sempre validar inputs**
2. **Sempre logar eventos importantes**
3. **Sempre tratar erros**
4. **Sempre usar retry em requisições HTTP**
5. **Sempre testar em development primeiro**
6. **Sempre documentar mudanças**
7. **Sempre usar variáveis de ambiente**
8. **Sempre limpar dados sensíveis dos logs**

---

## 📚 Recursos

- [Templates Prontos](../templates/)
- [Funções Compartilhadas](../shared/functions/)
- [Exemplos Completos](../workflows/production/)
- [Configurações](../config/)

---

*Última atualização: 23 de Outubro de 2025*

