/**
 * Test Environment Variables
 * Dashboard Sabrina Costa
 */

require('dotenv').config();

console.log('=== ENVIRONMENT VARIABLES TEST ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('EVOLUTION_API_URL:', process.env.EVOLUTION_API_URL);
console.log('EVOLUTION_API_KEY:', process.env.EVOLUTION_API_KEY ? 'SET' : 'NOT SET');
console.log('WHATSAPP_NUMBER:', process.env.WHATSAPP_NUMBER);
console.log('WEBHOOK_SECRET:', process.env.WEBHOOK_SECRET ? 'SET' : 'NOT SET');
console.log('=====================================');

// Test database connection
const { testConnection } = require('./db/connection');

async function test() {
    console.log('Testing database connection...');
    const result = await testConnection();
    console.log('Database connection result:', result);
}

test().catch(console.error);
