/**
 * Algolia DocSearch Configuration - Dashboard Sabrina Costa
 * Full-text search implementation
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

// ============================================================================
// CONFIGURAÇÃO ALGOLIA DOCSEARCH
// ============================================================================

// Configuração do DocSearch
const DOCSEARCH_CONFIG = {
  appId: 'YOUR_ALGOLIA_APP_ID', // Substituir pelo ID real
  apiKey: 'YOUR_ALGOLIA_API_KEY', // Substituir pela chave real
  indexName: 'sabrina-costa-docs',
  placeholder: 'Buscar na documentação...',
  searchParameters: {
    hitsPerPage: 10,
    attributesToRetrieve: ['title', 'content', 'url', 'hierarchy'],
    attributesToHighlight: ['title', 'content'],
    highlightPreTag: '<mark class="search-highlight">',
    highlightPostTag: '</mark>'
  },
  debug: false // true para desenvolvimento
};

// ============================================================================
// CLASSE DOCSEARCH MANAGER
// ============================================================================

class DocSearchManager {
  constructor() {
    this.isInitialized = false;
    this.searchInstance = null;
    this.searchResults = [];
    this.searchHistory = [];
    this.init();
  }

  // Inicializar DocSearch
  init() {
    if (this.isInitialized) return;

    try {
      this.loadDocSearchScript();
      this.createSearchInterface();
      this.bindEvents();
      this.isInitialized = true;
      
      console.log('DocSearch Manager inicializado');
    } catch (error) {
      console.error('Erro ao inicializar DocSearch:', error);
    }
  }

  // Carregar script do DocSearch
  loadDocSearchScript() {
    // Verificar se já foi carregado
    if (window.docsearch) {
      this.initializeDocSearch();
      return;
    }

    // Carregar CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/@docsearch/css@3/dist/style.css';
    document.head.appendChild(cssLink);

    // Carregar JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@docsearch/js@3/dist/umd/index.js';
    script.onload = () => this.initializeDocSearch();
    document.head.appendChild(script);
  }

  // Inicializar DocSearch
  initializeDocSearch() {
    if (!window.docsearch) {
      console.error('DocSearch não carregado');
      return;
    }

    try {
      this.searchInstance = window.docsearch({
        container: '#docsearch',
        appId: DOCSEARCH_CONFIG.appId,
        apiKey: DOCSEARCH_CONFIG.apiKey,
        indexName: DOCSEARCH_CONFIG.indexName,
        placeholder: DOCSEARCH_CONFIG.placeholder,
        searchParameters: DOCSEARCH_CONFIG.searchParameters,
        debug: DOCSEARCH_CONFIG.debug,
        transformItems: (items) => this.transformSearchResults(items),
        getMissingResultsUrl: ({ query }) => {
          return `https://github.com/Marcocardoso91/sabrina-costa/issues/new?title=Missing+results+for+query+%22${encodeURIComponent(query)}%22`;
        }
      });

      console.log('DocSearch inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar DocSearch:', error);
    }
  }

  // Criar interface de busca
  createSearchInterface() {
    // Verificar se já existe
    if (document.getElementById('docsearch')) return;

    const searchContainer = document.createElement('div');
    searchContainer.id = 'docsearch';
    searchContainer.className = 'docsearch-container';
    
    // Adicionar estilos customizados
    const styles = document.createElement('style');
    styles.textContent = `
      .docsearch-container {
        position: relative;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .DocSearch-Button {
        width: 100%;
        height: 40px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        background: white;
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .DocSearch-Button:hover {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .DocSearch-Button-Key {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 12px;
        color: #6b7280;
      }
      
      .search-highlight {
        background: #fef3c7;
        padding: 1px 2px;
        border-radius: 2px;
      }
      
      .DocSearch-Modal {
        z-index: 9999;
      }
      
      .DocSearch-Hit {
        border-bottom: 1px solid #f3f4f6;
      }
      
      .DocSearch-Hit-source {
        background: #f8fafc;
        color: #475569;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .DocSearch-Hit-title {
        color: #1e293b;
        font-weight: 500;
      }
      
      .DocSearch-Hit-content {
        color: #64748b;
        font-size: 14px;
      }
      
      .DocSearch-Hit[aria-selected="true"] {
        background: #dbeafe;
      }
      
      @media (max-width: 768px) {
        .docsearch-container {
          max-width: 100%;
          margin: 0 16px;
        }
      }
    `;
    document.head.appendChild(styles);

    // Inserir no header ou criar se não existir
    let header = document.querySelector('header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'bg-white shadow-sm border-b';
      document.body.insertBefore(header, document.body.firstChild);
    }

    const headerContent = document.createElement('div');
    headerContent.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4';
    headerContent.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex items-center mb-4 md:mb-0">
          <h1 class="text-2xl font-bold text-gray-900">📚 Documentação</h1>
        </div>
        <div class="w-full md:w-auto">
          ${searchContainer.outerHTML}
        </div>
      </div>
    `;
    
    header.appendChild(headerContent);
  }

  // Transformar resultados de busca
  transformSearchResults(items) {
    return items.map(item => {
      // Adicionar categoria baseada na URL
      let category = 'Documentação';
      if (item.url.includes('/tutorials/')) {
        category = 'Tutoriais';
      } else if (item.url.includes('/how-to-guides/')) {
        category = 'Guias';
      } else if (item.url.includes('/reference/')) {
        category = 'Referência';
      } else if (item.url.includes('/explanation/')) {
        category = 'Explicações';
      }

      // Adicionar ícone baseado na categoria
      let icon = '📄';
      if (category === 'Tutoriais') icon = '📚';
      else if (category === 'Guias') icon = '🛠️';
      else if (category === 'Referência') icon = '📋';
      else if (category === 'Explicações') icon = '💡';

      return {
        ...item,
        category,
        icon,
        // Adicionar breadcrumb
        breadcrumb: this.generateBreadcrumb(item.url)
      };
    });
  }

  // Gerar breadcrumb
  generateBreadcrumb(url) {
    const pathParts = url.split('/').filter(part => part && part !== 'docs');
    const breadcrumb = ['Docs'];
    
    pathParts.forEach(part => {
      const formatted = part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumb.push(formatted);
    });
    
    return breadcrumb.join(' > ');
  }

  // Bind eventos
  bindEvents() {
    // Track search events
    document.addEventListener('click', (e) => {
      if (e.target.closest('.DocSearch-Button')) {
        this.trackSearchEvent('search_open');
      }
    });

    // Track search queries
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.DocSearch-Input')) {
        if (e.key === 'Enter') {
          const query = e.target.value;
          this.trackSearchEvent('search_query', { query });
          this.addToSearchHistory(query);
        }
      }
    });

    // Track result clicks
    document.addEventListener('click', (e) => {
      const hit = e.target.closest('.DocSearch-Hit');
      if (hit) {
        const title = hit.querySelector('.DocSearch-Hit-title')?.textContent;
        const url = hit.querySelector('a')?.href;
        this.trackSearchEvent('search_result_click', { title, url });
      }
    });
  }

  // Rastrear eventos de busca
  trackSearchEvent(eventName, parameters = {}) {
    if (window.analytics) {
      window.analytics.trackEvent(eventName, {
        category: 'Search',
        ...parameters
      });
    }
  }

  // Adicionar ao histórico de busca
  addToSearchHistory(query) {
    if (!query || query.length < 2) return;
    
    this.searchHistory.unshift(query);
    this.searchHistory = this.searchHistory.slice(0, 10); // Manter apenas 10 itens
    
    // Salvar no localStorage
    localStorage.setItem('docsearch_history', JSON.stringify(this.searchHistory));
  }

  // Obter histórico de busca
  getSearchHistory() {
    const stored = localStorage.getItem('docsearch_history');
    return stored ? JSON.parse(stored) : [];
  }

  // Busca avançada
  advancedSearch(query, filters = {}) {
    if (!this.searchInstance) {
      console.error('DocSearch não inicializado');
      return;
    }

    const searchParameters = {
      ...DOCSEARCH_CONFIG.searchParameters,
      ...filters
    };

    return this.searchInstance.search(query, searchParameters);
  }

  // Buscar por categoria
  searchByCategory(category, query = '') {
    const categoryFilters = {
      filters: `category:${category}`
    };
    
    return this.advancedSearch(query, categoryFilters);
  }

  // Buscar tutoriais
  searchTutorials(query = '') {
    return this.searchByCategory('tutorials', query);
  }

  // Buscar guias
  searchGuides(query = '') {
    return this.searchByCategory('how-to-guides', query);
  }

  // Buscar referência
  searchReference(query = '') {
    return this.searchByCategory('reference', query);
  }

  // Buscar explicações
  searchExplanations(query = '') {
    return this.searchByCategory('explanation', query);
  }
}

// ============================================================================
// SEARCH SUGGESTIONS
// ============================================================================

// Classe para sugestões de busca
class SearchSuggestions {
  constructor() {
    this.suggestions = [
      'como fazer deploy',
      'configurar n8n',
      'autenticação JWT',
      'erro CORS',
      'WhatsApp integration',
      'API endpoints',
      'troubleshooting',
      'arquitetura do sistema',
      'configuração banco de dados',
      'workflows n8n',
      'Evolution API',
      'Vercel deploy',
      'Supabase setup',
      'rate limiting',
      'webhook n8n'
    ];
    this.init();
  }

  // Inicializar sugestões
  init() {
    this.createSuggestionsWidget();
    this.bindEvents();
  }

  // Criar widget de sugestões
  createSuggestionsWidget() {
    const container = document.createElement('div');
    container.id = 'search-suggestions';
    container.className = 'search-suggestions';
    container.style.display = 'none';
    
    container.innerHTML = `
      <div class="suggestions-header">
        <h3>💡 Sugestões de Busca</h3>
        <button class="suggestions-close">×</button>
      </div>
      <div class="suggestions-content">
        ${this.suggestions.map(suggestion => `
          <div class="suggestion-item" data-suggestion="${suggestion}">
            <span class="suggestion-icon">🔍</span>
            <span class="suggestion-text">${suggestion}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Adicionar estilos
    const styles = document.createElement('style');
    styles.textContent = `
      .search-suggestions {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 500px;
        width: 90%;
        max-height: 400px;
        overflow-y: auto;
      }
      
      .suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;
      }
      
      .suggestions-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #111827;
      }
      
      .suggestions-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6b7280;
      }
      
      .suggestions-content {
        padding: 8px 0;
      }
      
      .suggestion-item {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      
      .suggestion-item:hover {
        background: #f3f4f6;
      }
      
      .suggestion-icon {
        margin-right: 12px;
        font-size: 16px;
      }
      
      .suggestion-text {
        color: #374151;
        font-size: 14px;
      }
    `;
    document.head.appendChild(styles);
    document.body.appendChild(container);
  }

  // Bind eventos
  bindEvents() {
    const container = document.getElementById('search-suggestions');
    const closeBtn = container.querySelector('.suggestions-close');
    const items = container.querySelectorAll('.suggestion-item');

    // Fechar sugestões
    closeBtn.addEventListener('click', () => {
      container.style.display = 'none';
    });

    // Clicar em sugestão
    items.forEach(item => {
      item.addEventListener('click', () => {
        const suggestion = item.dataset.suggestion;
        this.selectSuggestion(suggestion);
        container.style.display = 'none';
      });
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && container.style.display === 'block') {
        container.style.display = 'none';
      }
    });

    // Fechar clicando fora
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        container.style.display = 'none';
      }
    });
  }

  // Selecionar sugestão
  selectSuggestion(suggestion) {
    // Preencher campo de busca
    const searchInput = document.querySelector('.DocSearch-Input');
    if (searchInput) {
      searchInput.value = suggestion;
      searchInput.focus();
      
      // Disparar evento de busca
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
    }

    // Rastrear evento
    if (window.analytics) {
      window.analytics.trackEvent('search_suggestion_click', {
        suggestion,
        category: 'Search'
      });
    }
  }

  // Mostrar sugestões
  show() {
    const container = document.getElementById('search-suggestions');
    container.style.display = 'block';
  }

  // Esconder sugestões
  hide() {
    const container = document.getElementById('search-suggestions');
    container.style.display = 'none';
  }
}

// ============================================================================
// SEARCH ANALYTICS
// ============================================================================

// Classe para analytics de busca
class SearchAnalytics {
  constructor() {
    this.searchEvents = [];
    this.init();
  }

  // Inicializar
  init() {
    this.bindEvents();
  }

  // Bind eventos
  bindEvents() {
    // Track search queries
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.DocSearch-Input')) {
        if (e.key === 'Enter') {
          this.trackSearchQuery(e.target.value);
        }
      }
    });

    // Track result clicks
    document.addEventListener('click', (e) => {
      const hit = e.target.closest('.DocSearch-Hit');
      if (hit) {
        this.trackResultClick(hit);
      }
    });
  }

  // Rastrear query de busca
  trackSearchQuery(query) {
    const event = {
      type: 'search_query',
      query,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };

    this.searchEvents.push(event);
    this.saveToLocalStorage();

    // Enviar para analytics
    if (window.analytics) {
      window.analytics.trackSearch(query, 0); // Results count será atualizado
    }
  }

  // Rastrear clique em resultado
  trackResultClick(hit) {
    const title = hit.querySelector('.DocSearch-Hit-title')?.textContent;
    const url = hit.querySelector('a')?.href;
    const category = hit.querySelector('.DocSearch-Hit-source')?.textContent;

    const event = {
      type: 'result_click',
      title,
      url,
      category,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };

    this.searchEvents.push(event);
    this.saveToLocalStorage();

    // Enviar para analytics
    if (window.analytics) {
      window.analytics.trackEvent('search_result_click', {
        title,
        url,
        category,
        page: window.location.pathname
      });
    }
  }

  // Salvar no localStorage
  saveToLocalStorage() {
    localStorage.setItem('search_analytics', JSON.stringify(this.searchEvents));
  }

  // Carregar do localStorage
  loadFromLocalStorage() {
    const stored = localStorage.getItem('search_analytics');
    this.searchEvents = stored ? JSON.parse(stored) : [];
  }

  // Obter estatísticas
  getStats() {
    const queries = this.searchEvents.filter(e => e.type === 'search_query');
    const clicks = this.searchEvents.filter(e => e.type === 'result_click');

    return {
      totalQueries: queries.length,
      totalClicks: clicks.length,
      clickThroughRate: queries.length > 0 ? (clicks.length / queries.length) * 100 : 0,
      topQueries: this.getTopQueries(),
      topResults: this.getTopResults()
    };
  }

  // Obter queries mais populares
  getTopQueries() {
    const queries = this.searchEvents
      .filter(e => e.type === 'search_query')
      .map(e => e.query)
      .reduce((acc, query) => {
        acc[query] = (acc[query] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(queries)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  }

  // Obter resultados mais clicados
  getTopResults() {
    const results = this.searchEvents
      .filter(e => e.type === 'result_click')
      .map(e => e.title)
      .reduce((acc, title) => {
        acc[title] = (acc[title] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(results)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([title, count]) => ({ title, count }));
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar DocSearch Manager
  window.docSearchManager = new DocSearchManager();
  
  // Inicializar Search Suggestions
  window.searchSuggestions = new SearchSuggestions();
  
  // Inicializar Search Analytics
  window.searchAnalytics = new SearchAnalytics();
  
  console.log('Search system inicializado');
});

// ============================================================================
// EXPORTS (para uso em módulos)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DocSearchManager,
    SearchSuggestions,
    SearchAnalytics
  };
}
