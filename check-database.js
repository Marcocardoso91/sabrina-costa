// Script para verificar banco de dados
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function checkDatabase() {
    try {
        await client.connect();
        console.log('✅ Conectado ao Supabase');

        // Verificar tabelas
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('📊 Tabelas:', tables.rows.map(r => r.table_name));

        // Verificar usuários
        const users = await client.query('SELECT email, name, role FROM users');
        console.log('👤 Usuários:', users.rows);

        // Verificar ganchos
        const hooks = await client.query('SELECT COUNT(*) as total FROM hooks');
        console.log('🎣 Ganchos:', hooks.rows[0].total);

        // Verificar métricas
        const metrics = await client.query('SELECT COUNT(*) as total FROM metrics');
        console.log('📈 Métricas:', metrics.rows[0].total);

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
    }
}

checkDatabase();
