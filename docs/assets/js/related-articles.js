/**
 * Related Articles System
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - Automatic article suggestions based on content analysis
 * - Tag-based recommendations
 * - Reading time estimation
 * - Popular articles highlighting
 * - Category-based filtering
 */

class RelatedArticlesSystem {
  constructor() {
    this.articles = [];
    this.currentArticle = null;
    this.suggestions = [];
    this.init();
  }

  init() {
    this.loadArticlesData();
    this.identifyCurrentArticle();
    this.generateSuggestions();
    this.renderRelatedArticles();
    this.setupEventListeners();
  }

  /**
   * Load articles data from configuration
   */
  loadArticlesData() {
    // This would typically come from a JSON file or API
    this.articles = [
      {
        id: 'quickstart',
        title: 'Guia de Início Rápido',
        description: 'Aprenda a configurar e usar o Dashboard Sabrina Costa em poucos minutos.',
        url: '/docs/tutorials/01-quickstart.md',
        category: 'tutorial',
        tags: ['início', 'configuração', 'básico'],
        readingTime: '5 min',
        difficulty: 'iniciante',
        lastUpdated: '2025-10-23',
        popularity: 95
      },
      {
        id: 'deploy',
        title: 'Primeiro Deploy',
        description: 'Guia completo para fazer o primeiro deploy do projeto na Vercel.',
        url: '/docs/tutorials/02-primeiro-deploy.md',
        category: 'tutorial',
        tags: ['deploy', 'vercel', 'produção'],
        readingTime: '10 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 88
      },
      {
        id: 'n8n-workflow',
        title: 'Primeiro Workflow n8n',
        description: 'Configure seu primeiro workflow de automação com n8n.',
        url: '/docs/tutorials/03-primeiro-workflow-n8n.md',
        category: 'tutorial',
        tags: ['n8n', 'automação', 'workflow'],
        readingTime: '15 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 82
      },
      {
        id: 'whatsapp',
        title: 'Conectar WhatsApp',
        description: 'Integre o WhatsApp com o sistema usando Evolution API.',
        url: '/docs/tutorials/04-conectar-whatsapp.md',
        category: 'tutorial',
        tags: ['whatsapp', 'evolution-api', 'integração'],
        readingTime: '12 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 78
      },
      {
        id: 'jwt-auth',
        title: 'Configurar Autenticação JWT',
        description: 'Guia prático para configurar autenticação JWT no backend.',
        url: '/docs/how-to-guides/autenticacao/setup-jwt.md',
        category: 'how-to',
        tags: ['autenticação', 'jwt', 'segurança'],
        readingTime: '8 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 85
      },
      {
        id: 'architecture',
        title: 'Arquitetura do Sistema',
        description: 'Visão completa da arquitetura do Dashboard Sabrina Costa.',
        url: '/docs/explanation/architecture.md',
        category: 'explanation',
        tags: ['arquitetura', 'sistema', 'tecnologia'],
        readingTime: '20 min',
        difficulty: 'avançado',
        lastUpdated: '2025-10-23',
        popularity: 75
      },
      {
        id: 'api-reference',
        title: 'Referência da API',
        description: 'Documentação completa de todos os endpoints da API.',
        url: '/docs/reference/api/README.md',
        category: 'reference',
        tags: ['api', 'endpoints', 'referência'],
        readingTime: '30 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 90
      },
      {
        id: 'metrics',
        title: 'Gerenciar Métricas',
        description: 'Como adicionar, visualizar e analisar métricas do Instagram.',
        url: '/docs/how-to-guides/metrics/view-metrics.md',
        category: 'how-to',
        tags: ['métricas', 'instagram', 'análise'],
        readingTime: '7 min',
        difficulty: 'iniciante',
        lastUpdated: '2025-10-23',
        popularity: 92
      },
      {
        id: 'alerts',
        title: 'Configurar Alertas',
        description: 'Configure alertas automáticos para métricas importantes.',
        url: '/docs/how-to-guides/alerts/setup-alerts.md',
        category: 'how-to',
        tags: ['alertas', 'notificações', 'automação'],
        readingTime: '6 min',
        difficulty: 'iniciante',
        lastUpdated: '2025-10-23',
        popularity: 80
      },
      {
        id: 'troubleshooting',
        title: 'Solução de Problemas',
        description: 'Guia para resolver problemas comuns do sistema.',
        url: '/docs/how-to-guides/troubleshooting/common-issues.md',
        category: 'how-to',
        tags: ['problemas', 'solução', 'debug'],
        readingTime: '15 min',
        difficulty: 'intermediário',
        lastUpdated: '2025-10-23',
        popularity: 70
      }
    ];
  }

  /**
   * Identify current article based on URL
   */
  identifyCurrentArticle() {
    const currentPath = window.location.pathname;
    this.currentArticle = this.articles.find(article => 
      article.url === currentPath || currentPath.includes(article.id)
    );
  }

  /**
   * Generate article suggestions based on various criteria
   */
  generateSuggestions() {
    if (!this.currentArticle) {
      // If no current article identified, show popular articles
      this.suggestions = this.getPopularArticles();
      return;
    }

    const suggestions = [];

    // 1. Same category articles (excluding current)
    const sameCategory = this.articles
      .filter(article => 
        article.category === this.currentArticle.category && 
        article.id !== this.currentArticle.id
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);

    suggestions.push(...sameCategory);

    // 2. Articles with similar tags
    const similarTags = this.articles
      .filter(article => 
        article.id !== this.currentArticle.id &&
        this.hasCommonTags(article, this.currentArticle)
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 2);

    suggestions.push(...similarTags);

    // 3. Popular articles in the same difficulty level
    const sameDifficulty = this.articles
      .filter(article => 
        article.difficulty === this.currentArticle.difficulty &&
        article.id !== this.currentArticle.id &&
        !suggestions.some(s => s.id === article.id)
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 2);

    suggestions.push(...sameDifficulty);

    // 4. Fill with popular articles if needed
    if (suggestions.length < 6) {
      const popular = this.getPopularArticles()
        .filter(article => 
          article.id !== this.currentArticle.id &&
          !suggestions.some(s => s.id === article.id)
        )
        .slice(0, 6 - suggestions.length);
      
      suggestions.push(...popular);
    }

    // Remove duplicates and limit to 6
    this.suggestions = suggestions
      .filter((article, index, self) => 
        index === self.findIndex(a => a.id === article.id)
      )
      .slice(0, 6);
  }

  /**
   * Check if two articles have common tags
   */
  hasCommonTags(article1, article2) {
    return article1.tags.some(tag => article2.tags.includes(tag));
  }

  /**
   * Get popular articles
   */
  getPopularArticles() {
    return this.articles
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }

  /**
   * Render related articles section
   */
  renderRelatedArticles() {
    const container = document.getElementById('related-articles');
    if (!container) return;

    const section = document.createElement('section');
    section.className = 'related-articles-section';
    section.innerHTML = this.generateHTML();

    container.appendChild(section);
  }

  /**
   * Generate HTML for related articles
   */
  generateHTML() {
    if (this.suggestions.length === 0) {
      return `
        <div class="related-articles-empty">
          <p>Nenhum artigo relacionado encontrado.</p>
        </div>
      `;
    }

    return `
      <div class="related-articles-header">
        <h3 class="related-articles-title">Artigos Relacionados</h3>
        <p class="related-articles-subtitle">Continue explorando a documentação</p>
      </div>
      
      <div class="related-articles-grid">
        ${this.suggestions.map(article => this.generateArticleCard(article)).join('')}
      </div>
      
      <div class="related-articles-footer">
        <button class="related-articles-more" onclick="this.loadMoreArticles()">
          Ver mais artigos
        </button>
      </div>
    `;
  }

  /**
   * Generate HTML for individual article card
   */
  generateArticleCard(article) {
    const difficultyColors = {
      'iniciante': '#10b981',
      'intermediário': '#f59e0b',
      'avançado': '#ef4444'
    };

    const categoryIcons = {
      'tutorial': '📚',
      'how-to': '🔧',
      'reference': '📖',
      'explanation': '💡'
    };

    return `
      <article class="related-article-card" data-article-id="${article.id}">
        <div class="article-card-header">
          <span class="article-category">
            ${categoryIcons[article.category] || '📄'} ${this.formatCategory(article.category)}
          </span>
          <span class="article-difficulty" style="color: ${difficultyColors[article.difficulty]}">
            ${article.difficulty}
          </span>
        </div>
        
        <div class="article-card-content">
          <h4 class="article-title">
            <a href="${article.url}" class="article-link">${article.title}</a>
          </h4>
          <p class="article-description">${article.description}</p>
        </div>
        
        <div class="article-card-footer">
          <div class="article-meta">
            <span class="article-reading-time">⏱️ ${article.readingTime}</span>
            <span class="article-popularity">🔥 ${article.popularity}%</span>
          </div>
          <div class="article-tags">
            ${article.tags.slice(0, 3).map(tag => 
              `<span class="article-tag">${tag}</span>`
            ).join('')}
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Format category name
   */
  formatCategory(category) {
    const categoryNames = {
      'tutorial': 'Tutorial',
      'how-to': 'Como Fazer',
      'reference': 'Referência',
      'explanation': 'Explicação'
    };
    return categoryNames[category] || category;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Track article clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.article-link')) {
        this.trackArticleClick(e.target.closest('.article-link').href);
      }
    });

    // Load more articles
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('related-articles-more')) {
        this.loadMoreArticles();
      }
    });
  }

  /**
   * Track article click for analytics
   */
  trackArticleClick(url) {
    if (typeof gtag === 'function') {
      gtag('event', 'related_article_click', {
        'article_url': url,
        'current_page': window.location.pathname
      });
    }
    console.log('Related article clicked:', url);
  }

  /**
   * Load more articles
   */
  loadMoreArticles() {
    // This would typically load more articles from an API
    console.log('Loading more articles...');
    
    // For now, just show a message
    const button = document.querySelector('.related-articles-more');
    if (button) {
      button.textContent = 'Carregando...';
      setTimeout(() => {
        button.textContent = 'Ver mais artigos';
      }, 1000);
    }
  }

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RelatedArticlesSystem();
});

// Export for potential external use
window.RelatedArticlesSystem = RelatedArticlesSystem;
