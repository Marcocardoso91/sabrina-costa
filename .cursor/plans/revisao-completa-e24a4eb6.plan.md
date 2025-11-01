<!-- e24a4eb6-1b9a-4321-922e-5d586e1a155f 4f247e0a-93f3-46a3-b5aa-8e2d7105f668 -->
# Plano: Workflows N8N com IA - Controle Total e Segurança

## Princípios de Segurança (INVIOLÁVEIS)

1. NUNCA postar automaticamente no Instagram
2. NUNCA pausar campanhas sem sua aprovação
3. SEMPRE modo manual por padrão (toggle auto desligado)
4. SEMPRE pedir aprovação antes de qualquer ação
5. SEMPRE controlar custos IA (max R$ 50/mês, priorizar gratuitos)
6. SEMPRE notificar mudanças via WhatsApp + Markdown diff

## Fase 0: Sistema de Controle e Proteções (CRÍTICO - FAZER PRIMEIRO)

### 0.1 Criar Tabelas de Controle

Adicionar em `backend/db/schema.sql`:

**automation_controls** - Controle de workflows

**approval_queue** - Fila de aprovações

**ai_usage_tracking** - Rastreamento custos IA

**weekly_plan_updates** - Mudanças no plano

### 0.2 Criar APIs de Controle

**backend/api/automations.js:**

- GET /automations - Status todos workflows
- PUT /automations/:id/toggle - Ativar/desativar
- PUT /automations/:id/mode - Mudar modo (manual/auto)
- GET /automations/pending - Aprovações pendentes
- POST /automations/approve/:id - Aprovar ação
- POST /automations/reject/:id - Rejeitar ação

**backend/api/ai-costs.js:**

- GET /ai-costs/current - Gasto mês (R$ X / R$ 50)
- GET /ai-costs/forecast - Estimativa semana
- POST /ai-costs/log - Registrar uso
- GET /ai-costs/alerts - Verificar thresholds

### 0.3 Frontend: configuracoes-automacao.html

**Painel de Controle com:**

- Status de cada workflow (ON/OFF visual)
- Modo atual (Manual/Semi-Auto/Auto)
- Toggle individual por workflow
- KILL SWITCH MASTER (botão vermelho grande)
- Aprovações pendentes (lista com aprovar/rejeitar)
- Histórico de ações (últimas 50)
- Monitor custos IA (gauge visual: R$ X / R$ 50)

### 0.4 Criar docs/automations/master-plan.md

**Arquivo mestre versionado com:**

- Lista completa de 11 workflows
- Status de cada um (ativo/inativo/modo)
- Como ativar/desativar cada um
- Instruções de segurança
- Changelog (IA atualiza semanalmente)

### 0.5 Criar docs/automations/MANUAL-AUTOMACOES.md

**Manual detalhado:**

- Descrição de cada automação
- Como funciona (fluxo completo)
- Níveis de automação (manual/semi/auto)
- Como ativar via frontend
- Como ativar via WhatsApp
- Como desativar (kill switch)
- Comandos WhatsApp disponíveis
- Troubleshooting
- FAQ sobre segurança

### 0.6 Criar docs/automations/SEGURANCA-INSTAGRAM.md

**Guia de segurança:**

- O que é seguro automatizar (métricas, leitura)
- O que NUNCA automatizar (postar, deletar)
- Políticas Instagram sobre bots
- Rate limits e como respeitamos
- Como evitar ban
- Checklist de segurança antes de ativar workflow

## Fase 1: Workflows IA com Aprovação Obrigatória

### Workflow 05: Otimização Campanhas (MODO: Apenas Notificar)

**Configuração inicial:**

- enabled: FALSE (desligado)
- automation_mode: 'manual'
- requires_approval: TRUE
- auto_execute: FALSE (toggle desligado)

**Fluxo SEGURO:**

1. Cron (2h) verifica se enabled=TRUE (senão para aqui)
2. Query Meta Ads API (apenas leitura)
3. Analisar métricas:

                                                                                                                                                                                                - CTR < 2%: Problema identificado
                                                                                                                                                                                                - CPC > R$ 1.00: Problema identificado
                                                                                                                                                                                                - CTR > 4%: Oportunidade identificada

4. Para CADA problema/oportunidade:

                                                                                                                                                                                                - Salvar em `approval_queue`:
     ```json
     {
       "action_type": "suggest_pause_campaign",
       "campaign_id": "123",
       "reason": "CTR 1.5% (abaixo de 2%)",
       "suggested_action": "Pausar campanha",
       "impact": "Economia R$ 20/dia",
       "data": {...}
     }
     ```

                                                                                                                                                                                                - Enviar WhatsApp:
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


5. NÃO EXECUTA NADA (aguarda aprovação)
6. Se você enviar `/aprovar-camp-123`:

                                                                                                                                                                                                - Marca approval_queue como approved
                                                                                                                                                                                                - Workflow executa ação via Meta Ads API
                                                                                                                                                                                                - Notifica: "✅ Campanha pausada com sucesso"

7. Se você enviar `/rejeitar-camp-123`:

                                                                                                                                                                                                - Marca como rejected
                                                                                                                                                                                                - Não faz nada
                                                                                                                                                                                                - Notifica: "Sugestão rejeitada"

**Futuro (quando ativar auto_execute=TRUE):**

- Adiciona kill switch
- Executa mas permite reverter em 1h
- Notifica ANTES e DEPOIS

### Workflow 06: Gerar Legendas IA (MODO: Aprovação Obrigatória)

**Configuração:**

- enabled: FALSE inicialmente
- requires_approval: TRUE (sempre)
- never_post: TRUE (proteção Instagram)

**Fluxo SEGURO:**

1. Trigger: Você envia "/legenda Tema X" via WhatsApp
2. Priorizar IA gratuita:

                                                                                                                                                                                                - 1º: Gemini Pro (Google - já assinado, grátis)
                                                                                                                                                                                                - 2º: ChatGPT Pro (já assinado via plano)
                                                                                                                                                                                                - 3º: Claude Pro (já assinado)
                                                                                                                                                                                                - 4º: Llama 3.1 na VPS (se disponível)

3. Gerar legenda:
   ```
   Prompt: Você é Sabrina Costa. Gere legenda Instagram autêntica sobre [tema].
   Tom: Leve, próximo, como amiga falando.
   Formato: 150-200 chars + 3-5 hashtags + CTA sutil + 2-3 emojis
   Persona: [dados de memoria-master-consolidada-v3.md]
   ```

4. Registrar custo:

                                                                                                                                                                                                - Se usou API paga: Log em `ai_usage_tracking`
                                                                                                                                                                                                - Calcular: tokens * preço = R$ X
                                                                                                                                                                                                - Verificar budget (não ultrapassou?)

5. Salvar em `content_generated`:
   ```json
   {
     "type": "legenda",
     "theme": "Tema X",
     "content": "[legenda gerada]",
     "status": "pending_approval",
     "ai_service": "gemini",
     "cost_brl": 0.00
   }
   ```

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

7. NUNCA posta automaticamente
8. Se aprovar: Status=approved, você copia manualmente para Instagram

**Segurança Instagram:**

- ✅ ZERO integração com Instagram API para posts
- ✅ Apenas gera texto
- ✅ Você controla 100% da postagem

### Workflow 09: Reels Fund Tracker (AUTO SEGURO)

**Configuração:**

- enabled: TRUE
- automation_mode: 'auto'
- requires_approval: FALSE (seguro - apenas leitura)

**Fluxo SEGURO:**

1. Cron (6h) - ler followers count
2. Métodos SEGUROS (sem risco):

                                                                                                                                                                                                - Método 1: Instagram Graph API (apenas GET /me?fields=followers_count)
                                                                                                                                                                                                - Método 2: Scraping público (Apify Instagram Profile Scraper)
                                                                                                                                                                                                - Método 3: Update manual via `/api/reelsfund/update`

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

**Segurança:**

- ✅ Apenas leitura
- ✅ Não interage com conta
- ✅ Zero risco de ban

### Workflow 12: Busca Semanal Validação Plano (AUTO)

**Configuração:**

- enabled: TRUE
- cron: Segunda 09:00
- uses_ai: TRUE (Claude)

**Fluxo completo (busca profunda):**

1. Exa Search MCP ou Perplexity:
   ```
   - "Instagram algorithm update 2025 last 7 days"
   - "Instagram reels monetization changes 2025"
   - "Meta Ads policy updates últimos 7 dias"
   - "Instagram marketing trends novembro 2025"
   - "Influencer tools new features 2025"
   - "Instagram engagement best practices 2025"
   ```

2. Claude 3.5 Sonnet (já assinado):
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

3. Se mudanças relevantes detectadas:

                                                                                                                                                                                                - Atualizar `docs/automations/master-plan.md`:
     ```markdown
     ## Changelog
     
     ### Semana 01/11/2025
     **Mudanças detectadas:** [resumo]
     **Urgência:** Média
     **Ações:**
     - [ação 1]
     - [ação 2]
     ```

                                                                                                                                                                                                - Gerar diff (comparar versão anterior)
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
     
     Diff: [link ou anexo markdown]
     ```


4. Se nenhuma mudança: "✅ Plano validado. Sem mudanças esta semana."
5. Registrar custo Claude API em `ai_usage_tracking`

**Segurança:**

- ✅ Apenas informa, não muda workflows ativos
- ✅ Você decide se aplica recomendações
- ✅ Usa Claude Pro (já assinado, custo R$ 0)

### Workflow 13: Monitor Custos IA (AUTO)

**Fluxo de proteção financeira:**

1. Trigger: 

                                                                                                                                                                                                - Cron (diário 08:00)
                                                                                                                                                                                                - ANTES de cada chamada IA (pre-check)

2. Query `ai_usage_tracking` do mês atual
3. Calcular:
   ```javascript
   const gastoTotal = soma(custo_openai + custo_claude + custo_gemini + custo_outros);
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

**Priorização de APIs (Custo Zero):**

1. Gemini Pro (Google) - 60 req/min grátis
2. ChatGPT Pro - ilimitado no plano
3. Claude Pro - bom limite no plano
4. Llama 3.1 na VPS - custo zero (se disponível)
5. OpenAI API paga - APENAS se necessário

**Estimativa realista:**

- Gemini Pro: R$ 0 (grátis)
- ChatGPT Pro: R$ 0 (já pago)
- Claude Pro: R$ 0 (já pago)
- OpenAI API (backup): ~R$ 2-5/mês
- **Total: R$ 0-5/mês** (90% abaixo do limite)

## Fase 1: Workflows Core (Semana 1)

### 1.1 Workflow 06: Gerar Legendas (APROVAÇÃO OBRIGATÓRIA)

**Trigger:** WhatsApp comando `/legenda {tema}`

**Proteções:**

- requires_approval: TRUE (sempre)
- never_auto_post: TRUE (proteção Instagram)
- use_free_ai_first: TRUE

**Fluxo detalhado no plano acima**

### 1.2 Workflow 09: Reels Fund (AUTO SEGURO)

**Fluxo detalhado no plano acima**

### 1.3 Sistema de Comandos WhatsApp

Criar bot n8n para interpretar comandos:

**Aprovação:**

- `/aprovar-{id}`
- `/rejeitar-{id}`
- `/detalhes-{id}`

**Controle:**

- `/status` - Status de tudo
- `/pausar-tudo` - Kill switch
- `/custos` - Ver gastos IA
- `/ativar-{workflow}` - Liga workflow
- `/desativar-{workflow}` - Desliga

**Conteúdo:**

- `/legenda {tema}` - Gerar legenda
- `/recomendar` - Pedir recomendações
- `/dicas {produto}` - Gerar dicas

## Fase 2: Estimativa Semanal de Custos

### 2.1 Criar relatório semanal de projeção

**Workflow adicional ou parte do Workflow 13:**

Toda segunda 10:00:

1. Calcular uso semana anterior
2. Projetar próxima semana:
   ```
   📊 ESTIMATIVA CUSTOS IA - Semana 02-08/11
   
   Semana passada: R$ 1.20
   Por serviço:
   - Gemini Pro: R$ 0 (grátis) ✅
   - ChatGPT Pro: R$ 0 (plano) ✅
   - Claude API: R$ 1.20
   
   Projeção próxima semana: R$ 1.50
   
   Workflows que usam IA:
   - Gerar Legendas: ~R$ 0.50 (2x/semana)
   - Busca Semanal: R$ 0 (Claude Pro)
   - Análise Preditiva: ~R$ 0.80 (7x/semana)
   - Recomendar: ~R$ 0.20 (1x/semana)
   
   Total mês (projeção): R$ 6.00 / R$ 50.00 (12%)
   Status: ✅ Muito abaixo do limite
   
   Tudo OK para continuar!
   ```


## Fase 3: Implementação Gradual

### Sprint 1 (Semana 1): Fundação + Controles

**20h de trabalho**

Tarefas:

- Criar 4 tabelas de controle (schema.sql)
- Criar 2 APIs (automations.js, ai-costs.js)
- Criar configuracoes-automacao.html
- Criar 3 documentos (master-plan.md, MANUAL, SEGURANCA)
- Workflow 13: Monitor Custos
- Workflow 12: Busca Semanal (básico)
- Sistema comandos WhatsApp (básico)

**Testes Críticos do Kill Switch (DEDICADOS):**

Criar `backend/__tests__/kill-switch.test.js`:
- Teste 1: API /pausar-tudo desliga todos workflows
- Teste 2: Comando WhatsApp /pausar-tudo desliga todos
- Teste 3: Botão frontend desliga todos
- Teste 4: Workflows pausados NÃO executam (verificar enabled=FALSE)
- Teste 5: Notificação enviada confirmando pause
- Teste 6: Tempo de resposta < 5 segundos
- Teste 7: Religar workflows (/reativar-tudo)
- Teste 8: Estado final consistente

Criar `../scripts/test/test-kill-switch.js`:
- Simula cenário emergência
- Testa kill switch via 3 métodos (API, WhatsApp, Frontend)
- Valida workflows realmente param
- Testa rollback (religar seletivo)
- Gera relatório de teste

**Testes de Segurança:**
- Teste de proteção Instagram (confirmar ZERO posts automáticos)
- Teste de aprovação (nada executa sem OK)
- Teste de custos (pause em 90%)

**Entrega:** Sistema de controle completo + proteções TESTADAS e validadas

### Sprint 2 (Semana 2): Workflows Seguros

**24h de trabalho**

Tarefas:

- Workflow 09: Reels Fund Tracker
- Workflow 06: Gerar Legendas (modo aprovação)
- Workflow 05: Otimização Campanhas (modo notificar)
- Configurar Gemini Pro API
- Configurar Meta Ads API (readonly)
- Sistema de aprovação WhatsApp completo
- Página aprovacoes.html (frontend)
- Testes end-to-end

**Entrega:** 3 workflows IA funcionais com aprovação obrigatória

### Sprint 3 (Opcional - Expansão)

**20h de trabalho**

- Workflow 07: Recomendar Conteúdo
- Workflow 08: Análise Preditiva
- Workflow 10: Dicas Produtos
- Workflow 11: Análise Comentários
- Refinamentos baseados em uso

**Entrega:** 11 workflows completos

## Documentação Crítica

### MANUAL-AUTOMACOES.md

Exemplo de seção:

```markdown
## Workflow 05: Otimização de Campanhas

### O que faz
Analisa campanhas Meta Ads a cada 2 horas e sugere otimizações (pausar underperformers, escalar winners).

### Modos Disponíveis

1. MANUAL (padrão, recomendado)
   - Analisa e notifica
   - NADA é feito automaticamente
   - Você aprova cada ação

2. SEMI-AUTO (futuro, com toggle)
   - Executa ações aprovadas
   - Kill switch disponível
   - Rollback em 1h

3. AUTO (desligado por padrão, NÃO recomendado)
   - Executa automaticamente
   - Notifica DEPOIS
   - Risco médio

### Como Ativar

Via Frontend:
1. Acessar configuracoes-automacao.html
2. Encontrar "Otimização de Campanhas"
3. Toggle ON (fica azul)
4. Modo: Selecionar "Manual"
5. Salvar

Via WhatsApp:
- Enviar: /ativar-otimizar-campanhas

### Como Desativar

Via Frontend:
- Toggle OFF

Via WhatsApp:
- /desativar-otimizar-campanhas

Via Kill Switch:
- /pausar-tudo (desliga TODOS)

### Como Aprovar Sugestões

Quando receber notificação:
```

🔔 SUGESTÃO - Campanha "X"

CTR 1.5% - Sugerir pausar

✅ /aprovar-camp-123

```

Responder: /aprovar-camp-123

### Segurança

✅ Não pausa nada sem sua aprovação
✅ Você tem 24h para decidir
✅ Pode rejeitar sugestão
✅ Histórico de todas ações
❌ NUNCA liga modo auto sem você ativar manualmente

### Custo IA

- Análise de métricas: R$ 0 (local)
- Notificações: R$ 0 (Evolution API)
- Total: R$ 0/execução
```

## Critérios de Aceitação Final

- [ ] Sistema aprovação funcional (WhatsApp + Frontend)
- [ ] NENHUMA ação executa sem aprovação (exceto leitura)
- [ ] Monitor custos IA ativo (R$ 0-5 primeiro mês)
- [ ] Busca semanal validando plano
- [ ] Kill switch testado (pausa tudo)
- [ ] Manual completo de 50+ páginas
- [ ] Guia segurança Instagram completo
- [ ] ZERO postagens automáticas (confirmado)
- [ ] ZERO pausas de campanha sem aprovação
- [ ] Todos workflows em modo manual por padrão
- [ ] Marco e Sabrina treinados
- [ ] 1 semana de testes sem incidentes

## Próximos Passos

Aguardando sua confirmação para iniciar Sprint 1 (Semana 1: Fundação + Controles).

Posso começar criando:

1. As tabelas de controle no schema.sql
2. As APIs de automations e ai-costs
3. A página configuracoes-automacao.html
4. Os documentos de segurança

Confirmar para prosseguir?

### To-dos

- [ ] Auditar código backend completo (8 APIs, utils, db) usando Exa Search e Context7
- [ ] Auditar código frontend completo (7 páginas HTML, 2 JS)
- [ ] Revisar 4 workflows n8n production
- [ ] Revisar documentação em docs/ identificar obsoletos
- [ ] Criar backend/__tests__/auth.test.js completo
- [ ] Criar backend/__tests__/metrics.test.js completo
- [ ] Criar backend/__tests__/webhook.test.js completo
- [ ] Criar testes para schedule, hooks, config APIs
- [ ] Refatorar backend: extrair queries duplicadas, melhorar error handling
- [ ] Refatorar frontend: componentes repetidos, loading states
- [ ] Remover código morto, imports não usados, console.logs
- [ ] Atualizar PRD com estado atual do projeto
- [ ] Atualizar OpenAPI specs (openapi.json/yaml)
- [ ] Melhorar todos READMEs (principal, backend, frontend, n8n)
- [ ] Testar manualmente todos 8 endpoints backend
- [ ] Testar manualmente todas 7 páginas frontend
- [ ] Testar integrações (Backend↔Frontend, n8n, Supabase)
- [ ] Testes de performance (100+ métricas, memory leaks)
- [ ] Auditoria de segurança completa (SQL injection, XSS, JWT, secrets)
- [ ] npm audit e atualizar dependências vulneráveis
- [ ] Corrigir todos problemas encontrados nas fases anteriores
- [ ] Validação final: todos testes passando, 0 linter errors
- [ ] Organização final: criar .archive/ para obsoletos, limpar tudo
- [ ] Gerar relatórios finais (testes, segurança, performance)
- [ ] Criar RELATORIO-AUDITORIA-COMPLETA.md e atualizar outros
- [ ] Checklist pre-deploy e validar configs Vercel
- [ ] Criar tabelas automation_controls, approval_queue, ai_usage_tracking, weekly_plan_updates
- [ ] Criar backend/api/automations.js com endpoints de controle
- [ ] Criar backend/api/ai-costs.js para rastreamento de gastos
- [ ] Criar frontend/configuracoes-automacao.html com painel de controle
- [ ] Criar frontend/aprovacoes.html para fila de aprovações
- [ ] Criar docs/automations/master-plan.md versionado
- [ ] Criar docs/automations/MANUAL-AUTOMACOES.md detalhado
- [ ] Criar docs/automations/SEGURANCA-INSTAGRAM.md
- [ ] Implementar Workflow 13: Monitor Custos IA com alertas 50%/75%/90%
- [ ] Implementar Workflow 12: Busca Semanal Validação com Exa Search + Claude
- [ ] Implementar Workflow 09: Reels Fund Tracker (auto seguro)
- [ ] Implementar Workflow 06: Gerar Legendas com aprovação obrigatória
- [ ] Implementar Workflow 05: Otimizar Campanhas (modo apenas notificar)
- [ ] Criar sistema de comandos WhatsApp para aprovação e controle
- [ ] Testar todas proteções: nada executa sem aprovação, kill switch funciona
- [ ] Testar monitor custos: alertas em 50%, 75%, auto-pause em 90%
- [ ] Testar fluxo completo: sugestão → WhatsApp → aprovar → executar
- [ ] Configurar APIs gratuitas: Gemini Pro, ChatGPT Pro (assinaturas), VPS
- [ ] Configurar Meta Ads API (readonly para começar)
- [ ] Configurar Instagram Graph API (apenas followers count)
- [ ] Criar relatório semanal de estimativa de custos IA
- [ ] Finalizar documentação: manual 50+ páginas, guias de segurança
- [ ] Treinar Marco/Sabrina: como aprovar, comandos WhatsApp, kill switch