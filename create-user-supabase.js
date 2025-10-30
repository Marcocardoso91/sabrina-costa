const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const SUPABASE_URL = 'https://ddadyebnnbwqrjjtvgca.supabase.co';
// Usando a anon key temporariamente
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWR5ZWJubmJ3cXJqanR2Z2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Njg0NTEsImV4cCI6MjA3NjU0NDQ1MX0.8QZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createUser() {
    try {
        console.log('🔌 Conectando ao Supabase...');
        console.log('URL:', SUPABASE_URL);
        
        // Hash da senha
        const passwordHash = bcrypt.hashSync('Sabrina2025!', 10);
        
        console.log('👤 Verificando usuários existentes...');
        const { data: existingUsers, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('email', 'gerente@macspark.dev')
            .limit(1);
        
        if (checkError) {
            console.log('❌ Erro ao verificar usuários:', checkError.message);
            console.log('⚠️ Tentando criar usuário mesmo assim...');
        } else if (existingUsers && existingUsers.length > 0) {
            console.log('✅ Usuário já existe:');
            console.log('   📧 Email:', existingUsers[0].email);
            console.log('   👤 Nome:', existingUsers[0].name);
            console.log('   🔑 Role:', existingUsers[0].role);
            return;
        }
        
        console.log('🔐 Criando usuário admin...');
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
                email: 'gerente@macspark.dev',
                password_hash: passwordHash,
                name: 'Marco',
                role: 'admin'
            })
            .select();
        
        if (insertError) {
            console.error('❌ Erro ao criar usuário:', insertError.message);
        } else {
            console.log('✅ Usuário admin criado com sucesso!');
            console.log('   📧 Email:', newUser[0].email);
            console.log('   👤 Nome:', newUser[0].name);
            console.log('   🔑 Role:', newUser[0].role);
        }

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.error('Stack:', error.stack);
    }
}

createUser();
