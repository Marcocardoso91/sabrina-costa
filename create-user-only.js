const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Configuração do banco
const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function createUser() {
    try {
        console.log('🔌 Conectando ao Supabase...');
        await client.connect();
        console.log('✅ Conectado!');

        console.log('👤 Criando usuário admin...');
        const hashedPassword = bcrypt.hashSync('Sabrina2025!', 10);
        
        // Verificar se já existe
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
        
        await client.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (email) DO NOTHING
        `, ['gerente@macspark.dev', hashedPassword, 'Marco', 'admin']);
        
        console.log('✅ Usuário admin criado com sucesso!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
        console.log('🔌 Conexão encerrada.');
    }
}

createUser();
