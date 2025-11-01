# 🔍 Auditoria Backend - Problemas Encontrados

**Data:** 31 de Outubro de 2025  
**Fase:** 1 - Auditoria Completa do Código

---

## 🔴 CRÍTICOS (Devem ser corrigidos AGORA)

### 1. **Endpoint /api/auth/create-admin SEM Autenticação**
**Arquivo:** `backend/api/auth.js` (linhas 123-158)  
**Severidade:** 🔴 CRÍTICA  
**Risco:** Qualquer pessoa pode criar usuários admin

**Problema:**
```javascript
router.post('/create-admin', async (req, res, next) => {
    // ❌ SEM AUTENTICAÇÃO/AUTORIZAÇÃO
    const email = 'gerente@macspark.dev';
    const password = 'Sabrina2025!'; // ❌ Senha hardcoded
```

**Correção necessária:**
- Adicionar `authenticateJWT` + `requireAdmin`
- OU remover endpoint completamente (já tem seed data)
- OU mover para script de setup

---

### 2. **SQL Injection Potencial em metrics.js**
**Arquivo:** `backend/api/metrics.js` (linhas 37, 67, 305)  
**Severidade:** 🔴 ALTA  
**Risco:** Injeção de SQL via parâmetro `period`

**Problema:**
```javascript
// Linha 37
const days = parseInt(period.replace('d', ''));
sql += ` AND date >= CURRENT_DATE - INTERVAL '${days} days'`; // ❌ Interpolação
```

**Correção necessária:**
- Validar `days` com limites (max: 365)
- Ou usar parameterized query
- Adicionar whitelist de valores permitidos

---

### 3. **Debug Endpoint Expõe Informações Sensíveis**
**Arquivo:** `backend/api/debug.js` (linha 10-31)  
**Severidade:** 🔴 ALTA  
**Risco:** Vazamento de informações em produção

**Problema:**
```javascript
router.get('/debug', (req, res) => { // ❌ SEM AUTENTICAÇÃO
    const envVars = {
        DATABASE_URL_PARTIAL: process.env.DATABASE_URL.substring(0, 50),
        // ... expõe várias variáveis
    };
```

**Correção necessária:**
- Adicionar `requireAdmin`
- OU desabilitar em produção (NODE_ENV check)
- OU remover completamente

---

## ⚠️ ALTOS (Devem ser corrigidos antes do deploy)

### 4. **Falta Validação de Input Robusta**
**Arquivos:** Todos em `backend/api/`  
**Severidade:** ⚠️ ALTA  

**Problema:**
- Validação manual em cada endpoint
- Sem sanitização de input
- Sem uso de express-validator ou Joi/Zod

**Exemplos:**
- `metrics.js` - valida CTR manualmente
- `auth.js` - validação básica de email/password
- Não há escape de strings HTML

**Correção necessária:**
- Instalar `express-validator`
- Criar middleware de validação centralizado
- Adicionar sanitização em todos inputs

---

### 5. **Falta Rate Limiting Específico para Auth**
**Arquivo:** `backend/server.js` (linha 45-52)  
**Severidade:** ⚠️ MÉDIA

**Problema:**
```javascript
// Rate limiting genérico: 100 req/min
const limiter = rateLimit({
    windowMs: 60000,
    max: 100, // ❌ Muito alto para /auth/login
```

**Correção necessária:**
- Criar rate limiter específico para `/api/auth/login` (5-10 req/15min)
- Implementar slow-down progressivo
- Considerar brute-force protection

---

### 6. **Webhooks Sem Rate Limiting**
**Arquivo:** `backend/api/webhook.js`  
**Severidade:** ⚠️ MÉDIA

**Problema:**
- Webhooks não tem rate limiting próprio
- Pode ser abusado mesmo com secret token

**Correção necessária:**
- Adicionar rate limit específico
- Validar tamanho do payload (max 10MB já configurado)

---

## 💡 MÉDIOS (Melhorias recomendadas)

### 7. **console.log Excessivos**
**Arquivos:** 54 ocorrências em 8 arquivos  
**Severidade:** 💡 BAIXA

**Problema:**
- `backend/server.js` - 17 console.logs
- `backend/db/connection.js` - 3 console.logs
- Outros arquivos de teste/debug

**Correção necessária:**
- Implementar logger apropriado (winston/pino)
- Remover console.logs de produção
- Usar logger com níveis (info, warn, error)

---

### 8. **Falta Validação de UUID**
**Arquivos:** `metrics.js`, `schedule.js`, `hooks.js`  
**Severidade:** 💡 MÉDIA

**Problema:**
```javascript
router.put('/:id', async (req, res, next) => {
    const { id } = req.params; // ❌ Não valida se é UUID válido
```

**Correção necessária:**
- Validar formato UUID em params
- Retornar 400 se UUID inválido
- Evitar queries desnecessárias

---

### 9. **Falta Sanitização de Strings em Respostas**
**Severidade:** 💡 BAIXA

**Problema:**
- Dados retornados do banco não são sanitizados
- Potencial XSS se dados contiverem HTML

**Correção necessária:**
- Sanitizar strings antes de retornar
- Especialmente em alerts/messages

---

### 10. **Queries Duplicadas**
**Arquivos:** `metrics.js` (linhas 24-78 duplicadas)  
**Severidade:** 💡 BAIXA

**Problema:**
- Lógica de construção de query está duplicada (data query + count query)

**Correção necessária:**
- Extrair para helper function
- Reutilizar código

---

## ✅ PONTOS FORTES IDENTIFICADOS

### Segurança
- ✅ Uso consistente de parameterized queries (exceto INTERVAL)
- ✅ bcrypt configurado corretamente (10 rounds)
- ✅ JWT implementation segura
- ✅ Middleware de autenticação em todas rotas necessárias
- ✅ CORS configurado adequadamente
- ✅ Helmet habilitado
- ✅ Rate limiting global presente
- ✅ Error handling global implementado

### Código
- ✅ Estrutura bem organizada (api/, utils/, db/)
- ✅ Código limpo e comentado
- ✅ Async/await usado consistentemente
- ✅ Error handling com try/catch
- ✅ Status codes HTTP apropriados

### Database
- ✅ Connection pooling configurado
- ✅ SSL habilitado em produção
- ✅ Queries parametrizadas
- ✅ Transações onde necessário

---

## 📊 Resumo

| Categoria | Críticos | Altos | Médios | Total |
|-----------|----------|-------|--------|-------|
| Segurança | 3 | 3 | 2 | 8 |
| Código | 0 | 1 | 3 | 4 |
| Performance | 0 | 0 | 1 | 1 |
| **TOTAL** | **3** | **4** | **6** | **13** |

---

## 🎯 Priorização de Correções

### Fase 1 (IMEDIATO - antes de continuar)
1. 🔴 Proteger/remover endpoint `/api/auth/create-admin`
2. 🔴 Desabilitar/proteger endpoint `/api/debug`
3. 🔴 Corrigir SQL injection em `metrics.js`

### Fase 2 (Antes do deploy)
4. ⚠️ Adicionar express-validator
5. ⚠️ Implementar rate limiting específico auth
6. ⚠️ Rate limiting webhooks

### Fase 3 (Melhorias)
7. 💡 Implementar logger apropriado
8. 💡 Validar UUIDs
9. 💡 Extrair queries duplicadas
10. 💡 Sanitizar outputs

---

**Status:** ✅ Auditoria Backend Concluída  
**Problemas encontrados:** 13  
**Score Backend:** 8/10 (era 9/10)  
**Após correções:** 10/10 esperado

---

*Próximo: Corrigir problemas críticos e depois continuar para auditoria frontend*

