// Script para verificar estrutura da tabela hooks
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function checkHooksTable() {
    try {
        await client.connect();
        console.log('✅ Conectado ao Supabase');

        // Verificar estrutura da tabela hooks
        const columns = await client.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'hooks' AND table_schema = 'public'
            ORDER BY ordinal_position
        `);
        
        console.log('📊 Colunas da tabela hooks:');
        columns.rows.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
    }
}

checkHooksTable();
