// Script para aplicar schema no Supabase
// Dashboard Sabrina Costa

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuração do banco
const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function applySchema() {
    try {
        console.log('🔌 Conectando ao Supabase...');
        await client.connect();
        console.log('✅ Conectado!');

        console.log('📖 Lendo schema SQL...');
        const schemaPath = path.join(__dirname, 'backend', 'db', 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('🚀 Aplicando schema...');
        await client.query(schemaSQL);
        console.log('✅ Schema aplicado com sucesso!');

        // Inserir usuário admin
        console.log('👤 Criando usuário admin...');
        const bcrypt = require('bcryptjs');
        const hashedPassword = bcrypt.hashSync('Sabrina2025!', 10);
        
        await client.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (email) DO NOTHING
        `, ['gerente@macspark.dev', hashedPassword, 'Marco', 'admin']);
        
        console.log('✅ Usuário admin criado!');

        // Inserir dados iniciais
        console.log('📊 Inserindo dados iniciais...');
        
        // Inserir ganchos virais
        const hooks = [
            { category: 'Curiosidade', text: 'O que NINGUÉM te conta sobre [tema]...' },
            { category: 'Urgência', text: 'PARE de fazer isso AGORA' },
            { category: 'Transformação', text: 'Como eu fui de [antes] para [depois]' },
            { category: 'Identificação', text: 'Se você também é assim, me segue' },
            { category: 'Lista', text: '3 coisas que NINGUÉM te conta' }
        ];

        for (const hook of hooks) {
            await client.query(`
                INSERT INTO hooks (category, text, usage_count) 
                VALUES ($1, $2, $3) 
                ON CONFLICT DO NOTHING
            `, [hook.category, hook.text, 0]);
        }

        console.log('✅ Dados iniciais inseridos!');
        console.log('🎉 Setup completo!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
        console.log('🔌 Conexão encerrada.');
    }
}

applySchema();
