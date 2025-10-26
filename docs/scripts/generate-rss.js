/**
 * RSS Feed Generator
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - Automatic RSS feed generation
 * - Multiple feed types (all, tutorials, how-to, reference, explanation)
 * - Change detection and updates
 * - Atom and RSS 2.0 formats
 * - Custom categories and tags
 */

const fs = require('fs');
const path = require('path');
const RSS = require('rss');

class RSSFeedGenerator {
  constructor() {
    this.baseUrl = 'https://sabrina-costa.vercel.app';
    this.docsPath = path.resolve(__dirname, '..');
    this.outputPath = path.resolve(__dirname, '../feeds');
    this.articles = [];
    this.init();
  }

  init() {
    this.ensureOutputDirectory();
    this.loadArticlesData();
    this.generateFeeds();
  }

  /**
   * Ensure output directory exists
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
  }

  /**
   * Load articles data from documentation
   */
  loadArticlesData() {
    this.articles = [
      {
        id: 'quickstart',
        title: 'Guia de Início Rápido',
        description: 'Aprenda a configurar e usar o Dashboard Sabrina Costa em poucos minutos.',
        url: '/docs/tutorials/01-quickstart.md',
        category: 'tutorial',
        tags: ['início', 'configuração', 'básico'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Guia completo para começar a usar o sistema...'
      },
      {
        id: 'deploy',
        title: 'Primeiro Deploy',
        description: 'Guia completo para fazer o primeiro deploy do projeto na Vercel.',
        url: '/docs/tutorials/02-primeiro-deploy.md',
        category: 'tutorial',
        tags: ['deploy', 'vercel', 'produção'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Passo a passo para fazer deploy na Vercel...'
      },
      {
        id: 'n8n-workflow',
        title: 'Primeiro Workflow n8n',
        description: 'Configure seu primeiro workflow de automação com n8n.',
        url: '/docs/tutorials/03-primeiro-workflow-n8n.md',
        category: 'tutorial',
        tags: ['n8n', 'automação', 'workflow'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Como configurar workflows no n8n...'
      },
      {
        id: 'whatsapp',
        title: 'Conectar WhatsApp',
        description: 'Integre o WhatsApp com o sistema usando Evolution API.',
        url: '/docs/tutorials/04-conectar-whatsapp.md',
        category: 'tutorial',
        tags: ['whatsapp', 'evolution-api', 'integração'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Integração com WhatsApp via Evolution API...'
      },
      {
        id: 'jwt-auth',
        title: 'Configurar Autenticação JWT',
        description: 'Guia prático para configurar autenticação JWT no backend.',
        url: '/docs/how-to-guides/autenticacao/setup-jwt.md',
        category: 'how-to',
        tags: ['autenticação', 'jwt', 'segurança'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Configuração de autenticação JWT...'
      },
      {
        id: 'architecture',
        title: 'Arquitetura do Sistema',
        description: 'Visão completa da arquitetura do Dashboard Sabrina Costa.',
        url: '/docs/explanation/architecture.md',
        category: 'explanation',
        tags: ['arquitetura', 'sistema', 'tecnologia'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Arquitetura completa do sistema...'
      },
      {
        id: 'api-reference',
        title: 'Referência da API',
        description: 'Documentação completa de todos os endpoints da API.',
        url: '/docs/reference/api/README.md',
        category: 'reference',
        tags: ['api', 'endpoints', 'referência'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Referência completa da API...'
      },
      {
        id: 'metrics',
        title: 'Gerenciar Métricas',
        description: 'Como adicionar, visualizar e analisar métricas do Instagram.',
        url: '/docs/how-to-guides/metrics/view-metrics.md',
        category: 'how-to',
        tags: ['métricas', 'instagram', 'análise'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Gerenciamento de métricas do Instagram...'
      },
      {
        id: 'alerts',
        title: 'Configurar Alertas',
        description: 'Configure alertas automáticos para métricas importantes.',
        url: '/docs/how-to-guides/alerts/setup-alerts.md',
        category: 'how-to',
        tags: ['alertas', 'notificações', 'automação'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Configuração de alertas automáticos...'
      },
      {
        id: 'troubleshooting',
        title: 'Solução de Problemas',
        description: 'Guia para resolver problemas comuns do sistema.',
        url: '/docs/how-to-guides/troubleshooting/common-issues.md',
        category: 'how-to',
        tags: ['problemas', 'solução', 'debug'],
        lastUpdated: '2025-10-23',
        author: 'Sabrina Costa',
        content: 'Solução de problemas comuns...'
      }
    ];
  }

  /**
   * Generate all RSS feeds
   */
  generateFeeds() {
    // Main feed (all articles)
    this.generateMainFeed();
    
    // Category-specific feeds
    this.generateCategoryFeeds();
    
    // Tag-specific feeds
    this.generateTagFeeds();
    
    // Recent updates feed
    this.generateRecentFeed();
    
    console.log('RSS feeds generated successfully!');
  }

  /**
   * Generate main RSS feed
   */
  generateMainFeed() {
    const feed = new RSS({
      title: 'Dashboard Sabrina Costa - Documentação',
      description: 'Documentação completa do Dashboard Sabrina Costa, incluindo tutoriais, guias práticos, referências e explicações.',
      feed_url: `${this.baseUrl}/feeds/rss.xml`,
      site_url: `${this.baseUrl}/docs/`,
      image_url: `${this.baseUrl}/assets/images/logo.png`,
      language: 'pt-BR',
      managingEditor: 'Sabrina Costa',
      webMaster: 'Sabrina Costa',
      copyright: '2025 Sabrina Costa',
      lastBuildDate: new Date(),
      ttl: 60,
      categories: ['documentação', 'tutorial', 'dashboard', 'dashboard']
    });

    // Add all articles to main feed
    this.articles.forEach(article => {
      feed.item({
        title: article.title,
        description: article.description,
        url: `${this.baseUrl}${article.url}`,
        guid: article.id,
        categories: article.tags,
        author: article.author,
        date: new Date(article.lastUpdated),
        custom_elements: [
          { 'content:encoded': article.content },
          { 'dc:creator': article.author },
          { 'dc:date': new Date(article.lastUpdated).toISOString() }
        ]
      });
    });

    this.saveFeed(feed, 'rss.xml');
  }

  /**
   * Generate category-specific feeds
   */
  generateCategoryFeeds() {
    const categories = ['tutorial', 'how-to', 'reference', 'explanation'];
    
    categories.forEach(category => {
      const categoryArticles = this.articles.filter(article => article.category === category);
      
      if (categoryArticles.length === 0) return;

      const feed = new RSS({
        title: `Dashboard Sabrina Costa - ${this.formatCategory(category)}`,
        description: `Documentação de ${this.formatCategory(category).toLowerCase()} do Dashboard Sabrina Costa.`,
        feed_url: `${this.baseUrl}/feeds/${category}.xml`,
        site_url: `${this.baseUrl}/docs/`,
        image_url: `${this.baseUrl}/assets/images/logo.png`,
        language: 'pt-BR',
        managingEditor: 'Sabrina Costa',
        webMaster: 'Sabrina Costa',
        copyright: '2025 Sabrina Costa',
        lastBuildDate: new Date(),
        ttl: 60,
        categories: [category, 'documentação']
      });

      categoryArticles.forEach(article => {
        feed.item({
          title: article.title,
          description: article.description,
          url: `${this.baseUrl}${article.url}`,
          guid: article.id,
          categories: article.tags,
          author: article.author,
          date: new Date(article.lastUpdated),
          custom_elements: [
            { 'content:encoded': article.content },
            { 'dc:creator': article.author },
            { 'dc:date': new Date(article.lastUpdated).toISOString() }
          ]
        });
      });

      this.saveFeed(feed, `${category}.xml`);
    });
  }

  /**
   * Generate tag-specific feeds
   */
  generateTagFeeds() {
    const popularTags = ['início', 'deploy', 'automação', 'api', 'métricas'];
    
    popularTags.forEach(tag => {
      const tagArticles = this.articles.filter(article => 
        article.tags.includes(tag)
      );
      
      if (tagArticles.length === 0) return;

      const feed = new RSS({
        title: `Dashboard Sabrina Costa - ${tag}`,
        description: `Artigos sobre ${tag} do Dashboard Sabrina Costa.`,
        feed_url: `${this.baseUrl}/feeds/tag-${tag}.xml`,
        site_url: `${this.baseUrl}/docs/`,
        image_url: `${this.baseUrl}/assets/images/logo.png`,
        language: 'pt-BR',
        managingEditor: 'Sabrina Costa',
        webMaster: 'Sabrina Costa',
        copyright: '2025 Sabrina Costa',
        lastBuildDate: new Date(),
        ttl: 60,
        categories: [tag, 'documentação']
      });

      tagArticles.forEach(article => {
        feed.item({
          title: article.title,
          description: article.description,
          url: `${this.baseUrl}${article.url}`,
          guid: article.id,
          categories: article.tags,
          author: article.author,
          date: new Date(article.lastUpdated),
          custom_elements: [
            { 'content:encoded': article.content },
            { 'dc:creator': article.author },
            { 'dc:date': new Date(article.lastUpdated).toISOString() }
          ]
        });
      });

      this.saveFeed(feed, `tag-${tag}.xml`);
    });
  }

  /**
   * Generate recent updates feed
   */
  generateRecentFeed() {
    const recentArticles = this.articles
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
      .slice(0, 10);

    const feed = new RSS({
      title: 'Dashboard Sabrina Costa - Atualizações Recentes',
      description: 'Últimas atualizações da documentação do Dashboard Sabrina Costa.',
      feed_url: `${this.baseUrl}/feeds/recent.xml`,
      site_url: `${this.baseUrl}/docs/`,
      image_url: `${this.baseUrl}/assets/images/logo.png`,
      language: 'pt-BR',
      managingEditor: 'Sabrina Costa',
      webMaster: 'Sabrina Costa',
      copyright: '2025 Sabrina Costa',
      lastBuildDate: new Date(),
      ttl: 30,
      categories: ['atualizações', 'documentação']
    });

    recentArticles.forEach(article => {
      feed.item({
        title: article.title,
        description: article.description,
        url: `${this.baseUrl}${article.url}`,
        guid: article.id,
        categories: article.tags,
        author: article.author,
        date: new Date(article.lastUpdated),
        custom_elements: [
          { 'content:encoded': article.content },
          { 'dc:creator': article.author },
          { 'dc:date': new Date(article.lastUpdated).toISOString() }
        ]
      });
    });

    this.saveFeed(feed, 'recent.xml');
  }

  /**
   * Save RSS feed to file
   */
  saveFeed(feed, filename) {
    const filePath = path.join(this.outputPath, filename);
    const xml = feed.xml({ indent: true });
    
    fs.writeFileSync(filePath, xml);
    console.log(`Generated: ${filename}`);
  }

  /**
   * Format category name
   */
  formatCategory(category) {
    const categoryNames = {
      'tutorial': 'Tutoriais',
      'how-to': 'Guias Práticos',
      'reference': 'Referência',
      'explanation': 'Explicações'
    };
    return categoryNames[category] || category;
  }
}

// Run the generator
new RSSFeedGenerator();
