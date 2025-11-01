# 🔒 Guia de Segurança - Instagram & Meta Ads
## Proteção Contra Banimento e Boas Práticas

**Versão:** 1.0.0  
**Data:** 01/11/2025  
**Última Revisão:** 01/11/2025

---

## ⚠️ AVISO IMPORTANTE

**Automatizar incorretamente pode resultar em:**
- ❌ Shadowban (seus posts não aparecem)
- ❌ Restrição de conta (perda de funcionalidades)
- ❌ Banimento permanente (perda da conta)
- ❌ Perda de acesso ao Reels Fund

**Este guia existe para EVITAR isso.**

---

## 📋 Índice

1. [Políticas do Instagram](#políticas-do-instagram)
2. [O que é SEGURO automatizar](#o-que-é-seguro-automatizar)
3. [O que NUNCA automatizar](#o-que-nunca-automatizar)
4. [Rate Limits e Restrições](#rate-limits-e-restrições)
5. [Boas Práticas](#boas-práticas)
6. [Sinais de Alerta](#sinais-de-alerta)
7. [O que Fazer se Levar Shadowban](#o-que-fazer-se-levar-shadowban)
8. [Checklist de Segurança](#checklist-de-segurança)

---

## 📜 Políticas do Instagram

### Regras Oficiais (Meta)

O Instagram **PROÍBE**:
1. ❌ Bots que interagem automaticamente (likes, comentários, follows)
2. ❌ Scraping agressivo de dados
3. ❌ Postagens automáticas feitas por terceiros
4. ❌ Spam de mensagens (DMs)
5. ❌ Crescimento artificial (compra de seguidores, engagement pods)

O Instagram **PERMITE**:
1. ✅ Uso da API oficial (Instagram Graph API)
2. ✅ Leitura de métricas públicas
3. ✅ Ferramentas de análise (desde que respeitem limites)
4. ✅ Agendamento de posts (via Creator Studio, Buffer, etc.)
5. ✅ Monitoramento de dados próprios

### Nossa Posição

**Neste sistema:**
- ✅ Usamos APENAS Instagram Graph API (oficial)
- ✅ Respeitamos TODOS os rate limits
- ✅ NUNCA postamos automaticamente
- ✅ NUNCA interagimos automaticamente (likes, comments, follows)
- ✅ Apenas LEITURA de dados (seguro)

---

## ✅ O que é SEGURO Automatizar

### 1. Leitura de Métricas Próprias

**100% SEGURO:**
- ✅ Ler número de seguidores da SUA conta
- ✅ Ler engagement dos SEUS posts
- ✅ Ler comentários nos SEUS posts
- ✅ Ler dados de campanhas Meta Ads

**Como fazemos:**
- Instagram Graph API oficial
- Access token da SUA conta
- Rate limit: 200 calls/hora (respeitamos)
- Apenas dados públicos ou seus

**Workflows seguros:**
- Reels Fund Tracker (lê followers)
- Análise de Comentários (lê seus comentários)
- Alertas WhatsApp (lê suas métricas)

### 2. Análise de Dados

**100% SEGURO:**
- ✅ Analisar performance de posts
- ✅ Calcular médias, tendências
- ✅ Gerar relatórios
- ✅ Fazer previsões com IA

**Como fazemos:**
- Dados salvos no SEU banco de dados
- Processamento local (não afeta Instagram)
- Zero interação com Instagram

**Workflows seguros:**
- Análise Preditiva
- Relatório Diário
- Recomendar Conteúdo

### 3. Geração de Conteúdo

**100% SEGURO:**
- ✅ Gerar legendas com IA (você posta manualmente)
- ✅ Criar rascunhos de posts
- ✅ Sugestões de temas

**Como fazemos:**
- IA gera texto
- Você SEMPRE revisa
- Você SEMPRE posta manualmente (seu app Instagram)
- Zero API de postagem automática

**Workflows seguros:**
- Gerar Legendas
- Dicas de Produtos

### 4. Gerenciamento de Campanhas Meta Ads

**100% SEGURO:**
- ✅ Ler performance de campanhas
- ✅ Pausar campanhas (com sua aprovação)
- ✅ Ajustar budget (com sua aprovação)
- ✅ Criar novas campanhas (com sua aprovação)

**Como fazemos:**
- Meta Ads API oficial
- SEMPRE pede aprovação antes
- Modo manual por padrão
- Você controla tudo

**Workflows seguros:**
- Otimizar Campanhas (modo manual)

---

## ❌ O que NUNCA Automatizar

### 1. Postagens Automáticas

**NUNCA faça:**
- ❌ Postar automaticamente sem revisão humana
- ❌ Publicar Stories automaticamente
- ❌ Agendar Reels via API de terceiros

**Por quê?**
- Instagram detecta e pode banir
- Conteúdo pode ter erro (IA não é perfeita)
- Perde o toque humano/autenticidade

**Nossa proteção:**
- ✅ `never_post: TRUE` em TODOS workflows de conteúdo
- ✅ Impossível postar automaticamente (by design)
- ✅ Você SEMPRE posta manualmente

### 2. Interações Automáticas

**NUNCA faça:**
- ❌ Dar likes automaticamente
- ❌ Comentar automaticamente
- ❌ Seguir/Deseguir automaticamente (follow/unfollow bot)
- ❌ Enviar DMs em massa
- ❌ Responder comentários automaticamente

**Por quê?**
- Instagram detecta FACILMENTE
- Classificado como spam
- Shadowban garantido

**Nossa proteção:**
- ✅ ZERO workflows de interação
- ✅ Apenas LEITURA de comentários
- ✅ NUNCA responde automaticamente

### 3. Scraping Agressivo

**NUNCA faça:**
- ❌ Scraping de perfis de terceiros em massa
- ❌ Coletar dados de contas alheias
- ❌ Exceder rate limits

**Por quê?**
- Viola termos de serviço
- Pode levar a ban permanente
- Dados de terceiros são privados

**Nossa proteção:**
- ✅ Apenas dados da SUA conta
- ✅ Rate limits respeitados
- ✅ Instagram Graph API oficial

---

## ⏱️ Rate Limits e Restrições

### Instagram Graph API

**Limites oficiais:**
- **200 chamadas/hora** por usuário
- **4.800 chamadas/dia** por usuário

**Como respeitamos:**
```javascript
// Exemplo de controle de rate limit
const MAX_CALLS_PER_HOUR = 180; // Margem de segurança (90% do limite)
const callsThisHour = getCallsCount(lastHour);

if (callsThisHour >= MAX_CALLS_PER_HOUR) {
    // Aguardar próxima hora
    await sleep(60 * 60 * 1000); // 1 hora
}
```

**Workflows que usam Instagram API:**
- Reels Fund Tracker: 1 call/6h = **4 calls/dia** ✅ (0.08% do limite)
- Análise Comentários: 1 call/dia = **1 call/dia** ✅ (0.02% do limite)
- **Total:** ~5 calls/dia (0.1% do limite diário) ✅✅✅

### Meta Ads API

**Limites:**
- **25.000 chamadas/dia** por app
- Sem limite de hora

**Uso estimado:**
- Otimizar Campanhas: 12 calls/dia (a cada 2h)
- **Total:** ~15 calls/dia (0.06% do limite) ✅✅✅

### Evolution API (WhatsApp)

**Limites:**
- Depende da instância
- Geralmente: 100-200 mensagens/dia

**Uso estimado:**
- Alertas: 0-5/dia
- Relatórios: 1/dia
- Notificações: 2-10/dia
- **Total:** ~10-15/dia ✅

---

## 🛡️ Boas Práticas

### 1. Sempre Use API Oficial

**Fazer:**
- ✅ Instagram Graph API
- ✅ Meta Ads API
- ✅ Access tokens oficiais

**Não fazer:**
- ❌ Scraping com Selenium/Puppeteer
- ❌ APIs não oficiais
- ❌ Reverse engineering do app

### 2. Respeite Limites de Tempo

**Fazer:**
- ✅ Aguardar entre chamadas (mínimo 3s)
- ✅ Exponential backoff se erro 429
- ✅ Não executar muitas ações ao mesmo tempo

**Exemplo:**
```javascript
// Bom: espera entre chamadas
await callInstagramAPI();
await sleep(3000); // 3 segundos
await callInstagramAPI();

// Ruim: muitas chamadas simultâneas
Promise.all([
    callInstagramAPI(),
    callInstagramAPI(),
    callInstagramAPI()
]); // ❌ Pode triggerar rate limit
```

### 3. Comporte-se Como Humano

**Fazer:**
- ✅ Variação nos horários (não exatamente 10:00:00)
- ✅ Não executar 24/7 sem parar
- ✅ Ter "downtime" (madrugada, por exemplo)

**Como fazemos:**
```javascript
// Adiciona randomness aos horários
const randomMinutes = Math.floor(Math.random() * 15); // 0-15 min
const executionTime = baseTime + randomMinutes;
```

### 4. Monitore Sinais de Alerta

**Verificar regularmente:**
- ✅ Taxa de erro nas chamadas API
- ✅ Tempo de resposta (se aumentar muito = problema)
- ✅ Mensagens de erro específicas
- ✅ Shadowban check (posts aparecem nas hashtags?)

### 5. Tenha Backup Manual

**Sempre poder:**
- ✅ Desligar tudo (kill switch)
- ✅ Fazer ações manualmente
- ✅ Não depender 100% da automação

---

## 🚨 Sinais de Alerta

### Shadowban

**Sintomas:**
- Posts não aparecem em hashtags
- Alcance caiu drasticamente (70%+)
- Engagement muito baixo
- Notificação "Estamos limitando sua conta"

**Como checar:**
1. Postar com hashtag única (ex: #testesabrina12345)
2. Buscar a hashtag em conta privada (não logada)
3. Se seu post NÃO aparecer = shadowban

### Account Restrictions

**Sintomas:**
- Não consegue comentar
- Não consegue dar like
- Não consegue seguir
- Mensagem "Ação bloqueada"

### Sinais de Bot Detectado

**Sintomas:**
- Erro 429 (Too Many Requests) frequente
- API retorna "spam behavior detected"
- Captchas frequentes ao fazer login
- Access token revogado sem motivo

---

## 🆘 O que Fazer se Levar Shadowban

### Ação Imediata

1. **DESLIGAR TUDO:**
   ```bash
   /pausar-tudo
   ```

2. **Parar de postar por 48h:**
   - Não postar
   - Não dar likes
   - Não comentar
   - Apenas visualizar

3. **Revisar atividade:**
   - Checar histórico de ações
   - Identificar o que pode ter causado
   - Remover qualquer automação suspeita

### Recuperação

**Protocolo de recuperação (7-14 dias):**

**Dias 1-2:** Zero atividade
- Apenas visualizar feed
- Não interagir

**Dias 3-5:** Atividade mínima manual
- 2-3 stories/dia (manual)
- 1-2 likes/dia (manual)
- 0 posts

**Dias 6-10:** Aumentar gradualmente
- 1 post a cada 2 dias (manual)
- Engagement normal (mas manual)
- Ainda sem automações

**Dias 11-14:** Testar shadowban
- Postar com hashtag teste
- Verificar se aparece
- Se sim = recuperado ✅

**Dia 15+:** Reativar automações
- Apenas workflows 100% seguros
- Começar com Reels Fund Tracker
- Monitorar de perto

### Prevenir Recorrência

1. Nunca ative workflows de interação
2. Mantenha frequência baixa (< 10% dos limits)
3. Sempre poste manualmente
4. Use apenas APIs oficiais

---

## ✅ Checklist de Segurança

### Antes de Ativar um Workflow

- [ ] Workflow usa apenas API oficial? (Instagram Graph ou Meta Ads)
- [ ] Workflow respeita rate limits? (< 50% do limite)
- [ ] Workflow NÃO posta automaticamente?
- [ ] Workflow NÃO interage automaticamente? (likes, comments, follows)
- [ ] Workflow requer aprovação para ações importantes?
- [ ] Você testou em modo manual primeiro?
- [ ] Você leu a documentação do workflow?
- [ ] Kill switch está disponível?

### Monitoramento Contínuo

- [ ] Verificar taxa de erro API (deve ser < 1%)
- [ ] Verificar shadowban semanalmente
- [ ] Revisar histórico de ações mensalmente
- [ ] Checar alcance de posts (não deve cair > 30%)
- [ ] Confirmar posts aparecem em hashtags

### Manutenção Mensal

- [ ] Renovar access tokens (se necessário)
- [ ] Revisar workflows ativos (ainda necessários?)
- [ ] Atualizar limites de rate (se Instagram mudar)
- [ ] Ler atualizações de políticas Instagram
- [ ] Fazer backup de configurações

---

## 📚 Recursos Adicionais

### Links Oficiais

- **Instagram Platform Policies:** https://developers.facebook.com/docs/instagram/platform-policy
- **Instagram Graph API Docs:** https://developers.facebook.com/docs/instagram-api
- **Meta Ads API Docs:** https://developers.facebook.com/docs/marketing-apis
- **Rate Limits:** https://developers.facebook.com/docs/graph-api/overview/rate-limiting

### Ferramentas de Verificação

- **Shadowban Check:** https://triberr.com/instagram-shadowban-tester
- **Instagram Insights:** Usar app nativo do Instagram
- **Meta Business Suite:** business.facebook.com

---

## ⚖️ Disclaimer Legal

Este guia é baseado em:
- Políticas públicas do Instagram (2025)
- Boas práticas da comunidade
- Experiência prática

**Importante:**
- Políticas podem mudar sem aviso
- Instagram tem direito de banir qualquer conta
- Use automações por sua conta e risco
- Este sistema foi projetado para MINIMIZAR riscos, mas não pode garantir zero riscos

**Recomendação:**
- Leia os Terms of Service do Instagram
- Consulte advogado se necessário
- Sempre tenha backup dos seus dados

---

## 🆘 Suporte

**Se suspeitar de problema:**
1. Desligar tudo imediatamente (`/pausar-tudo`)
2. Documentar o que aconteceu
3. Aguardar 48h sem atividade
4. Reativar gradualmente

**Contato de Emergência:**
- Ver `master-plan.md` para instruções
- Sempre priorizar segurança da conta

---

**Última Atualização:** 01/11/2025  
**Próxima Revisão:** 01/12/2025  
**Versão:** 1.0.0

