// create-new-supabase-project.js
const https = require('https');

// INSTRUÇÕES:
// 1. Substitua SUPABASE_ACCESS_TOKEN pelo token que você forneceu
// 2. Execute: node create-new-supabase-project.js

const SUPABASE_ACCESS_TOKEN = 'KGpLvZ4erc3MMYJn';

async function createProject() {
    try {
        console.log('🔄 Criando novo projeto Supabase...');
        
        const projectData = {
            name: 'sabrina-costa-dashboard',
            organization_id: 'efkjgfijiymopcsmnbqw', // ID da organização
            region: 'us-east-1',
            plan: 'free'
        };
        
        const response = await fetch('https://api.supabase.com/v1/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        
        if (response.ok) {
            const project = await response.json();
            console.log('✅ Projeto criado com sucesso!');
            console.log('📋 Informações do projeto:');
            console.log(`   ID: ${project.id}`);
            console.log(`   Nome: ${project.name}`);
            console.log(`   URL: https://${project.id}.supabase.co`);
            console.log(`   Database Host: ${project.database.host}`);
            
            // Aguardar o projeto ficar pronto
            console.log('⏳ Aguardando projeto ficar pronto...');
            await waitForProjectReady(project.id);
            
        } else {
            const error = await response.text();
            console.log('❌ Erro ao criar projeto:', error);
        }
        
    } catch (error) {
        console.log('❌ Erro:', error.message);
    }
}

async function waitForProjectReady(projectId) {
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            const response = await fetch(`https://api.supabase.com/v1/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`
                }
            });
            
            if (response.ok) {
                const project = await response.json();
                if (project.status === 'ACTIVE_HEALTHY') {
                    console.log('✅ Projeto pronto!');
                    console.log('🔑 Próximos passos:');
                    console.log('1. Acesse o dashboard do Supabase');
                    console.log('2. Obtenha as API keys (anon e service_role)');
                    console.log('3. Configure o DATABASE_URL no backend');
                    return;
                }
            }
            
            console.log(`⏳ Aguardando... (${attempts + 1}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 10000)); // 10 segundos
            attempts++;
            
        } catch (error) {
            console.log('⚠️ Erro ao verificar status:', error.message);
            attempts++;
        }
    }
    
    console.log('⚠️ Timeout aguardando projeto ficar pronto');
}

// Executar
createProject();
