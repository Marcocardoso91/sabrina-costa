#!/usr/bin/env node

/**
 * Setup Changelog - Dashboard Sabrina Costa
 * Script para configurar conventional-changelog automaticamente
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
  scriptsDir: path.join(__dirname),
  
  // Arquivos
  packageJsonPath: path.join(__dirname, '..', 'package.json'),
  changelogPath: path.join(__dirname, '..', 'CHANGELOG.md'),
  gitignorePath: path.join(__dirname, '..', '.gitignore'),
  
  // Dependências
  dependencies: [
    'conventional-changelog-cli@^4.1.0',
    'conventional-commits@^1.0.0',
    'commitizen@^4.3.0',
    'cz-conventional-changelog@^3.3.0',
    'husky@^8.0.3',
    'lint-staged@^13.2.0'
  ]
};

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

function setupChangelog() {
  console.log('📝 Configurando changelog automático...\n');
  
  try {
    // 1. Verificar Node.js
    checkNodeVersion();
    
    // 2. Instalar dependências
    installDependencies();
    
    // 3. Configurar package.json
    setupPackageJson();
    
    // 4. Configurar Git hooks
    setupGitHooks();
    
    // 5. Configurar commitizen
    setupCommitizen();
    
    // 6. Criar arquivos de configuração
    createConfigFiles();
    
    // 7. Gerar changelog inicial
    generateInitialChangelog();
    
    console.log('\n🎉 Changelog configurado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. npm run changelog - Gerar changelog');
    console.log('   2. npm run commit - Fazer commit com convenção');
    console.log('   3. npm run changelog:version - Gerar nova versão');
    
  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function checkNodeVersion() {
  console.log('🔍 Verificando versão do Node.js...');
  
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 16) {
    throw new Error('Node.js 16+ é necessário. Versão atual: ' + nodeVersion);
  }
  
  console.log(`✅ Node.js ${nodeVersion} detectado`);
}

function installDependencies() {
  console.log('📦 Instalando dependências...');
  
  try {
    // Verificar se package.json existe
    if (!fs.existsSync(CONFIG.packageJsonPath)) {
      console.log('   ⚠️  package.json não encontrado, criando...');
      createPackageJson();
    }
    
    // Instalar dependências
    console.log('   📥 Instalando dependências de desenvolvimento...');
    execSync(`npm install ${CONFIG.dependencies.join(' ')} --save-dev`, {
      stdio: 'inherit',
      cwd: CONFIG.docsDir
    });
    
    console.log('   ✅ Dependências instaladas com sucesso');
    
  } catch (error) {
    console.error('   ❌ Erro ao instalar dependências:', error.message);
    throw error;
  }
}

function createPackageJson() {
  const packageJson = {
    name: 'sabrina-costa-docs',
    version: '1.0.0',
    description: 'Documentação do Dashboard Sabrina Costa',
    scripts: {
      'changelog': 'conventional-changelog -p angular -i CHANGELOG.md -s',
      'changelog:version': 'npm run changelog && git add CHANGELOG.md',
      'commit': 'git-cz',
      'prepare': 'husky install',
      'lint-staged': 'lint-staged'
    },
    config: {
      commitizen: {
        path: './node_modules/cz-conventional-changelog'
      }
    },
    devDependencies: {},
    engines: {
      node: '>=16.0.0',
      npm: '>=8.0.0'
    }
  };
  
  fs.writeFileSync(CONFIG.packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('   ✅ package.json criado');
}

function setupPackageJson() {
  console.log('📝 Configurando package.json...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(CONFIG.packageJsonPath, 'utf8'));
    
    // Adicionar scripts se não existirem
    const scripts = {
      'changelog': 'conventional-changelog -p angular -i CHANGELOG.md -s',
      'changelog:version': 'npm run changelog && git add CHANGELOG.md',
      'commit': 'git-cz',
      'prepare': 'husky install',
      'lint-staged': 'lint-staged'
    };
    
    Object.entries(scripts).forEach(([key, value]) => {
      if (!packageJson.scripts[key]) {
        packageJson.scripts[key] = value;
      }
    });
    
    // Adicionar configuração do commitizen
    if (!packageJson.config) {
      packageJson.config = {};
    }
    
    if (!packageJson.config.commitizen) {
      packageJson.config.commitizen = {
        path: './node_modules/cz-conventional-changelog'
      };
    }
    
    // Adicionar configuração do lint-staged
    if (!packageJson['lint-staged']) {
      packageJson['lint-staged'] = {
        '*.md': ['prettier --write'],
        '*.js': ['eslint --fix'],
        '*.json': ['prettier --write']
      };
    }
    
    fs.writeFileSync(CONFIG.packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('   ✅ package.json configurado');
    
  } catch (error) {
    console.error('   ❌ Erro ao configurar package.json:', error.message);
    throw error;
  }
}

function setupGitHooks() {
  console.log('🔧 Configurando Git hooks...');
  
  try {
    // Verificar se é um repositório Git
    execSync('git status', { stdio: 'pipe' });
    
    // Instalar husky
    execSync('npx husky install', { stdio: 'inherit', cwd: CONFIG.docsDir });
    
    // Criar hook de commit
    const commitMsgPath = path.join(CONFIG.docsDir, '.husky', 'commit-msg');
    const commitMsgContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validar mensagem de commit
npx commitlint --edit $1
`;
    
    fs.writeFileSync(commitMsgPath, commitMsgContent);
    fs.chmodSync(commitMsgPath, '755');
    
    // Criar hook de pre-commit
    const preCommitPath = path.join(CONFIG.docsDir, '.husky', 'pre-commit');
    const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Executar lint-staged
npx lint-staged
`;
    
    fs.writeFileSync(preCommitPath, preCommitContent);
    fs.chmodSync(preCommitPath, '755');
    
    console.log('   ✅ Git hooks configurados');
    
  } catch (error) {
    console.log('   ⚠️  Não é um repositório Git (opcional)');
  }
}

function setupCommitizen() {
  console.log('🎯 Configurando commitizen...');
  
  try {
    // Criar arquivo de configuração do commitizen
    const commitizenPath = path.join(CONFIG.docsDir, '.czrc');
    const commitizenConfig = {
      path: 'cz-conventional-changelog'
    };
    
    fs.writeFileSync(commitizenPath, JSON.stringify(commitizenConfig, null, 2));
    console.log('   ✅ commitizen configurado');
    
  } catch (error) {
    console.error('   ❌ Erro ao configurar commitizen:', error.message);
    throw error;
  }
}

function createConfigFiles() {
  console.log('📝 Criando arquivos de configuração...');
  
  // Configuração do commitlint
  createCommitlintConfig();
  
  // Configuração do prettier
  createPrettierConfig();
  
  // Configuração do eslint
  createEslintConfig();
  
  console.log('   ✅ Arquivos de configuração criados');
}

function createCommitlintConfig() {
  const commitlintPath = path.join(CONFIG.docsDir, 'commitlint.config.js');
  const commitlintConfig = `module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
};
`;
  
  fs.writeFileSync(commitlintPath, commitlintConfig);
  console.log('   ✅ commitlint.config.js criado');
}

function createPrettierConfig() {
  const prettierPath = path.join(CONFIG.docsDir, '.prettierrc');
  const prettierConfig = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false
  };
  
  fs.writeFileSync(prettierPath, JSON.stringify(prettierConfig, null, 2));
  console.log('   ✅ .prettierrc criado');
}

function createEslintConfig() {
  const eslintPath = path.join(CONFIG.docsDir, '.eslintrc.js');
  const eslintConfig = `module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
`;
  
  fs.writeFileSync(eslintPath, eslintConfig);
  console.log('   ✅ .eslintrc.js criado');
}

function generateInitialChangelog() {
  console.log('📝 Gerando changelog inicial...');
  
  try {
    const changelogContent = `# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - ${new Date().toISOString().split('T')[0]}

### Adicionado

- Estrutura inicial da documentação
- Sistema de changelog automático
- Configuração de Git hooks
- Validação de commits
- Geração automática de changelog

### Configuração

- Conventional commits
- Commitizen para commits padronizados
- Husky para Git hooks
- Lint-staged para validação
- Prettier para formatação
- ESLint para qualidade de código

## [0.0.1] - ${new Date().toISOString().split('T')[0]}

### Adicionado

- Primeira versão do projeto
`;
    
    fs.writeFileSync(CONFIG.changelogPath, changelogContent);
    console.log('   ✅ CHANGELOG.md criado');
    
  } catch (error) {
    console.error('   ❌ Erro ao gerar changelog inicial:', error.message);
    throw error;
  }
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

if (require.main === module) {
  setupChangelog();
}

module.exports = {
  setupChangelog,
  CONFIG
};
