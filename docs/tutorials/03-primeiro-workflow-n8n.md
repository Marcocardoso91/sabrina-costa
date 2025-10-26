# 🤖 Primeiro Workflow n8n - Automações

> **Tempo estimado:** 25 minutos  
> **Pré-requisitos:** [Primeiro Deploy](02-primeiro-deploy.md) concluído

Este tutorial te guia pela configuração dos 4 workflows n8n que automatizam todo o sistema: processamento de métricas, alertas WhatsApp, relatórios diários e lembretes de postagem.

---

## 🎯 **O que você vai configurar**

✅ 4 workflows n8n funcionando  
✅ Processamento automático de métricas  
✅ Alertas WhatsApp automáticos  
✅ Relatórios diários automáticos  
✅ Lembretes de postagem automáticos  

---

## 🔧 **Preparação**

### 1.1 Acessar n8n

1. **URL:** https://fluxos.macspark.dev
2. **Login:** Use suas credenciais
3. **Verificar:** Se você tem acesso de admin

### 1.2 Configurar Variáveis de Ambiente

**Vá em:** Settings → Environments

Adicione estas variáveis:

```bash
# API Backend
API_BASE_URL=https://backend-32jjcbcb7-marcocardoso28s-projects.vercel.app
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_token_here
WEBHOOK_SECRET=57caa76b0e0ea535231231d8559c9c8f

# WhatsApp Integration
EVOLUTION_API_URL=https://qrcode.macspark.dev
EVOLUTION_API_KEY=your_evolution_api_key
WHATSAPP_INSTANCE=sabrina-instance
WHATSAPP_NUMBER=+5531993676989

# URLs
DASHBOARD_URL=https://sabrina-costa.vercel.app

# Timezone
TZ=America/Sao_Paulo
```

---

## 📊 **Workflow 1: Processar Métricas**

### 2.1 Objetivo

Recebe CSV/JSON de métricas do Instagram, valida, processa e salva no banco. Verifica thresholds e dispara alertas se necessário.

### 2.2 Importar Workflow

1. **Vá em:** Workflows → Import from File
2. **Selecione:** `n8n/workflows/01-processar-metricas.json`
3. **Clique:** Import
4. **Ative** o workflow

### 2.3 Configurar Credenciais

1. **Clique** no workflow importado
2. **Selecione** cada node HTTP Request
3. **Configure** Authentication:
   - Type: `HTTP Header Auth`
   - Header Name: `X-Webhook-Token`
   - Header Value: `{{$env.WEBHOOK_SECRET}}`

### 2.4 Testar Workflow

```bash
# Teste com cURL
curl -X POST https://fluxos.macspark.dev/webhook/sabrina/metricas \
  -H "X-Webhook-Token: 57caa76b0e0ea535231231d8559c9c8f" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-23",
    "ctr": 7.5,
    "cpc": 0.09,
    "cost": 20.00,
    "newFollowers": 45
  }'
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": "Métricas processadas com sucesso",
  "savedRecords": 1,
  "alertsGenerated": 0
}
```

---

## 🚨 **Workflow 2: Alertas WhatsApp**

### 3.1 Objetivo

Verifica métricas diariamente às 18h e envia alertas via WhatsApp se alguma métrica estiver fora do padrão.

### 3.2 Importar Workflow

1. **Importe:** `n8n/workflows/02-alertas-whatsapp.json`
2. **Ative** o workflow
3. **Configure** credenciais HTTP Header Auth

### 3.3 Configurar Evolution API

1. **Selecione** node "Enviar WhatsApp"
2. **Configure** Authentication:
   - Type: `HTTP Header Auth`
   - Header Name: `apikey`
   - Header Value: `{{$env.EVOLUTION_API_KEY}}`

### 3.4 Testar Manualmente

1. **Clique** em "Execute Workflow"
2. **Verifique** se:
   - Busca métricas do dia
   - Verifica thresholds
   - Envia WhatsApp (se necessário)
   - Registra alerta no banco

### 3.5 Verificar WhatsApp

Se houver alertas, você deve receber mensagem como:

```
🚨 ALERTAS DE MÉTRICAS 🚨
Data: 23/10/2025

⚠️ CTR Baixo
Valor: 1.2%
Meta: 1.5%
Ação: Testar novos ganchos

📊 Métricas do Dia
• Alcance: 1091
• CTR: 1.2%
• CPC: R$0.10
• Frequência: 1.02
• Novos Seguidores: 45
• Investimento: R$20.00

🔗 Ver dashboard: https://sabrina-costa.vercel.app
```

---

## 📈 **Workflow 3: Relatório Diário**

### 4.1 Objetivo

Compila métricas do dia e envia relatório formatado via WhatsApp às 18h05 (após verificação de alertas).

### 4.2 Importar Workflow

1. **Importe:** `n8n/workflows/03-relatorio-diario.json`
2. **Ative** o workflow
3. **Configure** credenciais

### 4.3 Testar Manualmente

1. **Execute** o workflow manualmente
2. **Verifique** se compila dados do dia
3. **Confirme** se envia relatório via WhatsApp

### 4.4 Exemplo de Relatório

```
📊 RELATÓRIO DIÁRIO - 23/10/2025

✅ MÉTRICAS DO DIA
• Alcance: 1.091
• CTR: 7.5% (↑2.1% vs ontem)
• CPC: R$0.09 (↓10% vs ontem)
• CPM: R$2.15
• Frequência: 1.02
• Visitas ao Perfil: 80
• Novos Seguidores: 45 (↑5 vs ontem)
• Investimento: R$20.00

📈 PERFORMANCE
vs Ontem: ↑ Melhorou
vs Meta: ✅ Atingindo

🎯 STATUS GERAL: ✅ Bom

💡 RECOMENDAÇÕES:
• Manter estratégia atual
• Testar novos horários de postagem

---
🔗 Ver detalhes: https://sabrina-costa.vercel.app
```

---

## 📅 **Workflow 4: Lembretes de Postagem**

### 5.1 Objetivo

Envia lembretes de posts planejados nos horários configurados (11h e 17h30).

### 5.2 Importar Workflow

1. **Importe:** `n8n/workflows/04-lembretes-postagem.json`
2. **Ative** o workflow
3. **Configure** credenciais

### 5.3 Configurar Cronograma

O workflow verifica posts planejados para:
- **11h:** Posts para meio-dia
- **17h30:** Posts para 18h-20h

### 5.4 Testar com Post de Exemplo

1. **Adicione** um post no cronograma:
```sql
INSERT INTO posts (date, week_number, format, theme, hook, cta, status) 
VALUES (
  CURRENT_DATE, 
  1, 
  'reel', 
  'Teste de Lembrete', 
  'Este é um teste de lembrete', 
  'Me segue para mais conteúdo', 
  'planned'
);
```

2. **Execute** o workflow manualmente
3. **Verifique** se envia lembrete

### 5.5 Exemplo de Lembrete

```
🎬 LEMBRETE DE POSTAGEM

📅 Data: 23/10/2025
⏰ Horário sugerido: 18:00
📱 Formato: Reel

🎯 Tema: Teste de Lembrete

💡 Hook Sugerido:
"Este é um teste de lembrete"

✍️ CTA:
"Me segue para mais conteúdo"

📝 Ideias de Stories:
Behind the scenes do Reel + Caixinha de perguntas

---
✅ Marcar como concluído: https://sabrina-costa.vercel.app/cronograma
```

---

## ⚙️ **Configurações Avançadas**

### 6.1 Ajustar Horários dos Crons

**Workflow 2 (Alertas):**
- **Horário atual:** 18h00
- **Para alterar:** Edite o node Cron
- **Exemplo:** `0 19 * * *` (19h00)

**Workflow 3 (Relatório):**
- **Horário atual:** 18h05
- **Para alterar:** Edite o node Cron
- **Exemplo:** `5 19 * * *` (19h05)

**Workflow 4 (Lembretes):**
- **Horários atuais:** 11h00 e 17h30
- **Para alterar:** Edite os nodes Cron
- **Exemplo:** `0 12 * * *` e `0 18 * * *`

### 6.2 Configurar Thresholds

Os thresholds estão hardcoded nos workflows. Para alterar:

1. **Edite** o node "Verificar Thresholds"
2. **Altere** os valores:
```javascript
const thresholds = {
  ctrMin: 1.5,        // CTR mínimo
  cpcMax: 0.70,       // CPC máximo
  cpmMax: 10.0,       // CPM máximo
  frequencyMax: 3.0,  // Frequência máxima
  costPerFollowerMax: 1.30  // Custo por seguidor máximo
};
```

### 6.3 Personalizar Mensagens

**Alertas WhatsApp:**
1. **Edite** o node "Formatar Mensagem"
2. **Modifique** o template da mensagem
3. **Salve** e teste

**Relatório Diário:**
1. **Edite** o node "Formatar Relatório"
2. **Ajuste** o template conforme necessário
3. **Salve** e teste

---

## 🧪 **Testes Completos**

### 7.1 Teste End-to-End

1. **Envie métricas** via webhook:
```bash
curl -X POST https://fluxos.macspark.dev/webhook/sabrina/metricas \
  -H "X-Webhook-Token: 57caa76b0e0ea535231231d8559c9c8f" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-23",
    "ctr": 1.2,
    "cpc": 0.75,
    "cost": 20.00,
    "newFollowers": 45
  }'
```

2. **Execute** Workflow 2 (Alertas)
3. **Verifique** se recebe alerta no WhatsApp
4. **Execute** Workflow 3 (Relatório)
5. **Verifique** se recebe relatório no WhatsApp

### 7.2 Verificar Logs

**n8n Dashboard:**
1. **Vá em:** Executions
2. **Filtre** por workflow
3. **Clique** em execução para ver detalhes
4. **Verifique** se todos os nodes executaram com sucesso

**Backend Logs:**
1. **Vercel Dashboard:** Functions → View Function Logs
2. **Verifique** se webhook foi recebido
3. **Confirme** se dados foram salvos

---

## 🆘 **Troubleshooting**

### ❌ **Webhook não recebe dados**

**Possíveis causas:**
1. **Workflow não ativo**
   - Verifique se workflow está ativo
   - Confirme se webhook está configurado

2. **Token incorreto**
   ```bash
   # Verificar se X-Webhook-Token está correto
   # Deve ser: 57caa76b0e0ea535231231d8559c9c8f
   ```

3. **URL incorreta**
   ```bash
   # URL correta: https://fluxos.macspark.dev/webhook/sabrina/metricas
   ```

**Solução:**
1. Verificar se workflow está ativo
2. Confirmar token no header
3. Testar com cURL primeiro
4. Verificar logs do n8n

### ❌ **Alertas não são enviados**

**Possíveis causas:**
1. **Evolution API offline**
   ```bash
   # Testar Evolution API diretamente
   curl -X POST https://qrcode.macspark.dev/message/sendText/sabrina-instance \
     -H "apikey: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"number":"+5531993676989","text":"Teste"}'
   ```

2. **Número WhatsApp incorreto**
   - Verificar se número está com +55
   - Confirmar se instância está ativa

3. **Métricas não geram alerta**
   - Verificar se valores estão abaixo dos thresholds
   - Testar com valores que gerem alerta

**Solução:**
1. Testar Evolution API diretamente
2. Verificar número WhatsApp
3. Confirmar thresholds
4. Testar com dados que gerem alerta

### ❌ **Cron não dispara**

**Possíveis causas:**
1. **Timezone incorreto**
   - Verificar se TZ=America/Sao_Paulo
   - Confirmar horário do servidor

2. **Workflow não ativo**
   - Verificar se workflow está ativo
   - Confirmar configuração do Cron

3. **Expressão cron incorreta**
   - `0 18 * * *` = 18h00
   - `5 18 * * *` = 18h05
   - `30 17 * * *` = 17h30

**Solução:**
1. Verificar timezone
2. Confirmar workflow ativo
3. Testar execução manual
4. Verificar expressão cron

---

## ✅ **Checklist Final**

- [ ] 4 workflows importados e ativos
- [ ] Variáveis de ambiente configuradas
- [ ] Credenciais HTTP configuradas
- [ ] Webhook testado e funcionando
- [ ] Alertas WhatsApp funcionando
- [ ] Relatório diário funcionando
- [ ] Lembretes de postagem funcionando
- [ ] Evolution API conectada
- [ ] Logs sem erros
- [ ] Teste end-to-end completo

---

## 🎯 **Próximos Passos**

1. **[📱 Conectar WhatsApp](04-conectar-whatsapp.md)** - Configuração detalhada do WhatsApp
2. **[🔧 Configurar Alertas](how-to-guides/n8n/configurar-alertas.md)** - Personalizar alertas
3. **[🐛 Debug Workflows](how-to-guides/n8n/debug-workflows.md)** - Resolução de problemas

---

## 📞 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev

---

**🎉 Perfeito! Seus workflows n8n estão funcionando e automatizando todo o sistema. Agora vamos configurar o WhatsApp no [próximo tutorial](04-conectar-whatsapp.md).**
