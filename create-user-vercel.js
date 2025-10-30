const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Usando a connection string do Vercel (Session Pooler)
const client = new Client({
    connectionString: 'postgresql://postgres.ddadyebnnbwqrjjtvgca:MAcs@234786msc@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

async function createUser() {
    try {
        console.log('🔌 Conectando ao Supabase (Session Pooler)...');
        await client.connect();
        console.log('✅ Conectado!');

        console.log('👤 Verificando se usuário existe...');
        const checkResult = await client.query(
            'SELECT id, email, name, role FROM users WHERE email = $1',
            ['gerente@macspark.dev']
        );
        
        if (checkResult.rows.length > 0) {
            console.log('✅ Usuário já existe:');
            console.log('   📧 Email:', checkResult.rows[0].email);
            console.log('   👤 Nome:', checkResult.rows[0].name);
            console.log('   🔑 Role:', checkResult.rows[0].role);
            return;
        }
        
        console.log('🔐 Criando usuário admin...');
        const hashedPassword = bcrypt.hashSync('Sabrina2025!', 10);
        
        await client.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (email) DO NOTHING
        `, ['gerente@macspark.dev', hashedPassword, 'Marco', 'admin']);
        
        console.log('✅ Usuário admin criado com sucesso!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await client.end();
        console.log('🔌 Conexão encerrada.');
    }
}

createUser();
