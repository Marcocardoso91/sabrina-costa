/**
 * Analytics Configuration - Dashboard Sabrina Costa
 * Google Analytics 4 + Hotjar integration
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

// ============================================================================
// CONFIGURAÇÃO GOOGLE ANALYTICS 4
// ============================================================================

// Configuração GA4
const GA4_CONFIG = {
  measurementId: 'G-XXXXXXXXXX', // Substituir pelo ID real
  debug: false, // true para desenvolvimento
  anonymizeIp: true,
  cookieExpires: 63072000, // 2 anos
  cookieDomain: 'auto',
  cookieFlags: 'SameSite=None;Secure'
};

// Inicializar Google Analytics 4
function initGoogleAnalytics() {
  // Verificar se GA4 já foi carregado
  if (window.gtag) {
    console.log('Google Analytics já inicializado');
    return;
  }

  // Carregar script do Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`;
  document.head.appendChild(script);

  // Configurar dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Configurar GA4
  gtag('js', new Date());
  gtag('config', GA4_CONFIG.measurementId, {
    anonymize_ip: GA4_CONFIG.anonymizeIp,
    cookie_expires: GA4_CONFIG.cookieExpires,
    cookie_domain: GA4_CONFIG.cookieDomain,
    cookie_flags: GA4_CONFIG.cookieFlags,
    debug_mode: GA4_CONFIG.debug
  });

  console.log('Google Analytics 4 inicializado');
}

// ============================================================================
// CONFIGURAÇÃO HOTJAR
// ============================================================================

// Configuração Hotjar
const HOTJAR_CONFIG = {
  hjid: 'YOUR_HOTJAR_ID', // Substituir pelo ID real
  hjsv: 6,
  debug: false // true para desenvolvimento
};

// Inicializar Hotjar
function initHotjar() {
  // Verificar se Hotjar já foi carregado
  if (window.hj) {
    console.log('Hotjar já inicializado');
    return;
  }

  // Função Hotjar
  (function(h, o, t, j, a, r) {
    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = {
      hjid: HOTJAR_CONFIG.hjid,
      hjsv: HOTJAR_CONFIG.hjsv,
      debug: HOTJAR_CONFIG.debug
    };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

  console.log('Hotjar inicializado');
}

// ============================================================================
// EVENTOS PERSONALIZADOS
// ============================================================================

// Classe para gerenciar eventos
class AnalyticsManager {
  constructor() {
    this.isInitialized = false;
    this.pendingEvents = [];
  }

  // Inicializar analytics
  init() {
    if (this.isInitialized) return;

    try {
      initGoogleAnalytics();
      initHotjar();
      this.isInitialized = true;
      
      // Processar eventos pendentes
      this.processPendingEvents();
      
      console.log('Analytics Manager inicializado');
    } catch (error) {
      console.error('Erro ao inicializar analytics:', error);
    }
  }

  // Processar eventos pendentes
  processPendingEvents() {
    while (this.pendingEvents.length > 0) {
      const event = this.pendingEvents.shift();
      this.trackEvent(event.name, event.parameters);
    }
  }

  // Rastrear evento
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) {
      this.pendingEvents.push({ name: eventName, parameters });
      return;
    }

    try {
      // Google Analytics 4
      if (window.gtag) {
        gtag('event', eventName, {
          event_category: parameters.category || 'Documentation',
          event_label: parameters.label || '',
          value: parameters.value || 0,
          custom_parameters: parameters.custom || {},
          ...parameters
        });
      }

      // Hotjar
      if (window.hj) {
        hj('event', eventName);
      }

      console.log('Evento rastreado:', eventName, parameters);
    } catch (error) {
      console.error('Erro ao rastrear evento:', error);
    }
  }

  // Rastrear visualização de página
  trackPageView(pageName, pagePath) {
    this.trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: pagePath,
      category: 'Navigation'
    });
  }

  // Rastrear clique em link
  trackLinkClick(linkText, linkUrl, linkType = 'internal') {
    this.trackEvent('link_click', {
      link_text: linkText,
      link_url: linkUrl,
      link_type: linkType,
      category: 'Engagement'
    });
  }

  // Rastrear download
  trackDownload(fileName, fileType) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      category: 'Downloads'
    });
  }

  // Rastrear busca
  trackSearch(searchTerm, resultsCount) {
    this.trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      category: 'Search'
    });
  }

  // Rastrear tempo de leitura
  trackReadingTime(pageName, timeSpent) {
    this.trackEvent('reading_time', {
      page_name: pageName,
      time_spent: timeSpent,
      category: 'Engagement'
    });
  }

  // Rastrear scroll depth
  trackScrollDepth(pageName, depth) {
    this.trackEvent('scroll_depth', {
      page_name: pageName,
      scroll_depth: depth,
      category: 'Engagement'
    });
  }
}

// ============================================================================
// WIDGET DE FEEDBACK
// ============================================================================

// Classe para widget de feedback
class FeedbackWidget {
  constructor() {
    this.isVisible = false;
    this.createWidget();
    this.bindEvents();
  }

  // Criar widget
  createWidget() {
    const widget = document.createElement('div');
    widget.id = 'feedback-widget';
    widget.innerHTML = `
      <div class="feedback-container">
        <div class="feedback-trigger" id="feedback-trigger">
          <span>💬</span>
        </div>
        <div class="feedback-panel" id="feedback-panel" style="display: none;">
          <div class="feedback-header">
            <h3>Esta página foi útil?</h3>
            <button class="feedback-close" id="feedback-close">×</button>
          </div>
          <div class="feedback-buttons">
            <button class="feedback-btn feedback-yes" data-feedback="yes">
              👍 Sim
            </button>
            <button class="feedback-btn feedback-no" data-feedback="no">
              👎 Não
            </button>
          </div>
          <div class="feedback-more" id="feedback-more" style="display: none;">
            <textarea id="feedback-text" placeholder="O que podemos melhorar?"></textarea>
            <button class="feedback-submit" id="feedback-submit">Enviar</button>
          </div>
          <div class="feedback-thanks" id="feedback-thanks" style="display: none;">
            <p>✅ Obrigado pelo feedback!</p>
          </div>
        </div>
      </div>
    `;

    // Adicionar estilos
    const styles = document.createElement('style');
    styles.textContent = `
      #feedback-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .feedback-trigger {
        width: 50px;
        height: 50px;
        background: #007bff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      }
      
      .feedback-trigger:hover {
        background: #0056b3;
        transform: scale(1.1);
      }
      
      .feedback-panel {
        position: absolute;
        bottom: 60px;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        padding: 20px;
        border: 1px solid #e0e0e0;
      }
      
      .feedback-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .feedback-header h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
      }
      
      .feedback-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
      }
      
      .feedback-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }
      
      .feedback-btn {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .feedback-yes:hover {
        background: #d4edda;
        border-color: #28a745;
      }
      
      .feedback-no:hover {
        background: #f8d7da;
        border-color: #dc3545;
      }
      
      .feedback-more textarea {
        width: 100%;
        height: 80px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: vertical;
        margin-bottom: 10px;
      }
      
      .feedback-submit {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
      }
      
      .feedback-thanks {
        text-align: center;
        color: #28a745;
        font-weight: bold;
      }
      
      @media (max-width: 768px) {
        .feedback-panel {
          width: 280px;
          right: -10px;
        }
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(widget);
  }

  // Bind eventos
  bindEvents() {
    const trigger = document.getElementById('feedback-trigger');
    const panel = document.getElementById('feedback-panel');
    const close = document.getElementById('feedback-close');
    const buttons = document.querySelectorAll('.feedback-btn');
    const more = document.getElementById('feedback-more');
    const submit = document.getElementById('feedback-submit');
    const thanks = document.getElementById('feedback-thanks');

    // Toggle panel
    trigger.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      panel.style.display = this.isVisible ? 'block' : 'none';
    });

    // Close panel
    close.addEventListener('click', () => {
      this.isVisible = false;
      panel.style.display = 'none';
    });

    // Feedback buttons
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const feedback = e.target.dataset.feedback;
        this.handleFeedback(feedback);
      });
    });

    // Submit detailed feedback
    submit.addEventListener('click', () => {
      const text = document.getElementById('feedback-text').value;
      this.submitDetailedFeedback(text);
    });
  }

  // Handle feedback
  handleFeedback(feedback) {
    // Rastrear evento
    if (window.analytics) {
      window.analytics.trackEvent('feedback', {
        feedback_type: feedback,
        page: window.location.pathname,
        category: 'Feedback'
      });
    }

    if (feedback === 'yes') {
      this.showThanks();
    } else {
      this.showMore();
    }
  }

  // Show thanks
  showThanks() {
    document.getElementById('feedback-buttons').style.display = 'none';
    document.getElementById('feedback-more').style.display = 'none';
    document.getElementById('feedback-thanks').style.display = 'block';
    
    setTimeout(() => {
      this.isVisible = false;
      document.getElementById('feedback-panel').style.display = 'none';
      this.resetWidget();
    }, 2000);
  }

  // Show more
  showMore() {
    document.getElementById('feedback-buttons').style.display = 'none';
    document.getElementById('feedback-more').style.display = 'block';
  }

  // Submit detailed feedback
  submitDetailedFeedback(text) {
    // Rastrear evento
    if (window.analytics) {
      window.analytics.trackEvent('detailed_feedback', {
        feedback_text: text,
        page: window.location.pathname,
        category: 'Feedback'
      });
    }

    // Enviar para backend (opcional)
    this.sendFeedbackToBackend(text);
    
    this.showThanks();
  }

  // Send to backend
  async sendFeedbackToBackend(text) {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: window.location.pathname,
          feedback: text,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  }

  // Reset widget
  resetWidget() {
    document.getElementById('feedback-buttons').style.display = 'flex';
    document.getElementById('feedback-more').style.display = 'none';
    document.getElementById('feedback-thanks').style.display = 'none';
    document.getElementById('feedback-text').value = '';
  }
}

// ============================================================================
// TRACKING DE COMPORTAMENTO
// ============================================================================

// Classe para tracking de comportamento
class BehaviorTracker {
  constructor() {
    this.startTime = Date.now();
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
    this.init();
  }

  // Inicializar tracking
  init() {
    this.trackScrollDepth();
    this.trackReadingTime();
    this.trackLinkClicks();
    this.trackDownloads();
    this.trackSearch();
  }

  // Track scroll depth
  trackScrollDepth() {
    let ticking = false;

    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent;
        
        // Track milestones
        if (scrollPercent >= 25 && scrollPercent < 50) {
          this.trackEvent('scroll_25');
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          this.trackEvent('scroll_50');
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
          this.trackEvent('scroll_75');
        } else if (scrollPercent >= 90) {
          this.trackEvent('scroll_90');
        }
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Track reading time
  trackReadingTime() {
    // Track when user leaves page
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
      
      if (window.analytics) {
        window.analytics.trackReadingTime(
          document.title,
          timeSpent
        );
      }
    });

    // Track milestones
    setTimeout(() => this.trackEvent('reading_30s'), 30000);
    setTimeout(() => this.trackEvent('reading_1m'), 60000);
    setTimeout(() => this.trackEvent('reading_2m'), 120000);
  }

  // Track link clicks
  trackLinkClicks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const linkText = link.textContent.trim();
      const linkUrl = link.href;
      const isExternal = link.hostname !== window.location.hostname;

      if (window.analytics) {
        window.analytics.trackLinkClick(
          linkText,
          linkUrl,
          isExternal ? 'external' : 'internal'
        );
      }
    });
  }

  // Track downloads
  trackDownloads() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.href;
      const isDownload = href.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i);

      if (isDownload) {
        const fileName = href.split('/').pop();
        const fileType = fileName.split('.').pop();

        if (window.analytics) {
          window.analytics.trackDownload(fileName, fileType);
        }
      }
    });
  }

  // Track search
  trackSearch() {
    // Track search in Algolia DocSearch
    if (window.docsearch) {
      // Override search function to track searches
      const originalSearch = window.docsearch;
      window.docsearch = (options) => {
        const instance = originalSearch(options);
        
        // Track search events
        instance.on('search', (e) => {
          if (window.analytics) {
            window.analytics.trackSearch(
              e.query,
              e.results ? e.results.length : 0
            );
          }
        });

        return instance;
      };
    }
  }

  // Track event
  trackEvent(eventName) {
    if (window.analytics) {
      window.analytics.trackEvent(eventName, {
        page: window.location.pathname,
        category: 'Behavior'
      });
    }
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Analytics Manager
  window.analytics = new AnalyticsManager();
  window.analytics.init();

  // Inicializar Feedback Widget
  window.feedbackWidget = new FeedbackWidget();

  // Inicializar Behavior Tracker
  window.behaviorTracker = new BehaviorTracker();

  // Track page view
  window.analytics.trackPageView(
    document.title,
    window.location.pathname
  );

  console.log('Analytics system inicializado');
});

// ============================================================================
// EXPORTS (para uso em módulos)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AnalyticsManager,
    FeedbackWidget,
    BehaviorTracker
  };
}
