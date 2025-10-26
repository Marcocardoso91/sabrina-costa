/**
 * RSS Feed Setup Script
 * Dashboard Sabrina Costa Documentation
 * 
 * Features:
 * - Install required dependencies
 * - Create necessary directories
 * - Generate initial feeds
 * - Setup GitHub Actions integration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class RSSSetup {
  constructor() {
    this.docsPath = path.resolve(__dirname, '..');
    this.feedsPath = path.join(this.docsPath, 'feeds');
    this.init();
  }

  init() {
    console.log('Setting up RSS feed system...');
    this.installDependencies();
    this.createDirectories();
    this.generateInitialFeeds();
    this.setupGitHubActions();
    this.createRSSIndex();
    console.log('RSS feed system setup complete!');
  }

  /**
   * Install required dependencies
   */
  installDependencies() {
    console.log('Installing RSS dependencies...');
    
    const dependencies = [
      'rss',
      'chokidar'
    ];

    dependencies.forEach(dep => {
      try {
        execSync(`npm install ${dep} --save-dev`, { 
          cwd: this.docsPath,
          stdio: 'inherit'
        });
        console.log(`✓ Installed ${dep}`);
      } catch (error) {
        console.warn(`⚠ Could not install ${dep}:`, error.message);
      }
    });
  }

  /**
   * Create necessary directories
   */
  createDirectories() {
    console.log('Creating RSS directories...');
    
    const directories = [
      this.feedsPath,
      path.join(this.feedsPath, 'assets'),
      path.join(this.docsPath, 'scripts')
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✓ Created directory: ${dir}`);
      } else {
        console.log(`✓ Directory already exists: ${dir}`);
      }
    });
  }

  /**
   * Generate initial RSS feeds
   */
  generateInitialFeeds() {
    console.log('Generating initial RSS feeds...');
    
    try {
      execSync('node scripts/generate-rss.js', { 
        cwd: this.docsPath,
        stdio: 'inherit'
      });
      console.log('✓ Initial RSS feeds generated');
    } catch (error) {
      console.warn('⚠ Could not generate initial feeds:', error.message);
    }
  }

  /**
   * Setup GitHub Actions integration
   */
  setupGitHubActions() {
    console.log('Setting up GitHub Actions integration...');
    
    const workflowsPath = path.join(this.docsPath, '.github', 'workflows');
    const rssWorkflowPath = path.join(workflowsPath, 'rss.yml');
    
    // Create .github/workflows directory if it doesn't exist
    if (!fs.existsSync(workflowsPath)) {
      fs.mkdirSync(workflowsPath, { recursive: true });
    }

    // Create RSS workflow
    const rssWorkflow = `# RSS Feed Generation Workflow
name: Generate RSS Feeds

on:
  push:
    branches: [main]
    paths:
      - 'docs/**/*.md'
      - 'docs/scripts/generate-rss.js'
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  generate-rss:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd docs
          npm install
          
      - name: Generate RSS feeds
        run: |
          cd docs
          node scripts/generate-rss.js
          
      - name: Commit and push changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add feeds/
          git diff --staged --quiet || git commit -m "Update RSS feeds [skip ci]"
          git push`;

    fs.writeFileSync(rssWorkflowPath, rssWorkflow);
    console.log('✓ GitHub Actions workflow created');
  }

  /**
   * Create RSS index page
   */
  createRSSIndex() {
    console.log('Creating RSS index page...');
    
    const indexContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSS Feeds - Dashboard Sabrina Costa</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-800 mb-8">RSS Feeds</h1>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-semibold text-gray-700 mb-4">Feeds Disponíveis</h2>
                <p class="text-gray-600 mb-6">Assine nossos feeds RSS para receber atualizações da documentação automaticamente.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">📚 Feed Principal</h3>
                        <p class="text-sm text-gray-600 mb-3">Todas as atualizações da documentação</p>
                        <a href="/feeds/rss.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">📖 Tutoriais</h3>
                        <p class="text-sm text-gray-600 mb-3">Guias passo a passo</p>
                        <a href="/feeds/tutorial.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">🔧 Guias Práticos</h3>
                        <p class="text-sm text-gray-600 mb-3">Como fazer tarefas específicas</p>
                        <a href="/feeds/how-to.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">📖 Referência</h3>
                        <p class="text-sm text-gray-600 mb-3">Documentação técnica</p>
                        <a href="/feeds/reference.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">💡 Explicações</h3>
                        <p class="text-sm text-gray-600 mb-3">Conceitos e arquitetura</p>
                        <a href="/feeds/explanation.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">🔄 Atualizações Recentes</h3>
                        <p class="text-sm text-gray-600 mb-3">Últimas mudanças</p>
                        <a href="/feeds/recent.xml" class="text-blue-600 hover:underline">Assinar RSS</a>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-blue-800 mb-2">Como Usar</h3>
                <ol class="list-decimal list-inside text-blue-700 space-y-2">
                    <li>Copie o link do feed desejado</li>
                    <li>Cole no seu leitor de RSS favorito</li>
                    <li>Receba atualizações automaticamente</li>
                </ol>
            </div>
        </div>
    </div>
</body>
</html>`;

    const indexPath = path.join(this.feedsPath, 'index.html');
    fs.writeFileSync(indexPath, indexContent);
    console.log('✓ RSS index page created');
  }

  /**
   * Add RSS scripts to package.json
   */
  addRSSScripts() {
    console.log('Adding RSS scripts to package.json...');
    
    const packageJsonPath = path.join(this.docsPath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts['rss:generate'] = 'node scripts/generate-rss.js';
        packageJson.scripts['rss:watch'] = 'node scripts/rss-watcher.js';
        packageJson.scripts['rss:setup'] = 'node scripts/setup-rss.js';
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✓ RSS scripts added to package.json');
      } catch (error) {
        console.warn('⚠ Could not update package.json:', error.message);
      }
    }
  }
}

// Run the setup
new RSSSetup();
