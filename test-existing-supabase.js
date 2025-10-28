// test-existing-supabase.js
const { Client } = require('pg');

// Configurações possíveis para o projeto existente
const possibleConfigs = [
    {
        name: 'Projeto ddadyebnnbwqrjjtvgca (original)',
        host: 'db.ddadyebnnbwqrjjtvgca.supabase.co',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'SUA_SENHA_AQUI' // Substitua pela senha correta
    },
    {
        name: 'Projeto sabrina-dashboard (atual)',
        host: 'db.[PROJECT_ID].supabase.co', // Substitua pelo ID real
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'SUA_SENHA_AQUI' // Substitua pela senha correta
    }
];

async function testConnection(config) {
    try {
        console.log(`🔄 Testando: ${config.name}`);
        
        const client = new Client({
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: { rejectUnauthorized: false }
        });
        
        await client.connect();
        console.log('✅ Conexão bem-sucedida!');
        
        // Testar se as tabelas existem
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('📊 Tabelas encontradas:', tablesResult.rows.map(row => row.table_name));
        
        await client.end();
        return true;
        
    } catch (error) {
        console.log('❌ Erro na conexão:', error.message);
        return false;
    }
}

async function runTests() {
    console.log('🧪 Testando conexões com projetos Supabase existentes...');
    console.log('');
    console.log('💡 INSTRUÇÕES:');
    console.log('1. Substitua "SUA_SENHA_AQUI" pela senha real do banco');
    console.log('2. Substitua "[PROJECT_ID]" pelo ID real do projeto sabrina-dashboard');
    console.log('3. Execute: node test-existing-supabase.js');
    console.log('');
    
    for (const config of possibleConfigs) {
        await testConnection(config);
        console.log('---');
    }
}

runTests();
