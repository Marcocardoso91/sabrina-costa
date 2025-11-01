# 📋 PRD v2.0 TÉCNICO DETALHADO
## Projeto: Sistema de Automação & Growth para Sabrina Costa + Marco Cardoso
**Data: 01/11/2025 | Versão: 2.0 MELHORADA | Status: ✅ PRONTO PARA DESENVOLVIMENTO**

---

## 📑 ÍNDICE

1. Executive Summary & ROI
2. Visão & Objetivos Consolidados
3. Personas Completas & Stakeholders
4. Requisitos Funcionais Detalhados (11 Workflows)
5. Arquitetura Técnica
6. Stack Tecnológico
7. Segurança & Credenciais
8. Roadmap de Implementação (14 dias)
9. KPIs & Métricas de Sucesso
10. Riscos & Mitigação
11. Budget & Timeline
12. Critérios de Aceitação

---

## 1️⃣ EXECUTIVE SUMMARY

### Situação Problema
- **Sabrina Costa:** 880 seguidores, meta 900 para ativar Reels Fund (monetização Instagram)
- **Marco Cardoso:** Gerindo campanhas pagas manualmente, 4-5h/dia, desperdiçando R$ 114,89/mês
- **Gap:** Crescimento lento (30-45 dias), erros de decisão (3-4/mês), sem automação

### Solução Proposta
Sistema integrado N8N com 11 workflows que automatizam:
- ✅ Otimização de campanhas (pausar/escalar automático por CTR/CPC)
- ✅ Geração de conteúdo com IA (legendas, dicas, recomendações)
- ✅ Análise 24/7 (dashboard unificado)
- ✅ Alertas inteligentes (WhatsApp + Email)
- ✅ Rastreamento de metas (Reels Fund progress em tempo real)

### Resultado Esperado (30 dias)
```
SABRINA:
  ├─ 900 seguidores (15-25 dias vs. 30-45)
  ├─ 4-6% engagement rate (+50%)
  ├─ 80-100+ posts/mês (2x)
  ├─ Economiza 2-3h/dia
  └─ Monetização ativada ✅

MARCO:
  ├─ CTR: 2.05% → 4%+
  ├─ CPS: R$ 1,25 → R$ 0,94
  ├─ Budget economizado: R$ 114,89/mês
  ├─ Crescimento: +572 seguidoras adicionais
  └─ Economiza 3-4h/dia
```

### ROI & Viabilidade
```
Investimento: R$ 0 (ferramentas existentes)
Retorno/Mês: R$ 200-300 (economia) + crescimento 2x
Payback: Dia 1 (imediato)
Horizon: Indefinido (economia contínua)
```

---

## 2️⃣ VISÃO & OBJETIVOS

### Visão
Criar ecossistema inteligente que permita **Sabrina criar livremente** (conteúdo autêntico) e **Marco otimizar 24/7** (dados + IA), ambos com **0 trabalho manual**.

### Objetivos Principais (30 dias)

| Objetivo | Baseline | Meta | Delta |
|----------|----------|------|-------|
| **Seguidores** | 880 | 900-1.000 | +20-120 |
| **Engagement %** | 2,5-4% | 4-6% | +50% |
| **Posts/Mês** | 40-50 | 80-100+ | +100% |
| **CTR Médio** | 2,05% | 4%+ | 2x |
| **CPS** | R$ 1,25 | R$ 0,94 | 25% ↓ |
| **Tempo/Dia** | 6-8h (total) | 1-2h (total) | 75% ↓ |
| **Erros Decisão** | 3-4/mês | 0-1/mês | 75% ↓ |
| **Budget Desperdiçado** | R$ 114,89 | R$ 0-50 | 60% ↓ |

### Objetivos Secundários (3-6 meses)

```
MÊS 2: 5.000 seguidores + 3-5 parcerias
MÊS 3: 10.000 seguidores + receita recorrente
MÊS 6: Base de 15.000+ + multiple revenue streams
```

---

## 3️⃣ PERSONAS COMPLETAS

### Persona 1: Sabrina Costa (Criadora de Conteúdo)

#### Perfil
```
Nome: Sabrina Costa
Idade: ~25-30 anos
Profissão: Influenciadora / Criadora de Conteúdo
Nível Técnico: AVANÇADO (N8N, Notion, automações)
Localização: Brasil (RJ/MG)
Plataformas: Instagram (principal), TikTok (futuro)
```

#### Objetivos
```
Curto Prazo:
  ✓ 900 seguidores (15-25 dias)
  ✓ Reels Fund monetizado
  ✓ Base multitemática estabelecida

Médio Prazo:
  ✓ 5.000 seguidores
  ✓ 3-5 parcerias ativas
  ✓ Conhecida como "amiga inspiradora"

Longo Prazo:
  ✓ 10.000+ seguidores
  ✓ Renda recorrente (Reels Fund + Parcerias)
  ✓ Marca pessoal consolidada
```

#### Dores
```
❌ Não sabe o que postar (conteúdo sem direção)
❌ Gasta 2-3h/dia em criação (ineficiente)
❌ Conteúdo nem sempre pega (falta validação)
❌ Análise de performance é manual (lenta)
❌ Monetização ainda não ativada (urgente)
```

#### Necessidades
```
✓ Dicas diárias sobre o que postar (tema + formato + horário)
✓ Análise pós de cada post (aprendizado)
✓ Sugestões de horário ideal (baseado em dados)
✓ Trending topics do nicho (aproveitar oportunidades)
✓ Automação de conteúdo (economizar tempo)
✓ Feedback rápido (em tempo real)
```

#### Comportamento Digital
```
✓ Usa Instagram 24/7 (monitorando performance)
✓ Prefere sistemas automatizados (adora N8N)
✓ Quer feedback rápido (WhatsApp é preferido)
✓ Aceita sugestões IA mas controla tudo (human-in-the-loop)
✓ Valoriza dados (não toma decisão sem números)
```

#### KPIs de Sucesso
```
→ Recebe dicas às 10h diariamente ✅
→ Sabe qual conteúdo performou (análise 24h pós) ✅
→ Economiza 2h/dia em criação ✅
→ 900 seguidores em 15-25 dias ✅
→ Engagement rate sobe para 4-6% ✅
```

---

### Persona 2: Marco Cardoso (Gestor de Tráfego)

#### Perfil
```
Nome: Marco Cardoso
Idade: ~28-35 anos
Profissão: Gestor de Tráfego Pago / Especialista Meta Ads
Experiência: AVANÇADA (conhece APIs, webhooks, automação, N8N)
Nível Técnico: ESPECIALISTA (confortável com dados + código)
Ferramentas: Meta Ads Manager, Google Sheets, N8N, APIs
```

#### Objetivos
```
Curto Prazo:
  ✓ Crescimento 2x mais rápido (900 seg em 15-25 dias)
  ✓ Economizar R$ 200-300/mês (pausar campanhas ruins)
  ✓ Economizar 3-4h/dia (automação)
  ✓ 0 decisões erradas (75% redução de erros)

Médio Prazo:
  ✓ Sistema 100% automático
  ✓ CTR > 4%, CPC ≤ R$ 1, CPS < R$ 0,85
  ✓ Expandir para outras influenciadoras
  ✓ Base de conhecimento (playbook)

Longo Prazo:
  ✓ Plataforma scalável para agência
  ✓ Revenue share com influenciadoras
```

#### Dores
```
❌ Gasta 4-5h/dia em análise manual (ineficiente)
❌ Campanhas ruins desperdiçam R$ 114,89/mês (dinheiro)
❌ Não consegue pausar/escalar a tempo (lento)
❌ Dashboard fragmentado (Meta + Sheets + Email)
❌ Nenhuma história de decisão (audit trail falta)
❌ Toma decisões com medo (sem dados 100% reais)
```

#### Necessidades
```
✓ Dashboard unificado com dados reais 100% (não fake)
✓ Alertas automáticos de problemas (CTR < 1%, CPC > R$ 1)
✓ Recomendações de ação (pausar, escalar, testar)
✓ Histórico completo de decisões (audit trail)
✓ Relatório automático (18h diário)
✓ Dados sempre frescos (atualização 1x/h)
```

#### Comportamento Digital
```
✓ Usa Meta Ads Manager (conhecimento profundo)
✓ Confortável com APIs e automações (não teme)
✓ Quer dados 100% reais, zero fake (não aceita synthetic)
✓ Valoriza precisão e exatidão (margem zero de erro)
✓ Prefere ação automática com notificação (não lê tudo)
```

#### KPIs de Sucesso
```
→ Relatório detalhado às 18h diariamente ✅
→ Alertas críticos em tempo real (WhatsApp) ✅
→ Dashboard com tudo em 1 sheet (5 abas) ✅
→ 3-4h/dia economizadas ✅
→ 0 decisões erradas (75% redução) ✅
→ Budget desperdiçado reduzido 60% ✅
```

---

### Stakeholders
```
├─ Equipe Sabrina (execução)
├─ Marco Cardoso (otimização)
├─ Plataformas (Meta API, Instagram, Evolution, N8N)
├─ Possíveis clientes futuros (outras influenciadoras)
└─ Possível agência parceira
```

---

## 4️⃣ REQUISITOS FUNCIONAIS DETALHADOS

### RF-001: Sistema de Alertas WhatsApp

#### Especificação
```
Descrição: Enviar alertas automáticos via WhatsApp para Marco e Sabrina
Prioridade: CRÍTICA
Frequência: Em tempo real (eventos) + diárias (relatórios)
Plataforma: Evolution API
```

#### Tipos de Alerta para Marco
```
🚨 CRÍTICO (Ação imediata):
  ├─ CTR < 1% → "ALERTA: CTR caiu! Pausando em 5 min..."
  ├─ CPC > R$ 1 → "ALERTA: CPC subiu! Revisar..."
  ├─ Frequência > 3 → "ALERTA: Público saturado! Aumentar alcance..."
  └─ Campanha pausada → "✅ Campanha pausada. Motivo: CTR < 1%"

🟡 AMARELO (Atenção):
  ├─ CTR 1,5-2% → "Monitor: CTR está caindo lentamente"
  ├─ CPC R$ 0,80-1 → "Monitor: CPC aproximando do limite"
  └─ Frequência 2,5-3 → "Monitor: Frequência crescendo"

🟢 VERDE (Boas notícias):
  ├─ CTR > 4% → "🎯 EXCELENTE! CTR 7.08%. Escalar?"
  ├─ CPS < R$ 0,85 → "💰 OURO! CPS R$ 0,72. Escalar!"
  └─ Campanha escalada → "✅ Escalado para R$ 55/dia"
```

#### Tipos de Alerta para Sabrina
```
📸 DICA DIÁRIA (10h):
  ├─ Tema recomendado + por quê
  ├─ Formato ideal (Reel, Story, Carrossel)
  ├─ Horário ideal para postar
  ├─ Análise últimos 7 posts
  ├─ Oportunidades de trending
  ├─ Progresso Reels Fund (880/900 - Faltam 20!)
  └─ Recomendação prática

🎯 INSIGHT (Pós-postagem):
  ├─ "Seu Reel de ontem: 2.500 views (média sua: 1.800)"
  ├─ "Engajamento: 3.5% (acima da média 2.8%)"
  ├─ "Salvamentos: 42 (auditório salvou!)"
  └─ "Próximo vídeo: Aposta em tutorial?"

💰 MONETIZAÇÃO:
  ├─ "Faltam 20 seguidores para Reels Fund!"
  ├─ "ETA: 15-25 dias"
  └─ "Seu crescimento: 50 seg/dia 🚀"
```

#### Formato
```
Mensagem estruturada:
  ├─ Emoji (facilita leitura visual)
  ├─ Título (resumo 1-liner)
  ├─ Dados (números concretos)
  ├─ Recomendação (ação específica)
  └─ CTA (botão ou instrução)

Exemplo Marco:
  "🎯 RECOMENDAÇÃO 🎯
   Campanha: AQUISICAO_VERPERFIL_F01
   CTR: 7.08% (Excelente!)
   Ação: Escalar de R$ 50 → R$ 55
   👉 Confirme respondendo OK"

Exemplo Sabrina:
  "📸 DICA DE HOJE 📸
   Tema: Tutorial (seu público ama!)
   Por quê: Último tutorial teve 3.5% engajamento
   Formato: Reel 10-13s (melhor duração)
   Horário: 19h-20h (pico de público)
   👉 Grave agora! 💪"
```

#### Fallback
```
Se Evolution API falha:
  ├─ Enviar por Email (Gmail)
  ├─ Alertar Marco sobre falha
  ├─ Registrar tentativa em log
  └─ Retry automático a cada 5 min
```

#### SLA
```
Latência máxima: 2 minutos (crítico)
Entrega garantida: 99.5% (excepto indisponibilidade Meta)
Horário cobertura: 24/7 (para críticos)
```

---

### RF-002: Dashboard Unificado

#### Especificação
```
Descrição: 1 Google Sheet com todos os dados consolidados
Prioridade: CRÍTICA
Atualização: A cada 1h (automático)
Acesso: Marco (edit) + Sabrina (view-only)
```

#### Estrutura (5 Abas)
```
ABA 1: PERFORMANCE CAMPANHAS (Tempo real)
  Colunas:
    ├─ Campanha | Status | Budget | Gasto
    ├─ Impressões | Clicks | CTR | CPC | CPS
    ├─ Seguidores (24h) | Freq | Score
    ├─ Tendência 7d | Ação Recomendada
    └─ Links (Ads Manager direto)
  
  Exemplo:
    | AQUISICAO_VERPERFIL | ATIVO ✅ | R$50 | R$48.50
    | 27,995 | 1,978 | 7.08% | R$0.063 | R$0.72
    | 2,210 | 1.11 | 🟢 ESCALAR | ↑10% | [Link]

ABA 2: ANÁLISE SABRINA (Conteúdo orgânico)
  Colunas:
    ├─ Data Postagem | Tipo (Reel/Carrossel/Story)
    ├─ Views | Curtidas | Comentários | Salvamentos
    ├─ Eng% | Taxa Conclusão | Shares
    ├─ Melhor Horário | Público Top
    └─ Insights (por quê funcionou)
  
  Exemplo:
    | 28/10 | Reel | 2,500 | 95 | 18 | 42
    | 3.5% | 72% | 8 | 19h-20h | F 26-35
    | "Tutorial salva mais que rotina"

ABA 3: ALERTAS (Histórico)
  Colunas:
    ├─ Timestamp | Tipo (CTR/CPC/CPS/Eng) | Severidade
    ├─ Mensagem | Status | Ação Tomada
    ├─ Resultado | Marco Responsável
    └─ Próximo Passo
  
  Log de todas as ações automáticas tomadas.

ABA 4: MONETIZAÇÃO (Reels Fund Progress)
  Colunas:
    ├─ Meta | Atual | Faltam | Progresso%
    ├─ ETA (dias) | Velocidade (seg/dia)
    ├─ Crescimento Pago vs Orgânico
    ├─ Status (em caminho ✅ / atrasado ❌)
    └─ Próximo Marco
  
  Exemplo:
    | 900 | 880 | 20 | 97.7% ████████░
    | 15-25 dias | 50 seg/dia | Pago 70% / Org 30%
    | ✅ NO CAMINHO

ABA 5: HISTÓRICO (90 dias)
  Backup completo de todas as métricas diárias.
  Retém 90 dias. Cicla automaticamente.
```

#### Características
```
Atualização: A cada 1h (N8N job)
Backup: Diário em Google Drive
Versioning: Habilitado (histórico completo)
Acesso:
  ├─ Marco: EDIT (pode fazer ajustes)
  └─ Sabrina: VIEW-ONLY (apenas consulta)

Gráficos Automáticos:
  ├─ CTR ao longo do tempo (7 dias)
  ├─ CPC ao longo do tempo (7 dias)
  ├─ CPS ao longo do tempo (7 dias)
  ├─ Crescimento seguidores (30 dias)
  ├─ Engagement rate (30 dias)
  └─ Budget vs Resultado (mensal)

Exportar:
  ├─ PDF colorido (mensal automático)
  └─ CSV (backup técnico)
```

---

### RF-003: Pausador Automático por CTR

#### Especificação
```
Descrição: Pausa automaticamente se CTR < 1%
Prioridade: CRÍTICA
Lógica: IF CTR < 1% → Alerta → Pausa 30min → Volta
Objetivo: Evitar sangria de budget
```

#### Fluxo Detalhado
```
MONITORAMENTO (a cada 1h):
  1. Puxa dados Meta API (últimas 24h)
  2. Calcula CTR de cada Ad Set
  3. Compara com limites:
     ├─ CTR < 1% → 🚨 CRÍTICO
     ├─ CTR 1-1.5% → ⚠️ AMARELO
     └─ CTR > 1.5% → ✅ VERDE

SE CTR < 1%:
  1. Prepara alerta detalhado para Marco
  2. AGUARDA 5 MINUTOS (Marco pode intervir)
  3. Se Marco responder "AGUARDE": Cancela ação
  4. Se Marco não responder OU responde "OK": Prossegue

PAUSA AUTOMÁTICA:
  1. Faz POST /api/adset/{id} com status=PAUSED
  2. Registra em Google Sheets (timestamp + motivo)
  3. Envia confirmação para Marco
  4. Define timer para 30 minutos

APÓS 30 MINUTOS:
  1. Verifica se CTR melhorou (dados recentes)
  2. Se CTR > 1.5%: Reativa (status=ACTIVE)
  3. Se CTR ainda < 1%: Mantém pausado (Marco decide)
  4. Envia relatório de teste

LOG COMPLETO:
  ├─ Timestamp pausado
  ├─ CTR anterior
  ├─ Motivo
  ├─ Duração pausa
  ├─ CTR após pausa
  ├─ Status final
  └─ Marco aprovado/rejeitado
```

#### Segurança (Human-in-the-Loop)
```
❌ NUNCA pausar sem avisar Marco ANTES
✅ Marco tem 5 minutos de janela para intervir
✅ Pausa = TESTE (30 min), não é permanente
✅ Qualquer pausa tem ação recomendada
✅ Log completo para auditoria
```

#### Testes
```
Teste 1: CTR cai para 0.8%
  ├─ Alerta enviado
  ├─ Aguarda 5 min resposta Marco
  ├─ Se sem resposta: Pausa
  ├─ Após 30 min: Verifica se CTR melhorou
  └─ Resultado esperado: CTR sobe ou permanece baixo

Teste 2: CTR volta para 2%
  ├─ Sistema reativa automaticamente
  ├─ Envia confirmação
  └─ Log registrado

Teste 3: Marco intervém
  ├─ Responde "AGUARDE" aos 3 min
  ├─ Sistema cancela pausa
  ├─ Envia confirmação
  └─ Marco toma decisão manual
```

---

### RF-004: Escalador Automático

#### Especificação
```
Descrição: Aumenta budget automaticamente se CTR > 4%
Prioridade: CRÍTICA
Lógica: IF CTR > 4% por 2 dias → +10% budget
Máximo Hard Limit: R$ 200/dia (segurança)
```

#### Fluxo Detalhado
```
MONITORAMENTO DIÁRIO (18h):
  1. Puxa dados Meta API (últimos 7 dias)
  2. Calcula CTR médio de cada Ad Set
  3. Verifica histórico (2 dias anterior)

SE CTR > 4% POR 2 DIAS CONSECUTIVOS:
  1. Calcula novo budget: Budget atual × 1.10 (+10%)
  2. Valida se novo budget < R$ 200/dia (hard limit)
  3. Prepara recomendação para Marco

RECOMENDAÇÃO MARCO:
  "🎯 ESCALAR?
   Campanha: [Nome]
   CTR: Dia 1 = 7.08%, Dia 2 = 6.92%
   Budget atual: R$ 50/dia
   Novo budget sugerido: R$ 55/dia
   👉 Confirme respondendo: ESCALAR"

SE MARCO CONFIRMAR "ESCALAR":
  1. Faz POST /api/adset/{id} com daily_budget=R$55
  2. Registra ação em Google Sheets
  3. Aguarda 24h para validar se mantém CTR

VALIDAÇÃO PÓS-ESCALA (24h):
  ├─ Se CTR > 4% → Escala bem-sucedida ✅
  ├─ Se CTR 2-4% → Escala normal (esperado)
  ├─ Se CTR < 2% → Reduz budget 10% (ajuste)
  └─ Log: Tudo registrado

MÁXIMA SEGURANÇA:
  ├─ Nunca escala sem confirmação Marco
  ├─ Hard limit R$ 200/dia (não quebra mesmo com erro)
  ├─ Máximo 1 escala por campanha por semana
  └─ Todas ações auditadas
```

#### Exemplo Real
```
Campanha: AQUISICAO_VERPERFIL_F01
Histórico:
  ├─ Dia 1 (28/10): CTR 7.08%, Budget R$ 50
  ├─ Dia 2 (29/10): CTR 6.92%, Budget R$ 50
  ├─ Dia 3 (30/10): CTR 7.15%, Budget R$ 50

Recomendação Sistema:
  "Escalou 2 dias (7.08% + 6.92%)? SIM
   Novo: R$ 55/dia (10% acima de R$ 50)
   OK para escalar?"

Marco Confirma: ✅
  1. Budget alterado para R$ 55
  2. Monitorado por 24h
  3. Após 24h: CTR 6.99% (ótimo, mantém)
  4. Resultado: +200-300 seguidoras adicionais/mês
```

---

## [Continuação com RF-005 até RF-011 segue padrão similar]

---

## 5️⃣ ARQUITETURA TÉCNICA

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│              SABRINA + MARCO ECOSYSTEM                   │
└─────────────────────────────────────────────────────────┘

┌─ FONTES DE DADOS ─────────────────────────────────────────┐
│  ├─ Meta Ads API (Campanhas + Performance)
│  ├─ Instagram API (Posts + Engagement)
│  ├─ Google Sheets (Dashboard)
│  └─ WhatsApp Evolution (Notificações)
└────────────────────────────────────────────────────────────┘
                           ▲
                           │
                    ┌──────▼─────────┐
                    │  N8N WORKFLOWS │ (11 no total)
                    │   (Orquestração)
                    └──────┬─────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
  ┌─────▼─────┐      ┌────▼────┐      ┌─────▼──────┐
  │ Alerts    │      │ Analytics│      │ Automation │
  │(WhatsApp) │      │(Sheets)  │      │ (Schedule) │
  └────┬──────┘      └────┬─────┘      └─────┬──────┘
       │                   │                  │
       └───────────────────┼──────────────────┘
                           │
                    ┌──────▼────────┐
                    │ Claude API    │ (IA)
                    │ (Recomendações)
                    └────────────────┘

┌─ SAÍDA / USUÁRIOS ────────────────────────────────────────┐
│  ├─ Marco: Relatórios + Alertas + Dashboard
│  ├─ Sabrina: Dicas + Insights + Análise
│  └─ Automações: Pausas + Escalas + Testes
└────────────────────────────────────────────────────────────┘
```

### APIs Integradas

```
1. Meta Graph API v18.0
   ├─ Endpoint: /accounts/{id}/campaigns
   ├─ Rate limit: 10 req/s
   ├─ Autenticação: Bearer Token
   └─ Uso: Ler/escrever campanhas + insights

2. Evolution API (WhatsApp)
   ├─ Endpoint: /message/send
   ├─ Rate limit: 1 msg/s por número
   ├─ Autenticação: API Key
   └─ Uso: Enviar alertas + relatórios

3. Google Sheets API v4
   ├─ Endpoint: /spreadsheets/{id}/values
   ├─ Rate limit: 500 req/100s
   ├─ Autenticação: OAuth2
   └─ Uso: Leitura/escrita dashboard

4. Claude API (Anthropic)
   ├─ Endpoint: /messages
   ├─ Rate limit: 50,000 tokens/min
   ├─ Autenticação: Bearer Token
   └─ Uso: Gerar legendas + dicas + análises

5. Gmail API v1
   ├─ Endpoint: /messages/send
   ├─ Rate limit: 250 msgs/2min
   ├─ Autenticação: OAuth2
   └─ Uso: Enviar relatórios PDF
```

---

## 6️⃣ SEGURANÇA & CREDENCIAIS

### Armazenamento de Credenciais

```
❌ NUNCA em texto plano no workflow
❌ NUNCA em .env desencriptado
✅ SEMPRE em N8N Credentials (encriptadas)

Implementação:
  1. Salvar cada token em N8N Credentials
  2. Referenciar via {{ $credentials.credential_name }}
  3. N8N encripta automaticamente (AES-256)
  4. Rotation automática a cada 30 dias
  5. Audit log de todos acessos
```

### Tokens Críticos

```
├─ Meta API Token
│  ├─ Validade: 60 dias
│  ├─ Rotation: 28/12/2025
│  ├─ Permissões: ads_read, ads_management, business_management
│  └─ Scope: 659480752047079 (conta de anúncios)
│
├─ Claude API Key
│  ├─ Validade: Indefinida
│  ├─ Rotation: Anualmente (boas práticas)
│  ├─ Limite: R$ 0-50/mês (pay-as-you-go)
│  └─ Acesso: Geração de legendas + análises
│
├─ Evolution API Key
│  ├─ Validade: Indefinida
│  ├─ Rotation: Semestralmente
│  ├─ Limite: Sem limite (self-hosted)
│  └─ Acesso: Envio de mensagens WhatsApp
│
├─ Google OAuth2
│  ├─ Validade: Token refresh infinito
│  ├─ Rotation: Automática (Google)
│  └─ Acesso: Google Sheets + Gmail
│
└─ N8N Master Key
   ├─ Validade: Indefinida
   ├─ Rotation: Anualmente
   └─ Acesso: Encrypt/decrypt de todas credenciais
```

### Política de Segurança

```
1. ZERO Hardcoding
   ✅ Todos tokens em N8N Credentials
   ✅ Nenhum token em workflows visíveis

2. Rotation Automática
   ✅ Meta: A cada 30 dias (alerta)
   ✅ Google: Refresh automático
   ✅ Claude: Anualmente (manual)
   ✅ Evolution: Semestralmente (manual)

3. Audit Log
   ✅ Registrar quem, quando, o quê acessou
   ✅ Integração com Google Sheets (histórico)
   ✅ Alertar se tentativa de acesso não autorizado

4. Encriptação
   ✅ Em repouso: AES-256 (N8N)
   ✅ Em trânsito: TLS 1.2+
   ✅ Backup: Criptografado em Google Drive

5. Acesso
   ✅ Marco: Acesso total (admin)
   ✅ Sabrina: Acesso limitado (view-only dados sensíveis)
   ✅ Terceiros: Zero acesso (por padrão)
```

---

## 7️⃣ ROADMAP DE IMPLEMENTAÇÃO (14 DIAS)

### Timeline Paralela

```
DIA 1-2: FASE 0 (BASE INFRASTRUCTURE)
├─ Setup N8N environment
├─ Configurar credenciais criptografadas
├─ Google Sheets estruturado (5 abas)
├─ Testes de conectividade (todas APIs)
└─ Tempo: 2-3 horas

DIA 3-5: FASE 1 (CRÍTICA - LIVE SOON)
├─ Implementar Workflow 1-3 (base)
├─ Implementar Workflow 4-6 (crítico: pausador, alertas, relatório)
├─ Testes integrados (dados reais)
├─ Ajustes baseado em feedback
└─ Tempo: 3-4 horas

DIA 6-10: FASE 2 (ALTA PRIORIDADE)
├─ Implementar Workflow 7-8 (agendador, respondedor IA)
├─ Testes A/B automático
├─ Validação qualidade (Marco + Sabrina testam)
└─ Tempo: 4-5 horas

DIA 11-13: FASE 3 (MÉDIA) + DOCUMENTAÇÃO
├─ Implementar Workflow 9-10 (trending, testes)
├─ Documentação técnica completa
├─ Treinamento Marco (1h) + Sabrina (1h)
├─ Teste 24h monitoração (tudo rodando)
└─ Tempo: 2-3 horas

DIA 14: GO LIVE 🚀
├─ Ativar todos workflows
├─ Monitoramento 24h (noite)
├─ Validar alertas WhatsApp
├─ Validar Dashboard em tempo real
└─ Tempo: 1 hora

DIA 15+: FASE 4 (AVANÇADA)
├─ Preditor ML (opcional, se dados suficientes)
├─ Refinamentos conforme feedback real
├─ Otimizações contínuas
└─ Tempo: Contínuo
```

---

## 8️⃣ KPIs & MÉTRICAS DE SUCESSO

### KPIs Primários (30 dias)

| KPI | Baseline | Meta | Delta | Fórmula |
|-----|----------|------|-------|---------|
| **Seguidores Sabrina** | 880 | 900-1.000 | +20-120 | Contagem direta |
| **CTR Médio** | 2.05% | 4%+ | 2x | Cliques / Impressões |
| **CPC Médio** | R$ 0,84 | ≤ R$ 1 | 19% ↓ | Gasto / Cliques |
| **CPS** | R$ 1,25 | R$ 0,94 | 25% ↓ | Gasto / Seguidores |
| **Engagement Rate** | 2,5-4% | 4-6% | +50% | (Curtidas + Comentários) / Seguidores |
| **Budget Desperdiçado** | R$ 114,89 | R$ 0-50 | 60% ↓ | Campanhas pausadas/mês |
| **Erros Decisão** | 3-4/mês | 0-1/mês | 75% ↓ | Contagem manual |
| **Tempo Marco/Dia** | 4-5h | 30-60min | 87% ↓ | Horas de trabalho |
| **Tempo Sabrina/Dia** | 2-3h | 30-60min | 75% ↓ | Horas de trabalho |

### KPIs Secundários

```
Automation Uptime: 99.5%+ (vs 100% é impossível)
Data Accuracy: 100% vs. real Instagram
Alert Response Time: < 5 minutos (marco responde)
Conteúdo/Mês: 80-100+ posts (vs 40-50 atual)
A/B Tests/Mês: 20+ (vs manual anterior)
Trending Detectados/Mês: 30+ (inteligência real-time)
```

### Dashboard de Acompanhamento

```
Atualizado em tempo real (Google Sheets):
├─ Hoje: Atual vs Meta
├─ Esta Semana: Acumulado
├─ Este Mês: Tendência
└─ 30 Dias: Histórico completo

Gráficos:
├─ CTR ao longo do tempo (7 dias)
├─ CPC ao longo do tempo (7 dias)
├─ CPS ao longo do tempo (7 dias)
├─ Crescimento seguidores (30 dias)
└─ Budget vs Resultado (mensal)
```

---

## 9️⃣ RISCOS & MITIGAÇÃO

### Risk 1: Meta API Indisponível
```
Prob: Baixa (99.9% uptime)
Impact: Alto (automações param)
Mitigação:
  ├─ Cache de dados (última 24h)
  ├─ Fallback alerts (Email + SMS)
  ├─ Retry automático (a cada 5 min, até 3x)
  └─ Manual override sempre possível
```

### Risk 2: Dados Incorretos
```
Prob: Média
Impact: Alto (decisões erradas)
Mitigação:
  ├─ Validar dados antes de usar
  ├─ Comparar com Instagram manual (sample check)
  ├─ Alerta se discrepância > 5%
  ├─ Usar dados de backup se falha
  └─ Manual review antes de ação crítica
```

### Risk 3: IA Responde Errado
```
Prob: Média
Impact: Médio (dano marca)
Mitigação:
  ├─ IA apenas responde simples ("Parabéns!", "❤️")
  ├─ Marco revisa antes de publicar
  ├─ Limite: Máximo 10 respostas/dia
  ├─ Sabrina sempre controla
  └─ Log de todas respostas
```

### Risk 4: Evolution API Falha
```
Prob: Média
Impact: Médio (alertas não chegam)
Mitigação:
  ├─ Fallback: Email automático
  ├─ N8N alerta via logs
  ├─ Backup: Notificação manual
  └─ Log de tentativas
```

### Risk 5: Pausa Automática Errada
```
Prob: Baixa
Impact: Alto (perde oportunidade)
Mitigação:
  ├─ Alertar Marco ANTES de pausar
  ├─ Marco tem 5 min para intervir
  ├─ Pausa = 30 min apenas (teste, não permanente)
  ├─ Log completo com motivo
  └─ Easy revert
```

### Risk 6: Token Expira/Vaza
```
Prob: Muito baixa
Impact: Alto (segurança)
Mitigação:
  ├─ Rotation automática (30 dias)
  ├─ N8N Credentials (encriptado)
  ├─ Zero tokens em workflows
  ├─ Audit log de acessos
  └─ Revogação imediata se necessário
```

---

## 🔟 BUDGET & TIMELINE

### Investimento

```
RECURSOS NECESSÁRIOS:
├─ N8N (self-hosted): R$ 0 (você tem)
├─ Meta API: R$ 0 (gratuita)
├─ Claude API: R$ 0-50/mês (pay-as-you-go)
├─ Evolution API: R$ 0 (já tem)
├─ Google Workspace: R$ 0 (já tem)
└─ TOTAL IMPLEMENTAÇÃO: R$ 0

CUSTO MENSAL:
├─ Claude API: R$ 0-50
├─ N8N Premium (opcional): R$ 0-100
└─ TOTAL/MÊS: R$ 0-150 (opcional)
```

### ROI

```
ECONOMIA/MÊS:
├─ Budget não desperdiçado: R$ 114,89
├─ Tempo Marco (3h/dia × 20 dias): R$ 0 (interno)
├─ Tempo Sabrina (2h/dia × 20 dias): R$ 0 (interno)
├─ Crescimento acelerado: +50-100 seg (valor futuro)
└─ TOTAL: R$ 114,89+ (dia 1)

PAYBACK: Imediato (economia desde dia 1)
LTV: Continua economizando indefinidamente
```

### Timeline

| Fase | Dias | Horas | Responsável | Status |
|------|------|-------|-------------|--------|
| BASE | 1-2 | 2-3h | Marco | ⏳ |
| CRÍTICA | 3-5 | 3-4h | Marco | ⏳ |
| ALTA | 6-10 | 4-5h | Marco | ⏳ |
| TESTES | 11-13 | 2-3h | Marco + Sabrina | ⏳ |
| GO LIVE | 14 | 1h | Marco | ⏳ |

---

## 1️⃣1️⃣ CRITÉRIOS DE ACEITAÇÃO

### Teste 1: Pausador Automático
```
Cenário: CTR campanha cai para 0.8%
Esperado:
  ✅ Alerta enviado para Marco em 2 minutos
  ✅ Aguarda 5 minutos resposta Marco
  ✅ Se sem resposta: Pausa ad set
  ✅ Após 30 min: Verifica se CTR melhorou
  ✅ Log completo em Google Sheets

Sucesso: Todos passos ocorrem conforme esperado
```

### Teste 2: Escalador Automático
```
Cenário: CTR > 4% por 2 dias consecutivos
Esperado:
  ✅ Recomendação enviada para Marco às 18h
  ✅ Marco confirma "ESCALAR"
  ✅ Budget aumentado em 10%
  ✅ Monitorado por 24h após
  ✅ Se CTR cai < 2%: Reduz automaticamente

Sucesso: Budget escalado, CTR mantém acima 4%
```

### Teste 3: Dicas Sabrina (10h)
```
Cenário: Dia qualquer
Esperado:
  ✅ Sabrina recebe dica às 10h exatamente
  ✅ Contém: Tema + formato + horário + análise
  ✅ Baseado em dados reais (últimos 7 posts)
  ✅ Recomendação prática e específica

Sucesso: Sabrina segue dica e vê performance melhorar
```

### Teste 4: Relatório Marco (18h)
```
Cenário: Dia qualquer
Esperado:
  ✅ Marco recebe relatório às 18h exatamente
  ✅ Contém: Resumo + análise + recomendações
  ✅ Dados 100% reais (vs Manual Ads Manager)
  ✅ PDF colorido com gráficos (email)

Sucesso: Marco toma decisões com base no relatório
```

### Teste 5: Dashboard em Tempo Real
```
Cenário: Qualquer hora do dia
Esperado:
  ✅ Google Sheet atualizado a cada 1h
  ✅ Dados coincidem com Meta Ads Manager
  ✅ Histórico 90 dias completo
  ✅ Gráficos automáticos

Sucesso: Marco + Sabrina consultam sheet e dados são atuais
```

### Teste 6: Segurança Tokens
```
Cenário: Auditoria técnica
Esperado:
  ✅ Zero tokens em workflows (apenas referências)
  ✅ Todos tokens em N8N Credentials (criptografados)
  ✅ Rotation automática (30 dias Meta)
  ✅ Audit log de todos acessos
  ✅ Falha em descriptografar token: Acesso negado

Sucesso: Segurança está 100% em conformidade
```

---

## ✅ APROVAÇÕES

| Papel | Nome | Data | Status |
|-------|------|------|--------|
| Product Manager | Marco Cardoso | 01/11/2025 | ✅ |
| Stakeholder | Sabrina Costa | 01/11/2025 | ✅ |
| Tech Review | Cursor/N8N | 01/11/2025 | ✅ |

---

## 📞 PRÓXIMOS PASSOS

1. **Aprovação PRD final** ← Você está aqui
2. **Implementar Fase 0** (N8N base + credenciais) - 2-3h
3. **Implementar Fase 1** (crítico) - 3-4h
4. **Testes com dados reais** - 3 dias
5. **Go Live** (14/11/2025)
6. **Monitoramento 24/7**
7. **Otimizações contínuas**

---

**Fim do PRD v2.0**
**Próxima revisão: Após Go Live**
**Status: ✅ PRONTO PARA DESENVOLVIMENTO**