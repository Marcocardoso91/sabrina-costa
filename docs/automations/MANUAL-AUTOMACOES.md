# 📖 Manual de Automações - Dashboard Sabrina Costa
## Guia Completo de Uso

**Versão:** 1.0.0  
**Data:** 01/11/2025  
**Status:** ✅ Ativo

---

## 📑 Índice

1. [Introdução](#introdução)
2. [Conceitos Básicos](#conceitos-básicos)
3. [Modos de Automação](#modos-de-automação)
4. [Como Ativar/Desativar Workflows](#como-ativardesativar-workflows)
5. [Sistema de Aprovações](#sistema-de-aprovações)
6. [Comandos WhatsApp](#comandos-whatsapp)
7. [Guia por Workflow](#guia-por-workflow)
8. [Troubleshooting](#troubleshooting)
9. [FAQ](#faq)

---

## 🎯 Introdução

Este sistema oferece **13 workflows automatizados** para gerenciar crescimento no Instagram, campanhas Meta Ads e geração de conteúdo com IA.

### Princípio Fundamental: VOCÊ ESTÁ NO CONTROLE

- ❌ Nada executa automaticamente sem sua permissão
- ✅ Todas ações importantes precisam de aprovação
- ✅ Kill Switch disponível para emergências
- ✅ Custos de IA controlados (max R$ 50/mês)

---

## 📚 Conceitos Básicos

### O que é um Workflow?

Um **workflow** é uma automação que executa tarefas específicas. Exemplo:
- "Gerar Legendas" = Workflow que usa IA para criar legendas
- "Alertas WhatsApp" = Workflow que avisa quando métricas estão ruins

### Status de um Workflow

- **Enabled (Ativado):** ✅ Workflow está rodando
- **Disabled (Desativado):** ❌ Workflow está pausado
- **Requires Approval:** ⚠️ Workflow precisa de sua aprovação antes de agir

### Tipos de Workflows

1. **Básicos (4):** Já ativos, seguros, apenas leitura
2. **IA - Campanhas (2):** Desligados, precisam aprovação sempre
3. **IA - Conteúdo (4):** Desligados, precisam aprovação sempre
4. **Tracking (3):** Desligados, seguros (apenas leitura)

---

## ⚙️ Modos de Automação

Cada workflow tem um **modo** que define seu comportamento:

### 1. MANUAL (Padrão, Recomendado)
- Workflow analisa e **APENAS NOTIFICA**
- **NADA é executado automaticamente**
- Você recebe sugestão via WhatsApp
- Você decide se aprova ou rejeita

**Exemplo:** Workflow detecta campanha com CTR baixo → Envia sugestão "Pausar campanha X?" → Aguarda sua resposta → Só pausa SE você aprovar

**Use para:** Campanhas, postagens, qualquer ação importante

### 2. SEMI-AUTO
- Workflow executa ações **sem risco**
- Não precisa aprovação para análises
- Você recebe relatórios automaticamente

**Exemplo:** Análise preditiva roda todo dia, gera previsão e envia → Nenhuma ação é tomada, apenas informação

**Use para:** Análises, relatórios, recomendações

### 3. AUTO (Perigoso, NÃO recomendado inicialmente)
- Workflow executa ações **automaticamente**
- Notifica DEPOIS de executar
- Tem kill switch e rollback

**Exemplo:** Sistema pausa campanha automaticamente se CTR < 1%

**⚠️ NÃO ATIVE AUTO sem testar muito em MANUAL primeiro!**

---

## 🔄 Como Ativar/Desativar Workflows

### Método 1: Via Frontend (Recomendado)

1. Acessar: `https://[seu-dominio]/configuracoes-automacao.html`
2. Encontrar workflow desejado na lista
3. Clicar no **toggle** (botão deslizante)
   - Verde = Ativo ✅
   - Cinza = Desativado ❌
4. Clicar em **"Salvar"**

### Método 2: Via WhatsApp (Rápido)

```bash
# Ativar workflow
/ativar-{nome-do-workflow}

# Exemplos:
/ativar-gerar-legendas
/ativar-reels-fund-tracker
/ativar-otimizar-campanhas

# Desativar workflow
/desativar-{nome-do-workflow}

# Exemplos:
/desativar-gerar-legendas
/desativar-alertas-whatsapp
```

### Método 3: Via API (Avançado)

```bash
# Ativar
curl -X PUT https://api.example.com/api/automations/gerar-legendas/toggle \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Desativar
curl -X PUT https://api.example.com/api/automations/gerar-legendas/toggle \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"enabled": false}'
```

### 🚨 KILL SWITCH - Desligar TUDO em 1 Clique

**Quando usar:** Emergência, algo deu errado, comportamento estranho

**Como ativar:**

1. **Via Frontend:** Botão vermelho grande "KILL SWITCH"
2. **Via WhatsApp:** `/pausar-tudo`
3. **Via API:** `POST /api/automations/kill-switch`

**O que acontece:**
- ✅ TODOS workflows desligados imediatamente
- ✅ Aprovações pendentes expiradas
- ✅ Notificação enviada
- ✅ Você recebe confirmação

**Como religar:**
- Ativar workflows um por um (manualmente)
- Investigar causa antes de religar

---

## ✅ Sistema de Aprovações

### Como Funciona

1. Workflow detecta situação (ex: CTR baixo)
2. Cria **sugestão de ação** (ex: "Pausar campanha")
3. Salva na fila de aprovações
4. **Envia WhatsApp** com detalhes
5. **Aguarda sua decisão** (até 24h)
6. Se você aprovar → Executa ação
7. Se você rejeitar → Descarta sugestão
8. Se expirar (24h) → Descarta automaticamente

### Exemplo Real

```
🔔 SUGESTÃO - Campanha "Seguidores RJ"

Problema detectado:
- CTR: 1.5% (abaixo da meta de 2%)
- Gasto últimas 24h: R$ 18.50
- Resultado: 2 novos seguidores

Sugestão: Pausar campanha
Impacto: Economia ~R$ 20/dia

Aprovar esta ação?
✅ /aprovar-camp-abc123
❌ /rejeitar-camp-abc123
📊 /detalhes-camp-abc123

⏰ Expira em: 24 horas
```

### Aprovando uma Ação

**Via WhatsApp:**
```bash
/aprovar-camp-abc123
```

**Resultado:**
```
✅ Ação aprovada!

A campanha "Seguidores RJ" será pausada nos próximos minutos.
Você receberá confirmação quando concluído.
```

### Rejeitando uma Ação

**Via WhatsApp:**
```bash
/rejeitar-camp-abc123
# Opcional: adicionar motivo
/rejeitar-camp-abc123 Quero dar mais tempo para testar
```

**Resultado:**
```
❌ Ação rejeitada

A campanha "Seguidores RJ" continuará ativa.
Sugestão descartada.
```

### Ver Detalhes de uma Aprovação

```bash
/detalhes-camp-abc123
```

**Resultado:**
```
📊 DETALHES - Campanha "Seguidores RJ"

Métricas últimos 7 dias:
- Impressões: 12.450
- Cliques: 187 (CTR 1.5%)
- CPC: R$ 0.92
- Seguidores: 14 (CPS: R$ 1.32)

Histórico:
- Dia 1-3: CTR 2.8% (bom)
- Dia 4-5: CTR 1.9% (caindo)
- Dia 6-7: CTR 1.5% (abaixo meta)

Recomendação do sistema:
Pausar e criar nova campanha com targeting refinado
```

### Ver Histórico de Aprovações

```bash
/historico
```

**Resultado:**
```
📋 HISTÓRICO (últimas 10 ações)

1. ✅ APROVADA - Pausar campanha "Seg RJ"
   01/11 15:30 - Executada com sucesso

2. ❌ REJEITADA - Aumentar budget "Mulheres SP"
   01/11 14:20 - Motivo: "Ainda testando"

3. ⏰ EXPIRADA - Ajustar targeting "Beleza Nacional"
   31/10 19:00 - Não respondido em 24h

...
```

---

## 💬 Comandos WhatsApp

### Comandos de Controle

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/status` | Ver status de todos workflows | `/status` |
| `/ativar-{nome}` | Ativar workflow específico | `/ativar-gerar-legendas` |
| `/desativar-{nome}` | Desativar workflow | `/desativar-alertas-whatsapp` |
| `/pausar-tudo` | KILL SWITCH (emergência) | `/pausar-tudo` |

### Comandos de Aprovação

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/aprovar-{id}` | Aprovar ação pendente | `/aprovar-camp-123` |
| `/rejeitar-{id}` | Rejeitar ação | `/rejeitar-camp-123` |
| `/detalhes-{id}` | Ver mais informações | `/detalhes-camp-123` |
| `/historico` | Últimas 10 ações | `/historico` |

### Comandos de Custos IA

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/custos` | Ver gastos IA do mês | `/custos` |
| `/aumentar-budget {valor}` | Aumentar budget IA | `/aumentar-budget 100` |
| `/manter-pausado` | Manter workflows pausados (após 90%) | `/manter-pausado` |

### Comandos de Conteúdo

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/legenda {tema}` | Gerar legenda com IA | `/legenda Rotina de skincare` |
| `/recomendar` | Pedir recomendações de temas | `/recomendar` |
| `/dicas {produto}` | Gerar dicas de produto | `/dicas Sérum vitamina C` |

---

## 📋 Guia por Workflow

### 🔹 Workflow 05: Otimizar Campanhas

**O que faz:** Analisa campanhas Meta Ads e sugere otimizações

**Quando usar:** Quando tem campanhas ativas no Meta Ads

**Como ativar:**
```bash
/ativar-otimizar-campanhas
```

**Configuração recomendada:**
- Modo: Manual
- Requer aprovação: SIM
- Frequência: A cada 2 horas

**Exemplo de uso:**
1. Você ativa o workflow
2. Sistema roda a cada 2h
3. Se detectar CTR < 2%, envia sugestão
4. Você aprova ou rejeita
5. Se aprovar, campanha é pausada
6. Você recebe confirmação

**Quando desativar:**
- Quando não tem campanhas ativas
- Quando quer controlar 100% manualmente

---

### 🔹 Workflow 06: Gerar Legendas

**O que faz:** Gera legendas autênticas para Instagram com IA

**Quando usar:** Quando precisa de ideias para legendas

**Como usar:**
```bash
# 1. Ativar workflow
/ativar-gerar-legendas

# 2. Pedir legenda
/legenda Minha rotina matinal de skincare

# 3. Aguardar resposta (15-30s)
# 4. Revisar legenda recebida
# 5. Aprovar, editar ou rejeitar
```

**Exemplo real:**
```
Você: /legenda Minha rotina matinal de skincare

Bot (15s depois):
✨ Legenda gerada:

---
Acordar cedo tem seus privilégios ☀️ E o principal deles? Tempo 
pra cuidar de mim antes do dia começar. Minha rotina de skincare 
matinal é sagrada - 5 minutos que fazem toda diferença.

Hoje compartilho meus 3 passos essenciais que transformaram minha 
pele 💧✨

Salva pra não esquecer!

#skincare #rotinamatinal #autocuidado #belezareal #cuidadoscomapele
---

Aprovar?
✅ /aprovar-leg-456 (salva como aprovada)
✏️ /editar-leg-456 (envie nova versão)
❌ /rejeitar-leg-456 (descarta)
🔄 /regerar-leg-456 (gera outra)
```

**Proteções:**
- ✅ NUNCA posta automaticamente
- ✅ Você sempre revisa antes
- ✅ Custo: R$ 0 (usa Gemini Pro gratuito)

---

### 🔹 Workflow 09: Reels Fund Tracker

**O que faz:** Monitora progresso para meta de 900 seguidores

**Quando usar:** Quando quer acompanhar crescimento automaticamente

**Como ativar:**
```bash
/ativar-reels-fund-tracker
```

**Como funciona:**
1. Roda a cada 6 horas
2. Busca número de seguidores (Instagram API)
3. Calcula: faltam quantos, taxa de crescimento, ETA
4. Atualiza dashboard
5. Quando atingir 900 → 🎉 Celebração

**Exemplo de notificação:**
```
📊 PROGRESSO REELS FUND

Seguidores atuais: 887
Meta: 900
Faltam: 13 seguidores

Taxa crescimento: +2.8/dia (média 7 dias)
ETA: 5 dias (estimativa)

Você está 98.6% lá! 🚀
```

**Proteções:**
- ✅ Apenas leitura (não posta, não interage)
- ✅ Zero risco de ban
- ✅ 100% seguro

---

### 🔹 Workflow 13: Monitor Custos IA

**O que faz:** Controla gastos com APIs de IA e alerta thresholds

**Quando ativar:** ANTES de ativar qualquer workflow com IA

**Como ativar:**
```bash
/ativar-monitor-custos
```

**Como funciona:**
1. Monitora gastos diariamente
2. Alerta em 50%, 75%
3. **Auto-pausa em 90%** (segurança financeira)

**Exemplo de alertas:**

**50% (R$ 25):**
```
🟡 ALERTA: Budget IA em 50%

Gasto até agora: R$ 25.00 / R$ 50.00
Projeção mês: R$ 42.00 (dentro do limite)

Status: ✅ Tudo OK
Nenhuma ação necessária.
```

**75% (R$ 37.50):**
```
🟠 ATENÇÃO: Budget IA em 75%

Gasto: R$ 37.50 / R$ 50.00
Projeção: R$ 52.00 (pode ultrapassar!)

Recomendação:
- Priorizar apenas APIs gratuitas
- Reduzir frequência de análises preditivas
```

**90% (R$ 45) - AUTO-PAUSE:**
```
🔴 LIMITE CRÍTICO: Budget IA em 90%!

Gasto: R$ 45.00 / R$ 50.00

AÇÃO AUTOMÁTICA TOMADA:
❌ Pausados workflows com custo:
   - Gerar Legendas
   - Análise Preditiva
   - Recomendar Conteúdo

✅ Mantidos ativos (custo zero):
   - Reels Fund Tracker
   - Busca Semanal (Claude Pro)
   - Monitor Custos

O que fazer agora?
/aumentar-budget 100 (aumenta para R$ 100/mês)
/manter-pausado (continua pausado)
/usar-apenas-gratuitos (reativa apenas gratuitos)
```

**Proteção financeira:**
- ✅ Impossível gastar mais que o limite
- ✅ Auto-pause em emergência
- ✅ Você decide quando religar

---

## 🔧 Troubleshooting

### Problema: Workflow não está executando

**Possíveis causas:**
1. Workflow desativado
2. Credenciais API inválidas
3. Erro no N8N

**Solução:**
```bash
# 1. Verificar se está ativo
/status

# 2. Se desativado, ativar
/ativar-{nome-workflow}

# 3. Verificar logs (via frontend)
# Acessar: configuracoes-automacao.html > Ver logs
```

### Problema: Não recebo notificações WhatsApp

**Possíveis causas:**
1. Evolution API offline
2. Número não configurado
3. Workflow de notificações desativado

**Solução:**
```bash
# 1. Testar Evolution API
curl https://evolution-api.example.com/health

# 2. Verificar alertas-whatsapp
/status

# 3. Reativar se necessário
/ativar-alertas-whatsapp
```

### Problema: Custo IA muito alto

**Ação imediata:**
```bash
# 1. Ver gastos atuais
/custos

# 2. Se > R$ 40, pausar workflows caros
/desativar-analise-preditiva
/desativar-gerar-legendas

# 3. Usar apenas gratuitos
/usar-apenas-gratuitos
```

### Problema: Ação foi executada sem aprovação

**Ação imediata:**
```bash
# 1. KILL SWITCH
/pausar-tudo

# 2. Verificar histórico
/historico

# 3. Reportar bug
# Entrar em contato com suporte
```

---

## ❓ FAQ

### 1. É seguro usar automações no Instagram?

**R:** SIM, se seguir as regras:
- ✅ NUNCA poste automaticamente
- ✅ Use apenas workflows de leitura (métricas, followers)
- ✅ Respeite rate limits
- ❌ NÃO automatize comentários, DMs, follows

**Workflows 100% seguros:**
- Reels Fund Tracker (apenas lê followers)
- Alertas WhatsApp (apenas lê métricas)
- Relatório Diário (apenas lê dados)

**Workflows que requerem cuidado:**
- Gerar Legendas (você SEMPRE posta manualmente)
- Análise Comentários (apenas lê, não responde)

### 2. Quanto custa por mês?

**R:** Estimativa realista: **R$ 0-10/mês**

Detalhes:
- Workflows básicos: R$ 0 (não usam IA)
- Gemini Pro: R$ 0 (grátis)
- ChatGPT Pro: R$ 0 (já assinado)
- Claude Pro: R$ 0 (já assinado)
- OpenAI API (backup): ~R$ 2-5/mês

**Proteção:** Budget máximo R$ 50/mês (auto-pause em 90%)

### 3. Posso ativar tudo de uma vez?

**R:** NÃO RECOMENDADO! Ativar gradualmente:

**Semana 1:**
- ✅ Monitor Custos IA (primeiro sempre)
- ✅ Reels Fund Tracker
- ✅ Alertas WhatsApp (se já não está ativo)

**Semana 2:**
- ✅ Gerar Legendas (testar com 2-3 legendas)
- ✅ Recomendar Conteúdo

**Semana 3:**
- ✅ Otimizar Campanhas (modo manual)
- ✅ Análise Preditiva

**Semana 4:**
- ✅ Busca Semanal Validação
- ✅ Análise Comentários

### 4. O que fazer se algo der errado?

**Ação imediata:**
```bash
# KILL SWITCH
/pausar-tudo
```

Depois:
1. Verificar histórico de ações
2. Identificar qual workflow causou problema
3. Manter desligado
4. Reportar bug

### 5. Como sei se IA está funcionando bem?

**Indicadores:**
- ✅ Legendas geradas fazem sentido
- ✅ Recomendações são relevantes
- ✅ Previsões estão próximas da realidade
- ✅ Custo < R$ 10/mês

**Se não estiver bom:**
- Ajustar prompts (futuro)
- Mudar modelo de IA
- Reduzir frequência

### 6. Posso personalizar os workflows?

**R:** SIM! Vias:

1. **Via Frontend:** Configurações avançadas de cada workflow
2. **Via N8N:** Editar workflows diretamente
3. **Via código:** Modificar lógica (avançado)

**Exemplo:** Mudar threshold de CTR de 2% para 1.5%

### 7. Kill Switch desliga meu Instagram?

**R:** NÃO! Kill Switch apenas:
- ❌ Desliga workflows de automação
- ❌ Para de enviar notificações
- ❌ Pausa análises

**NÃO afeta:**
- ✅ Sua conta Instagram (continua normal)
- ✅ Campanhas Meta Ads (continuam rodando)
- ✅ Posts já publicados

---

## 📞 Suporte

### Problemas Técnicos
- **Frontend:** `configuracoes-automacao.html`
- **Logs:** Ver última execução de cada workflow
- **API:** Documentação em `/docs/api/`

### Documentação Adicional
- **Master Plan:** `docs/automations/master-plan.md`
- **Segurança:** `docs/automations/SEGURANCA-INSTAGRAM.md`
- **Backend:** `backend/README.md`

---

**Última Atualização:** 01/11/2025  
**Versão:** 1.0.0

