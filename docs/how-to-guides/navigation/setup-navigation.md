# Como Configurar o Sistema de Navegação

Este guia detalha como implementar o sistema de navegação avançado na documentação do Dashboard Sabrina Costa.

## 🎯 **Visão Geral**

O sistema de navegação inclui:
- **Breadcrumbs** automáticos
- **Table of Contents (TOC)** com comportamento sticky
- **Navegação Anterior/Próxima** entre páginas
- **Botão Voltar ao Topo** flutuante
- **Design responsivo** e **acessível**

## 📋 **Pré-requisitos**

- Páginas HTML com estrutura semântica
- Cabeçalhos (`h1`, `h2`, `h3`, etc.) para geração do TOC
- Servidor web para servir os arquivos

## 🚀 **Implementação**

### 1. **Estrutura HTML**

Adicione os containers necessários em cada página:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua Página</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/navigation.css">
</head>
<body>
    <!-- Breadcrumbs -->
    <div id="breadcrumbs" class="breadcrumbs"></div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-3">
                <article class="prose prose-lg max-w-none">
                    <!-- Seu conteúdo aqui -->
                    <h1 id="introducao">Introdução</h1>
                    <h2 id="secao-1">Seção 1</h2>
                    <h3 id="subsecao-1-1">Subseção 1.1</h3>
                    <!-- Mais conteúdo... -->
                </article>
            </div>

            <!-- Sidebar with TOC -->
            <div class="lg:col-span-1">
                <div id="toc"></div>
            </div>
        </div>
    </div>

    <!-- Previous/Next Navigation -->
    <div id="prev-next-nav" class="prev-next-nav"></div>

    <!-- Scripts -->
    <script src="assets/js/navigation.js"></script>
</body>
</html>
```

### 2. **Arquivos Necessários**

Certifique-se de ter os seguintes arquivos:

```
docs/
├── assets/
│   ├── css/
│   │   └── navigation.css
│   └── js/
│       └── navigation.js
└── navigation-example.html
```

### 3. **Configuração de Navegação**

Para configurar a navegação anterior/próxima, edite o método `getNavigationData()` no arquivo `navigation.js`:

```javascript
getNavigationData() {
  const currentPath = window.location.pathname;
  const navigation = {
    prev: null,
    next: null
  };

  // Mapeamento de navegação
  const navMap = {
    '/docs/tutorials/01-quickstart.md': {
      next: {
        title: 'Primeiro Deploy',
        description: 'Aprenda a fazer o primeiro deploy do projeto',
        url: '/docs/tutorials/02-primeiro-deploy.md'
      }
    },
    '/docs/tutorials/02-primeiro-deploy.md': {
      prev: {
        title: 'Quick Start',
        description: 'Guia de início rápido do projeto',
        url: '/docs/tutorials/01-quickstart.md'
      },
      next: {
        title: 'Primeiro Workflow n8n',
        description: 'Configure seu primeiro workflow de automação',
        url: '/docs/tutorials/03-primeiro-workflow-n8n.md'
      }
    }
    // Adicione mais mapeamentos conforme necessário
  };

  return navMap[currentPath] || navigation;
}
```

## 🎨 **Personalização**

### **Cores e Estilos**

Personalize o sistema através de variáveis CSS:

```css
:root {
  --nav-primary-color: #3b82f6;
  --nav-secondary-color: #6b7280;
  --nav-background-color: #f8fafc;
  --nav-border-color: #e5e7eb;
  --nav-text-color: #1f2937;
  --nav-hover-color: #f1f5f9;
}
```

### **Comportamento do TOC**

Para desabilitar o comportamento sticky:

```css
.toc-container {
  position: relative !important;
  top: auto !important;
}
```

### **Responsividade**

Ajuste os breakpoints conforme necessário:

```css
@media (max-width: 768px) {
  .toc-container {
    margin: 1rem 0;
    padding: 0.75rem;
  }
}
```

## 🔧 **Configurações Avançadas**

### **1. Breadcrumbs Personalizados**

Para breadcrumbs customizados, modifique o método `generateBreadcrumbs()`:

```javascript
generateBreadcrumbs() {
  const path = window.location.pathname;
  const customBreadcrumbs = {
    '/docs/tutorials/01-quickstart.md': [
      { title: 'Home', url: '/docs/' },
      { title: 'Tutoriais', url: '/docs/tutorials/' },
      { title: 'Quick Start', url: '/docs/tutorials/01-quickstart.md' }
    ]
  };

  // Implementar lógica customizada...
}
```

### **2. TOC com Filtros**

Para adicionar filtros ao TOC:

```javascript
addTOCFilters() {
  const filterInput = document.createElement('input');
  filterInput.type = 'text';
  filterInput.placeholder = 'Filtrar TOC...';
  filterInput.addEventListener('input', (e) => {
    this.filterTOC(e.target.value);
  });
  
  // Adicionar ao container do TOC
}
```

### **3. Animações Personalizadas**

```css
.toc-container {
  animation: slideInFromRight 0.3s ease-out;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## 📱 **Responsividade**

### **Mobile First**

O sistema é otimizado para mobile:

- TOC não fica sticky em telas pequenas
- Breadcrumbs se reorganizam verticalmente
- Botões de navegação se ajustam ao espaço

### **Breakpoints**

```css
/* Mobile */
@media (max-width: 480px) { /* ... */ }

/* Tablet */
@media (max-width: 768px) { /* ... */ }

/* Desktop */
@media (min-width: 769px) { /* ... */ }
```

## ♿ **Acessibilidade**

### **Recursos Incluídos**

- Navegação por teclado completa
- Indicadores visuais de foco
- Atalhos de teclado (ESC para fechar TOC)
- Suporte a leitores de tela
- Contraste adequado

### **Testes de Acessibilidade**

```javascript
// Teste de navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Verificar se o foco está visível
  }
});
```

## 🚀 **Deploy**

### **1. Arquivos Estáticos**

Certifique-se de que todos os arquivos estão no servidor:

```bash
# Verificar estrutura
ls -la docs/assets/css/navigation.css
ls -la docs/assets/js/navigation.js
```

### **2. Teste Local**

```bash
# Servir localmente
python -m http.server 8080
# ou
npx serve docs
```

### **3. Verificação**

- [ ] Breadcrumbs aparecem corretamente
- [ ] TOC é gerado automaticamente
- [ ] Navegação anterior/próxima funciona
- [ ] Botão voltar ao topo aparece
- [ ] Design responsivo funciona
- [ ] Acessibilidade está funcionando

## 🐛 **Troubleshooting**

### **Problemas Comuns**

**TOC não aparece:**
- Verifique se há cabeçalhos (`h1`, `h2`, etc.) na página
- Confirme se o container `#toc` existe

**Breadcrumbs não funcionam:**
- Verifique se o container `#breadcrumbs` existe
- Confirme se o JavaScript está carregando

**Navegação anterior/próxima não aparece:**
- Configure o mapeamento de navegação
- Verifique se os URLs estão corretos

### **Debug**

```javascript
// Adicionar logs para debug
console.log('Navigation system initialized');
console.log('TOC items:', this.toc);
console.log('Current path:', window.location.pathname);
```

## 📚 **Recursos Adicionais**

- [Exemplo completo](navigation-example.html)
- [CSS personalizado](assets/css/navigation.css)
- [JavaScript avançado](assets/js/navigation.js)

---

**🎉 Sistema de navegação configurado com sucesso!**

O sistema agora oferece uma experiência de navegação completa e profissional para a documentação do Dashboard Sabrina Costa.
