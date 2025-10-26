# 📱 Conectar WhatsApp - Evolution API

> **Tempo estimado:** 15 minutos  
> **Pré-requisitos:** [Primeiro Workflow n8n](03-primeiro-workflow-n8n.md) concluído

Este tutorial te guia pela configuração completa do WhatsApp usando Evolution API para receber alertas, relatórios e lembretes automaticamente.

---

## 🎯 **O que você vai configurar**

✅ Evolution API funcionando  
✅ Instância WhatsApp ativa  
✅ QR Code escaneado  
✅ Teste de envio de mensagens  
✅ Integração com workflows n8n  

---

## 🔧 **Configuração da Evolution API**

### 1.1 Acessar Evolution API

1. **URL:** https://qrcode.macspark.dev
2. **Login:** Use suas credenciais
3. **Verificar:** Se você tem acesso de admin

### 1.2 Criar Nova Instância

1. **Vá em:** Instances → New Instance
2. **Nome:** `sabrina-instance`
3. **Descrição:** `Dashboard Sabrina Costa - Alertas e Relatórios`
4. **Clique:** Create

### 1.3 Configurar Instância

**Settings da instância:**
```yaml
Name: sabrina-instance
Webhook URL: https://fluxos.macspark.dev/webhook/sabrina/whatsapp
Webhook Events: 
  - message.upsert
  - connection.update
  - qr.updated
Webhook By Events: true
```

**Configurações avançadas:**
```yaml
Reject Call: true
Always Online: true
Read Messages: true
Read Status: true
Typing: true
Presence: true
```

---

## 📱 **Conectar WhatsApp**

### 2.1 Gerar QR Code

1. **Selecione** a instância `sabrina-instance`
2. **Clique** em "Connect"
3. **Aguarde** QR Code aparecer
4. **Mantenha** a página aberta

### 2.2 Escanear QR Code

1. **Abra** WhatsApp no seu celular
2. **Vá em:** Configurações → Aparelhos conectados
3. **Toque** em "Conectar um aparelho"
4. **Escaneie** o QR Code da tela
5. **Aguarde** confirmação de conexão

### 2.3 Verificar Conexão

**Status esperado:**
```
✅ Instance: sabrina-instance
✅ Status: connected
✅ Phone: +5531993676989
✅ QR Code: (vazio - já conectado)
```

---

## 🧪 **Teste de Envio**

### 3.1 Teste Manual

**Via Evolution API Dashboard:**
1. **Vá em:** Messages → Send Message
2. **To:** `+5531993676989` (seu número)
3. **Message:** `Teste de conexão Evolution API`
4. **Clique:** Send
5. **Verifique** se recebeu no WhatsApp

### 3.2 Teste via cURL

```bash
# Teste de envio via API
curl -X POST https://qrcode.macspark.dev/message/sendText/sabrina-instance \
  -H "apikey: YOUR_EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "+5531993676989",
    "text": "🧪 Teste de conexão via API"
  }'
```

**Resposta esperada:**
```json
{
  "key": {
    "remoteJid": "5531993676989@s.whatsapp.net",
    "fromMe": true,
    "id": "3EB0C767D26A4A8C4A5F"
  },
  "message": {
    "conversation": "🧪 Teste de conexão via API"
  },
  "messageTimestamp": 1698086400,
  "status": "PENDING"
}
```

### 3.3 Verificar Recebimento

1. **Abra** WhatsApp no celular
2. **Verifique** se recebeu a mensagem de teste
3. **Confirme** que o número remetente é o da instância

---

## 🔗 **Integração com n8n**

### 4.1 Configurar Credenciais

**No n8n:**
1. **Vá em:** Settings → Credentials
2. **Crie** nova credencial:
   - **Name:** `Evolution API`
   - **Type:** `HTTP Header Auth`
   - **Header Name:** `apikey`
   - **Header Value:** `YOUR_EVOLUTION_API_KEY`

### 4.2 Testar Workflows

**Workflow 2 (Alertas):**
1. **Execute** manualmente
2. **Verifique** se envia WhatsApp
3. **Confirme** recebimento no celular

**Workflow 3 (Relatório):**
1. **Execute** manualmente
2. **Verifique** se envia relatório
3. **Confirme** formato da mensagem

**Workflow 4 (Lembretes):**
1. **Execute** manualmente
2. **Verifique** se envia lembrete
3. **Confirme** conteúdo do lembrete

### 4.3 Configurar Webhook (Opcional)

**Para receber mensagens:**
1. **Vá em:** Evolution API → Webhooks
2. **URL:** `https://fluxos.macspark.dev/webhook/sabrina/whatsapp`
3. **Events:** `message.upsert`
4. **Ative** webhook

---

## ⚙️ **Configurações Avançadas**

### 5.1 Personalizar Mensagens

**Alertas (Workflow 2):**
```javascript
// Editar node "Formatar Mensagem"
const alertMessage = `
🚨 ALERTAS DE MÉTRICAS 🚨
Data: ${date}

${alerts.map(alert => `
⚠️ ${alert.type}
Valor: ${alert.value}
Meta: ${alert.threshold}
Ação: ${alert.action}
`).join('\n')}

📊 Métricas do Dia
• Alcance: ${reach}
• CTR: ${ctr}%
• CPC: R$${cpc}
• Frequência: ${frequency}
• Novos Seguidores: ${newFollowers}
• Investimento: R$${cost}

🔗 Ver dashboard: ${dashboardUrl}
`;
```

**Relatório (Workflow 3):**
```javascript
// Editar node "Formatar Relatório"
const reportMessage = `
📊 RELATÓRIO DIÁRIO - ${date}

✅ MÉTRICAS DO DIA
• Alcance: ${reach}
• CTR: ${ctr}% ${ctrChange}
• CPC: R$${cpc} ${cpcChange}
• CPM: R$${cpm}
• Frequência: ${frequency}
• Visitas ao Perfil: ${profileVisits}
• Novos Seguidores: ${newFollowers} ${followersChange}
• Investimento: R$${cost}

📈 PERFORMANCE
vs Ontem: ${performance}
vs Meta: ${metaStatus}

🎯 STATUS GERAL: ${overallStatus}

💡 RECOMENDAÇÕES:
${recommendations}

---
🔗 Ver detalhes: ${dashboardUrl}
`;
```

### 5.2 Configurar Horários

**Alertas:** 18h00 (todos os dias)
```javascript
// Cron expression: 0 18 * * *
// Significa: 18h00 todos os dias
```

**Relatório:** 18h05 (todos os dias)
```javascript
// Cron expression: 5 18 * * *
// Significa: 18h05 todos os dias
```

**Lembretes:** 11h00 e 17h30 (todos os dias)
```javascript
// Cron expressions:
// 0 11 * * * (11h00)
// 30 17 * * * (17h30)
```

### 5.3 Configurar Números

**Número principal:** `+5531993676989`
**Números adicionais:** (opcional)
- Adicione outros números nos workflows
- Configure diferentes mensagens por número
- Crie grupos para alertas

---

## 🧪 **Testes Completos**

### 6.1 Teste de Alertas

1. **Envie métricas** que gerem alerta:
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

2. **Execute** Workflow 2
3. **Verifique** se recebe alerta no WhatsApp
4. **Confirme** formato da mensagem

### 6.2 Teste de Relatório

1. **Execute** Workflow 3 manualmente
2. **Verifique** se envia relatório
3. **Confirme** se dados estão corretos
4. **Teste** com dados reais do dia

### 6.3 Teste de Lembretes

1. **Adicione** post no cronograma
2. **Execute** Workflow 4 manualmente
3. **Verifique** se envia lembrete
4. **Confirme** conteúdo do lembrete

---

## 🆘 **Troubleshooting**

### ❌ **QR Code não aparece**

**Possíveis causas:**
1. **Instância não criada**
   - Verificar se instância existe
   - Confirmar se está ativa

2. **API offline**
   - Testar: https://qrcode.macspark.dev/health
   - Verificar logs do servidor

3. **Permissões insuficientes**
   - Verificar se tem acesso de admin
   - Confirmar credenciais

**Solução:**
1. Recriar instância
2. Verificar status da API
3. Confirmar permissões
4. Tentar em outro navegador

### ❌ **Não consegue escanear QR Code**

**Possíveis causas:**
1. **QR Code expirado**
   - Gerar novo QR Code
   - Escanear rapidamente

2. **WhatsApp não atualizado**
   - Atualizar WhatsApp
   - Tentar em outro celular

3. **Conexão instável**
   - Verificar internet
   - Tentar novamente

**Solução:**
1. Gerar novo QR Code
2. Atualizar WhatsApp
3. Verificar conexão
4. Tentar em outro dispositivo

### ❌ **Mensagens não são enviadas**

**Possíveis causas:**
1. **API Key incorreta**
   - Verificar Evolution API Key
   - Confirmar no dashboard

2. **Número incorreto**
   - Verificar formato: +5531993676989
   - Confirmar se número está ativo

3. **Instância desconectada**
   - Verificar status da instância
   - Reconectar se necessário

4. **Rate limiting**
   - Aguardar alguns minutos
   - Verificar limites da API

**Solução:**
1. Verificar API Key
2. Confirmar número
3. Reconectar instância
4. Aguardar e tentar novamente

### ❌ **Workflows não enviam WhatsApp**

**Possíveis causas:**
1. **Credenciais não configuradas**
   - Verificar HTTP Header Auth
   - Confirmar API Key

2. **URL incorreta**
   - Verificar Evolution API URL
   - Testar endpoint diretamente

3. **Workflow não ativo**
   - Verificar se workflow está ativo
   - Confirmar execução

**Solução:**
1. Configurar credenciais
2. Verificar URLs
3. Ativar workflows
4. Testar execução manual

---

## ✅ **Checklist Final**

- [ ] Evolution API acessível
- [ ] Instância `sabrina-instance` criada
- [ ] QR Code gerado e escaneado
- [ ] WhatsApp conectado
- [ ] Teste de envio funcionando
- [ ] Credenciais configuradas no n8n
- [ ] Workflow 2 (Alertas) testado
- [ ] Workflow 3 (Relatório) testado
- [ ] Workflow 4 (Lembretes) testado
- [ ] Mensagens sendo recebidas
- [ ] Formato das mensagens correto
- [ ] Logs sem erros

---

## 🎯 **Próximos Passos**

1. **[🔧 Configurar Alertas](how-to-guides/n8n/configurar-alertas.md)** - Personalizar alertas
2. **[🐛 Debug Workflows](how-to-guides/n8n/debug-workflows.md)** - Resolução de problemas
3. **[📊 Monitoramento](how-to-guides/n8n/monitoramento.md)** - Acompanhar execuções

---

## 📞 **Suporte**

- 🐛 **Bugs:** [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/Marcocardoso91/sabrina-costa/discussions)
- 📧 **Email:** ops@macspark.dev

---

**🎉 Excelente! Seu WhatsApp está conectado e funcionando perfeitamente. Agora você receberá alertas, relatórios e lembretes automaticamente!**

**🚀 Sistema completo funcionando:**
- ✅ Dashboard web
- ✅ Backend API
- ✅ Banco de dados
- ✅ Automações n8n
- ✅ WhatsApp integrado

**🎯 Próximo passo:** Personalizar alertas e configurações avançadas!
