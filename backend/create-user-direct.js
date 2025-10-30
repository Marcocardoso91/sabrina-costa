const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function createUser() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false,
    });

    try {
        console.log('🔐 Criando usuário admin...');
        
        // Hash da senha
        const passwordHash = await bcrypt.hash('Sabrina2025!', 10);
        
        // Verificar se o usuário já existe
        const checkResult = await pool.query(
            'SELECT id, email, name, role FROM users WHERE email = $1',
            ['gerente@macspark.dev']
        );
        
        if (checkResult.rows.length > 0) {
            console.log('✅ Usuário já existe:');
            console.log('   Email:', checkResult.rows[0].email);
            console.log('   Nome:', checkResult.rows[0].name);
            console.log('   Role:', checkResult.rows[0].role);
            return;
        }
        
        // Inserir usuário admin
        const result = await pool.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, name, role
        `, [
            'gerente@macspark.dev',
            passwordHash,
            'Marco',
            'admin'
        ]);
        
        console.log('✅ Usuário admin criado com sucesso!');
        console.log('   Email:', result.rows[0].email);
        console.log('   Nome:', result.rows[0].name);
        console.log('   Role:', result.rows[0].role);
        
    } catch (error) {
        console.error('❌ Erro ao criar usuário:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await pool.end();
    }
}

createUser();
