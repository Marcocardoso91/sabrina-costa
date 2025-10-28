// test-supabase-connection.js
const https = require('https');

// Configurações
const SUPABASE_URL = 'https://db.ddadyebnnbwqrjjtvgca.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWR5ZWJubmJ3cXJqanR2Z2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Njg0NTEsImV4cCI6MjA3NjU0NDQ1MX0.8QZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ';

// Configurar HTTPS para ignorar problemas de certificado (apenas para teste)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function testConnection() {
    try {
        console.log('🔄 Testando conexão com Supabase...');
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
            headers: {
                'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        
        if (response.ok) {
            console.log('✅ Conexão com Supabase funcionando!');
            console.log('Status:', response.status);
            
            // Testar uma tabela específica
            const tablesResponse = await fetch(`${SUPABASE_URL}/rest/v1/users?select=*&limit=1`, {
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            
            if (tablesResponse.ok) {
                console.log('✅ Tabela users acessível!');
            } else {
                console.log('⚠️ Tabela users não encontrada ou sem dados');
            }
            
        } else {
            console.log('❌ Erro na conexão:', response.status, response.statusText);
        }
        
    } catch (error) {
        console.log('❌ Erro:', error.message);
    }
}

testConnection();
