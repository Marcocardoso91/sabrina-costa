/**
 * Giscus Comments System
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - GitHub Discussions integration
 * - Automatic page identification
 * - Custom styling and themes
 * - Language configuration
 * - Responsive design
 * - Analytics integration
 */

class GiscusCommentsSystem {
  constructor() {
    this.config = {
      repo: 'sabrina-costa/dashboard-docs', // Substitua pelo seu repositório
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
    
    this.isLoaded = false;
    this.init();
  }

  init() {
    this.createCommentsContainer();
    this.loadGiscusScript();
    this.setupEventListeners();
  }

  /**
   * Create comments container
   */
  createCommentsContainer() {
    const container = document.getElementById('giscus-comments');
    if (!container) return;

    // Create comments section
    const commentsSection = document.createElement('section');
    commentsSection.className = 'giscus-comments-section';
    commentsSection.innerHTML = `
      <div class="comments-header">
        <h3 class="comments-title">💬 Discussões</h3>
        <p class="comments-subtitle">Participe da discussão sobre esta página</p>
      </div>
      <div class="comments-container">
        <div id="giscus-root"></div>
      </div>
      <div class="comments-footer">
        <p class="comments-info">
          💡 <strong>Dica:</strong> Faça login com sua conta GitHub para participar das discussões.
        </p>
      </div>
    `;

    container.appendChild(commentsSection);
  }

  /**
   * Load Giscus script
   */
  loadGiscusScript() {
    if (this.isLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', this.config.repo);
    script.setAttribute('data-repo-id', this.config.repoId);
    script.setAttribute('data-category', this.config.category);
    script.setAttribute('data-category-id', this.config.categoryId);
    script.setAttribute('data-mapping', this.config.mapping);
    script.setAttribute('data-strict', this.config.strict);
    script.setAttribute('data-reactions-enabled', this.config.reactionsEnabled);
    script.setAttribute('data-emit-metadata', this.config.emitMetadata);
    script.setAttribute('data-input-position', this.config.inputPosition);
    script.setAttribute('data-theme', this.config.theme);
    script.setAttribute('data-lang', this.config.lang);
    script.setAttribute('data-loading', this.config.loading);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    script.onload = () => {
      this.isLoaded = true;
      this.onGiscusLoaded();
    };

    script.onerror = () => {
      this.showErrorMessage();
    };

    document.head.appendChild(script);
  }

  /**
   * Handle Giscus loaded event
   */
  onGiscusLoaded() {
    console.log('Giscus comments system loaded');
    
    // Track analytics
    this.trackCommentsLoad();
    
    // Setup theme detection
    this.setupThemeDetection();
    
    // Setup responsive behavior
    this.setupResponsiveBehavior();
  }

  /**
   * Setup theme detection
   */
  setupThemeDetection() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      this.updateGiscusTheme(newTheme);
    };

    mediaQuery.addEventListener('change', updateTheme);
    updateTheme(mediaQuery);
  }

  /**
   * Update Giscus theme
   */
  updateGiscusTheme(theme) {
    if (window.giscus) {
      window.giscus.setTheme(theme);
    }
  }

  /**
   * Setup responsive behavior
   */
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

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for Giscus events
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://giscus.app') return;

      const { data } = event;
      
      switch (data.type) {
        case 'resize':
          this.handleGiscusResize(data);
          break;
        case 'navigate':
          this.handleGiscusNavigate(data);
          break;
        case 'error':
          this.handleGiscusError(data);
          break;
      }
    });

    // Listen for page changes (SPA)
    this.setupSPANavigation();
  }

  /**
   * Handle Giscus resize
   */
  handleGiscusResize(data) {
    const container = document.getElementById('giscus-root');
    if (container) {
      container.style.height = `${data.height}px`;
    }
  }

  /**
   * Handle Giscus navigate
   */
  handleGiscusNavigate(data) {
    console.log('Giscus navigation:', data);
    this.trackCommentsNavigation(data);
  }

  /**
   * Handle Giscus error
   */
  handleGiscusError(data) {
    console.error('Giscus error:', data);
    this.showErrorMessage();
  }

  /**
   * Setup SPA navigation
   */
  setupSPANavigation() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.refreshGiscus();
    });

    // Listen for popstate
    window.addEventListener('popstate', () => {
      this.refreshGiscus();
    });
  }

  /**
   * Refresh Giscus
   */
  refreshGiscus() {
    if (window.giscus) {
      window.giscus.reset();
    }
  }

  /**
   * Show error message
   */
  showErrorMessage() {
    const container = document.getElementById('giscus-root');
    if (!container) return;

    container.innerHTML = `
      <div class="giscus-error">
        <p>❌ Não foi possível carregar os comentários.</p>
        <p>Verifique sua conexão com a internet e tente novamente.</p>
        <button onclick="location.reload()" class="giscus-retry-btn">
          🔄 Tentar Novamente
        </button>
      </div>
    `;
  }

  /**
   * Track comments load
   */
  trackCommentsLoad() {
    if (typeof gtag === 'function') {
      gtag('event', 'comments_loaded', {
        'page_path': window.location.pathname,
        'comments_system': 'giscus'
      });
    }
  }

  /**
   * Track comments navigation
   */
  trackCommentsNavigation(data) {
    if (typeof gtag === 'function') {
      gtag('event', 'comments_navigation', {
        'page_path': window.location.pathname,
        'navigation_type': data.type
      });
    }
  }

  /**
   * Get comments configuration
   */
  getConfig() {
    return this.config;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    if (this.isLoaded) {
      this.refreshGiscus();
    }
  }

  /**
   * Enable/disable comments
   */
  toggleComments(enabled) {
    const container = document.getElementById('giscus-comments');
    if (!container) return;

    if (enabled) {
      container.style.display = 'block';
      if (!this.isLoaded) {
        this.loadGiscusScript();
      }
    } else {
      container.style.display = 'none';
    }
  }

  /**
   * Get comments count
   */
  async getCommentsCount() {
    // This would typically make an API call to get comments count
    // For now, return a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 10));
      }, 1000);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GiscusCommentsSystem();
});

// Export for potential external use
window.GiscusCommentsSystem = GiscusCommentsSystem;
