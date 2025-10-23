# Variáveis de Ambiente - n8n Workflows

Este documento descreve todas as variáveis de ambiente utilizadas nos workflows do n8n.

## 📋 Variáveis Obrigatórias

### API Configuration

| Variável | Descrição | Exemplo | Ambiente |
|----------|-----------|---------|----------|
| `API_BASE_URL` | URL base da API backend | `https://backend.vercel.app` | Prod/Dev |
| `API_TOKEN` | Token JWT para autenticação | `eyJhbGci...` | Prod/Dev |
| `WEBHOOK_SECRET` | Secret para validar webhooks | `abc123...` | Prod/Dev |

### Evolution API (WhatsApp)

| Variável | Descrição | Exemplo | Ambiente |
|----------|-----------|---------|----------|
| `EVOLUTION_API_URL` | URL da Evolution API | `https://qrcode.macspark.dev` | Prod/Dev |
| `EVOLUTION_API_KEY` | API Key da Evolution | `your_key_here` | Prod/Dev |
| `WHATSAPP_NUMBER` | Número principal WhatsApp | `+5531993676989` | Prod/Dev |
| `ADMIN_WHATSAPP` | Número admin para alertas | `+5531993676989` | Prod/Dev |

### Sistema

| Variável | Descrição | Valores | Default |
|----------|-----------|---------|---------|
| `ENVIRONMENT` | Ambiente de execução | `production`, `development` | `production` |
| `LOG_LEVEL` | Nível de log | `debug`, `info`, `warn`, `error` | `info` |
| `ENABLE_MONITORING` | Habilitar monitoramento | `true`, `false` | `true` |

### Configurações de Retry

| Variável | Descrição | Prod | Dev |
|----------|-----------|------|-----|
| `RETRY_MAX_ATTEMPTS` | Máximo de tentativas | `3` | `1` |
| `RETRY_BACKOFF_MULTIPLIER` | Multiplicador de backoff | `2` | `1` |
| `REQUEST_TIMEOUT` | Timeout em ms | `30000` | `10000` |

## 🔐 Secrets (Gerenciados pelo n8n)

Estas variáveis devem ser configuradas como **Environment Variables** no n8n:

```bash
PROD_API_TOKEN=eyJhbGci...
PROD_WEBHOOK_SECRET=57caa76b...
DEV_API_TOKEN=eyJhbGci...
```

## 📝 Como Configurar no n8n

### Via Interface

1. Acessar: https://fluxos.macspark.dev
2. Settings → Environments
3. Adicionar variáveis conforme ambiente

### Via Workflow

Dentro de cada workflow, referenciar com:

```javascript
// Acessar variável
const apiUrl = $env.API_BASE_URL;
const token = $env.API_TOKEN;

// Usar em HTTP Request
{
  "url": "={{$env.API_BASE_URL}}/api/metrics",
  "headers": {
    "Authorization": "Bearer {{$env.API_TOKEN}}"
  }
}
```

## 🔄 Alternância entre Ambientes

Para alternar entre development e production:

1. Duplicar workflow
2. Atualizar referências de variáveis
3. Testar em development primeiro
4. Promover para production quando estável

## 📊 Variáveis Opcionais

| Variável | Descrição | Default |
|----------|-----------|---------|
| `GOOGLE_SHEETS_ID` | ID da planilha Google | - |
| `BACKUP_STORAGE_URL` | URL para backup | - |
| `SLACK_WEBHOOK_URL` | Webhook Slack | - |
| `EMAIL_SMTP_HOST` | Host SMTP | - |
| `EMAIL_SMTP_PORT` | Porta SMTP | `587` |

## 🚨 Segurança

⚠️ **NUNCA** commitar valores reais de secrets no Git!

- Use `{{secrets.VARIABLE_NAME}}` para secrets sensíveis
- Mantenha backups seguros das variáveis de produção
- Rotacione tokens regularmente
- Use tokens diferentes para dev e prod

