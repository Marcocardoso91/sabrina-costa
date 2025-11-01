/**
 * Debug Endpoint
 * Dashboard Sabrina Costa
 * SECURITY: Only available in development mode
 */

const express = require('express');
const { authenticateJWT, requireAdmin } = require('../utils/jwt');
const router = express.Router();

// Debug endpoint to check environment variables (ADMIN ONLY, DEV ONLY)
router.get('/debug', authenticateJWT, requireAdmin, (req, res) => {
    // Disable in production for security
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
            success: false,
            error: 'Debug endpoint desabilitado em produção'
        });
    }

    const envVars = {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
        JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
        PORT: process.env.PORT,
        CORS_ORIGIN: process.env.CORS_ORIGIN,
        EVOLUTION_API_URL: process.env.EVOLUTION_API_URL,
        EVOLUTION_API_KEY: process.env.EVOLUTION_API_KEY ? 'SET' : 'NOT SET',
        WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? 'SET' : 'NOT SET',
    };

    res.json({
        success: true,
        message: 'Environment variables debug (DEV ONLY)',
        timestamp: new Date().toISOString(),
        environment: envVars
    });
});

module.exports = router;
