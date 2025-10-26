// Script para inserir ganchos com estrutura correta
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres'
});

async function insertHooks() {
    try {
        await client.connect();
        console.log('✅ Conectado ao Supabase');

        // Inserir ganchos virais
        console.log('🎣 Inserindo ganchos virais...');
        const hooks = [
            { 
                category: 'Curiosidade', 
                title: 'O que NINGUÉM te conta', 
                description: 'O que NINGUÉM te conta sobre [tema]...',
                example: 'O que NINGUÉM te conta sobre cabelo crespo...'
            },
            { 
                category: 'Curiosidade', 
                title: 'Segredo revelador', 
                description: 'Esse segredo mudou TUDO para mim',
                example: 'Esse segredo mudou TUDO para meu cabelo'
            },
            { 
                category: 'Urgência', 
                title: 'PARE agora', 
                description: 'PARE de fazer isso AGORA',
                example: 'PARE de usar shampoo com sulfato AGORA'
            },
            { 
                category: 'Urgência', 
                title: 'Você está errando', 
                description: 'Se você faz isso, ESTÁ ERRANDO',
                example: 'Se você lava o cabelo todo dia, ESTÁ ERRANDO'
            },
            { 
                category: 'Transformação', 
                title: 'Antes e depois', 
                description: 'Como eu fui de [antes] para [depois]',
                example: 'Como eu fui de cabelo ressecado para hidratado'
            },
            { 
                category: 'Transformação', 
                title: 'Mudança em X dias', 
                description: 'Isso mudou minha vida em [X dias]',
                example: 'Isso mudou meu cabelo em 7 dias'
            },
            { 
                category: 'Identificação', 
                title: 'Se você é assim', 
                description: 'Se você também é assim, me segue',
                example: 'Se você também tem cabelo crespo, me segue'
            },
            { 
                category: 'Identificação', 
                title: 'Quem nunca', 
                description: 'Quem nunca passou por isso?',
                example: 'Quem nunca teve cabelo embaraçado?'
            },
            { 
                category: 'Lista', 
                title: '3 coisas que ninguém conta', 
                description: '3 coisas que NINGUÉM te conta',
                example: '3 coisas que NINGUÉM te conta sobre hidratação'
            },
            { 
                category: 'Lista', 
                title: '5 erros comuns', 
                description: '5 erros que TODO MUNDO comete',
                example: '5 erros que TODO MUNDO comete com o cabelo'
            }
        ];

        for (const hook of hooks) {
            await client.query(`
                INSERT INTO hooks (category, title, description, example) 
                VALUES ($1, $2, $3, $4) 
                ON CONFLICT DO NOTHING
            `, [hook.category, hook.title, hook.description, hook.example]);
        }

        console.log('✅ Ganchos inseridos!');

        // Verificar quantos foram inseridos
        const count = await client.query('SELECT COUNT(*) as total FROM hooks');
        console.log(`📊 Total de ganchos: ${count.rows[0].total}`);

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await client.end();
    }
}

insertHooks();
