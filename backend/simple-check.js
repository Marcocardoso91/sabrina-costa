const { Pool } = require('pg');
require('dotenv').config();

console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false,
});

async function checkUsers() {
    try {
        console.log('🔍 Verificando usuários...');
        
        const result = await pool.query('SELECT COUNT(*) as total FROM users');
        console.log('📊 Total de usuários:', result.rows[0].total);
        
        if (result.rows[0].total > 0) {
            const users = await pool.query('SELECT email, name, role FROM users LIMIT 5');
            console.log('👥 Usuários:');
            users.rows.forEach((user, index) => {
                console.log(`  ${index + 1}. ${user.email} (${user.name}) - ${user.role}`);
            });
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await pool.end();
    }
}

checkUsers();
