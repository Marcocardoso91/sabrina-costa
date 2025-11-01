#!/usr/bin/env node
/**
 * Test Script - APIs Externas
 * Dashboard Sabrina Costa
 * 
 * Testa todas as APIs necessárias para workflows IA
 */

require('dotenv').config({ path: '../../backend/.env' });

const https = require('https');
const http = require('http');

// Colors for console
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

async function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        json: () => Promise.resolve(JSON.parse(data)),
                        text: () => Promise.resolve(data)
                    });
                } catch (e) {
                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        text: () => Promise.resolve(data)
                    });
                }
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

async function testAllAPIs() {
    console.log('\n🧪 TESTE DE APIS - Dashboard Sabrina Costa');
    console.log('='.repeat(60));
    console.log('');

    let totalTests = 0;
    let passedTests = 0;

    // ============================================
    // 1. Gemini Pro (Google)
    // ============================================
    console.log('1️⃣  Testando Gemini Pro (Google AI)...');
    totalTests++;

    if (process.env.GEMINI_API_KEY) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Olá' }] }]
                })
            });

            if (response.ok) {
                console.log(`   ${colors.green}✅ Gemini Pro funcionando${colors.reset}`);
                console.log(`   ${colors.blue}ℹ️  Custo: R$ 0 (tier gratuito)${colors.reset}`);
                passedTests++;
            } else {
                console.log(`   ${colors.red}❌ Erro Gemini Pro (status: ${response.status})${colors.reset}`);
            }
        } catch (err) {
            console.log(`   ${colors.red}❌ Erro: ${err.message}${colors.reset}`);
        }
    } else {
        console.log(`   ${colors.yellow}⚠️  GEMINI_API_KEY não configurada${colors.reset}`);
        console.log(`   ${colors.blue}ℹ️  Configure em: https://aistudio.google.com/${colors.reset}`);
    }

    console.log('');

    // ============================================
    // 2. Meta Ads API
    // ============================================
    console.log('2️⃣  Testando Meta Ads API...');
    totalTests++;

    if (process.env.META_ADS_ACCESS_TOKEN && process.env.META_ADS_AD_ACCOUNT_ID) {
        try {
            const url = `https://graph.facebook.com/v18.0/${process.env.META_ADS_AD_ACCOUNT_ID}/campaigns?access_token=${process.env.META_ADS_ACCESS_TOKEN}&limit=1`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(`   ${colors.green}✅ Meta Ads API funcionando${colors.reset}`);
                console.log(`   ${colors.blue}ℹ️  Campanhas encontradas: ${data.data?.length || 0}${colors.reset}`);
                passedTests++;
            } else {
                console.log(`   ${colors.red}❌ Erro Meta Ads (status: ${response.status})${colors.reset}`);
            }
        } catch (err) {
            console.log(`   ${colors.red}❌ Erro: ${err.message}${colors.reset}`);
        }
    } else {
        console.log(`   ${colors.yellow}⚠️  META_ADS_ACCESS_TOKEN não configurada${colors.reset}`);
        console.log(`   ${colors.blue}ℹ️  Configure em: https://developers.facebook.com/${colors.reset}`);
    }

    console.log('');

    // ============================================
    // 3. Instagram Graph API
    // ============================================
    console.log('3️⃣  Testando Instagram Graph API...');
    totalTests++;

    if (process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
        try {
            const url = `https://graph.facebook.com/v18.0/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=followers_count,username&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(`   ${colors.green}✅ Instagram API funcionando${colors.reset}`);
                console.log(`   ${colors.blue}ℹ️  @${data.username}: ${data.followers_count} seguidores${colors.reset}`);
                passedTests++;
            } else {
                console.log(`   ${colors.red}❌ Erro Instagram (status: ${response.status})${colors.reset}`);
            }
        } catch (err) {
            console.log(`   ${colors.red}❌ Erro: ${err.message}${colors.reset}`);
        }
    } else {
        console.log(`   ${colors.yellow}⚠️  INSTAGRAM_ACCESS_TOKEN não configurada${colors.reset}`);
        console.log(`   ${colors.blue}ℹ️  Configure em: https://developers.facebook.com/${colors.reset}`);
    }

    console.log('');

    // ============================================
    // 4. Evolution API (WhatsApp)
    // ============================================
    console.log('4️⃣  Testando Evolution API (WhatsApp)...');
    totalTests++;

    if (process.env.EVOLUTION_API_URL) {
        try {
            const url = `${process.env.EVOLUTION_API_URL}/health`;
            const response = await fetch(url);

            if (response.ok) {
                console.log(`   ${colors.green}✅ Evolution API funcionando${colors.reset}`);
                console.log(`   ${colors.blue}ℹ️  URL: ${process.env.EVOLUTION_API_URL}${colors.reset}`);
                passedTests++;
            } else {
                console.log(`   ${colors.red}❌ Erro Evolution (status: ${response.status})${colors.reset}`);
            }
        } catch (err) {
            console.log(`   ${colors.red}❌ Erro: ${err.message}${colors.reset}`);
        }
    } else {
        console.log(`   ${colors.yellow}⚠️  EVOLUTION_API_URL não configurada${colors.reset}`);
    }

    console.log('');

    // ============================================
    // 5. Backend API (Própria)
    // ============================================
    console.log('5️⃣  Testando Backend API...');
    totalTests++;

    if (process.env.API_BASE_URL || process.env.DATABASE_URL) {
        try {
            const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/health`;
            const response = await fetch(url);

            if (response.ok) {
                console.log(`   ${colors.green}✅ Backend API funcionando${colors.reset}`);
                passedTests++;
            } else {
                console.log(`   ${colors.red}❌ Erro Backend (status: ${response.status})${colors.reset}`);
            }
        } catch (err) {
            console.log(`   ${colors.yellow}⚠️  Backend offline (normal se não iniciou server)${colors.reset}`);
        }
    } else {
        console.log(`   ${colors.yellow}⚠️  API_BASE_URL não configurada${colors.reset}`);
    }

    console.log('');
    console.log('='.repeat(60));
    console.log(`\n📊 RESULTADO: ${passedTests}/${totalTests} APIs funcionando`);
    
    if (passedTests === totalTests) {
        console.log(`${colors.green}✅ Todas APIs configuradas corretamente!${colors.reset}\n`);
    } else if (passedTests >= totalTests - 1) {
        console.log(`${colors.yellow}⚠️  Quase lá! Falta configurar ${totalTests - passedTests} API${colors.reset}\n`);
    } else {
        console.log(`${colors.red}❌ ${totalTests - passedTests} APIs precisam de configuração${colors.reset}\n`);
    }

    // Recomendações
    console.log('📝 PRÓXIMOS PASSOS:\n');
    if (!process.env.GEMINI_API_KEY) {
        console.log(`   1. Configurar Gemini Pro API (GRATUITO)`);
        console.log(`      https://aistudio.google.com/`);
    }
    if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
        console.log(`   2. Configurar Instagram Graph API`);
        console.log(`      docs/automations/CONFIGURAR-APIS.md`);
    }
    if (!process.env.META_ADS_ACCESS_TOKEN) {
        console.log(`   3. Configurar Meta Ads API (opcional)`);
        console.log(`      https://developers.facebook.com/`);
    }
    console.log('');
}

// Run tests
testAllAPIs().catch(err => {
    console.error(`${colors.red}❌ Erro fatal:${colors.reset}`, err);
    process.exit(1);
});

