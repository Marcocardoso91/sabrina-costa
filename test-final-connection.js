// test-final-connection.js
const { createClient } = require('@supabase/supabase-js');

// URL correta do banco
const DATABASE_URL = 'postgresql://postgres.ddadyebnnbwqrjjtvgca:MAcs@234786msc@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

// Extrair credenciais da URL
const url = new URL(DATABASE_URL);
const SUPABASE_URL = 'https://ddadyebnnbwqrjjtvgca.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWR5ZWJubmJ3cXJqanR2Z2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDE0NzQwMCwiZXhwIjoyMDQ1NzIzNDAwfQ.placeholder';

console.log('🔄 Testando conexão final...');
console.log('URL:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function testConnection() {
    try {
        // Testar conexão básica
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);
            
        if (error) {
            console.log('❌ Erro na conexão:', error.message);
            
            // Tentar criar as tabelas se não existirem
            console.log('🔄 Tentando aplicar schema...');
            await applySchema();
        } else {
            console.log('✅ Conexão funcionando!');
            console.log('📊 Dados encontrados:', data);
        }
        
    } catch (error) {
        console.log('❌ Erro geral:', error.message);
    }
}

async function applySchema() {
    try {
        // Schema básico
        const schema = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'viewer',
            created_at TIMESTAMP DEFAULT NOW()
        );
        
        INSERT INTO users (email, password_hash, name, role) VALUES
        ('gerente@macspark.dev', '$2a$10$X8B9.vJY7kZGQxN4Y3Qe4eF6J2K8L9M0N1O2P3Q4R5S6T7U8V9W0X', 'Marco', 'admin')
        ON CONFLICT (email) DO NOTHING;
        `;
        
        const { data, error } = await supabase.rpc('exec_sql', { sql: schema });
        
        if (error) {
            console.log('❌ Erro ao aplicar schema:', error.message);
        } else {
            console.log('✅ Schema aplicado!');
        }
        
    } catch (error) {
        console.log('❌ Erro ao aplicar schema:', error.message);
    }
}

testConnection();
