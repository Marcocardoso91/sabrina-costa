// apply-schema-new.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configurações do novo projeto Supabase
const SUPABASE_URL = 'https://SEU_NOVO_PROJECT_ID.supabase.co';
const SUPABASE_SERVICE_KEY = 'SEU_SERVICE_ROLE_KEY_AQUI';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function applySchema() {
    try {
        console.log('🔄 Aplicando schema no novo banco...');
        
        // Ler o arquivo schema.sql
        const schemaPath = path.join(__dirname, 'db', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Executar o schema
        const { data, error } = await supabase.rpc('exec_sql', { sql: schema });
        
        if (error) {
            console.error('❌ Erro ao aplicar schema:', error);
            return;
        }
        
        console.log('✅ Schema aplicado com sucesso!');
        
        // Inserir dados iniciais
        await insertInitialData();
        
    } catch (error) {
        console.error('❌ Erro:', error);
    }
}

async function insertInitialData() {
    try {
        console.log('🔄 Inserindo dados iniciais...');
        
        // Inserir usuário admin
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert({
                email: 'admin@sabrina-costa.com',
                password_hash: '$2b$10$rQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZ', // senha: admin123
                role: 'admin',
                created_at: new Date().toISOString()
            });
            
        if (userError) {
            console.error('❌ Erro ao inserir usuário:', userError);
            return;
        }
        
        console.log('✅ Usuário admin criado!');
        
        // Inserir hooks virais
        const hooks = [
            {
                title: 'Hook de Engajamento',
                description: 'Aumente o engajamento com perguntas interativas',
                category: 'engagement',
                created_at: new Date().toISOString()
            },
            {
                title: 'Hook de Urgência',
                description: 'Crie senso de urgência para aumentar conversões',
                category: 'urgency',
                created_at: new Date().toISOString()
            }
        ];
        
        const { data: hooksData, error: hooksError } = await supabase
            .from('viral_hooks')
            .insert(hooks);
            
        if (hooksError) {
            console.error('❌ Erro ao inserir hooks:', hooksError);
            return;
        }
        
        console.log('✅ Hooks virais inseridos!');
        console.log('🎉 Configuração inicial concluída!');
        
    } catch (error) {
        console.error('❌ Erro ao inserir dados iniciais:', error);
    }
}

// Executar
applySchema();
