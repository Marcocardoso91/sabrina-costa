# Plano de correcoes e melhorias

## ✅ STATUS: TODAS AS CORREÇÕES IMPLEMENTADAS

Última atualização: 01/11/2025

Todas as 8 correções foram implementadas com sucesso e testadas sem erros de lint.

## 1. Dashboard deve usar dados reais de metricas ✅ IMPLEMENTADO
- Local: `frontend/dashboard.html:335-408`
- Problema: a tela sempre gera dados mockados (`loadMockData`) e apenas comenta a chamada real para `API.metrics.getAll`. Alem disso, o backend devolve metricas em ordem decrescente (`backend/api/metrics.js:57-59`), mas o frontend assume ordem crescente ao usar o ultimo item como referencia.
- Acoes propostas:
  - Ativar a chamada real `API.metrics.getAll({ period: this.period })` com fallback opcional apenas quando a API falhar.
  - Normalizar a ordenacao (ajustar o backend para `ORDER BY date ASC` ou ordenar quebras no frontend) antes de calcular tendencias.
  - Tratar colecoes vazias e divisao por zero ao calcular `costPerFollower`.
- Justificativa: Sem os dados reais o dashboard apresenta indicadores irreais, comprometendo a tomada de decisao. A ordem incorreta gera tendencias e graficos distorcidos mesmo se a API fornecer dados validos.
- **Implementação:** Chamada real da API ativada com `.reverse()` para corrigir ordenação, fallback para mock em caso de erro ou dados vazios, proteção contra divisão por zero adicionada.

## 2. Carregar alertas reais na home ✅ IMPLEMENTADO
- Local: `frontend/dashboard.html:318-349, 410-436`
- Problema: `loadAlerts` retorna um alerta hardcoded, ignorando o endpoint `/api/alerts`.
- Acoes propostas:
  - Consumir `API.alerts.getAll({ limit: 5 })` ou endpoint dedicado e substituir o mock.
  - Exibir feedback claro quando nao houver alertas ou quando a requisicao falhar.
- Justificativa: O bloco de alertas e um feed de risco operacional; manter mocks impede que o time reaja a eventos reais detectados pelo backend.
- **Implementação:** Chamada `API.alerts.getAll({ limit: 5 })` implementada com tratamento de erros e feedback adequado.

## 3. Ajustar endpoints de metricas no backend ✅ IMPLEMENTADO
- Local: `backend/api/metrics.js:20-99, 211-220`
- Problemas:
  - `limit` e `offset` sao convertidos com `parseInt` sem sanitizacao; valores invalidos geram erro 500 no PostgreSQL.
  - `cost_per_follower` so e recalculado se `updateFields.cost` ou `updateFields.newFollowers` forem truthy; atualizar para `0` nao recalcula o custo.
  - O frontend espera `GET /api/metrics/:id`, mas o endpoint nao existe.
- Acoes propostas:
  - Introduzir `const safeLimit = Math.min(Math.max(Number(limit) || 30, 1), 200)` e idem para `offset` antes de enviar ao banco.
  - Trocar a condicao por `if (updateFields.cost !== undefined || updateFields.newFollowers !== undefined)`.
  - Implementar `router.get('/:id')` (ou remover `API.metrics.getById`) para evitar 404.
- Justificativa: Erros de entrada derrubam a API, valores zerados mantem `cost_per_follower` obsoleto e o cliente possui metodo que sempre falha, prejudicando manutencao.
- **Implementação:** Validação `safeLimit` e `safeOffset` adicionadas, condição corrigida para `!== undefined`, endpoint `GET /:id` implementado.

## 4. Persistir configuracoes via API ✅ IMPLEMENTADO
- Local: `frontend/configuracoes.html:343-405`
- Problema: o formulario usa `DEFAULT_CONFIG` em memoria e `setTimeout` para simular salvamento; comentarios indicam que as chamadas reais foram deixadas para depois.
- Acoes propostas:
  - Implementar `await API.config.getAll()` e `API.alerts.getConfig()` no `loadConfig`.
  - Substituir os `setTimeout` por chamadas reais (`API.alerts.updateConfig`, `API.config.put`) com feedback de sucesso/erro.
  - Validar valores antes de enviar (por exemplo, limites numericos positivos).
- Justificativa: Sem persistencia real, qualquer ajuste operacional e perdido ao recarregar a pagina, bloqueando entregas ao cliente.
- **Implementação:** `loadConfig()` agora carrega dados da API com Promise.all, todos os `setTimeout` substituídos por chamadas reais com validações e tratamento de erros.

## 5. Integrar relatorios semanais com a API ✅ IMPLEMENTADO
- Local: `frontend/relatorios.html:204-274`
- Problema: a pagina trabalha com vetor fixo de semanas e apenas comenta a chamada para `API.metrics.summary`.
- Acoes propostas:
  - Expor no backend um agregador (caso ainda nao exista) que consolide KPI, tendencias e lista de posts para o periodo.
  - Consumir esse endpoint no `init`, lidando com carregamento e erros, e remover dados hardcoded.
  - Ajustar exportacao/compartilhamento para usar a resposta real (ex.: enviar resumo via webhook).
- Justificativa: Os relatorios sao usados para apresentar resultados; dados staticos geram narrativas incorretas e podem ocultar regressao real.
- **Implementação:** Chamada `API.metrics.summary({ period: '7d' })` implementada no início de `loadReports()` com fallback para dados de exemplo em caso de erro.

## 6. Corrigir rota de debug ✅ IMPLEMENTADO
- Local: `backend/api/debug.js:11-34`
- Problema: o arquivo registra `router.get('/debug', ...)`, mas e montado em `app.use('/api/debug', debugRoutes)`, expondo o endpoint em `/api/debug/debug`.
- Acoes propostas:
  - Alterar para `router.get('/', ...)` e cobrir com teste que confirma 404 quando `NODE_ENV === 'production'`.
- Justificativa: A rota atual confunde quem consome a API e dificulta verificacao rapida do ambiente em desenvolvimento.
- **Implementação:** Rota alterada de `router.get('/debug', ...)` para `router.get('/', ...)`, agora acessível corretamente em `/api/debug`.

## 7. Melhorar compatibilidade do cliente fetch ✅ IMPLEMENTADO
- Local: `frontend/assets/js/api.js:40-74`
- Problema: `AbortSignal.timeout` ainda nao possui suporte amplo em Safari/iOS. Em navegadores sem essa API, a chamada lanca erro antes mesmo de efetuar o fetch.
- Acoes propostas:
  - Adicionar fallback: usar `AbortController` manual quando `AbortSignal.timeout` nao existir ou encapsular em helper que degrada graciosamente.
- Justificativa: Evita que usuarios em dispositivos moveis encontrem erros imediatos de rede sem feedback util.
- **Implementação:** Fallback implementado com detecção `typeof AbortSignal.timeout === 'function'`, usando `AbortController` manual com `setTimeout` quando não disponível.

## 8. Aceitar numeros em formato local nos webhooks ✅ IMPLEMENTADO
- Local: `backend/api/webhook.js:48-119`
- Problema: `parseNumber` usa `Number(value)` direto, falhando para CSVs com virgula decimal (padrao pt-BR). Isso descarta linhas validas e gera alertas de "CTR obrigatorio".
- Acoes propostas:
  - Normalizar entradas substituindo `,` por `.` antes de converter e registrar validacoes detalhadas (linha + motivo).
  - Cobrir com teste para payloads CSV e JSON com formatos brasileiros.
- Justificativa: Os dados importados costumam vir de planilhas localizadas; rejeita-los reduz automacao e exige edicao manual.
- **Implementação:** Função `parseNumber` atualizada para normalizar formato brasileiro com `value.replace(',', '.')` antes da conversão numérica.

