# Como Configurar Sistema de Comentários Giscus

Este guia detalha como implementar o sistema de comentários Giscus na documentação do Dashboard Sabrina Costa.

## 🎯 **Visão Geral**

O sistema de comentários Giscus oferece:
- **Integração com GitHub Discussions** para comentários
- **Autenticação automática** via GitHub
- **Identificação de página** para discussões específicas
- **Sistema de reações** e moderação
- **Design responsivo** e acessível

## 📋 **Pré-requisitos**

- Repositório GitHub público
- GitHub Discussions habilitado
- Páginas HTML com estrutura semântica
- Acesso ao repositório para configuração

## 🚀 **Implementação**

### 1. **Configuração do GitHub**

#### **Habilitar GitHub Discussions**

1. Vá para o seu repositório no GitHub
2. Clique em **Settings** → **General**
3. Na seção **Features**, marque **Discussions**
4. Clique em **Set up discussions**

#### **Configurar Categoria**

1. Vá para a aba **Discussions** do repositório
2. Clique em **New category**
3. Crie uma categoria chamada **Documentation**
4. Configure as permissões conforme necessário

### 2. **Estrutura HTML**

Adicione o container para comentários:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua Página</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/giscus-comments.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    
    <!-- Giscus Comments Section -->
    <div id="giscus-comments"></div>

    <!-- Scripts -->
    <script src="assets/js/giscus-comments.js"></script>
</body>
</html>
```

### 3. **Configuração do Giscus**

Edite o arquivo `assets/js/giscus-comments.js`:

```javascript
class GiscusCommentsSystem {
  constructor() {
    this.config = {
      repo: 'seu-usuario/seu-repositorio', // Substitua pelo seu repositório
      repoId: 'R_kgDOGxxxxxxxxx', // Substitua pelo seu repo ID
      category: 'Documentation',
      categoryId: 'DIC_kwDOGxxxxxxxxx', // Substitua pelo seu category ID
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme',
      lang: 'pt',
      loading: 'lazy'
    };
  }
}
```

### 4. **Obter IDs Necessários**

#### **Repo ID**

1. Vá para [giscus.app](https://giscus.app)
2. Insira o nome do seu repositório
3. Copie o **Repo ID** gerado

#### **Category ID**

1. No mesmo site, selecione a categoria **Documentation**
2. Copie o **Category ID** gerado

## 🎨 **Personalização**

### **Configuração de Temas**

```javascript
// Tema automático (recomendado)
theme: 'preferred_color_scheme'

// Tema claro
theme: 'light'

// Tema escuro
theme: 'dark'

// Tema personalizado
theme: 'custom'
```

### **Configuração de Idioma**

```javascript
// Português
lang: 'pt'

// Inglês
lang: 'en'

// Espanhol
lang: 'es'
```

### **Configuração de Posição**

```javascript
// Comentários no rodapé (recomendado)
inputPosition: 'bottom'

// Comentários no topo
inputPosition: 'top'
```

### **Configuração de Reações**

```javascript
// Habilitar reações
reactionsEnabled: '1'

// Desabilitar reações
reactionsEnabled: '0'
```

## 🔧 **Configurações Avançadas**

### **1. Mapeamento de Páginas**

```javascript
// Por pathname (recomendado)
mapping: 'pathname'

// Por URL completa
mapping: 'url'

// Por título da página
mapping: 'title'

// Por número de issue
mapping: 'number'
```

### **2. Configuração de Metadados**

```javascript
// Emitir metadados
emitMetadata: '1'

// Não emitir metadados
emitMetadata: '0'
```

### **3. Configuração de Carregamento**

```javascript
// Carregamento lazy (recomendado)
loading: 'lazy'

// Carregamento imediato
loading: 'eager'
```

### **4. Configuração de Estrito**

```javascript
// Modo estrito (recomendado)
strict: '1'

// Modo não estrito
strict: '0'
```

## 📱 **Responsividade**

### **Breakpoints**

```css
/* Mobile */
@media (max-width: 480px) {
  #giscus-root {
    font-size: 13px;
  }
}

/* Tablet */
@media (max-width: 768px) {
  #giscus-root {
    font-size: 14px;
  }
}

/* Desktop */
@media (min-width: 769px) {
  #giscus-root {
    font-size: 16px;
  }
}
```

### **Otimizações Mobile**

```javascript
// Ajustar layout para mobile
setupResponsiveBehavior() {
  const updateLayout = () => {
    const container = document.getElementById('giscus-root');
    if (!container) return;

    if (window.innerWidth <= 768) {
      container.style.fontSize = '14px';
    } else {
      container.style.fontSize = '16px';
    }
  };

  window.addEventListener('resize', updateLayout);
  updateLayout();
}
```

## ♿ **Acessibilidade**

### **Recursos Incluídos**

```html
<!-- Estrutura semântica -->
<section class="giscus-comments-section" aria-labelledby="comments-title">
  <h3 id="comments-title">💬 Discussões</h3>
  <div class="comments-container">
    <div id="giscus-root"></div>
  </div>
</section>
```

### **Navegação por Teclado**

```javascript
// Suporte a navegação por teclado
setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      // Verificar se o foco está visível
      const focused = document.activeElement;
      if (focused && focused.closest('#giscus-root')) {
        focused.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
```

## 📊 **Analytics**

### **Tracking de Eventos**

```javascript
// Track comments load
trackCommentsLoad() {
  if (typeof gtag === 'function') {
    gtag('event', 'comments_loaded', {
      'page_path': window.location.pathname,
      'comments_system': 'giscus'
    });
  }
}

// Track comments navigation
trackCommentsNavigation(data) {
  if (typeof gtag === 'function') {
    gtag('event', 'comments_navigation', {
      'page_path': window.location.pathname,
      'navigation_type': data.type
    });
  }
}
```

### **Métricas Personalizadas**

```javascript
// Contar comentários
async getCommentsCount() {
  // Implementar contagem de comentários
  return new Promise((resolve) => {
    // Lógica de contagem...
  });
}
```

## 🚀 **Deploy**

### **1. Configuração de Produção**

```javascript
// Configuração para produção
const config = {
  repo: 'sabrina-costa/dashboard-docs',
  repoId: 'R_kgDOGxxxxxxxxx',
  category: 'Documentation',
  categoryId: 'DIC_kwDOGxxxxxxxxx',
  mapping: 'pathname',
  strict: '1',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'pt',
  loading: 'lazy'
};
```

### **2. Verificação**

- [ ] Comentários aparecem corretamente
- [ ] Autenticação GitHub funciona
- [ ] Discussões são criadas automaticamente
- [ ] Design responsivo funciona
- [ ] Analytics está funcionando
- [ ] Acessibilidade está OK

### **3. Teste Local**

```bash
# Servir localmente
python -m http.server 8080
# ou
npx serve docs
```

## 🐛 **Troubleshooting**

### **Problemas Comuns**

**Comentários não aparecem:**
- Verifique se o container `#giscus-comments` existe
- Confirme se o repositório está configurado corretamente
- Verifique se o GitHub Discussions está habilitado

**Autenticação não funciona:**
- Confirme se o repositório é público
- Verifique se as permissões estão corretas
- Teste com uma conta GitHub válida

**Discussões não são criadas:**
- Verifique se a categoria existe
- Confirme se o mapeamento está correto
- Teste com diferentes tipos de mapeamento

### **Debug**

```javascript
// Adicionar logs para debug
console.log('Giscus config:', this.config);
console.log('Current page:', window.location.pathname);
console.log('Giscus loaded:', this.isLoaded);
```

## 📚 **Recursos Adicionais**

- [Exemplo completo](giscus-comments-example.html)
- [CSS personalizado](assets/css/giscus-comments.css)
- [JavaScript avançado](assets/js/giscus-comments.js)
- [Documentação oficial do Giscus](https://giscus.app)

---

**🎉 Sistema de comentários Giscus configurado com sucesso!**

Os usuários agora podem participar de discussões sobre cada página da documentação usando suas contas GitHub.
