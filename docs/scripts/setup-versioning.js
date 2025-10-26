#!/usr/bin/env node

/**
 * Setup Versioning - Dashboard Sabrina Costa
 * Script para configurar versionamento de documentação
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
  // Diretórios
  docsDir: path.join(__dirname, '..'),
  versionsDir: path.join(__dirname, '..', 'versions'),
  v1Dir: path.join(__dirname, '..', 'versions', 'v1'),
  v2Dir: path.join(__dirname, '..', 'versions', 'v2'),
  
  // Arquivos
  packageJsonPath: path.join(__dirname, '..', 'package.json'),
  versionConfigPath: path.join(__dirname, '..', 'version-config.json'),
  
  // Configurações
  currentVersion: 'v1',
  supportedVersions: ['v1', 'v2'],
  defaultVersion: 'v1'
};

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

function setupVersioning() {
  console.log('📚 Configurando versionamento de documentação...\n');
  
  try {
    // 1. Criar estrutura de versões
    createVersionStructure();
    
    // 2. Configurar arquivos de versão
    setupVersionFiles();
    
    // 3. Criar migration guides
    createMigrationGuides();
    
    // 4. Configurar version switcher
    setupVersionSwitcher();
    
    // 5. Configurar redirects
    setupRedirects();
    
    // 6. Criar documentação de versionamento
    createVersioningDocs();
    
    console.log('\n🎉 Versionamento configurado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. npm run version:create v2 - Criar nova versão');
    console.log('   2. npm run version:switch v2 - Mudar para versão');
    console.log('   3. npm run version:list - Listar versões');
    
  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function createVersionStructure() {
  console.log('📁 Criando estrutura de versões...');
  
  const directories = [
    CONFIG.versionsDir,
    CONFIG.v1Dir,
    CONFIG.v2Dir,
    path.join(CONFIG.v1Dir, 'api'),
    path.join(CONFIG.v1Dir, 'tutorials'),
    path.join(CONFIG.v1Dir, 'how-to-guides'),
    path.join(CONFIG.v1Dir, 'reference'),
    path.join(CONFIG.v1Dir, 'explanation'),
    path.join(CONFIG.v2Dir, 'api'),
    path.join(CONFIG.v2Dir, 'tutorials'),
    path.join(CONFIG.v2Dir, 'how-to-guides'),
    path.join(CONFIG.v2Dir, 'reference'),
    path.join(CONFIG.v2Dir, 'explanation')
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`   ✅ Criado: ${path.relative(CONFIG.docsDir, dir)}`);
    } else {
      console.log(`   ⚠️  Já existe: ${path.relative(CONFIG.docsDir, dir)}`);
    }
  });
}

function setupVersionFiles() {
  console.log('📝 Configurando arquivos de versão...');
  
  // Configuração de versões
  const versionConfig = {
    current: CONFIG.currentVersion,
    supported: CONFIG.supportedVersions,
    default: CONFIG.defaultVersion,
    versions: {
      v1: {
        name: 'v1.0',
        description: 'Versão inicial da documentação',
        releaseDate: '2025-10-23',
        status: 'stable',
        deprecated: false,
        migrationGuide: 'migration-v1-to-v2.md'
      },
      v2: {
        name: 'v2.0',
        description: 'Versão com melhorias e novas funcionalidades',
        releaseDate: '2025-12-01',
        status: 'beta',
        deprecated: false,
        migrationGuide: 'migration-v2-to-v3.md'
      }
    }
  };
  
  fs.writeFileSync(CONFIG.versionConfigPath, JSON.stringify(versionConfig, null, 2));
  console.log('   ✅ version-config.json criado');
  
  // README para cada versão
  createVersionReadme('v1');
  createVersionReadme('v2');
}

function createVersionReadme(version) {
  const readmePath = path.join(CONFIG.versionsDir, version, 'README.md');
  const readmeContent = `# 📚 Documentação ${version.toUpperCase()}

> **Versão:** ${version} | **Status:** ${version === 'v1' ? 'Estável' : 'Beta'} | **Última atualização:** ${new Date().toISOString().split('T')[0]}

Esta é a documentação da versão ${version} do Dashboard Sabrina Costa.

## 🎯 Sobre esta Versão

${version === 'v1' 
  ? 'Esta é a versão inicial da documentação, contendo toda a base do projeto.'
  : 'Esta versão inclui melhorias significativas na estrutura e funcionalidades.'
}

## 📋 Conteúdo

- **[Tutoriais](./tutorials/)** - Guias passo a passo
- **[Guias Práticos](./how-to-guides/)** - Soluções para problemas específicos
- **[Referência](./reference/)** - Documentação técnica detalhada
- **[Explicações](./explanation/)** - Conceitos e arquitetura

## 🔄 Migração

${version === 'v1' 
  ? '- [Migrar para v2](./migration-v1-to-v2.md) - Guia de migração para a próxima versão'
  : '- [Migrar para v3](./migration-v2-to-v3.md) - Guia de migração para a próxima versão'
}

## 📊 Status da Versão

| Aspecto | Status |
|---------|--------|
| **Estabilidade** | ${version === 'v1' ? '✅ Estável' : '⚠️ Beta'} |
| **Suporte** | ${version === 'v1' ? '✅ Ativo' : '⚠️ Limitado'} |
| **Atualizações** | ${version === 'v1' ? '⚠️ Apenas correções' : '✅ Ativas'} |
| **Deprecação** | ${version === 'v1' ? '⚠️ Planejada para 2026' : '❌ Não'} |

## 🚀 Próximos Passos

1. **Explore a documentação** - Navegue pelos diferentes tipos de conteúdo
2. **Siga os tutoriais** - Comece com o guia de início rápido
3. **Consulte a referência** - Use para consulta técnica
4. **Participe da discussão** - Use o sistema de comentários

---

**📚 Documentação ${version.toUpperCase()} - Dashboard Sabrina Costa**
`;
  
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`   ✅ README.md criado para ${version}`);
}

function createMigrationGuides() {
  console.log('🔄 Criando migration guides...');
  
  // Migration v1 para v2
  createMigrationGuide('v1-to-v2', {
    from: 'v1.0',
    to: 'v2.0',
    breakingChanges: [
      'Nova estrutura de pastas usando framework Diátaxis',
      'Mudança na organização dos tutoriais',
      'Atualização da API com novos endpoints',
      'Mudança no sistema de autenticação'
    ],
    improvements: [
      'Melhor organização do conteúdo',
      'Navegação mais intuitiva',
      'Busca aprimorada',
      'Diagramas interativos',
      'Sistema de feedback'
    ],
    migrationSteps: [
      'Revisar nova estrutura de pastas',
      'Atualizar bookmarks e links',
      'Verificar compatibilidade da API',
      'Testar novos fluxos de autenticação'
    ]
  });
  
  // Migration v2 para v3 (futuro)
  createMigrationGuide('v2-to-v3', {
    from: 'v2.0',
    to: 'v3.0',
    breakingChanges: [
      'Nova arquitetura de microserviços',
      'Mudança no sistema de banco de dados',
      'Atualização das integrações n8n',
      'Nova interface de usuário'
    ],
    improvements: [
      'Performance melhorada',
      'Escalabilidade aprimorada',
      'Novas funcionalidades de analytics',
      'Interface mais moderna'
    ],
    migrationSteps: [
      'Planejar migração de dados',
      'Atualizar configurações',
      'Testar nova arquitetura',
      'Treinar equipe nas mudanças'
    ]
  });
}

function createMigrationGuide(name, config) {
  const migrationPath = path.join(CONFIG.versionsDir, `migration-${name}.md`);
  const migrationContent = `# 🔄 Guia de Migração: ${config.from} → ${config.to}

> **Data:** ${new Date().toISOString().split('T')[0]} | **Versão:** ${config.to} | **Status:** ${name.includes('v2-to-v3') ? 'Planejado' : 'Disponível'}

Este guia detalha as mudanças entre as versões ${config.from} e ${config.to} da documentação do Dashboard Sabrina Costa.

## 📋 Resumo das Mudanças

### 🚨 Mudanças Que Quebram Compatibilidade

${config.breakingChanges.map(change => `- ${change}`).join('\n')}

### ✨ Melhorias e Novas Funcionalidades

${config.improvements.map(improvement => `- ${improvement}`).join('\n')}

## 🛠️ Passos para Migração

### 1. **Preparação**

- [ ] Fazer backup da documentação atual
- [ ] Revisar mudanças na API
- [ ] Verificar dependências
- [ ] Planejar tempo de migração

### 2. **Atualização do Conteúdo**

${config.migrationSteps.map((step, index) => `${index + 1}. [ ] ${step}`).join('\n')}

### 3. **Testes**

- [ ] Testar todos os tutoriais
- [ ] Verificar links internos
- [ ] Validar exemplos de código
- [ ] Testar funcionalidades interativas

### 4. **Deploy**

- [ ] Atualizar configurações
- [ ] Deploy da nova versão
- [ ] Configurar redirects
- [ ] Notificar usuários

## 📊 Impacto da Migração

| Aspecto | Impacto | Ação Necessária |
|---------|---------|-----------------|
| **Estrutura** | ${config.breakingChanges.length > 0 ? 'Alto' : 'Baixo'} | ${config.breakingChanges.length > 0 ? 'Reorganizar conteúdo' : 'Nenhuma'} |
| **API** | ${config.breakingChanges.some(c => c.includes('API')) ? 'Alto' : 'Baixo'} | ${config.breakingChanges.some(c => c.includes('API')) ? 'Atualizar integrações' : 'Nenhuma'} |
| **Autenticação** | ${config.breakingChanges.some(c => c.includes('autenticação')) ? 'Alto' : 'Baixo'} | ${config.breakingChanges.some(c => c.includes('autenticação')) ? 'Atualizar tokens' : 'Nenhuma'} |
| **Interface** | ${config.improvements.some(i => i.includes('interface')) ? 'Médio' : 'Baixo'} | ${config.improvements.some(i => i.includes('interface')) ? 'Treinar usuários' : 'Nenhuma'} |

## 🔧 Ferramentas de Migração

### Scripts Automáticos

\`\`\`bash
# Verificar compatibilidade
npm run version:check ${config.from} ${config.to}

# Gerar relatório de migração
npm run version:migrate ${config.from} ${config.to}

# Aplicar migração
npm run version:apply ${config.from} ${config.to}
\`\`\`

### Validação

\`\`\`bash
# Validar estrutura
npm run version:validate ${config.to}

# Testar funcionalidades
npm run version:test ${config.to}
\`\`\`

## 📞 Suporte

Se você encontrar problemas durante a migração:

1. **Consulte este guia** - Revise os passos detalhados
2. **Verifique os logs** - Analise mensagens de erro
3. **Entre em contato** - Use o sistema de suporte
4. **Abra uma issue** - Reporte problemas encontrados

## 📚 Recursos Adicionais

- [Documentação ${config.to}](../${config.to}/README.md)
- [Changelog completo](../CHANGELOG.md)
- [FAQ de migração](./migration-faq.md)
- [Suporte técnico](./support.md)

---

**🔄 Migração ${config.from} → ${config.to} - Dashboard Sabrina Costa**
`;
  
  fs.writeFileSync(migrationPath, migrationContent);
  console.log(`   ✅ migration-${name}.md criado`);
}

function setupVersionSwitcher() {
  console.log('🔄 Configurando version switcher...');
  
  // JavaScript para version switcher
  const switcherPath = path.join(CONFIG.docsDir, 'assets', 'js', 'version-switcher.js');
  const switcherContent = `/**
 * Version Switcher - Dashboard Sabrina Costa
 * Sistema para alternar entre versões da documentação
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

class VersionSwitcher {
  constructor() {
    this.currentVersion = this.getCurrentVersion();
    this.supportedVersions = this.getSupportedVersions();
    this.init();
  }

  init() {
    this.createSwitcher();
    this.bindEvents();
    this.updateSwitcher();
  }

  getCurrentVersion() {
    const path = window.location.pathname;
    const match = path.match(/\\/versions\\/(v\\d+)/);
    return match ? match[1] : 'v1';
  }

  getSupportedVersions() {
    return ['v1', 'v2'];
  }

  createSwitcher() {
    const switcher = document.createElement('div');
    switcher.id = 'version-switcher';
    switcher.className = 'version-switcher';
    switcher.innerHTML = \`
      <div class="version-switcher-container">
        <label for="version-select">Versão:</label>
        <select id="version-select" onchange="versionSwitcher.switchVersion()">
          \${this.supportedVersions.map(version => 
            \`<option value="\${version}" \${version === this.currentVersion ? 'selected' : ''}>\${version}</option>\`
          ).join('')}
        </select>
        <button onclick="versionSwitcher.showVersionInfo()" class="version-info-btn">ℹ️</button>
      </div>
    \`;
    
    document.body.appendChild(switcher);
  }

  switchVersion() {
    const select = document.getElementById('version-select');
    const newVersion = select.value;
    
    if (newVersion === this.currentVersion) return;
    
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\\/versions\\/v\\d+/, \`/versions/\${newVersion}\`);
    
    // Mostrar loading
    this.showLoading();
    
    // Redirecionar
    window.location.href = newPath;
  }

  showVersionInfo() {
    const version = this.getCurrentVersion();
    const info = this.getVersionInfo(version);
    
    alert(\`Versão: \${info.name}\\n\\n\${info.description}\\n\\nStatus: \${info.status}\\nData: \${info.releaseDate}\`);
  }

  getVersionInfo(version) {
    const versions = {
      v1: {
        name: 'v1.0',
        description: 'Versão inicial da documentação',
        status: 'Estável',
        releaseDate: '2025-10-23'
      },
      v2: {
        name: 'v2.0',
        description: 'Versão com melhorias e novas funcionalidades',
        status: 'Beta',
        releaseDate: '2025-12-01'
      }
    };
    
    return versions[version] || versions.v1;
  }

  updateSwitcher() {
    const select = document.getElementById('version-select');
    if (select) {
      select.value = this.currentVersion;
    }
  }

  showLoading() {
    const loading = document.createElement('div');
    loading.id = 'version-loading';
    loading.className = 'version-loading';
    loading.innerHTML = '🔄 Carregando versão...';
    
    document.body.appendChild(loading);
  }

  bindEvents() {
    // Track version switches
    document.addEventListener('change', (e) => {
      if (e.target.id === 'version-select') {
        this.trackVersionSwitch(e.target.value);
      }
    });
  }

  trackVersionSwitch(version) {
    if (window.analytics) {
      window.analytics.trackEvent('version_switch', {
        from_version: this.currentVersion,
        to_version: version,
        category: 'Navigation'
      });
    }
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.versionSwitcher = new VersionSwitcher();
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VersionSwitcher;
}
`;
  
  fs.writeFileSync(switcherPath, switcherContent);
  console.log('   ✅ version-switcher.js criado');
  
  // CSS para version switcher
  const switcherCssPath = path.join(CONFIG.docsDir, 'assets', 'css', 'version-switcher.css');
  const switcherCssContent = `/* Version Switcher Styles */
.version-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.version-switcher-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.version-switcher label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.version-switcher select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
}

.version-info-btn {
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
}

.version-info-btn:hover {
  background: #4b5563;
}

.version-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 2000;
}

/* Responsive */
@media (max-width: 768px) {
  .version-switcher {
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
  }
  
  .version-switcher-container {
    justify-content: center;
  }
}
`;
  
  fs.writeFileSync(switcherCssPath, switcherCssContent);
  console.log('   ✅ version-switcher.css criado');
}

function setupRedirects() {
  console.log('🔄 Configurando redirects...');
  
  // Arquivo de redirects para GitHub Pages
  const redirectsPath = path.join(CONFIG.docsDir, '_redirects');
  const redirectsContent = `# Redirects para versionamento
# GitHub Pages redirects

# Redirect root para versão atual
/ /versions/v1/ 200

# Redirect versões antigas
/versions/v1/* /versions/v1/:splat 200
/versions/v2/* /versions/v2/:splat 200

# Redirect para migration guides
/migration /versions/migration-v1-to-v2.md 200
/migration-v1-to-v2 /versions/migration-v1-to-v2.md 200
/migration-v2-to-v3 /versions/migration-v2-to-v3.md 200

# Redirect para version info
/version-info /versions/version-info.md 200
`;
  
  fs.writeFileSync(redirectsPath, redirectsContent);
  console.log('   ✅ _redirects criado');
  
  // Arquivo .htaccess para Apache
  const htaccessPath = path.join(CONFIG.docsDir, '.htaccess');
  const htaccessContent = `# Apache redirects para versionamento
RewriteEngine On

# Redirect root para versão atual
RewriteRule ^$ /versions/v1/ [R=301,L]

# Redirect versões
RewriteRule ^versions/v1/(.*)$ /versions/v1/$1 [L]
RewriteRule ^versions/v2/(.*)$ /versions/v2/$1 [L]

# Redirect migration guides
RewriteRule ^migration$ /versions/migration-v1-to-v2.md [R=301,L]
RewriteRule ^migration-v1-to-v2$ /versions/migration-v1-to-v2.md [R=301,L]
RewriteRule ^migration-v2-to-v3$ /versions/migration-v2-to-v3.md [R=301,L]
`;
  
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log('   ✅ .htaccess criado');
}

function createVersioningDocs() {
  console.log('📚 Criando documentação de versionamento...');
  
  // Documentação principal de versionamento
  const versioningDocPath = path.join(CONFIG.versionsDir, 'version-info.md');
  const versioningDocContent = `# 📚 Versionamento da Documentação

> **Última atualização:** ${new Date().toISOString().split('T')[0]}

Este documento explica como funciona o versionamento da documentação do Dashboard Sabrina Costa.

## 🎯 Por que Versionar?

O versionamento da documentação é importante para:

- **Compatibilidade** - Manter versões estáveis para usuários
- **Evolução** - Permitir melhorias sem quebrar o existente
- **Migração** - Facilitar transições entre versões
- **Suporte** - Manter documentação para versões antigas

## 📋 Versões Suportadas

| Versão | Status | Suporte | Deprecação |
|--------|--------|---------|------------|
| v1.0 | ✅ Estável | Ativo | 2026-12-31 |
| v2.0 | ⚠️ Beta | Limitado | - |

## 🔄 Ciclo de Vida

### 1. **Desenvolvimento**
- Nova versão criada em branch separada
- Desenvolvimento de novas funcionalidades
- Testes e validação

### 2. **Beta**
- Versão disponível para teste
- Feedback coletado
- Correções aplicadas

### 3. **Estável**
- Versão oficial lançada
- Suporte completo
- Documentação completa

### 4. **Deprecação**
- Aviso de deprecação
- Período de transição
- Migração para nova versão

## 🛠️ Como Usar

### Alternar Versões

Use o seletor de versão no canto superior direito da página.

### Acessar Versão Específica

\`\`\`
https://docs.sabrina-costa.com/versions/v1/
https://docs.sabrina-costa.com/versions/v2/
\`\`\`

### Migration Guides

- [v1 → v2](./migration-v1-to-v2.md)
- [v2 → v3](./migration-v2-to-v3.md)

## 📊 Política de Versionamento

### Major Versions (v1, v2, v3)
- Mudanças que quebram compatibilidade
- Nova arquitetura
- Mudanças significativas na API

### Minor Versions (v1.1, v1.2)
- Novas funcionalidades
- Melhorias na documentação
- Correções de bugs

### Patch Versions (v1.1.1, v1.1.2)
- Correções de bugs
- Atualizações de segurança
- Melhorias menores

## 🔧 Ferramentas

### Scripts Disponíveis

\`\`\`bash
# Criar nova versão
npm run version:create v3

# Alternar versão
npm run version:switch v2

# Listar versões
npm run version:list

# Gerar migration guide
npm run version:migrate v1 v2
\`\`\`

### Validação

\`\`\`bash
# Validar estrutura
npm run version:validate v2

# Testar funcionalidades
npm run version:test v2
\`\`\`

## 📞 Suporte

Para questões sobre versionamento:

- **Documentação** - Consulte este guia
- **Issues** - Abra uma issue no GitHub
- **Discussões** - Use o sistema de comentários
- **Email** - marco@example.com

---

**📚 Versionamento - Dashboard Sabrina Costa**
`;
  
  fs.writeFileSync(versioningDocPath, versioningDocContent);
  console.log('   ✅ version-info.md criado');
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

if (require.main === module) {
  setupVersioning();
}

module.exports = {
  setupVersioning,
  CONFIG
};
