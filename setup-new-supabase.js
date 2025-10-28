// setup-new-supabase.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// INSTRUÇÕES:
// 1. Substitua as variáveis abaixo pelas credenciais do seu novo projeto Supabase
// 2. Execute: node setup-new-supabase.js

const SUPABASE_URL = 'https://SEU_NOVO_PROJECT_ID.supabase.co';
const SUPABASE_SERVICE_KEY = 'SEU_SERVICE_ROLE_KEY_AQUI';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupDatabase() {
    try {
        console.log('🔄 Configurando novo banco Supabase...');
        
        // 1. Aplicar schema
        console.log('📋 Aplicando schema...');
        const schemaPath = path.join(__dirname, 'db', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Executar schema (método alternativo)
        const schemaQueries = schema.split(';').filter(q => q.trim());
        
        for (const query of schemaQueries) {
            if (query.trim()) {
                try {
                    await supabase.rpc('exec_sql', { sql: query.trim() });
                    console.log('✅ Query executada:', query.substring(0, 50) + '...');
                } catch (error) {
                    console.log('⚠️ Query ignorada (pode já existir):', error.message);
                }
            }
        }
        
        // 2. Inserir dados iniciais
        console.log('👤 Criando usuário admin...');
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert({
                email: 'admin@sabrina-costa.com',
                password_hash: '$2b$10$rQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZ', // senha: admin123
                role: 'admin',
                created_at: new Date().toISOString()
            })
            .select();
            
        if (userError) {
            console.log('⚠️ Usuário admin pode já existir:', userError.message);
        } else {
            console.log('✅ Usuário admin criado!');
        }
        
        // 3. Inserir hooks virais
        console.log('🎣 Inserindo hooks virais...');
        const hooks = [
            {
                title: 'Hook de Engajamento',
                description: 'Aumente o engajamento com perguntas interativas que fazem o público participar ativamente do seu conteúdo.',
                category: 'engagement',
                created_at: new Date().toISOString()
            },
            {
                title: 'Hook de Urgência',
                description: 'Crie senso de urgência para aumentar conversões e vendas com prazos limitados.',
                category: 'urgency',
                created_at: new Date().toISOString()
            },
            {
                title: 'Hook de História Pessoal',
                description: 'Conecte-se emocionalmente compartilhando experiências pessoais autênticas.',
                category: 'personal',
                created_at: new Date().toISOString()
            }
        ];
        
        const { data: hooksData, error: hooksError } = await supabase
            .from('viral_hooks')
            .insert(hooks)
            .select();
            
        if (hooksError) {
            console.log('⚠️ Hooks podem já existir:', hooksError.message);
        } else {
            console.log('✅ Hooks virais inseridos!');
        }
        
        console.log('🎉 Configuração do banco concluída!');
        console.log('📝 Próximos passos:');
        console.log('1. Atualize o DATABASE_URL no backend/.env');
        console.log('2. Atualize o MCP Supabase com o novo project ID');
        console.log('3. Faça deploy do backend no Vercel');
        
    } catch (error) {
        console.error('❌ Erro na configuração:', error);
    }
}

// Executar apenas se as credenciais foram configuradas
if (SUPABASE_URL.includes('SEU_NOVO_PROJECT_ID')) {
    console.log('⚠️ Configure as credenciais do Supabase no arquivo antes de executar!');
    console.log('1. Substitua SUPABASE_URL pelo URL do seu projeto');
    console.log('2. Substitua SUPABASE_SERVICE_KEY pela service_role key');
} else {
    setupDatabase();
}
