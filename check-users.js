const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false,
});

async function checkUsers() {
    try {
        console.log('🔍 Verificando usuários no banco...');
        
        const result = await pool.query('SELECT id, email, name, role FROM users');
        
        console.log(`📊 Total de usuários encontrados: ${result.rows.length}`);
        
        if (result.rows.length > 0) {
            console.log('👥 Usuários:');
            result.rows.forEach((user, index) => {
                console.log(`  ${index + 1}. ${user.email} (${user.name}) - ${user.role}`);
            });
        } else {
            console.log('❌ Nenhum usuário encontrado!');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await pool.end();
    }
}

checkUsers();
