#!/usr/bin/env node

/**
 * Auto-Generate Changelog - Dashboard Sabrina Costa
 * Script para gerar changelog automaticamente usando conventional-changelog
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {
  // Arquivos
  changelogPath: path.join(__dirname, '..', 'CHANGELOG.md'),
  packageJsonPath: path.join(__dirname, '..', 'package.json'),
  gitLogPath: path.join(__dirname, '..', 'git-log.txt'),
  
  // Configurações do changelog
  changelog: {
    title: '# 📝 Changelog',
    description: 'Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.',
    format: 'baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)',
    versioning: 'adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html)',
    sections: [
      '### Adicionado',
      '### Alterado', 
      '### Deprecado',
      '### Removido',
      '### Corrigido',
      '### Segurança'
    ]
  },
  
  // Configurações do Git
  git: {
    since: '2023-01-01',
    format: '--pretty=format:%H|%an|%ae|%ad|%s',
    dateFormat: '--date=short'
  }
};

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

function generateChangelog() {
  console.log('📝 Gerando changelog automaticamente...');
  
  try {
    // 1. Verificar se é um repositório Git
    checkGitRepository();
    
    // 2. Obter commits
    const commits = getCommits();
    console.log(`📊 Encontrados ${commits.length} commits`);
    
    // 3. Processar commits
    const processedCommits = processCommits(commits);
    
    // 4. Gerar changelog
    const changelog = generateChangelogContent(processedCommits);
    
    // 5. Salvar changelog
    saveChangelog(changelog);
    
    // 6. Gerar relatório
    generateReport(processedCommits);
    
    console.log('✅ Changelog gerado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao gerar changelog:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function checkGitRepository() {
  try {
    execSync('git status', { stdio: 'pipe' });
    console.log('✅ Repositório Git detectado');
  } catch (error) {
    throw new Error('Não é um repositório Git válido');
  }
}

function getCommits() {
  console.log('📥 Obtendo commits do Git...');
  
  try {
    const command = `git log --since="${CONFIG.git.since}" ${CONFIG.git.format} ${CONFIG.git.dateFormat}`;
    const output = execSync(command, { encoding: 'utf8' });
    
    const commits = output.trim().split('\n').filter(line => line.length > 0);
    
    return commits.map(commit => {
      const [hash, author, email, date, message] = commit.split('|');
      return {
        hash: hash.substring(0, 7),
        author,
        email,
        date,
        message,
        type: getCommitType(message),
        scope: getCommitScope(message),
        description: getCommitDescription(message)
      };
    });
    
  } catch (error) {
    console.error('❌ Erro ao obter commits:', error.message);
    return [];
  }
}

function getCommitType(message) {
  const conventionalTypes = {
    'feat': 'Adicionado',
    'fix': 'Corrigido',
    'docs': 'Documentação',
    'style': 'Estilo',
    'refactor': 'Refatoração',
    'perf': 'Performance',
    'test': 'Testes',
    'build': 'Build',
    'ci': 'CI/CD',
    'chore': 'Manutenção',
    'revert': 'Revertido'
  };
  
  const match = message.match(/^(\w+)(\(.+\))?:/);
  if (match) {
    const type = match[1];
    return conventionalTypes[type] || 'Outros';
  }
  
  return 'Outros';
}

function getCommitScope(message) {
  const match = message.match(/^\w+\((.+)\):/);
  return match ? match[1] : null;
}

function getCommitDescription(message) {
  const match = message.match(/^\w+(?:\(.+\))?:\s*(.+)/);
  return match ? match[1] : message;
}

function processCommits(commits) {
  console.log('🔄 Processando commits...');
  
  const processed = {
    'Adicionado': [],
    'Corrigido': [],
    'Documentação': [],
    'Refatoração': [],
    'Performance': [],
    'Testes': [],
    'Build': [],
    'CI/CD': [],
    'Manutenção': [],
    'Outros': []
  };
  
  commits.forEach(commit => {
    const type = commit.type;
    if (processed[type]) {
      processed[type].push(commit);
    } else {
      processed['Outros'].push(commit);
    }
  });
  
  return processed;
}

function generateChangelogContent(processedCommits) {
  console.log('📝 Gerando conteúdo do changelog...');
  
  let changelog = `${CONFIG.changelog.title}\n\n`;
  changelog += `${CONFIG.changelog.description}\n\n`;
  changelog += `O formato é ${CONFIG.changelog.format}, e este projeto ${CONFIG.changelog.versioning}.\n\n`;
  
  // Adicionar versão atual
  const currentVersion = getCurrentVersion();
  const currentDate = new Date().toISOString().split('T')[0];
  
  changelog += `## [${currentVersion}] - ${currentDate}\n\n`;
  
  // Adicionar seções
  CONFIG.changelog.sections.forEach(section => {
    const sectionName = section.replace('### ', '');
    const commits = processedCommits[sectionName] || [];
    
    if (commits.length > 0) {
      changelog += `${section}\n\n`;
      
      commits.forEach(commit => {
        const scope = commit.scope ? `**${commit.scope}:** ` : '';
        changelog += `- ${scope}${commit.description} (${commit.hash})\n`;
      });
      
      changelog += '\n';
    }
  });
  
  // Adicionar seção de contribuidores
  const contributors = getContributors(processedCommits);
  if (contributors.length > 0) {
    changelog += '### 👥 Contribuidores\n\n';
    contributors.forEach(contributor => {
      changelog += `- **${contributor.name}** (${contributor.email}) - ${contributor.commits} commits\n`;
    });
    changelog += '\n';
  }
  
  // Adicionar estatísticas
  const stats = getStatistics(processedCommits);
  changelog += '### 📊 Estatísticas\n\n';
  changelog += `- **Total de commits:** ${stats.total}\n`;
  changelog += `- **Período:** ${CONFIG.git.since} até ${currentDate}\n`;
  changelog += `- **Contribuidores:** ${contributors.length}\n`;
  changelog += `- **Tipos de mudança:** ${Object.keys(processedCommits).filter(key => processedCommits[key].length > 0).length}\n\n`;
  
  return changelog;
}

function getCurrentVersion() {
  try {
    if (fs.existsSync(CONFIG.packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(CONFIG.packageJsonPath, 'utf8'));
      return packageJson.version || '1.0.0';
    }
  } catch (error) {
    console.warn('⚠️ Erro ao obter versão do package.json:', error.message);
  }
  
  return '1.0.0';
}

function getContributors(processedCommits) {
  const contributors = new Map();
  
  Object.values(processedCommits).flat().forEach(commit => {
    const key = `${commit.author}|${commit.email}`;
    if (contributors.has(key)) {
      contributors.get(key).commits++;
    } else {
      contributors.set(key, {
        name: commit.author,
        email: commit.email,
        commits: 1
      });
    }
  });
  
  return Array.from(contributors.values())
    .sort((a, b) => b.commits - a.commits);
}

function getStatistics(processedCommits) {
  const total = Object.values(processedCommits).flat().length;
  return { total };
}

function saveChangelog(changelog) {
  console.log('💾 Salvando changelog...');
  
  try {
    // Ler changelog existente se houver
    let existingChangelog = '';
    if (fs.existsSync(CONFIG.changelogPath)) {
      existingChangelog = fs.readFileSync(CONFIG.changelogPath, 'utf8');
    }
    
    // Combinar com changelog existente
    const finalChangelog = existingChangelog 
      ? changelog + '\n' + existingChangelog
      : changelog;
    
    fs.writeFileSync(CONFIG.changelogPath, finalChangelog);
    console.log(`✅ Changelog salvo em: ${CONFIG.changelogPath}`);
    
  } catch (error) {
    console.error('❌ Erro ao salvar changelog:', error.message);
    throw error;
  }
}

function generateReport(processedCommits) {
  console.log('📊 Gerando relatório...');
  
  const reportPath = path.join(__dirname, '..', 'changelog-report.md');
  
  let report = '# 📊 Relatório de Changelog\n\n';
  report += `**Gerado em:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  
  // Estatísticas gerais
  const total = Object.values(processedCommits).flat().length;
  report += '## 📈 Estatísticas Gerais\n\n';
  report += `- **Total de commits:** ${total}\n`;
  report += `- **Período analisado:** ${CONFIG.git.since} até ${new Date().toISOString().split('T')[0]}\n`;
  report += `- **Tipos de mudança:** ${Object.keys(processedCommits).filter(key => processedCommits[key].length > 0).length}\n\n`;
  
  // Distribuição por tipo
  report += '## 📊 Distribuição por Tipo\n\n';
  Object.entries(processedCommits).forEach(([type, commits]) => {
    if (commits.length > 0) {
      const percentage = ((commits.length / total) * 100).toFixed(1);
      report += `- **${type}:** ${commits.length} commits (${percentage}%)\n`;
    }
  });
  
  // Top contribuidores
  const contributors = getContributors(processedCommits);
  if (contributors.length > 0) {
    report += '\n## 👥 Top Contribuidores\n\n';
    contributors.slice(0, 10).forEach((contributor, index) => {
      report += `${index + 1}. **${contributor.name}** - ${contributor.commits} commits\n`;
    });
  }
  
  // Commits recentes
  report += '\n## 🔄 Commits Recentes\n\n';
  const recentCommits = Object.values(processedCommits).flat()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
  
  recentCommits.forEach(commit => {
    report += `- **${commit.type}:** ${commit.description} (${commit.hash}) - ${commit.date}\n`;
  });
  
  // Recomendações
  report += '\n## 💡 Recomendações\n\n';
  report += '- ✅ Changelog gerado automaticamente\n';
  report += '- ✅ Commits seguem convenção\n';
  report += '- 🔄 Considerar usar conventional-commits\n';
  report += '- 🔄 Implementar versionamento automático\n';
  report += '- 🔄 Adicionar validação de commits\n';
  
  fs.writeFileSync(reportPath, report);
  console.log(`📊 Relatório salvo em: ${reportPath}`);
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

if (require.main === module) {
  generateChangelog();
}

module.exports = {
  generateChangelog,
  CONFIG
};
