# 🔧 CORRIGIR PROBLEMA DE CORS

## 🎯 PROBLEMA IDENTIFICADO

O frontend está recebendo erro "Failed to fetch" porque o backend não está permitindo requisições do frontend devido a configurações de CORS.

## ✅ SOLUÇÃO

### **1. Acesse as variáveis de ambiente do backend:**

**URL:** https://vercel.com/marcocardoso28s-projects/backend/settings/environment-variables

### **2. Encontre a variável CORS_ORIGIN:**

Procure pela variável `CORS_ORIGIN` na lista.

### **3. Atualize o valor:**

**Valor atual:**
```
https://sabrina-costa.vercel.app
```

**Novo valor (adicione a URL do frontend):**
```
https://sabrina-costa.vercel.app,https://backend-200j98v08-marcocardoso28s-projects.vercel.app
```

### **4. Salve as alterações**

### **5. Faça redeploy do backend:**

1. Vá em **"Deployments"**
2. Clique nos **3 pontinhos (⋯)** do último deployment
3. Clique em **"Redeploy"**
4. Aguarde 1-2 minutos

---

## 🎯 TESTE APÓS CORREÇÃO

**Após o redeploy, teste o frontend:**
```
https://backend-200j98v08-marcocardoso28s-projects.vercel.app
```

**O login deve funcionar com:**
- **Email:** gerente@macspark.dev
- **Senha:** Sabrina2025!

---

## 🚀 RESULTADO ESPERADO

✅ Frontend carrega sem erros  
✅ Login funciona  
✅ Dashboard acessível  
✅ Comunicação backend/frontend funcionando  

---

**Me avise quando terminar a configuração!** 😊
