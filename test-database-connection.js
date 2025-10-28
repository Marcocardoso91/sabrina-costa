// test-database-connection.js
const { Client } = require('pg');

// Teste de conexão com diferentes configurações
const configs = [
    {
        name: 'Projeto Original',
        connectionString: 'postgresql://postgres:[SENHA]@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
    },
    {
        name: 'Projeto Novo (se existir)',
        connectionString: 'postgresql://postgres:[SENHA]@db.[NOVO_PROJECT_ID].supabase.co:5432/postgres'
    }
];

async function testConnection(config) {
    try {
        console.log(`🔄 Testando: ${config.name}`);
        
        const client = new Client({
            connectionString: config.connectionString,
            ssl: { rejectUnauthorized: false }
        });
        
        await client.connect();
        console.log('✅ Conexão bem-sucedida!');
        
        // Testar uma query simples
        const result = await client.query('SELECT version()');
        console.log('📊 Versão do PostgreSQL:', result.rows[0].version);
        
        await client.end();
        return true;
        
    } catch (error) {
        console.log('❌ Erro na conexão:', error.message);
        return false;
    }
}

async function runTests() {
    console.log('🧪 Testando conexões com banco de dados...');
    
    for (const config of configs) {
        await testConnection(config);
        console.log('---');
    }
    
    console.log('💡 Próximos passos:');
    console.log('1. Crie um novo projeto Supabase');
    console.log('2. Configure o DATABASE_URL correto');
    console.log('3. Execute o script de schema');
}

runTests();
