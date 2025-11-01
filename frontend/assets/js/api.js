// API Configuration and HTTP Client
// Dashboard Sabrina Costa

const API_CONFIG = {
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : '/api', // Use relative URL for production (proxied via vercel.json)
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// API Client Class
class APIClient {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.timeout = config.timeout;
        this.headers = config.headers;
    }

    // Get authorization token
    getToken() {
        return localStorage.getItem('token');
    }

    // Build headers with authorization
    buildHeaders(customHeaders = {}) {
        const token = this.getToken();
        const headers = { ...this.headers, ...customHeaders };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }

    // Generic HTTP request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Fallback for browsers without AbortSignal.timeout (Safari/iOS)
        let signal;
        if (typeof AbortSignal.timeout === 'function') {
            signal = AbortSignal.timeout(this.timeout);
        } else {
            const controller = new AbortController();
            signal = controller.signal;
            setTimeout(() => controller.abort(), this.timeout);
        }
        
        const config = {
            ...options,
            headers: this.buildHeaders(options.headers),
            signal
        };

        try {
            const response = await fetch(url, config);
            
            // Handle unauthorized
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
                throw new Error('Sessão expirada. Faça login novamente.');
            }

            // Parse JSON response
            const data = await response.json();

            // Handle error responses
            if (!response.ok) {
                throw new Error(data.error || data.message || 'Erro na requisição');
            }

            return data;

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Requisição timeout. Tente novamente.');
            }
            throw error;
        }
    }

    // HTTP GET
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        return this.request(url, {
            method: 'GET'
        });
    }

    // HTTP POST
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // HTTP PUT
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // HTTP DELETE
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

// Initialize API client
const api = new APIClient(API_CONFIG);

// API Endpoints
const API = {
    // Generic helpers (used by pages that call API.get/post/put/delete diretamente)
    get: (...args) => api.get(...args),
    post: (...args) => api.post(...args),
    put: (...args) => api.put(...args),
    delete: (...args) => api.delete(...args),

    // Authentication
    auth: {
        login: (email, password) => api.post('/auth/login', { email, password }),
        logout: () => api.post('/auth/logout'),
        me: () => api.get('/auth/me')
    },

    // Metrics
    metrics: {
        getAll: (params) => api.get('/metrics', params),
        getById: (id) => api.get(`/metrics/${id}`),
        create: (data) => api.post('/metrics', data),
        update: (id, data) => api.put(`/metrics/${id}`, data),
        delete: (id) => api.delete(`/metrics/${id}`),
        summary: (params) => api.get('/metrics/summary', params)
    },

    // Schedule
    schedule: {
        getAll: (params) => api.get('/schedule', params),
        update: (id, data) => api.put(`/schedule/${id}`, data)
    },

    // Alerts
    alerts: {
        getAll: (params) => api.get('/alerts', params),
        getConfig: () => api.get('/alerts/config'),
        updateConfig: (data) => api.put('/alerts/config', data)
    },

    // Hooks
    hooks: {
        getAll: (params) => api.get('/hooks', params),
        increment: (id) => api.put(`/hooks/${id}/increment`)
    },

    // Config
    config: {
        getAll: () => api.get('/config'),
        update: (data) => api.put('/config', data)
    },

    // Automations (workflows N8N)
    automations: {
        list: () => api.get('/automations'),
        get: (workflowName) => api.get(`/automations/${workflowName}`),
        toggle: (workflowName, payload) => api.put(`/automations/${workflowName}/toggle`, payload),
        changeMode: (workflowName, payload) => api.put(`/automations/${workflowName}/mode`, payload),
        killSwitch: () => api.post('/automations/kill-switch'),
        pendingApprovals: () => api.get('/automations/pending-approvals/list'),
        approvalsHistory: (params) => api.get('/automations/approvals/history', params),
        approve: (id) => api.post(`/automations/approve/${id}`),
        reject: (id, payload) => api.post(`/automations/reject/${id}`, payload),
        stats: () => api.get('/automations/stats/overview')
    },

    // IA Costs
    aiCosts: {
        currentMonth: () => api.get('/ai-costs/current-month'),
        byService: (params) => api.get('/ai-costs/by-service', params),
        forecast: () => api.get('/ai-costs/forecast'),
        thresholds: () => api.get('/ai-costs/alerts')
    }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.API = API;
    window.api = api;
}
