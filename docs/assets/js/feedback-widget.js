/**
 * Feedback Widget - Dashboard Sabrina Costa
 * Widget "Was this helpful?" para coleta de feedback dos usuários
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

// ============================================================================
// CONFIGURAÇÃO DO WIDGET
// ============================================================================

const FEEDBACK_CONFIG = {
  // Configurações do widget
  position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
  theme: 'light', // light, dark, auto
  language: 'pt-BR',
  
  // Configurações de analytics
  trackEvents: true,
  analyticsProvider: 'ga4', // ga4, hotjar, custom
  
  // Configurações de armazenamento
  storageType: 'localStorage', // localStorage, sessionStorage, cookie
  rememberFeedback: true,
  
  // Configurações de API (opcional)
  apiEndpoint: null, // URL para enviar feedback para backend
  apiKey: null,
  
  // Configurações de notificação
  showNotifications: true,
  notificationDuration: 3000,
  
  // Configurações de personalização
  customMessages: {
    helpful: 'Esta página foi útil?',
    yes: '👍 Sim',
    no: '👎 Não',
    thanks: '✅ Obrigado pelo feedback!',
    improve: 'O que podemos melhorar?',
    submit: 'Enviar',
    cancel: 'Cancelar',
    placeholder: 'Digite sua sugestão aqui...'
  }
};

// ============================================================================
// CLASSE FEEDBACK WIDGET
// ============================================================================

class FeedbackWidget {
  constructor(config = {}) {
    this.config = { ...FEEDBACK_CONFIG, ...config };
    this.isVisible = false;
    this.isSubmitted = false;
    this.currentPage = window.location.pathname;
    this.feedbackData = this.loadStoredFeedback();
    
    this.init();
  }

  // Inicializar widget
  init() {
    this.createWidget();
    this.bindEvents();
    this.checkIfAlreadySubmitted();
    
    console.log('Feedback Widget inicializado');
  }

  // Criar HTML do widget
  createWidget() {
    // Verificar se já existe
    if (document.getElementById('feedback-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'feedback-widget';
    widget.className = 'feedback-widget';
    
    widget.innerHTML = `
      <div class="feedback-container">
        <div class="feedback-main" id="feedback-main">
          <div class="feedback-question">
            <p>${this.config.customMessages.helpful}</p>
          </div>
          <div class="feedback-buttons">
            <button class="feedback-btn feedback-yes" data-feedback="yes">
              ${this.config.customMessages.yes}
            </button>
            <button class="feedback-btn feedback-no" data-feedback="no">
              ${this.config.customMessages.no}
            </button>
          </div>
        </div>
        
        <div class="feedback-details" id="feedback-details" style="display: none;">
          <div class="feedback-form">
            <p>${this.config.customMessages.improve}</p>
            <textarea 
              id="feedback-text" 
              placeholder="${this.config.customMessages.placeholder}"
              rows="3"
            ></textarea>
            <div class="feedback-form-actions">
              <button class="feedback-btn feedback-submit" id="feedback-submit">
                ${this.config.customMessages.submit}
              </button>
              <button class="feedback-btn feedback-cancel" id="feedback-cancel">
                ${this.config.customMessages.cancel}
              </button>
            </div>
          </div>
        </div>
        
        <div class="feedback-thanks" id="feedback-thanks" style="display: none;">
          <p>${this.config.customMessages.thanks}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(widget);
    this.addStyles();
  }

  // Adicionar estilos CSS
  addStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .feedback-widget {
        position: fixed;
        ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
        ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .feedback-container {
        background: ${this.config.theme === 'dark' ? '#1f2937' : '#ffffff'};
        border: 1px solid ${this.config.theme === 'dark' ? '#374151' : '#e5e7eb'};
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        max-width: 300px;
        transition: all 0.3s ease;
      }
      
      .feedback-question p {
        margin: 0 0 1rem 0;
        color: ${this.config.theme === 'dark' ? '#f9fafb' : '#1f2937'};
        font-weight: 500;
      }
      
      .feedback-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }
      
      .feedback-btn {
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      
      .feedback-btn:hover {
        background: #2563eb;
        transform: translateY(-1px);
      }
      
      .feedback-btn.feedback-no {
        background: #6b7280;
      }
      
      .feedback-btn.feedback-no:hover {
        background: #4b5563;
      }
      
      .feedback-btn.feedback-submit {
        background: #10b981;
      }
      
      .feedback-btn.feedback-submit:hover {
        background: #059669;
      }
      
      .feedback-btn.feedback-cancel {
        background: #6b7280;
      }
      
      .feedback-btn.feedback-cancel:hover {
        background: #4b5563;
      }
      
      .feedback-form textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid ${this.config.theme === 'dark' ? '#374151' : '#d1d5db'};
        border-radius: 6px;
        font-size: 0.875rem;
        font-family: inherit;
        resize: vertical;
        margin-bottom: 0.75rem;
        background: ${this.config.theme === 'dark' ? '#1f2937' : '#ffffff'};
        color: ${this.config.theme === 'dark' ? '#f9fafb' : '#1f2937'};
      }
      
      .feedback-form textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .feedback-form-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
      
      .feedback-thanks {
        text-align: center;
        color: #10b981;
        font-weight: 500;
      }
      
      .feedback-thanks p {
        margin: 0;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .feedback-widget {
          ${this.config.position.includes('bottom') ? 'bottom: 10px;' : 'top: 10px;'}
          ${this.config.position.includes('right') ? 'right: 10px;' : 'left: 10px;'}
        }
        
        .feedback-container {
          max-width: 280px;
          padding: 0.75rem;
        }
        
        .feedback-buttons {
          flex-direction: column;
        }
        
        .feedback-btn {
          justify-content: center;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .feedback-container {
          background: #1f2937;
          border-color: #374151;
        }
        
        .feedback-question p {
          color: #f9fafb;
        }
        
        .feedback-form textarea {
          background: #1f2937;
          border-color: #374151;
          color: #f9fafb;
        }
      }
      
      /* Animation */
      .feedback-widget {
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  // Bind eventos
  bindEvents() {
    // Botões de feedback
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('feedback-yes')) {
        this.handleFeedback('yes');
      } else if (e.target.classList.contains('feedback-no')) {
        this.handleFeedback('no');
      } else if (e.target.classList.contains('feedback-submit')) {
        this.submitFeedback();
      } else if (e.target.classList.contains('feedback-cancel')) {
        this.cancelFeedback();
      }
    });

    // Fechar widget ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.feedback-widget') && this.isVisible) {
        this.hideWidget();
      }
    });

    // Teclas de atalho
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hideWidget();
      }
    });
  }

  // Verificar se já foi submetido feedback
  checkIfAlreadySubmitted() {
    if (this.feedbackData[this.currentPage]) {
      this.showThanks();
    }
  }

  // Mostrar widget
  showWidget() {
    const widget = document.getElementById('feedback-widget');
    if (widget) {
      widget.style.display = 'block';
      this.isVisible = true;
    }
  }

  // Esconder widget
  hideWidget() {
    const widget = document.getElementById('feedback-widget');
    if (widget) {
      widget.style.display = 'none';
      this.isVisible = false;
    }
  }

  // Lidar com feedback
  handleFeedback(type) {
    this.trackEvent('feedback_click', { type, page: this.currentPage });
    
    if (type === 'yes') {
      this.showThanks();
      this.storeFeedback('yes', '');
    } else {
      this.showDetailsForm();
    }
  }

  // Mostrar formulário de detalhes
  showDetailsForm() {
    const main = document.getElementById('feedback-main');
    const details = document.getElementById('feedback-details');
    
    if (main && details) {
      main.style.display = 'none';
      details.style.display = 'block';
    }
  }

  // Submeter feedback
  submitFeedback() {
    const textarea = document.getElementById('feedback-text');
    const feedback = textarea ? textarea.value.trim() : '';
    
    this.trackEvent('feedback_submit', { 
      type: 'no', 
      feedback, 
      page: this.currentPage 
    });
    
    this.storeFeedback('no', feedback);
    this.showThanks();
    
    // Enviar para API se configurado
    if (this.config.apiEndpoint) {
      this.sendToAPI('no', feedback);
    }
  }

  // Cancelar feedback
  cancelFeedback() {
    const main = document.getElementById('feedback-main');
    const details = document.getElementById('feedback-details');
    
    if (main && details) {
      details.style.display = 'none';
      main.style.display = 'block';
    }
  }

  // Mostrar agradecimento
  showThanks() {
    const main = document.getElementById('feedback-main');
    const details = document.getElementById('feedback-details');
    const thanks = document.getElementById('feedback-thanks');
    
    if (main) main.style.display = 'none';
    if (details) details.style.display = 'none';
    if (thanks) thanks.style.display = 'block';
    
    this.isSubmitted = true;
    
    // Auto-hide após delay
    setTimeout(() => {
      this.hideWidget();
    }, this.config.notificationDuration);
  }

  // Armazenar feedback
  storeFeedback(type, feedback) {
    const data = {
      type,
      feedback,
      timestamp: new Date().toISOString(),
      page: this.currentPage
    };
    
    this.feedbackData[this.currentPage] = data;
    
    if (this.config.storageType === 'localStorage') {
      localStorage.setItem('feedback-widget', JSON.stringify(this.feedbackData));
    } else if (this.config.storageType === 'sessionStorage') {
      sessionStorage.setItem('feedback-widget', JSON.stringify(this.feedbackData));
    }
  }

  // Carregar feedback armazenado
  loadStoredFeedback() {
    try {
      const stored = this.config.storageType === 'localStorage' 
        ? localStorage.getItem('feedback-widget')
        : sessionStorage.getItem('feedback-widget');
      
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Erro ao carregar feedback armazenado:', error);
      return {};
    }
  }

  // Enviar para API
  async sendToAPI(type, feedback) {
    if (!this.config.apiEndpoint) return;
    
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          type,
          feedback,
          page: this.currentPage,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Feedback enviado para API com sucesso');
    } catch (error) {
      console.error('Erro ao enviar feedback para API:', error);
    }
  }

  // Track eventos
  trackEvent(eventName, properties = {}) {
    if (!this.config.trackEvents) return;
    
    // Google Analytics 4
    if (this.config.analyticsProvider === 'ga4' && window.gtag) {
      window.gtag('event', eventName, {
        ...properties,
        event_category: 'Feedback Widget',
        event_label: this.currentPage
      });
    }
    
    // Hotjar
    if (this.config.analyticsProvider === 'hotjar' && window.hj) {
      window.hj('event', eventName);
    }
    
    // Custom analytics
    if (window.analytics) {
      window.analytics.trackEvent(eventName, {
        ...properties,
        category: 'Feedback Widget'
      });
    }
  }

  // Métodos públicos
  show() {
    this.showWidget();
  }

  hide() {
    this.hideWidget();
  }

  reset() {
    this.feedbackData = {};
    if (this.config.storageType === 'localStorage') {
      localStorage.removeItem('feedback-widget');
    } else if (this.config.storageType === 'sessionStorage') {
      sessionStorage.removeItem('feedback-widget');
    }
    this.isSubmitted = false;
  }

  getFeedbackData() {
    return this.feedbackData;
  }
}

// ============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================================

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se deve mostrar o widget
  const shouldShow = !document.querySelector('.no-feedback-widget');
  
  if (shouldShow) {
    // Inicializar widget
    window.feedbackWidget = new FeedbackWidget();
    
    // Mostrar widget após delay (opcional)
    setTimeout(() => {
      window.feedbackWidget.show();
    }, 3000); // 3 segundos após carregar a página
  }
});

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FeedbackWidget;
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

// Função para mostrar widget programaticamente
window.showFeedbackWidget = function() {
  if (window.feedbackWidget) {
    window.feedbackWidget.show();
  }
};

// Função para esconder widget programaticamente
window.hideFeedbackWidget = function() {
  if (window.feedbackWidget) {
    window.feedbackWidget.hide();
  }
};

// Função para resetar feedback
window.resetFeedbackWidget = function() {
  if (window.feedbackWidget) {
    window.feedbackWidget.reset();
  }
};

// Função para obter dados de feedback
window.getFeedbackData = function() {
  if (window.feedbackWidget) {
    return window.feedbackWidget.getFeedbackData();
  }
  return {};
};
