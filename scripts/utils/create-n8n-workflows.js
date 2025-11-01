#!/usr/bin/env node
/**
 * Script para criar workflows no n8n via MCP
 * 
 * Uso: node create-n8n-workflows.js
 */

const fs = require('fs');
const path = require('path');

// Workflows para criar (já criamos o 13)
const workflowFiles = [
  '05-otimizar-campanhas.json',
  '06-gerar-legendas-ia.json',
  '07-recomendar-conteudo.json',
  '08-analise-preditiva.json',
  '09-reels-fund-tracker.json',
  '10-dicas-produtos-ia.json',
  '11-analise-comentarios.json',
  '12-busca-semanal-validacao.json',
  // '13-monitor-custos-ia.json' // Já criado
];

const workflowsDir = path.join(__dirname, '../../n8n/workflows/production');

console.log('\n📦 CRIANDO WORKFLOWS NO N8N\n');
console.log('✅ Workflow 13 - Monitor Custos IA (já criado)\n');

// Ler e processar cada workflow
workflowFiles.forEach((file, index) => {
  const filePath = path.join(workflowsDir, file);
  
  try {
    const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log(`${index + 1}. ${workflowData.name}`);
    console.log(`   Arquivo: ${file}`);
    console.log(`   Nodes: ${workflowData.nodes.length}`);
    console.log(`   Status: Pronto para criar via MCP\n`);
    
    // Aqui você pode adicionar a chamada via MCP quando disponível
    // Por enquanto, apenas listamos os workflows
    
  } catch (error) {
    console.error(`❌ Erro ao ler ${file}:`, error.message);
  }
});

console.log('\n📋 RESUMO:\n');
console.log(`Total workflows: 9`);
console.log(`Criados: 1 (workflow 13)`);
console.log(`Faltando: 8`);
console.log(`\n💡 Use o MCP n8n via Cursor para criar os workflows restantes.`);
console.log(`   Ou importe manualmente: n8n/workflows/production/*.json\n`);

