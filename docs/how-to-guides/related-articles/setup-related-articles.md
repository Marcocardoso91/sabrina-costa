# Como Configurar o Sistema de Artigos Relacionados

Este guia detalha como implementar o sistema de sugestões automáticas de artigos relacionados na documentação do Dashboard Sabrina Costa.

## 🎯 **Visão Geral**

O sistema de artigos relacionados oferece:
- **Sugestões inteligentes** baseadas em conteúdo
- **Algoritmo de recomendação** multi-critério
- **Design responsivo** e acessível
- **Analytics integrado** para tracking
- **Personalização completa** via configuração

## 📋 **Pré-requisitos**

- Páginas HTML com estrutura semântica
- Sistema de categorização de artigos
- Dados de artigos (título, descrição, tags, etc.)

## 🚀 **Implementação**

### 1. **Estrutura HTML**

Adicione o container para artigos relacionados:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua Página</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/related-articles.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    
    <!-- Related Articles Section -->
    <div id="related-articles"></div>

    <!-- Scripts -->
    <script src="assets/js/related-articles.js"></script>
</body>
</html>
```

### 2. **Configuração de Artigos**

Configure os dados dos artigos no arquivo `related-articles.js`:

```javascript
loadArticlesData() {
  this.articles = [
    {
      id: 'quickstart',
      title: 'Guia de Início Rápido',
      description: 'Aprenda a configurar e usar o Dashboard Sabrina Costa.',
      url: '/docs/tutorials/01-quickstart.md',
      category: 'tutorial',
      tags: ['início', 'configuração', 'básico'],
      readingTime: '5 min',
      difficulty: 'iniciante',
      lastUpdated: '2025-10-23',
      popularity: 95
    },
    // Adicione mais artigos...
  ];
}
```

### 3. **Estrutura de Dados**

Cada artigo deve ter:

```javascript
{
  id: 'unique-id',                    // ID único do artigo
  title: 'Título do Artigo',         // Título do artigo
  description: 'Descrição...',       // Descrição resumida
  url: '/docs/path/to/article.md',   // URL do artigo
  category: 'tutorial',              // Categoria (tutorial, how-to, reference, explanation)
  tags: ['tag1', 'tag2'],            // Array de tags
  readingTime: '5 min',              // Tempo de leitura estimado
  difficulty: 'iniciante',            // Nível de dificuldade
  lastUpdated: '2025-10-23',         // Data da última atualização
  popularity: 95                      // Score de popularidade (0-100)
}
```

## 🎨 **Personalização**

### **Algoritmo de Sugestão**

Personalize o algoritmo editando o método `generateSuggestions()`:

```javascript
generateSuggestions() {
  const suggestions = [];

  // 1. Artigos da mesma categoria
  const sameCategory = this.articles
    .filter(article => 
      article.category === this.currentArticle.category && 
      article.id !== this.currentArticle.id
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // 2. Artigos com tags similares
  const similarTags = this.articles
    .filter(article => 
      this.hasCommonTags(article, this.currentArticle)
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 2);

  // 3. Artigos do mesmo nível de dificuldade
  const sameDifficulty = this.articles
    .filter(article => 
      article.difficulty === this.currentArticle.difficulty
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 2);

  // Combine e retorne as sugestões
  return [...sameCategory, ...similarTags, ...sameDifficulty];
}
```

### **Cores e Estilos**

Personalize através de variáveis CSS:

```css
:root {
  --related-primary-color: #3b82f6;
  --related-secondary-color: #6b7280;
  --related-background-color: #f8fafc;
  --related-card-background: #ffffff;
  --related-border-color: #e5e7eb;
  --related-text-color: #1f2937;
  --related-hover-color: #f1f5f9;
}
```

### **Categorias e Ícones**

Adicione novas categorias:

```javascript
const categoryIcons = {
  'tutorial': '📚',
  'how-to': '🔧',
  'reference': '📖',
  'explanation': '💡',
  'troubleshooting': '🔧',  // Nova categoria
  'api': '🔌'               // Nova categoria
};
```

## 🔧 **Configurações Avançadas**

### **1. Filtros Personalizados**

Adicione filtros por categoria:

```javascript
addCategoryFilter() {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'related-articles-filters';
  
  const categories = ['todos', 'tutorial', 'how-to', 'reference', 'explanation'];
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = this.formatCategory(category);
    button.onclick = () => this.filterByCategory(category);
    filterContainer.appendChild(button);
  });
  
  // Adicionar ao container
}
```

### **2. Busca em Tempo Real**

```javascript
addSearchFilter() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Buscar artigos...';
  searchInput.addEventListener('input', (e) => {
    this.filterArticles(e.target.value);
  });
}
```

### **3. Cache de Sugestões**

```javascript
// Cache de sugestões para melhor performance
cacheSuggestions() {
  const cacheKey = `suggestions_${this.currentArticle.id}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const suggestions = this.generateSuggestions();
  localStorage.setItem(cacheKey, JSON.stringify(suggestions));
  return suggestions;
}
```

### **4. Lazy Loading**

```javascript
// Carregar mais artigos sob demanda
loadMoreArticles() {
  const currentCount = this.suggestions.length;
  const moreArticles = this.articles
    .filter(article => !this.suggestions.some(s => s.id === article.id))
    .slice(0, 3);
  
  this.suggestions.push(...moreArticles);
  this.renderRelatedArticles();
}
```

## 📱 **Responsividade**

### **Breakpoints**

```css
/* Mobile */
@media (max-width: 480px) {
  .related-articles-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .related-articles-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Desktop */
@media (min-width: 769px) {
  .related-articles-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}
```

### **Otimizações Mobile**

```javascript
// Detectar dispositivo móvel
isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar número de sugestões em mobile
generateSuggestions() {
  const maxSuggestions = this.isMobile() ? 4 : 6;
  // ... lógica de sugestões
  return suggestions.slice(0, maxSuggestions);
}
```

## ♿ **Acessibilidade**

### **Recursos Incluídos**

```html
<!-- Estrutura semântica -->
<section class="related-articles-section" aria-labelledby="related-title">
  <h3 id="related-title">Artigos Relacionados</h3>
  <div class="related-articles-grid" role="list">
    <article class="related-article-card" role="listitem">
      <!-- Conteúdo do artigo -->
    </article>
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
      if (focused && focused.closest('.related-article-card')) {
        focused.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
```

## 📊 **Analytics**

### **Tracking de Eventos**

```javascript
trackArticleClick(url) {
  // Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'related_article_click', {
      'article_url': url,
      'current_page': window.location.pathname,
      'timestamp': new Date().toISOString()
    });
  }
  
  // Custom analytics
  this.sendAnalytics('related_article_click', {
    url,
    currentPage: window.location.pathname
  });
}
```

### **Métricas Personalizadas**

```javascript
// Métricas de engajamento
trackEngagement() {
  const startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeSpent = Date.now() - startTime;
    this.sendAnalytics('time_on_page', { timeSpent });
  });
}
```

## 🚀 **Deploy**

### **1. Verificação de Arquivos**

```bash
# Verificar estrutura
ls -la docs/assets/css/related-articles.css
ls -la docs/assets/js/related-articles.js
```

### **2. Teste Local**

```bash
# Servir localmente
python -m http.server 8080
# ou
npx serve docs
```

### **3. Verificação**

- [ ] Artigos relacionados aparecem
- [ ] Sugestões são relevantes
- [ ] Design responsivo funciona
- [ ] Links funcionam corretamente
- [ ] Analytics está funcionando
- [ ] Acessibilidade está OK

## 🐛 **Troubleshooting**

### **Problemas Comuns**

**Artigos não aparecem:**
- Verifique se o container `#related-articles` existe
- Confirme se os dados dos artigos estão configurados
- Verifique se o JavaScript está carregando

**Sugestões não são relevantes:**
- Ajuste o algoritmo de sugestão
- Verifique se as tags estão configuradas corretamente
- Confirme se as categorias estão corretas

**Design não responsivo:**
- Verifique se o CSS está carregando
- Confirme se os breakpoints estão corretos
- Teste em diferentes dispositivos

### **Debug**

```javascript
// Adicionar logs para debug
console.log('Articles loaded:', this.articles.length);
console.log('Current article:', this.currentArticle);
console.log('Suggestions:', this.suggestions);
```

## 📚 **Recursos Adicionais**

- [Exemplo completo](related-articles-example.html)
- [CSS personalizado](assets/css/related-articles.css)
- [JavaScript avançado](assets/js/related-articles.js)

---

**🎉 Sistema de artigos relacionados configurado com sucesso!**

O sistema agora oferece sugestões inteligentes e personalizadas para melhorar a experiência de navegação na documentação.
