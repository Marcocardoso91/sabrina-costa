#!/usr/bin/env node

/**
 * Setup Script - Dashboard Sabrina Costa Docs
 * Script para configurar automaticamente a documentação
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
  apiDir: path.join(__dirname, '..', 'api'),
  assetsDir: path.join(__dirname, '..', 'assets'),
  
  // Arquivos
  packageJson: path.join(__dirname, '..', 'package.json'),
  gitignore: path.join(__dirname, '..', '.gitignore'),
  
  // Dependências
  dependencies: [
    'swagger-jsdoc@^6.2.8',
    'swagger-codegen-cli@^3.0.0',
    'nodemon@^3.0.1'
  ]
};

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

function setupDocs() {
  console.log('🚀 Configurando documentação do Dashboard Sabrina Costa...\n');
  
  try {
    // 1. Verificar Node.js
    checkNodeVersion();
    
    // 2. Criar diretórios necessários
    createDirectories();
    
    // 3. Instalar dependências
    installDependencies();
    
    // 4. Configurar arquivos
    setupFiles();
    
    // 5. Gerar documentação inicial
    generateInitialDocs();
    
    // 6. Configurar Git
    setupGit();
    
    console.log('\n🎉 Configuração concluída com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. npm run docs:generate - Gerar documentação da API');
    console.log('   2. npm run docs:serve - Servir documentação localmente');
    console.log('   3. npm run docs:watch - Modo de desenvolvimento');
    
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

function createDirectories() {
  console.log('📁 Criando diretórios necessários...');
  
  const directories = [
    CONFIG.apiDir,
    path.join(CONFIG.assetsDir, 'js'),
    path.join(CONFIG.assetsDir, 'css'),
    path.join(CONFIG.assetsDir, 'images'),
    path.join(CONFIG.assetsDir, 'videos', 'gifs'),
    path.join(CONFIG.assetsDir, 'videos', 'thumbnails'),
    path.join(CONFIG.docsDir, 'scripts'),
    path.join(CONFIG.docsDir, 'templates')
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

function installDependencies() {
  console.log('📦 Instalando dependências...');
  
  try {
    // Verificar se package.json existe
    if (!fs.existsSync(CONFIG.packageJson)) {
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
      'docs:generate': 'node scripts/generate-api-docs.js',
      'docs:serve': 'python -m http.server 8080',
      'docs:build': 'npm run docs:generate',
      'docs:watch': 'nodemon scripts/generate-api-docs.js',
      'docs:validate': 'swagger-codegen validate -i api/openapi.yaml',
      'docs:deploy': 'npm run docs:build && echo "Documentação pronta para deploy"'
    },
    devDependencies: {},
    engines: {
      node: '>=16.0.0',
      npm: '>=8.0.0'
    }
  };
  
  fs.writeFileSync(CONFIG.packageJson, JSON.stringify(packageJson, null, 2));
  console.log('   ✅ package.json criado');
}

function setupFiles() {
  console.log('📝 Configurando arquivos...');
  
  // .gitignore
  setupGitignore();
  
  // README.md
  setupReadme();
  
  // Configuração do nodemon
  setupNodemonConfig();
  
  console.log('   ✅ Arquivos de configuração criados');
}

function setupGitignore() {
  const gitignorePath = path.join(CONFIG.docsDir, '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Generated files
api/openapi.json
api/coverage-report.md

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.production

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`;
    
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('   ✅ .gitignore criado');
  }
}

function setupReadme() {
  const readmePath = path.join(CONFIG.docsDir, 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# 📚 Documentação - Dashboard Sabrina Costa

Documentação completa do projeto Dashboard Sabrina Costa, incluindo API, tutoriais e guias.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 16+
- npm 8+

### Instalação

\`\`\`bash
# Instalar dependências
npm install

# Gerar documentação da API
npm run docs:generate

# Servir documentação localmente
npm run docs:serve
\`\`\`

## 📋 Scripts Disponíveis

- \`npm run docs:generate\` - Gerar documentação da API
- \`npm run docs:serve\` - Servir documentação localmente
- \`npm run docs:build\` - Build da documentação
- \`npm run docs:watch\` - Modo de desenvolvimento
- \`npm run docs:validate\` - Validar especificação OpenAPI
- \`npm run docs:deploy\` - Preparar para deploy

## 📁 Estrutura

\`\`\`
docs/
├── api/                    # Documentação da API
│   ├── openapi.yaml       # Especificação OpenAPI
│   └── openapi.json       # Especificação JSON
├── assets/                # Assets da documentação
│   ├── js/                # Scripts JavaScript
│   ├── css/               # Estilos CSS
│   └── images/            # Imagens
├── scripts/               # Scripts de geração
│   ├── generate-api-docs.js
│   └── setup-docs.js
└── templates/             # Templates
\`\`\`

## 🔧 Configuração

A documentação é gerada automaticamente a partir dos comentários JSDoc no código do backend.

### Exemplo de Comentário JSDoc

\`\`\`javascript
/**
 * @swagger
 * /api/metrics:
 *   post:
 *     summary: Criar nova métrica
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - ctr
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               ctr:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       201:
 *         description: Métrica criada
 */
\`\`\`

## 📊 Analytics

A documentação inclui integração com:

- Google Analytics 4
- Hotjar
- Algolia DocSearch
- Feedback Widget

## 🚀 Deploy

A documentação pode ser deployada em:

- GitHub Pages
- Vercel
- Netlify
- Qualquer servidor estático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato:

- Email: marco@example.com
- GitHub: [@Marcocardoso91](https://github.com/Marcocardoso91)
- Issues: [GitHub Issues](https://github.com/Marcocardoso91/sabrina-costa/issues)
`;
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log('   ✅ README.md criado');
  }
}

function setupNodemonConfig() {
  const nodemonPath = path.join(CONFIG.docsDir, 'nodemon.json');
  
  if (!fs.existsSync(nodemonPath)) {
    const nodemonConfig = {
      watch: [
        'backend/**/*.js',
        'scripts/**/*.js'
      ],
      ext: 'js',
      ignore: [
        'node_modules/',
        'api/',
        '*.log'
      ],
      exec: 'node scripts/generate-api-docs.js'
    };
    
    fs.writeFileSync(nodemonPath, JSON.stringify(nodemonConfig, null, 2));
    console.log('   ✅ nodemon.json criado');
  }
}

function generateInitialDocs() {
  console.log('📚 Gerando documentação inicial...');
  
  try {
    // Executar script de geração
    execSync('node scripts/generate-api-docs.js', {
      stdio: 'inherit',
      cwd: CONFIG.docsDir
    });
    
    console.log('   ✅ Documentação inicial gerada');
    
  } catch (error) {
    console.log('   ⚠️  Erro ao gerar documentação inicial (normal se não houver código backend)');
  }
}

function setupGit() {
  console.log('🔧 Configurando Git...');
  
  try {
    // Verificar se é um repositório Git
    execSync('git status', { stdio: 'pipe', cwd: CONFIG.docsDir });
    
    // Adicionar arquivos gerados ao .gitignore se necessário
    const gitignorePath = path.join(CONFIG.docsDir, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      if (!gitignoreContent.includes('api/openapi.json')) {
        fs.appendFileSync(gitignorePath, '\n# Generated API docs\napi/openapi.json\n');
        console.log('   ✅ .gitignore atualizado');
      }
    }
    
    console.log('   ✅ Git configurado');
    
  } catch (error) {
    console.log('   ⚠️  Não é um repositório Git (opcional)');
  }
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

if (require.main === module) {
  setupDocs();
}

module.exports = {
  setupDocs,
  CONFIG
};
