// Script para inserir dados iniciais
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function insertInitialData() {
    try {
        await client.connect();
        console.log('✅ Conectado ao Supabase');

        // Inserir usuário admin
        console.log('👤 Criando usuário admin...');
        const hashedPassword = bcrypt.hashSync('Sabrina2025!', 10);
        
        await client.query(`
            INSERT INTO users (email, password_hash, name, role) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (email) DO NOTHING
        `, ['gerente@macspark.dev', hashedPassword, 'Marco', 'admin']);
        
        console.log('✅ Usuário admin criado!');

        // Inserir ganchos virais
        console.log('🎣 Inserindo ganchos virais...');
        const hooks = [
            { category: 'Curiosidade', text: 'O que NINGUÉM te conta sobre [tema]...' },
            { category: 'Curiosidade', text: 'Esse segredo mudou TUDO para mim' },
            { category: 'Curiosidade', text: 'Você não vai acreditar no que descobri' },
            { category: 'Urgência', text: 'PARE de fazer isso AGORA' },
            { category: 'Urgência', text: 'Se você faz isso, ESTÁ ERRANDO' },
            { category: 'Transformação', text: 'Como eu fui de [antes] para [depois]' },
            { category: 'Transformação', text: 'Isso mudou minha vida em [X dias]' },
            { category: 'Identificação', text: 'Se você também é assim, me segue' },
            { category: 'Identificação', text: 'Quem nunca passou por isso?' },
            { category: 'Lista', text: '3 coisas que NINGUÉM te conta' },
            { category: 'Lista', text: '5 erros que TODO MUNDO comete' },
            { category: 'Lista', text: '7 sinais de que você precisa [ação]' }
        ];

        for (const hook of hooks) {
            await client.query(`
                INSERT INTO hooks (category, text, usage_count) 
                VALUES ($1, $2, $3) 
                ON CONFLICT DO NOTHING
            `, [hook.category, hook.text, 0]);
        }

        console.log('✅ Ganchos inseridos!');

        // Inserir configurações padrão
        console.log('⚙️ Inserindo configurações...');
        await client.query(`
            INSERT INTO config (key, value, description) VALUES
            ('ctr_min', '1.5', 'CTR mínimo para alerta'),
            ('cpc_max', '0.70', 'CPC máximo para alerta'),
            ('cpm_max', '10.0', 'CPM máximo para alerta'),
            ('frequency_max', '3.0', 'Frequência máxima para alerta'),
            ('cost_per_follower_max', '1.30', 'Custo por seguidor máximo para alerta'),
            ('whatsapp_number', '+5531993676989', 'Número do WhatsApp para alertas'),
            ('alert_enabled', 'true', 'Alertas habilitados')
            ON CONFLICT (key) DO NOTHING
        `);

        console.log('✅ Configurações inseridas!');

        // Inserir posts de exemplo
        console.log('📅 Inserindo cronograma...');
        const posts = [
            { week: 1, day: 1, format: 'Reel', theme: 'Transformação Antes/Depois', hook: 'Olha só o que 7 dias fizeram...', cta: 'Me segue pra ver mais transformações', status: 'planned' },
            { week: 1, day: 3, format: 'Reel', theme: 'Autocuidado Real', hook: 'Hoje escolhi ME CUIDAR...', cta: 'Salva pra lembrar', status: 'planned' },
            { week: 1, day: 5, format: 'Reel', theme: 'Recomeços + Reflexão', hook: 'Desisti várias vezes, mas...', cta: 'Esse perfil é seu lugar', status: 'planned' },
            { week: 1, day: 6, format: 'Carrossel', theme: 'Hidratação Passo a Passo', hook: '3 passos pro cabelo dos sonhos', cta: 'Salva e compartilha', status: 'planned' }
        ];

        for (const post of posts) {
            await client.query(`
                INSERT INTO posts (week, day, format, theme, hook, cta, status, created_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                ON CONFLICT DO NOTHING
            `, [post.week, post.day, post.format, post.theme, post.hook, post.cta, post.status]);
        }

        console.log('✅ Cronograma inserido!');
        console.log('🎉 Dados iniciais inseridos com sucesso!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
    }
}

insertInitialData();
