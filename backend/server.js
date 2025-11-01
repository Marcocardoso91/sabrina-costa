/**
 * Express Server - Dashboard Sabrina Costa
 * API REST para gerenciamento de métricas do Instagram
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./db/connection');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// =====================================================
// MIDDLEWARE
// =====================================================

// Security headers
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://sabrina-costa.vercel.app',
        'https://sabrina-costa-marcocardoso91s-projects.vercel.app',
        'https://frontend-9kn1xaumf-marcocardoso28s-projects.vercel.app',
        ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [])
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.text({ type: 'text/csv', limit: '10mb' }));

// Rate limiting - General API
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: { success: false, error: 'Muitas requisições. Tente novamente em 1 minuto.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Strict rate limiting for authentication endpoints (brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 login attempts per 15 minutes
    message: { success: false, error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful logins
});
app.use('/api/auth/login', authLimiter);

// Request logging (only in development)
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
});

// =====================================================
// ROUTES
// =====================================================

// Import route handlers
const authRoutes = require('./api/auth');
const metricsRoutes = require('./api/metrics');
const webhookRoutes = require('./api/webhook');
const alertsRoutes = require('./api/alerts');
const scheduleRoutes = require('./api/schedule');
const hooksRoutes = require('./api/hooks');
const configRoutes = require('./api/config');
const debugRoutes = require('./api/debug');
const automationsRoutes = require('./api/automations');
const aiCostsRoutes = require('./api/ai-costs');

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/hooks', hooksRoutes);
app.use('/api/config', configRoutes);
app.use('/api/debug', debugRoutes);
app.use('/api/automations', automationsRoutes);
app.use('/api/ai-costs', aiCostsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// =====================================================
// START SERVER
// =====================================================

async function startServer() {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        
        if (!dbConnected && process.env.NODE_ENV === 'production') {
            throw new Error('Falha ao conectar ao banco de dados');
        }
        
        // Start listening
        app.listen(PORT, () => {
            if (process.env.NODE_ENV !== 'production') {
                console.log('');
                console.log('═══════════════════════════════════════');
                console.log('  🌟 Dashboard Sabrina Costa API');
                console.log('═══════════════════════════════════════');
                console.log(`  📡 Servidor rodando em http://localhost:${PORT}`);
                console.log(`  🗄️  Banco de dados: ${dbConnected ? '✓ Conectado' : '✗ Desconectado'}`);
                console.log(`  🔒 Ambiente: ${process.env.NODE_ENV || 'development'}`);
                console.log('═══════════════════════════════════════');
                console.log('');
                console.log('  📖 Endpoints disponíveis:');
                console.log('     GET  /api/health');
                console.log('     POST /api/auth/login');
                console.log('     GET  /api/metrics');
                console.log('     POST /api/metrics');
                console.log('     POST /api/webhook/metrics');
                console.log('');
            } else {
                console.log(`[${new Date().toISOString()}] Server started on port ${PORT}`);
            }
        });
        
    } catch (error) {
        console.error('❌ Falha ao iniciar servidor:', error.message);
        process.exit(1);
    }
}

// Start the server
if (require.main === module) {
    startServer();
}

// Export for testing
module.exports = app;

