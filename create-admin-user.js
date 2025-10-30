/**
 * Script para criar usuário admin
 * Dashboard Sabrina Costa
 */

const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

// Configuração do banco
const pool = new Pool({
    connectionString: 'postgresql://postgres.ddadyebnnbwqrjjtvgca:MAcs@234786msc@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

async function createAdminUser() {
    try {
        console.log('🔐 Criando usuário admin...');
        
        // Hash da senha
        const passwordHash = await bcrypt.hash('Sabrina2025!', 10);
        
        // Inserir usuário admin
        const result = await pool.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO UPDATE SET
                password_hash = EXCLUDED.password_hash,
                name = EXCLUDED.name,
                role = EXCLUDED.role
            RETURNING id, email, name, role
        `, [
            'gerente@macspark.dev',
            passwordHash,
            'Marco',
            'admin'
        ]);
        
        console.log('✅ Usuário admin criado com sucesso!');
        console.log('📧 Email:', result.rows[0].email);
        console.log('👤 Nome:', result.rows[0].name);
        console.log('🔑 Role:', result.rows[0].role);
        
    } catch (error) {
        console.error('❌ Erro ao criar usuário admin:', error.message);
    } finally {
        await pool.end();
    }
}

createAdminUser();
