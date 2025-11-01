# 🔧 Guia de Configuração de APIs
## Integração com Gemini, Meta Ads, Instagram e WhatsApp

**Versão:** 1.0.0  
**Data:** 01/11/2025  
**Atualizado:** 01/11/2025

---

## 📋 Índice

1. [APIs Necessárias](#apis-necessárias)
2. [Gemini Pro (Google) - GRATUITO](#gemini-pro-google)
3. [ChatGPT Pro - JÁ ASSINADO](#chatgpt-pro)
4. [Claude Pro - JÁ ASSINADO](#claude-pro)
5. [Meta Ads API](#meta-ads-api)
6. [Instagram Graph API](#instagram-graph-api)
7. [Evolution API (WhatsApp) - JÁ CONFIGURADO](#evolution-api)
8. [Variáveis de Ambiente](#variáveis-de-ambiente)
9. [Testando APIs](#testando-apis)

---

## 🎯 APIs Necessárias

### Obrigatórias (Uso Imediato)

| API | Status | Custo | Prioridade |
|-----|--------|-------|------------|
| **Evolution API** | ✅ Configurado | R$ 0 | Alta |
| **Gemini Pro** | ⚠️ Configurar | R$ 0 (grátis) | Alta |
| **ChatGPT Pro** | ✅ Assinado | R$ 0 (já pago) | Alta |
| **Claude Pro** | ✅ Assinado | R$ 0 (já pago) | Alta |

### Opcionais (Configurar Depois)

| API | Status | Custo | Prioridade |
|-----|--------|-------|------------|
| **Meta Ads API** | ⚠️ Configurar | R$ 0 | Média |
| **Instagram Graph API** | ⚠️ Configurar | R$ 0 | Média |
| **OpenAI API** | ⚠️ Configurar | ~R$ 2-5/mês | Baixa (backup) |

---

## 🔵 Gemini Pro (Google)

### Por que usar?

- ✅ **GRATUITO** (60 requests/minuto)
- ✅ Ótimo para legendas
- ✅ Rápido
- ✅ Sem custo

### Como Configurar

#### 1. Criar conta Google AI Studio

1. Acessar: https://aistudio.google.com/
2. Fazer login com sua conta Google
3. Aceitar termos de serviço

#### 2. Gerar API Key

1. Clicar em "Get API Key"
2. Copiar a chave (formato: `AIza...`)
3. Guardar em local seguro

#### 3. Testar API

```bash
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=SUA_API_KEY \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts":[{"text": "Olá, como você está?"}]
    }]
  }'
```

#### 4. Adicionar ao .env

```bash
# backend/.env
GEMINI_API_KEY=AIza...sua-chave-aqui
GEMINI_MODEL=gemini-pro
```

#### 5. Configurar no N8N

No workflow `06-gerar-legendas-ia.json`, substituir o código placeholder por:

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  }
);

const data = await response.json();
const caption = data.candidates[0].content.parts[0].text;
```

### Limites

- **Gratuito:** 60 requests/minuto
- **Custo:** R$ 0
- **Uso estimado:** 10-20 requests/semana
- **Status:** ✅ Muito abaixo do limite

---

## 💬 ChatGPT Pro

### Por que usar?

- ✅ **Já assinado** (plano Pro)
- ✅ Uso ilimitado
- ✅ GPT-4o incluído
- ✅ Custo: R$ 0 (já pago)

### Como Configurar

#### 1. Usar via Interface Web (Recomendado)

- Não precisa configurar nada
- Use manualmente quando quiser gerar conteúdo de forma rápida
- Copie e cole resultados

#### 2. Usar via API (Opcional - Pago)

Se quiser automatizar via API (custo extra):

```bash
# Obter API Key em: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...sua-chave
```

**Custo:** ~R$ 0.50-2/mês se usar API (além da assinatura Pro)

**Recomendação:** Use Gemini Pro gratuito primeiro, ChatGPT Pro como backup manual.

---

## 🤖 Claude Pro

### Por que usar?

- ✅ **Já assinado** (plano Pro)
- ✅ Claude 3.5 Sonnet incluído
- ✅ Excelente para análises complexas
- ✅ Custo: R$ 0 (já pago)

### Como Usar

#### 1. Via Interface Web (Recomendado)

- Acessar: https://claude.ai
- Usar para análises semanais, recomendações
- Copiar resultados para o sistema

#### 2. Via API (Opcional)

Se quiser automatizar:

1. Gerar API Key em: https://console.anthropic.com/
2. Adicionar ao .env:
```bash
CLAUDE_API_KEY=sk-ant-...sua-chave
```

**Custo:** R$ 0 se usar via assinatura Pro, ou ~R$ 1-3/mês via API

**Uso ideal:**
- Workflow 12 (Busca Semanal): Use Claude Pro
- Análises complexas

---

## 📱 Meta Ads API

### Por que configurar?

- Ler performance de campanhas
- Pausar/ativar campanhas (com sua aprovação)
- Otimizar automaticamente

### Como Configurar

#### 1. Criar Meta App

1. Acessar: https://developers.facebook.com/apps/
2. Clicar em "Create App"
3. Tipo: Business
4. Nome: "Sabrina Costa Dashboard"
5. Email de contato: seu email

#### 2. Adicionar Produtos

1. No painel do app, adicionar:
   - Marketing API
   - Instagram Graph API

#### 3. Configurar Permissões

Permissões necessárias:
- `ads_read` - Ler campanhas
- `ads_management` - Pausar/ativar campanhas (após aprovação)

#### 4. Gerar Access Token

1. Ir em Tools > Access Token Tool
2. Gerar Token com permissões:
   - `ads_read`
   - `ads_management`
3. Copiar o token (formato: `EAA...`)

**⚠️ Importante:** Token expira em 60 dias. Precisará renovar.

#### 5. Obter IDs

```bash
# Ad Account ID
# Formato: act_123456789
# Encontrar em: Meta Ads Manager > Settings

AD_ACCOUNT_ID=act_...seu-id
```

#### 6. Adicionar ao .env

```bash
# backend/.env
META_ADS_ACCESS_TOKEN=EAA...seu-token
META_ADS_APP_ID=...seu-app-id
META_ADS_APP_SECRET=...seu-app-secret
META_ADS_AD_ACCOUNT_ID=act_...
```

#### 7. Testar API

```bash
curl -G \
  -d "access_token=SEU_TOKEN" \
  "https://graph.facebook.com/v18.0/act_SEU_AD_ACCOUNT_ID/campaigns"
```

---

## 📸 Instagram Graph API

### Por que configurar?

- Ler número de seguidores (Reels Fund Tracker)
- Ler comentários (Análise de Sentimento)
- Ler métricas de posts

### Como Configurar

#### 1. Pré-requisitos

- ✅ Conta Instagram Business (converter se necessário)
- ✅ Página Facebook vinculada
- ✅ Meta App criado (acima)

#### 2. Conectar Instagram ao App

1. No painel do Meta App
2. Ir em Instagram > Basic Display
3. Adicionar conta Instagram Business
4. Autorizar permissões

#### 3. Permissões Necessárias

- `instagram_basic` - Dados básicos
- `instagram_manage_insights` - Métricas

**NÃO precisa:**
- ❌ `instagram_content_publish` - Não vamos postar automaticamente
- ❌ `instagram_manage_comments` - Não vamos responder automaticamente

#### 4. Gerar Long-Lived Token

```bash
# 1. Gerar token curto (via Graph API Explorer)
# 2. Trocar por long-lived (60 dias)

curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=SEU_APP_ID&client_secret=SEU_APP_SECRET&fb_exchange_token=SEU_SHORT_TOKEN"
```

#### 5. Adicionar ao .env

```bash
# backend/.env
INSTAGRAM_ACCESS_TOKEN=...long-lived-token
INSTAGRAM_BUSINESS_ACCOUNT_ID=...seu-id
```

#### 6. Testar API

```bash
# Buscar número de seguidores
curl -G \
  -d "fields=followers_count,username" \
  -d "access_token=SEU_TOKEN" \
  "https://graph.facebook.com/v18.0/SEU_INSTAGRAM_ID"
```

**Resultado esperado:**
```json
{
  "followers_count": 880,
  "username": "sabrinacosta",
  "id": "..."
}
```

---

## 💬 Evolution API (WhatsApp)

### Status

✅ **JÁ CONFIGURADO** (conforme documentação anterior)

### Verificar Configuração

```bash
# Testar Evolution API
curl https://evolution-api.example.com/health

# Testar envio
curl -X POST https://evolution-api.example.com/message/sendText/INSTANCE \
  -H "apikey: SUA_APIKEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999",
    "text": "Teste de configuração ✅"
  }'
```

---

## 📝 Variáveis de Ambiente

### backend/.env (Completo)

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=seu-secret-aqui-minimo-32-chars

# APIs de IA (Prioritárias)
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-pro

# APIs de IA (Backup)
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...

# Meta Ads
META_ADS_ACCESS_TOKEN=EAA...
META_ADS_APP_ID=123456789
META_ADS_APP_SECRET=abc123...
META_ADS_AD_ACCOUNT_ID=act_123456789

# Instagram
INSTAGRAM_ACCESS_TOKEN=...long-lived-token
INSTAGRAM_BUSINESS_ACCOUNT_ID=123456789

# Evolution API (WhatsApp)
EVOLUTION_API_URL=https://evolution-api.example.com
EVOLUTION_INSTANCE=sabrina-costa
EVOLUTION_API_KEY=...sua-apikey
WHATSAPP_NUMBER=5511999999999

# Config
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://sabrina-costa.vercel.app
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### n8n - Environment Variables

No N8N, configurar as mesmas variáveis em:
- Settings > Environment Variables

Ou criar arquivo `.env` no diretório do N8N.

---

## ✅ Testando APIs

### Teste Completo

Criar script `../scripts/test/test-apis.js`:

```javascript
#!/usr/bin/env node
require('dotenv').config();

async function testAllAPIs() {
  console.log('🧪 Testando todas as APIs...\n');

  // 1. Gemini Pro
  console.log('1. Testando Gemini Pro...');
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Olá' }] }]
          })
        }
      );
      console.log(response.ok ? '   ✅ Gemini Pro OK' : '   ❌ Erro Gemini');
    } catch (err) {
      console.log('   ❌ Erro:', err.message);
    }
  } else {
    console.log('   ⚠️  GEMINI_API_KEY não configurada');
  }

  // 2. Meta Ads
  console.log('\n2. Testando Meta Ads API...');
  if (process.env.META_ADS_ACCESS_TOKEN) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${process.env.META_ADS_AD_ACCOUNT_ID}/campaigns?access_token=${process.env.META_ADS_ACCESS_TOKEN}`
      );
      console.log(response.ok ? '   ✅ Meta Ads OK' : '   ❌ Erro Meta Ads');
    } catch (err) {
      console.log('   ❌ Erro:', err.message);
    }
  } else {
    console.log('   ⚠️  META_ADS_ACCESS_TOKEN não configurada');
  }

  // 3. Instagram
  console.log('\n3. Testando Instagram Graph API...');
  if (process.env.INSTAGRAM_ACCESS_TOKEN) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=followers_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
      );
      const data = await response.json();
      console.log(response.ok ? `   ✅ Instagram OK (${data.followers_count} seguidores)` : '   ❌ Erro Instagram');
    } catch (err) {
      console.log('   ❌ Erro:', err.message);
    }
  } else {
    console.log('   ⚠️  INSTAGRAM_ACCESS_TOKEN não configurada');
  }

  // 4. Evolution API
  console.log('\n4. Testando Evolution API (WhatsApp)...');
  if (process.env.EVOLUTION_API_URL) {
    try {
      const response = await fetch(`${process.env.EVOLUTION_API_URL}/health`);
      console.log(response.ok ? '   ✅ Evolution API OK' : '   ❌ Erro Evolution');
    } catch (err) {
      console.log('   ❌ Erro:', err.message);
    }
  } else {
    console.log('   ⚠️  EVOLUTION_API_URL não configurada');
  }

  console.log('\n✅ Testes concluídos!\n');
}

testAllAPIs().catch(console.error);
```

### Executar Testes

```bash
cd scripts/test
node test-apis.js
```

---

## 🚀 Ordem de Configuração Recomendada

### Semana 1 (Essencial)

1. ✅ Evolution API (WhatsApp) - Já configurado
2. ⏳ Gemini Pro (Google) - CONFIGURAR AGORA
3. ✅ ChatGPT Pro - Já assinado
4. ✅ Claude Pro - Já assinado

**Com isso você pode:**
- ✅ Gerar legendas (grátis)
- ✅ Receber notificações
- ✅ Busca semanal validação

### Semana 2 (Expansão)

5. ⏳ Instagram Graph API - Configurar
6. ⏳ Meta Ads API - Configurar

**Com isso você pode:**
- ✅ Reels Fund Tracker (automático)
- ✅ Otimizar campanhas (com aprovação)
- ✅ Análise de comentários

### Opcional (Backup)

7. OpenAI API - Apenas se Gemini não funcionar

---

## 🔐 Segurança

### Proteção de Credenciais

1. **NUNCA** commitar .env
2. Usar variáveis de ambiente (Vercel, N8N)
3. Rotacionar tokens a cada 60 dias
4. Revogar tokens não usados

### Verificação de Segurança

```bash
# Verificar se .env está no .gitignore
cat .gitignore | grep ".env"

# Deve retornar:
# .env
# .env.local
# .env.*.local
```

---

## ❓ FAQ

### 1. Por que priorizar Gemini Pro?

**R:** É 100% gratuito e tem limite generoso (60 req/min). Com nosso uso (10-20/semana), nunca vamos ultrapassar.

### 2. Preciso configurar TODAS as APIs?

**R:** NÃO! Ordem de prioridade:

**Essencial:**
- Gemini Pro (legendas)
- Evolution API (notificações)

**Importante:**
- Instagram Graph API (Reels Fund Tracker)

**Opcional:**
- Meta Ads API (se tem campanhas pagas)
- OpenAI API (backup)

### 3. Quanto vou gastar por mês?

**R:** Estimativa realista:

- Gemini Pro: R$ 0 (grátis) ✅
- ChatGPT Pro: R$ 0 (já pago) ✅
- Claude Pro: R$ 0 (já pago) ✅
- Meta Ads API: R$ 0 (grátis) ✅
- Instagram API: R$ 0 (grátis) ✅
- **Total: R$ 0/mês** ✅✅✅

### 4. E se a API cair?

**R:** Temos fallbacks:

1. Gemini Pro cai → Usa ChatGPT Pro
2. ChatGPT Pro cai → Usa Claude Pro
3. Todos caem → Usa OpenAI API (pago)
4. Todos caem → Gera manualmente

### 5. Como renovar tokens?

**R:** Tokens Meta/Instagram expiram em 60 dias.

**Renovação automática (futuro):**
- Sistema alerta 7 dias antes de expirar
- Você renova manualmente
- Sistema testa automaticamente

**Por enquanto:**
- Adicionar lembrete no calendário (renovar a cada 50 dias)

---

## 📞 Suporte

**Problemas com APIs:**
1. Ver logs de erro no N8N
2. Testar com script de teste
3. Verificar se token não expirou
4. Consultar documentação oficial

**Links Úteis:**
- Gemini: https://ai.google.dev/docs
- Meta Ads: https://developers.facebook.com/docs/marketing-apis
- Instagram: https://developers.facebook.com/docs/instagram-api
- Evolution API: Sua documentação local

---

**Última Atualização:** 01/11/2025  
**Versão:** 1.0.0  
**Próxima Revisão:** Quando configurar APIs

