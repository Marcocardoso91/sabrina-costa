/**
 * Mermaid Diagrams - Dashboard Sabrina Costa
 * Interactive diagrams using Mermaid.js
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

// ============================================================================
// CONFIGURAÇÃO MERMAID
// ============================================================================

const MERMAID_CONFIG = {
  theme: 'default',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#1f2937',
    primaryBorderColor: '#1e40af',
    lineColor: '#6b7280',
    secondaryColor: '#f3f4f6',
    tertiaryColor: '#ffffff',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#f9fafb',
    tertiaryBkg: '#f3f4f6'
  },
  flowchart: {
    nodeSpacing: 50,
    rankSpacing: 50,
    curve: 'basis'
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    fontFamily: 'Arial, sans-serif',
    fontSize: 11,
    gridLineStartPadding: 35,
    bottomPadding: 25
  }
};

// ============================================================================
// DIAGRAMAS DE ARQUITETURA
// ============================================================================

const ARCHITECTURE_DIAGRAMS = {
  // Diagrama de alto nível do sistema
  systemOverview: `
    graph TB
        subgraph "Usuários"
            U1[👤 Sabrina Costa]
            U2[👤 Equipe]
        end
        
        subgraph "Frontend (Vercel)"
            F1[🌐 Dashboard Web]
            F2[📱 Mobile Responsive]
        end
        
        subgraph "Backend (Vercel Functions)"
            B1[🔐 Auth API]
            B2[📊 Metrics API]
            B3[📅 Schedule API]
            B4[🚨 Alerts API]
            B5[🎣 Hooks API]
            B6[🔗 Webhook API]
        end
        
        subgraph "Database (Supabase)"
            D1[(🗄️ PostgreSQL)]
            D2[📊 Metrics Table]
            D3[📅 Posts Table]
            D4[🚨 Alerts Table]
            D5[🎣 Hooks Table]
            D6[👤 Users Table]
        end
        
        subgraph "Automação (n8n)"
            N1[🤖 Processar Métricas]
            N2[🚨 Alertas WhatsApp]
            N3[📈 Relatório Diário]
            N4[📅 Lembretes Posts]
        end
        
        subgraph "WhatsApp (Evolution API)"
            W1[📱 WhatsApp Business]
            W2[💬 Alertas]
            W3[📊 Relatórios]
            W4[📅 Lembretes]
        end
        
        U1 --> F1
        U2 --> F1
        F1 --> B1
        F1 --> B2
        F1 --> B3
        F1 --> B4
        F1 --> B5
        
        B1 --> D1
        B2 --> D2
        B3 --> D3
        B4 --> D4
        B5 --> D5
        B6 --> D1
        
        N1 --> B6
        N2 --> W1
        N3 --> W1
        N4 --> W1
        
        W1 --> U1
  `,

  // Fluxo de dados
  dataFlow: `
    sequenceDiagram
        participant U as Usuário
        participant F as Frontend
        participant B as Backend
        participant D as Database
        participant N as n8n
        participant W as WhatsApp
        
        U->>F: Login
        F->>B: POST /auth/login
        B->>D: Verificar credenciais
        D-->>B: Dados do usuário
        B->>B: Gerar JWT
        B-->>F: Token + User data
        F->>F: Armazenar token
        F-->>U: Redirecionar para dashboard
        
        Note over N,W: Automação
        N->>B: GET /metrics
        B-->>N: Dados das métricas
        N->>N: Verificar thresholds
        N->>W: Enviar alerta (se necessário)
  `,

  // Arquitetura de segurança
  securityArchitecture: `
    graph TD
        subgraph "Frontend Security"
            F1[HTTPS Only]
            F2[CSP Headers]
            F3[XSS Protection]
            F4[CSRF Tokens]
        end
        
        subgraph "Backend Security"
            B1[JWT Authentication]
            B2[Rate Limiting]
            B3[Input Validation]
            B4[SQL Injection Protection]
            B5[CORS Configuration]
        end
        
        subgraph "Database Security"
            D1[Connection Encryption]
            D2[Row Level Security]
            D3[Backup Encryption]
            D4[Access Logging]
        end
        
        subgraph "Infrastructure Security"
            I1[Vercel Security Headers]
            I2[Environment Variables]
            I3[Webhook Authentication]
            I4[API Key Management]
        end
        
        F1 --> B1
        F2 --> B2
        F3 --> B3
        F4 --> B4
        
        B1 --> D1
        B2 --> D2
        B3 --> D3
        B4 --> D4
        
        D1 --> I1
        D2 --> I2
        D3 --> I3
        D4 --> I4
  `
};

// ============================================================================
// DIAGRAMAS DE WORKFLOWS N8N
// ============================================================================

const N8N_WORKFLOWS = {
  // Workflow 1: Processar Métricas
  processMetrics: `
    graph LR
        A[Webhook Trigger] --> B[Parse JSON/CSV]
        B --> C[Validate Data]
        C --> D[Calculate Derived]
        D --> E[Save to DB]
        E --> F[Check Thresholds]
        F --> G[Send Alert if Needed]
        
        style A fill:#e1f5fe
        style G fill:#fff3e0
  `,

  // Workflow 2: Alertas WhatsApp
  whatsappAlerts: `
    graph LR
        A[Cron 18h] --> B[Fetch Metrics]
        B --> C[Check Thresholds]
        C --> D[Format Message]
        D --> E[Send WhatsApp]
        E --> F[Log Alert]
        
        style A fill:#f3e5f5
        style E fill:#e8f5e8
  `,

  // Workflow 3: Relatório Diário
  dailyReport: `
    graph LR
        A[Cron 18h05] --> B[Compile Data]
        B --> C[Calculate Stats]
        C --> D[Format Report]
        D --> E[Send WhatsApp]
        
        style A fill:#f3e5f5
        style E fill:#e8f5e8
  `,

  // Workflow 4: Lembretes de Postagem
  postReminders: `
    graph LR
        A[Cron 11h/17h30] --> B[Check Schedule]
        B --> C[Filter Posts]
        C --> D[Format Reminder]
        D --> E[Send WhatsApp]
        
        style A fill:#f3e5f5
        style E fill:#e8f5e8
  `
};

// ============================================================================
// DIAGRAMAS DE API
// ============================================================================

const API_DIAGRAMS = {
  // Fluxo de autenticação
  authFlow: `
    sequenceDiagram
        participant C as Client
        participant A as Auth API
        participant D as Database
        participant J as JWT Service
        
        C->>A: POST /auth/login
        Note over C,A: {email, password}
        
        A->>D: SELECT user WHERE email
        D-->>A: User data
        
        A->>A: Verify password hash
        A->>J: Generate JWT token
        J-->>A: Signed token
        
        A-->>C: {token, user}
        Note over C: Store token in localStorage
        
        Note over C: Subsequent requests
        C->>A: GET /api/metrics
        Note over C,A: Authorization: Bearer token
        A->>J: Verify token
        J-->>A: Valid token
        A-->>C: Protected data
  `,

  // Estrutura da API
  apiStructure: `
    graph TD
        subgraph "Authentication"
            A1[POST /auth/login]
            A2[POST /auth/logout]
            A3[GET /auth/me]
            A4[POST /auth/refresh]
        end
        
        subgraph "Metrics"
            M1[GET /metrics]
            M2[POST /metrics]
            M3[PUT /metrics/:id]
            M4[DELETE /metrics/:id]
            M5[GET /metrics/summary]
        end
        
        subgraph "Schedule"
            S1[GET /schedule]
            S2[POST /schedule]
            S3[PUT /schedule/:id]
            S4[DELETE /schedule/:id]
        end
        
        subgraph "Alerts"
            AL1[GET /alerts]
            AL2[POST /alerts]
            AL3[PUT /alerts/config]
            AL4[GET /alerts/config]
        end
        
        subgraph "Hooks"
            H1[GET /hooks]
            H2[POST /hooks]
            H3[PUT /hooks/:id]
            H4[DELETE /hooks/:id]
            H5[PUT /hooks/:id/increment]
        end
        
        subgraph "Webhooks"
            W1[POST /webhook/metrics]
            W2[POST /webhook/metrics/csv]
        end
        
        A1 --> M1
        A1 --> S1
        A1 --> AL1
        A1 --> H1
        W1 --> M2
  `,

  // Rate Limiting
  rateLimiting: `
    graph TD
        A[Request] --> B{Rate Limit Check}
        B -->|Under Limit| C[Process Request]
        B -->|Over Limit| D[Return 429]
        
        C --> E[Update Counter]
        E --> F[Return Response]
        
        D --> G[Add Retry-After Header]
        G --> H[Log Rate Limit Event]
        
        style D fill:#ffebee
        style C fill:#e8f5e8
  `
};

// ============================================================================
// DIAGRAMAS DE DEPLOY
// ============================================================================

const DEPLOY_DIAGRAMS = {
  // Processo de deploy
  deployProcess: `
    graph TD
        A[Code Commit] --> B[GitHub Push]
        B --> C[GitHub Actions]
        C --> D[Run Tests]
        D --> E{Tests Pass?}
        E -->|No| F[Deploy Failed]
        E -->|Yes| G[Build Frontend]
        G --> H[Deploy to Vercel]
        H --> I[Deploy Backend]
        I --> J[Run Migrations]
        J --> K[Update Environment]
        K --> L[Health Check]
        L --> M[Deploy Success]
        
        style F fill:#ffebee
        style M fill:#e8f5e8
  `,

  // Infraestrutura
  infrastructure: `
    graph TB
        subgraph "CDN & Edge"
            CDN[Vercel Edge Network]
        end
        
        subgraph "Frontend"
            F1[Static Files]
            F2[HTML/CSS/JS]
        end
        
        subgraph "Backend"
            B1[Serverless Functions]
            B2[API Routes]
        end
        
        subgraph "Database"
            D1[Supabase PostgreSQL]
            D2[Connection Pool]
        end
        
        subgraph "External Services"
            E1[n8n Workflows]
            E2[Evolution API]
            E3[WhatsApp Business]
        end
        
        CDN --> F1
        F1 --> B1
        B1 --> D1
        B1 --> E1
        E1 --> E2
        E2 --> E3
  `
};

// ============================================================================
// DIAGRAMAS DE DADOS
// ============================================================================

const DATA_DIAGRAMS = {
  // Schema do banco
  databaseSchema: `
    erDiagram
        USERS {
            int id PK
            string email UK
            string password
            string name
            string role
            timestamp created_at
            timestamp updated_at
        }
        
        METRICS {
            int id PK
            date date
            int reach
            decimal ctr
            decimal cpc
            decimal cpm
            decimal frequency
            int profile_visits
            int new_followers
            decimal cost
            timestamp created_at
            timestamp updated_at
        }
        
        POSTS {
            int id PK
            date date
            int week_number
            string format
            text theme
            text hook
            text cta
            string status
            timestamp created_at
            timestamp updated_at
        }
        
        ALERTS {
            int id PK
            string type
            text message
            decimal threshold_value
            decimal actual_value
            date date
            timestamp sent_at
            timestamp created_at
        }
        
        HOOKS {
            int id PK
            string title
            text content
            string category
            int usage_count
            timestamp created_at
            timestamp updated_at
        }
        
        CONFIG {
            string key PK
            text value
            text description
            timestamp updated_at
        }
        
        USERS ||--o{ METRICS : creates
        USERS ||--o{ POSTS : creates
        USERS ||--o{ ALERTS : receives
  `,

  // Fluxo de dados das métricas
  metricsDataFlow: `
    graph TD
        A[Instagram Ads] --> B[CSV Export]
        B --> C[n8n Webhook]
        C --> D[Data Validation]
        D --> E[Calculate Derived Fields]
        E --> F[Save to Database]
        F --> G[Check Alert Thresholds]
        G --> H{Alert Needed?}
        H -->|Yes| I[Send WhatsApp Alert]
        H -->|No| J[Log Success]
        I --> K[Update Alert History]
        J --> K
  `
};

// ============================================================================
// DIAGRAMAS DE MONITORAMENTO
// ============================================================================

const MONITORING_DIAGRAMS = {
  // Métricas de sistema
  systemMetrics: `
    graph TD
        subgraph "Application Metrics"
            A1[Response Time]
            A2[Error Rate]
            A3[Throughput]
            A4[Memory Usage]
        end
        
        subgraph "Business Metrics"
            B1[User Engagement]
            B2[API Usage]
            B3[Feature Adoption]
            B4[Support Tickets]
        end
        
        subgraph "Infrastructure Metrics"
            I1[CPU Usage]
            I2[Memory Usage]
            I3[Disk Usage]
            I4[Network I/O]
        end
        
        subgraph "Alerting"
            AL1[PagerDuty]
            AL2[Slack Notifications]
            AL3[Email Alerts]
            AL4[Dashboard Alerts]
        end
        
        A1 --> AL1
        A2 --> AL2
        B1 --> AL3
        I1 --> AL4
  `,

  // Dashboard de monitoramento
  monitoringDashboard: `
    graph LR
        A[Data Sources] --> B[Data Processing]
        B --> C[Visualization]
        C --> D[Dashboard]
        
        subgraph "Data Sources"
            DS1[Application Logs]
            DS2[System Metrics]
            DS3[User Analytics]
            DS4[Error Tracking]
        end
        
        subgraph "Processing"
            P1[Data Aggregation]
            P2[Real-time Processing]
            P3[Historical Analysis]
        end
        
        subgraph "Visualization"
            V1[Charts]
            V2[Graphs]
            V3[Tables]
            V4[Alerts]
        end
        
        DS1 --> P1
        DS2 --> P2
        DS3 --> P3
        DS4 --> P1
        
        P1 --> V1
        P2 --> V2
        P3 --> V3
        P1 --> V4
  `
};

// ============================================================================
// CLASSE MERMAID MANAGER
// ============================================================================

class MermaidManager {
  constructor() {
    this.isInitialized = false;
    this.diagrams = new Map();
    this.init();
  }

  // Inicializar Mermaid
  init() {
    if (this.isInitialized) return;

    try {
      this.loadMermaidScript();
      this.createDiagramContainer();
      this.bindEvents();
      this.isInitialized = true;
      
      console.log('Mermaid Manager inicializado');
    } catch (error) {
      console.error('Erro ao inicializar Mermaid:', error);
    }
  }

  // Carregar script do Mermaid
  loadMermaidScript() {
    // Verificar se já foi carregado
    if (window.mermaid) {
      this.initializeMermaid();
      return;
    }

    // Carregar CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.css';
    document.head.appendChild(cssLink);

    // Carregar JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = () => this.initializeMermaid();
    document.head.appendChild(script);
  }

  // Inicializar Mermaid
  initializeMermaid() {
    if (!window.mermaid) {
      console.error('Mermaid não carregado');
      return;
    }

    try {
      window.mermaid.initialize(MERMAID_CONFIG);
      console.log('Mermaid inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar Mermaid:', error);
    }
  }

  // Criar container para diagramas
  createDiagramContainer() {
    // Verificar se já existe
    if (document.getElementById('mermaid-container')) return;

    const container = document.createElement('div');
    container.id = 'mermaid-container';
    container.className = 'mermaid-container';
    
    // Adicionar estilos
    const styles = document.createElement('style');
    styles.textContent = `
      .mermaid-container {
        margin: 2rem 0;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }
      
      .mermaid {
        text-align: center;
        background: white;
        border-radius: 6px;
        padding: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .diagram-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background: #f1f5f9;
        border-radius: 6px;
      }
      
      .diagram-title {
        font-weight: 600;
        color: #1e293b;
        margin: 0;
      }
      
      .diagram-actions {
        display: flex;
        gap: 0.5rem;
      }
      
      .diagram-btn {
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      
      .diagram-btn:hover {
        background: #2563eb;
      }
      
      .diagram-btn.secondary {
        background: #6b7280;
      }
      
      .diagram-btn.secondary:hover {
        background: #4b5563;
      }
    `;
    document.head.appendChild(styles);
  }

  // Renderizar diagrama
  renderDiagram(id, definition, title = '') {
    const container = document.getElementById('mermaid-container') || this.createDiagramContainer();
    
    const diagramDiv = document.createElement('div');
    diagramDiv.id = `diagram-${id}`;
    diagramDiv.className = 'mermaid';
    diagramDiv.setAttribute('data-diagram-id', id);
    
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'diagram-controls';
      titleDiv.innerHTML = `
        <h3 class="diagram-title">${title}</h3>
        <div class="diagram-actions">
          <button class="diagram-btn" onclick="mermaidManager.editDiagram('${id}')">
            ✏️ Editar
          </button>
          <button class="diagram-btn secondary" onclick="mermaidManager.downloadDiagram('${id}')">
            📥 Download
          </button>
        </div>
      `;
      container.appendChild(titleDiv);
    }
    
    diagramDiv.textContent = definition;
    container.appendChild(diagramDiv);
    
    // Armazenar definição
    this.diagrams.set(id, definition);
    
    // Renderizar com Mermaid
    if (window.mermaid) {
      window.mermaid.init(undefined, diagramDiv);
    }
  }

  // Editar diagrama
  editDiagram(id) {
    const definition = this.diagrams.get(id);
    if (!definition) return;
    
    const newDefinition = prompt('Editar diagrama:', definition);
    if (newDefinition && newDefinition !== definition) {
      this.diagrams.set(id, newDefinition);
      this.renderDiagram(id, newDefinition);
    }
  }

  // Download diagrama
  downloadDiagram(id) {
    const diagramElement = document.querySelector(`[data-diagram-id="${id}"]`);
    if (!diagramElement) return;
    
    // Criar canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas
    canvas.width = diagramElement.offsetWidth;
    canvas.height = diagramElement.offsetHeight;
    
    // Desenhar diagrama (simplificado)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#1e293b';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Diagrama Mermaid', canvas.width / 2, canvas.height / 2);
    
    // Download
    const link = document.createElement('a');
    link.download = `diagram-${id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }

  // Bind eventos
  bindEvents() {
    // Track diagram interactions
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mermaid')) {
        if (window.analytics) {
          window.analytics.trackEvent('diagram_interaction', {
            diagram_id: e.target.closest('.mermaid').dataset.diagramId,
            category: 'Diagrams'
          });
        }
      }
    });
  }

  // Renderizar todos os diagramas de arquitetura
  renderArchitectureDiagrams() {
    this.renderDiagram('system-overview', ARCHITECTURE_DIAGRAMS.systemOverview, '🏗️ Visão Geral do Sistema');
    this.renderDiagram('data-flow', ARCHITECTURE_DIAGRAMS.dataFlow, '🔄 Fluxo de Dados');
    this.renderDiagram('security-architecture', ARCHITECTURE_DIAGRAMS.securityArchitecture, '🔒 Arquitetura de Segurança');
  }

  // Renderizar diagramas de workflows n8n
  renderN8nDiagrams() {
    this.renderDiagram('process-metrics', N8N_WORKFLOWS.processMetrics, '🤖 Workflow: Processar Métricas');
    this.renderDiagram('whatsapp-alerts', N8N_WORKFLOWS.whatsappAlerts, '🚨 Workflow: Alertas WhatsApp');
    this.renderDiagram('daily-report', N8N_WORKFLOWS.dailyReport, '📈 Workflow: Relatório Diário');
    this.renderDiagram('post-reminders', N8N_WORKFLOWS.postReminders, '📅 Workflow: Lembretes de Postagem');
  }

  // Renderizar diagramas de API
  renderApiDiagrams() {
    this.renderDiagram('auth-flow', API_DIAGRAMS.authFlow, '🔐 Fluxo de Autenticação');
    this.renderDiagram('api-structure', API_DIAGRAMS.apiStructure, '📋 Estrutura da API');
    this.renderDiagram('rate-limiting', API_DIAGRAMS.rateLimiting, '⏱️ Rate Limiting');
  }

  // Renderizar diagramas de deploy
  renderDeployDiagrams() {
    this.renderDiagram('deploy-process', DEPLOY_DIAGRAMS.deployProcess, '🚀 Processo de Deploy');
    this.renderDiagram('infrastructure', DEPLOY_DIAGRAMS.infrastructure, '🏗️ Infraestrutura');
  }

  // Renderizar diagramas de dados
  renderDataDiagrams() {
    this.renderDiagram('database-schema', DATA_DIAGRAMS.databaseSchema, '🗄️ Schema do Banco de Dados');
    this.renderDiagram('metrics-data-flow', DATA_DIAGRAMS.metricsDataFlow, '📊 Fluxo de Dados das Métricas');
  }

  // Renderizar diagramas de monitoramento
  renderMonitoringDiagrams() {
    this.renderDiagram('system-metrics', MONITORING_DIAGRAMS.systemMetrics, '📊 Métricas de Sistema');
    this.renderDiagram('monitoring-dashboard', MONITORING_DIAGRAMS.monitoringDashboard, '📈 Dashboard de Monitoramento');
  }

  // Renderizar todos os diagramas
  renderAllDiagrams() {
    this.renderArchitectureDiagrams();
    this.renderN8nDiagrams();
    this.renderApiDiagrams();
    this.renderDeployDiagrams();
    this.renderDataDiagrams();
    this.renderMonitoringDiagrams();
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Mermaid Manager
  window.mermaidManager = new MermaidManager();
  
  // Renderizar diagramas automaticamente se estiver em página de arquitetura
  if (window.location.pathname.includes('architecture') || 
      window.location.pathname.includes('explanation')) {
    setTimeout(() => {
      window.mermaidManager.renderAllDiagrams();
    }, 1000);
  }
  
  console.log('Mermaid system inicializado');
});

// ============================================================================
// EXPORTS (para uso em módulos)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MermaidManager,
    ARCHITECTURE_DIAGRAMS,
    N8N_WORKFLOWS,
    API_DIAGRAMS,
    DEPLOY_DIAGRAMS,
    DATA_DIAGRAMS,
    MONITORING_DIAGRAMS
  };
}
