# 🎯 Master Plan - Automações N8N com IA
## Dashboard Sabrina Costa

**Versão:** 1.0.0  
**Data Criação:** 01/11/2025  
**Última Atualização:** 01/11/2025  
**Autor:** Sistema Automático + Marco Cardoso  
**Status:** ✅ ATIVO (Sprint 1 - Fundação)

---

## 📊 Status Geral do Sistema

| Métrica | Valor | Status |
|---------|-------|--------|
| **Total Workflows** | 13 | 13 configurados |
| **Workflows Ativos** | 4 básicos | ⚠️ Workflows IA desligados |
| **Modo Padrão** | Manual | ✅ Seguro |
| **Budget IA Mês** | R$ 0.00 / R$ 50.00 | ✅ 0% usado |
| **Aprovações Pendentes** | 0 | ✅ Nenhuma |
| **Última Execução** | - | Aguardando ativação |

---

## 🔐 Princípios de Segurança (INVIOLÁVEIS)

1. ❌ **NUNCA** postar automaticamente no Instagram
2. ❌ **NUNCA** pausar campanhas sem aprovação
3. ✅ **SEMPRE** modo manual por padrão (toggle auto desligado)
4. ✅ **SEMPRE** pedir aprovação antes de qualquer ação
5. ✅ **SEMPRE** controlar custos IA (max R$ 50/mês)
6. ✅ **SEMPRE** notificar mudanças via WhatsApp + Markdown diff

---

## 📋 Lista Completa de Workflows

### Grupo 1: Workflows Básicos (Já Implementados e Ativos)

#### 1. Processar Métricas
**Nome:** `processar-metricas`  
**Status:** ✅ ATIVO  
**Modo:** Auto  
**Requer Aprovação:** Não  
**Descrição:** Processa métricas recebidas via webhook e salva no banco de dados  

**Como funciona:**
- Trigger: Webhook (`POST /api/webhook/metrics`)
- Recebe métricas (JSON ou CSV)
- Valida dados
- Salva no banco PostgreSQL
- Não envia notificações (apenas salva)

**Proteções:**
- ✅ Validação de dados
- ✅ SQL injection prevention
- ✅ Apenas escrita no banco

**Como desativar:**
```bash
# Via API
PUT /api/automations/processar-metricas/toggle
Body: { "enabled": false }

# Via WhatsApp
/desativar-processar-metricas
```

---

#### 2. Alertas WhatsApp
**Nome:** `alertas-whatsapp`  
**Status:** ✅ ATIVO  
**Modo:** Auto  
**Requer Aprovação:** Não  
**Descrição:** Envia alertas quando métricas estão fora do padrão  

**Como funciona:**
- Trigger: Cron (a cada hora)
- Busca métricas últimas 24h
- Verifica thresholds:
  - CTR < 2%: Alerta
  - CPC > R$ 1.00: Alerta
  - Frequency > 5: Alerta
- Envia WhatsApp se detectar problema

**Proteções:**
- ✅ Apenas leitura do banco
- ✅ Não modifica nada
- ✅ Zero risco

**Como desativar:**
```bash
# Via API
PUT /api/automations/alertas-whatsapp/toggle
Body: { "enabled": false }

# Via WhatsApp
/desativar-alertas-whatsapp
```

---

#### 3. Relatório Diário
**Nome:** `relatorio-diario`  
**Status:** ✅ ATIVO  
**Modo:** Auto  
**Requer Aprovação:** Não  
**Descrição:** Gera e envia relatório diário via WhatsApp (19:00)  

**Como funciona:**
- Trigger: Cron (diário 19:00)
- Busca métricas do dia
- Calcula médias e totais
- Formata em texto
- Envia via WhatsApp

**Proteções:**
- ✅ Apenas leitura
- ✅ Não modifica dados
- ✅ Zero risco

**Como desativar:**
```bash
/desativar-relatorio-diario
```

---

#### 4. Lembrete Postagem
**Nome:** `lembrete-postagem`  
**Status:** ✅ ATIVO  
**Modo:** Auto  
**Requer Aprovação:** Não  
**Descrição:** Lembra Sabrina de postar (baseado em cronograma)  

**Como funciona:**
- Trigger: Cron (3x ao dia: 10h, 14h, 18h)
- Busca posts planejados para hoje
- Se tem post pendente, envia lembrete
- Não posta nada (apenas lembra)

**Proteções:**
- ✅ NUNCA posta automaticamente
- ✅ Apenas leitura do banco
- ✅ Zero risco Instagram

**Como desativar:**
```bash
/desativar-lembrete-postagem
```

---

### Grupo 2: Workflows IA - Campanhas (Modo Manual - DESLIGADOS)

#### 5. Otimizar Campanhas Meta Ads
**Nome:** `otimizar-campanhas`  
**Status:** ❌ DESLIGADO  
**Modo:** Manual (apenas notificar)  
**Requer Aprovação:** ✅ SIM (sempre)  
**Auto Execute:** ❌ NÃO (toggle desligado)  
**Descrição:** Analisa campanhas Meta Ads e sugere otimizações  

**Como funciona:**
1. Trigger: Cron (a cada 2 horas) - **SE ENABLED=TRUE**
2. Query Meta Ads API (apenas leitura)
3. Analisar métricas de cada campanha:
   - CTR < 2%: Problema → Sugerir pausar
   - CPC > R$ 1.00: Problema → Sugerir ajustar
   - CTR > 4%: Oportunidade → Sugerir aumentar budget 20%
4. Para CADA sugestão:
   - Salvar em `approval_queue` (status: pending)
   - Enviar WhatsApp com detalhes
   - **NÃO EXECUTA NADA** (aguarda aprovação)
5. Se você aprovar (`/aprovar-camp-123`):
   - Workflow executa ação via Meta Ads API
   - Notifica conclusão

**Exemplo de notificação:**
```
🔔 SUGESTÃO - Campanha "Nome X"

Problema: CTR 1.5% (meta: >2%)
Sugestão: Pausar campanha
Impacto: Economia ~R$ 20/dia

Aprovar?
✅ /aprovar-camp-123
❌ /rejeitar-camp-123
📊 /detalhes-camp-123

Expira em: 24h
```

**Proteções de Segurança:**
- ✅ NADA é pausado sem sua aprovação
- ✅ Modo manual por padrão
- ✅ Toggle auto-execute desligado
- ✅ Você tem 24h para decidir
- ✅ Histórico de todas ações

**APIs Necessárias:**
- Meta Ads API (readonly para análise)
- Meta Ads API (write para executar, após aprovação)

**Como ativar:**
```bash
# 1. Via Frontend
- Acessar: configuracoes-automacao.html
- Encontrar "Otimizar Campanhas"
- Toggle ON
- Modo: Manual
- Salvar

# 2. Via WhatsApp
/ativar-otimizar-campanhas

# 3. Via API
PUT /api/automations/otimizar-campanhas/toggle
Body: { "enabled": true }
```

**Como desativar:**
```bash
/desativar-otimizar-campanhas
```

**Futuro (quando ativar auto_execute=TRUE):**
- Adiciona kill switch
- Executa mas permite reverter em 1h
- Notifica ANTES e DEPOIS
- **Recomendação: NÃO ativar auto sem testar muito**

---

#### 6. Gerar Legendas com IA
**Nome:** `gerar-legendas`  
**Status:** ❌ DESLIGADO  
**Modo:** Manual  
**Requer Aprovação:** ✅ SIM (sempre)  
**Never Post:** ✅ SIM (proteção Instagram)  
**Use Free AI First:** ✅ SIM  
**Descrição:** Gera legendas autênticas para Instagram com IA  

**Como funciona:**
1. Trigger: Você envia `/legenda Tema X` via WhatsApp
2. Priorizar IA gratuita (cascade):
   - 1º: Gemini Pro (Google - já assinado, grátis)
   - 2º: ChatGPT Pro (já assinado via plano)
   - 3º: Claude Pro (já assinado)
   - 4º: Llama 3.1 na VPS (se disponível)
3. Gerar legenda com prompt otimizado:
   ```
   Prompt: Você é Sabrina Costa. Gere legenda Instagram autêntica sobre [tema].
   Tom: Leve, próximo, como amiga falando.
   Formato: 150-200 chars + 3-5 hashtags + CTA sutil + 2-3 emojis
   Persona: [dados de memoria-master-consolidada-v3.md]
   ```
4. Registrar custo (se API paga):
   - Log em `ai_usage_tracking`
   - Verificar budget
5. Salvar em `content_generated` (status: pending_approval)
6. Enviar WhatsApp:
   ```
   ✨ Legenda gerada para "Tema X":
   
   ---
   [legenda completa com hashtags e CTA]
   ---
   
   O que fazer?
   ✅ /aprovar-leg-456 (salva como aprovada, você copia e posta)
   ✏️ /editar-leg-456 (envie nova versão)
   ❌ /rejeitar-leg-456 (descarta)
   🔄 /regerar-leg-456 (tenta novamente)
   ```
7. **NUNCA posta automaticamente**
8. Se aprovar: Status=approved, você copia manualmente para Instagram

**Proteções Instagram:**
- ✅ ZERO integração com Instagram API para posts
- ✅ Apenas gera texto
- ✅ Você controla 100% da postagem
- ✅ Impossível postar automaticamente (by design)

**Custo Estimado:**
- Gemini Pro: R$ 0 (grátis)
- ChatGPT Pro: R$ 0 (já pago)
- Claude Pro: R$ 0 (já pago)
- **Total: R$ 0/legenda** ✅

**Como ativar:**
```bash
/ativar-gerar-legendas
```

**Como usar:**
```bash
/legenda Minha rotina matinal de skincare
```

**Como desativar:**
```bash
/desativar-gerar-legendas
```

---

#### 7. Recomendar Conteúdo IA
**Nome:** `recomendar-conteudo`  
**Status:** ❌ DESLIGADO  
**Modo:** Manual  
**Requer Aprovação:** Não (apenas sugere)  
**Descrição:** Recomenda temas de conteúdo baseado em análise de engagement  
**Arquivo:** `n8n/workflows/production/07-recomendar-conteudo.json`

**Como funciona:**
1. Trigger: Cron (diário 08:00) OU comando `/recomendar`
2. Analisar últimos 30 posts (temas, formatos)
3. Analisar métricas (CTR, engagement)
4. Claude API:
   ```
   Prompt: Baseado nestes dados, recomende 5 temas para Sabrina
   Contexto: Persona, pilares de conteúdo (beleza, bem-estar, rotina)
   Output: 5 sugestões com justificativa + formato (Reel/Carrossel)
   ```
5. Salvar recomendações
6. Enviar para Sabrina via WhatsApp

**Custo:** R$ 0 (Claude Pro já assinado)

**Como ativar:**
```bash
/ativar-recomendar-conteudo
```

---

#### 8. Análise Preditiva de Métricas
**Nome:** `analise-preditiva`  
**Status:** ❌ DESLIGADO  
**Modo:** Semi-Auto  
**Requer Aprovação:** Não (apenas análise)  
**Descrição:** Prevê métricas dos próximos 7 dias e identifica riscos  
**Arquivo:** `n8n/workflows/production/08-analise-preditiva.json`

**Como funciona:**
1. Trigger: Cron (diário 19:00)
2. Buscar últimos 30 dias de métricas
3. Calcular tendências (CTR, CPC, crescimento)
4. Calcular predições com regressão linear simples:
   - CTR esperado próxima semana
   - CPC esperado próxima semana
   - Novos seguidores/dia esperado
5. Identificar riscos (ex: "CPC vai aumentar 15%")
6. Gerar alertas preventivos
7. Enviar relatório preditivo via WhatsApp

**Exemplo de relatório:**
```
📊 ANÁLISE PREDITIVA - Próximos 7 dias

📈 CTR (Click-Through Rate)
   Atual: 2.3%
   Tendência: ↗️ +12%
   Previsão 7d: 2.6%

💰 CPC (Custo Por Clique)
   Atual: R$ 0.85
   Tendência: ↘️ -8%
   Previsão 7d: R$ 0.78

👥 Novos Seguidores/Dia
   Atual: 3
   Tendência: ↗️ +20%
   Previsão 7d: 4/dia

✅ Nenhum risco identificado
```

**Custo:** R$ 0 (não usa IA, apenas matemática)

**Como ativar:**
```bash
/ativar-analise-preditiva
```

---

#### 10. Gerar Dicas de Produtos IA
**Nome:** `dicas-produtos`  
**Status:** ❌ DESLIGADO  
**Modo:** Manual  
**Requer Aprovação:** ✅ SIM  
**Descrição:** Gera dicas de uso para produtos com IA Vision  
**Arquivo:** `n8n/workflows/production/10-dicas-produtos-ia.json`

**Como funciona:**
1. Trigger: Webhook (você envia foto do produto)
2. OpenAI Vision API ou Gemini Vision:
   - Analisa imagem do produto
   - Identifica tipo de produto
   - Gera 5 dicas práticas de uso
   - Tom: Honesto, baseado em experiência
3. Formata para Stories ou Carrossel
4. Salva como pending_approval
5. Envia para você via WhatsApp
6. Aguarda aprovação

**Exemplo de uso:**
```bash
# 1. Ativar workflow
/ativar-dicas-produtos

# 2. Enviar foto via WhatsApp
# (implementar: enviar imagem com caption "/dicas")

# 3. Receber dicas geradas

# 4. Aprovar
/aprovar-dica-123
```

**Custo:** ~R$ 0.50/produto (Vision API mais cara)

**Como ativar:**
```bash
/ativar-dicas-produtos
```

---

#### 11. Análise de Comentários (Sentiment)
**Nome:** `analise-comentarios`  
**Status:** ❌ DESLIGADO  
**Modo:** Semi-Auto  
**Requer Aprovação:** Não (apenas análise)  
**Descrição:** Analisa sentimento dos comentários e identifica temas  
**Arquivo:** `n8n/workflows/production/11-analise-comentarios.json`

**Como funciona:**
1. Trigger: Cron (diário 20:00)
2. Buscar comentários dos últimos posts (Instagram Graph API)
3. Claude API - Sentiment Analysis:
   - Classificar: Positivos/Negativos/Neutros (%)
   - Identificar temas recorrentes (top 5)
   - Extrair perguntas frequentes
   - Gerar insights acionáveis
4. Sugerir temas para próximos posts
5. Enviar relatório via WhatsApp

**Exemplo de relatório:**
```
📊 ANÁLISE DE COMENTÁRIOS

35 comentários analisados

### SENTIMENTO GERAL
- Positivos: 70% ✅
- Negativos: 10% ⚠️
- Neutros: 20%

### TEMAS RECORRENTES
1. Onde comprar produtos (35%)
2. Pedidos de tutorial (25%)
3. Perguntas sobre preço (15%)

### PERGUNTAS FREQUENTES
1. "Onde compra?"
2. "Qual o valor?"
3. "Funciona para pele seca?"

### SUGESTÕES DE POSTS
1. "Onde eu compro (com links)"
2. "Tutorial passo a passo"
3. "Produtos até R$ 50"
```

**Custo:** R$ 0 (Claude Pro já assinado)

**Como ativar:**
```bash
/ativar-analise-comentarios
```

---

### Grupo 3: Workflows de Tracking (Auto Seguro - DESLIGADOS)

#### 9. Reels Fund Tracker
**Nome:** `reels-fund-tracker`  
**Status:** ❌ DESLIGADO (para ativar após deploy)  
**Modo:** Auto  
**Requer Aprovação:** Não (seguro - apenas leitura)  
**Descrição:** Monitora progresso meta 900 seguidores para Reels Fund  

**Como funciona:**
1. Trigger: Cron (a cada 6 horas)
2. Métodos SEGUROS para ler followers:
   - Método 1: Instagram Graph API (GET /me?fields=followers_count)
   - Método 2: Scraping público (Apify)
   - Método 3: Update manual (`/api/reelsfund/update`)
3. Calcular:
   - Atual: 880, Meta: 900, Faltam: 20
   - Taxa crescimento: +2.5/dia (média 7 dias)
   - ETA: 8 dias (20 / 2.5)
4. Salvar em `reels_fund_progress`
5. Se atingiu 900:
   ```
   🎉🎉🎉 PARABÉNS SABRINA!
   
   Meta Reels Fund ATINGIDA!
   Seguidores: 901
   
   Próximos passos:
   1. Ativar Reels Fund no Instagram
   2. Começar monetização
   3. [instruções]
   ```
6. Atualizar dashboard (card automático)

**Proteções:**
- ✅ Apenas leitura
- ✅ Não interage com conta Instagram
- ✅ Zero risco de ban
- ✅ 100% seguro

**Custo:** R$ 0

**Como ativar:**
```bash
/ativar-reels-fund-tracker
```

---

#### 12. Busca Semanal Validação do Plano
**Nome:** `busca-semanal-validacao`  
**Status:** ❌ DESLIGADO (para ativar após configurar MCPs)  
**Modo:** Auto  
**Requer Aprovação:** Não (apenas informa)  
**Uses IA:** ✅ SIM (Claude 3.5 Sonnet)  
**Descrição:** Busca semanal para validar se o plano estratégico ainda faz sentido  

**Como funciona:**
1. Trigger: Cron (segunda-feira 09:00)
2. Exa Search MCP ou Perplexity API:
   ```
   Buscas:
   - "Instagram algorithm update 2025 last 7 days"
   - "Instagram reels monetization changes 2025"
   - "Meta Ads policy updates últimos 7 dias"
   - "Instagram marketing trends novembro 2025"
   - "Influencer tools new features 2025"
   - "Instagram engagement best practices 2025"
   ```
3. Claude 3.5 Sonnet (já assinado):
   ```
   Prompt: Você é consultor de marketing Instagram.
   
   Contexto:
   - Cliente: Sabrina Costa (880 followers, meta 900)
   - Plano atual: [ler docs/automations/master-plan.md]
   
   Descobertas da semana: [resultados busca]
   
   Analise:
   1. Alguma mudança afeta nosso plano? (sim/não)
   2. Quais mudanças são relevantes?
   3. Ações recomendadas (se aplicável)
   4. Urgência (baixa/média/alta)
   5. Impacto em metas (positivo/negativo/neutro)
   
   Formato: Markdown estruturado
   ```
4. Se mudanças relevantes detectadas:
   - Atualizar `docs/automations/master-plan.md` (adicionar seção abaixo)
   - Gerar diff
   - Enviar WhatsApp:
     ```
     📢 ATUALIZAÇÃO SEMANAL DO PLANO
     
     Descobertas da semana:
     ✅ Instagram mudou algoritmo Reels (prioriza <30s)
     ⚠️ Meta Ads aumentou CPC médio 15%
     
     Impacto no nosso plano: MÉDIO
     Urgência: BAIXA
     
     Recomendações:
     1. Ajustar Reels para <30s (maior alcance)
     2. Revisar budget campanhas (CPC pode subir)
     
     Ver detalhes completos:
     docs/automations/master-plan.md (atualizado)
     
     Diff: [anexo ou link]
     ```
5. Se nenhuma mudança: "✅ Plano validado. Sem mudanças esta semana."
6. Registrar custo Claude API em `ai_usage_tracking`

**Proteções:**
- ✅ Apenas informa, não muda workflows ativos
- ✅ Você decide se aplica recomendações
- ✅ Usa Claude Pro (já assinado, custo R$ 0)

**Custo:** R$ 0 (Claude Pro)

**Como ativar:**
```bash
/ativar-busca-semanal
```

---

#### 13. Monitor Custos IA
**Nome:** `monitorar-custos-ia`  
**Status:** ❌ DESLIGADO (ativar antes dos outros IA)  
**Modo:** Auto  
**Requer Aprovação:** Não  
**Descrição:** Monitora custos de IA e alerta thresholds (50%, 75%, 90%)  

**Como funciona:**
1. Trigger: 
   - Cron (diário 08:00)
   - ANTES de cada chamada IA (pre-check)
2. Query `ai_usage_tracking` do mês atual
3. Calcular:
   ```javascript
   const gastoTotal = soma(custo_openai + custo_claude + custo_gemini);
   const budgetMensal = 50.00;
   const percentual = (gastoTotal / budgetMensal) * 100;
   
   // Projeção próxima semana
   const mediaDiaria = gastoTotal / diaDoMes;
   const diasRestantes = 30 - diaDoMes;
   const projecaoMes = gastoTotal + (mediaDiaria * diasRestantes);
   ```
4. Verificar thresholds:
   - **50% (R$ 25):**
     ```
     🟡 ALERTA: Budget IA em 50%
     Gasto: R$ 25.00 / R$ 50.00
     Projeção mês: R$ 42.00 (OK)
     Continuar? Tudo normal.
     ```
   - **75% (R$ 37.50):**
     ```
     🟠 ATENÇÃO: Budget IA em 75%
     Gasto: R$ 37.50 / R$ 50.00
     Projeção: R$ 52.00 (ALERTA - pode ultrapassar!)
     
     Recomendação: Priorizar apenas Gemini/ChatGPT gratuitos
     ```
   - **90% (R$ 45):**
     ```
     🔴 LIMITE CRÍTICO: Budget IA em 90%!
     
     PAUSANDO AUTOMATICAMENTE:
     ❌ Gerar Legendas (custo variável)
     ❌ Análise Preditiva
     ❌ Recomendar Conteúdo
     
     Mantendo ativos (custo zero):
     ✅ Reels Fund Tracker (grátis)
     ✅ Busca Semanal (Claude Pro já pago)
     ✅ Monitor Custos
     
     Decidir:
     /aumentar-budget [valor]
     /manter-pausado
     /usar-apenas-gratuitos
     ```
5. Atualizar config se pausou workflows
6. Registrar ação

**Proteções Financeiras:**
- ✅ Alertas progressivos (50%, 75%)
- ✅ Auto-pause em 90% (segurança)
- ✅ Você controla reativação
- ✅ Impossível gastar mais que R$ 50

**Custo:** R$ 0 (não usa IA)

**Como ativar:**
```bash
/ativar-monitor-custos
```

---

## 🔄 Priorização de APIs de IA (Custo Zero Primeiro)

1. **Gemini Pro** (Google) - 60 req/min grátis ✅
2. **ChatGPT Pro** - ilimitado no plano ✅
3. **Claude Pro** - bom limite no plano ✅
4. **Llama 3.1 na VPS** - custo zero (se disponível) ✅
5. **OpenAI API paga** - APENAS se necessário ⚠️

**Estimativa realista de custos:**
- Gemini Pro: R$ 0 (grátis)
- ChatGPT Pro: R$ 0 (já pago)
- Claude Pro: R$ 0 (já pago)
- OpenAI API (backup): ~R$ 2-5/mês
- **Total esperado: R$ 0-5/mês** (90% abaixo do limite) ✅

---

## 🎛️ Como Controlar as Automações

### Via Frontend (Recomendado)

1. Acessar: `https://[seu-dominio]/configuracoes-automacao.html`
2. Painel de Controle mostra:
   - Status de cada workflow (ON/OFF)
   - Modo (Manual/Semi/Auto)
   - Última execução
   - Total de ações
3. Toggle individual para ativar/desativar
4. **KILL SWITCH** (botão vermelho): Desliga TUDO em 1 clique

### Via WhatsApp (Rápido)

**Comandos de Controle:**
- `/status` - Ver status de tudo
- `/ativar-{workflow}` - Ativar workflow
- `/desativar-{workflow}` - Desativar workflow
- `/pausar-tudo` - KILL SWITCH (emergência)

**Comandos de Aprovação:**
- `/aprovar-{id}` - Aprovar ação pendente
- `/rejeitar-{id}` - Rejeitar ação
- `/detalhes-{id}` - Ver mais informações
- `/historico` - Últimas 10 ações

**Comandos de Custo:**
- `/custos` - Ver gastos IA do mês
- `/aumentar-budget {valor}` - Aumentar budget IA

**Comandos de Conteúdo:**
- `/legenda {tema}` - Gerar legenda
- `/recomendar` - Pedir recomendações de temas
- `/dicas {produto}` - Gerar dicas de produto

### Via API (Avançado)

```bash
# Listar todos workflows
GET /api/automations

# Ativar/desativar workflow
PUT /api/automations/{workflow_name}/toggle
Body: { "enabled": true }

# Mudar modo
PUT /api/automations/{workflow_name}/mode
Body: { "automation_mode": "manual" }

# Kill switch
POST /api/automations/kill-switch

# Ver aprovações pendentes
GET /api/automations/pending-approvals/list

# Aprovar ação
POST /api/automations/approve/{id}

# Rejeitar ação
POST /api/automations/reject/{id}
Body: { "reason": "Motivo" }
```

---

## 📊 Estimativa de Custos Semanal

### Semana 01-07/11/2025 (TODOS workflows ativos)

| Workflow | Frequência | Custo/Uso | Custo Semana | IA Usada |
|----------|------------|-----------|--------------|----------|
| Gerar Legendas | 5x/semana | R$ 0 | R$ 0 | Gemini Pro (grátis) ✅ |
| Busca Semanal | 1x/semana | R$ 0 | R$ 0 | Claude Pro (assinado) ✅ |
| Análise Preditiva | 7x/semana | R$ 0 | R$ 0 | Matemática (sem IA) ✅ |
| Recomendar Conteúdo | 7x/semana | R$ 0 | R$ 0 | Claude Pro (assinado) ✅ |
| Dicas Produtos | 0-2x/semana | R$ 0.50 | R$ 1.00 | OpenAI Vision ⚠️ |
| Análise Comentários | 7x/semana | R$ 0 | R$ 0 | Claude Pro (assinado) ✅ |
| Otimizar Campanhas | 12x/semana | R$ 0 | R$ 0 | Sem IA (apenas análise) ✅ |
| **TOTAL** | - | - | **R$ 0-2/semana** | **R$ 0-8/mês** |

**Status:** ✅ **84% abaixo do limite** (R$ 50/mês)

### Breakdown Mensal (Uso Intenso)

| Categoria | Uso/Mês | Custo Estimado |
|-----------|---------|----------------|
| **Legendas IA** | 20 legendas | R$ 0 (Gemini grátis) |
| **Análises Claude** | 30 análises | R$ 0 (Claude Pro) |
| **Previsões** | 30 relatórios | R$ 0 (matemática) |
| **Dicas Produtos** | 4-8 produtos | R$ 2-4 (Vision API) |
| **Comentários** | 30 análises | R$ 0 (Claude Pro) |
| **Busca Semanal** | 4 buscas | R$ 0 (Claude Pro) |
| **TOTAL MÊS** | - | **R$ 2-4/mês** |

**Margem de segurança:** 92% (R$ 46-48 disponíveis)

---

## 📅 Changelog (Atualizações Semanais)

### Semana 01/11/2025
**Status Inicial:** Sistema criado, todos workflows desligados  
**Mudanças:** Nenhuma (primeiro deploy)  
**Ações:** 
- Configurar APIs externas
- Testar workflows básicos
- Ativar Monitor Custos primeiro

**Próximos Passos:**
1. Ativar Workflow 13 (Monitor Custos)
2. Testar Workflow 09 (Reels Fund Tracker)
3. Ativar gradualmente workflows IA

---

### Semana 08/11/2025
*Aguardando busca semanal automática...*

---

## 🚨 Kill Switch e Emergências

### Quando Usar Kill Switch?

1. ❌ Detectou algo errado (ação não aprovada executada)
2. ❌ Conta Instagram com problema
3. ❌ Custos IA dispararam
4. ❌ Qualquer comportamento estranho

### Como Ativar Kill Switch?

**Via WhatsApp:**
```bash
/pausar-tudo
```

**Via Frontend:**
- Botão vermelho grande "KILL SWITCH - DESLIGAR TUDO"

**Via API:**
```bash
POST /api/automations/kill-switch
```

**Resultado:**
- ✅ TODOS workflows desligados imediatamente
- ✅ Aprovações pendentes expiradas
- ✅ Notificação enviada
- ✅ Log registrado

### Como Reativar Após Kill Switch?

Religar workflows um por um (manualmente):
```bash
/ativar-{workflow-name}
```

**Recomendação:** Investigar o que causou o problema antes de reativar.

---

## 📚 Documentação Adicional

- **Manual Completo:** [MANUAL-AUTOMACOES.md](./MANUAL-AUTOMACOES.md)
- **Guia de Segurança:** [SEGURANCA-INSTAGRAM.md](./SEGURANCA-INSTAGRAM.md)
- **Backend README:** [../backend/README.md](../backend/README.md)
- **Frontend README:** [../frontend/README.md](../frontend/README.md)
- **N8N Workflows:** [../n8n/README.md](../n8n/README.md)

---

## ✅ Critérios de Sucesso

- [ ] Sistema de aprovação funcional
- [ ] NENHUMA ação executa sem aprovação
- [ ] Monitor custos IA ativo
- [ ] Kill switch testado
- [ ] Manual completo criado
- [ ] ZERO postagens automáticas
- [ ] ZERO pausas sem aprovação
- [ ] Todos workflows em modo manual
- [ ] Marco e Sabrina treinados

---

**Última Revisão:** 01/11/2025 às 11:00  
**Próxima Revisão Automática:** 04/11/2025 (segunda-feira 09:00)

