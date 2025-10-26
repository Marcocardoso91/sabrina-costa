# Como Configurar RSS Feeds para Documentação

Este guia detalha como implementar o sistema de RSS feeds para notificar atualizações da documentação do Dashboard Sabrina Costa.

## 🎯 **Visão Geral**

O sistema de RSS feeds oferece:
- **Múltiplos feeds** por categoria e tags
- **Geração automática** baseada em mudanças
- **Integração com GitHub Actions** para CI/CD
- **Formato RSS 2.0** e Atom compatível
- **Notificações em tempo real** de atualizações

## 📋 **Pré-requisitos**

- Node.js 18+ instalado
- Sistema de documentação estruturado
- Repositório Git configurado
- GitHub Actions habilitado (opcional)

## 🚀 **Implementação**

### 1. **Configuração Inicial**

Execute o script de setup:

```bash
# Navegar para o diretório docs
cd docs

# Executar setup do RSS
node scripts/setup-rss.js
```

### 2. **Estrutura de Arquivos**

O sistema criará a seguinte estrutura:

```
docs/
├── scripts/
│   ├── generate-rss.js      # Gerador de feeds
│   ├── rss-watcher.js       # Monitor de mudanças
│   └── setup-rss.js         # Script de configuração
├── feeds/
│   ├── rss.xml              # Feed principal
│   ├── tutorial.xml         # Feed de tutoriais
│   ├── how-to.xml           # Feed de guias práticos
│   ├── reference.xml        # Feed de referência
│   ├── explanation.xml      # Feed de explicações
│   ├── recent.xml           # Feed de atualizações recentes
│   └── index.html           # Página de feeds
└── .github/workflows/
    └── rss.yml              # Workflow do GitHub Actions
```

### 3. **Configuração de Artigos**

Edite o arquivo `scripts/generate-rss.js` para configurar seus artigos:

```javascript
loadArticlesData() {
  this.articles = [
    {
      id: 'unique-id',
      title: 'Título do Artigo',
      description: 'Descrição do artigo...',
      url: '/docs/path/to/article.md',
      category: 'tutorial', // tutorial, how-to, reference, explanation
      tags: ['tag1', 'tag2'],
      lastUpdated: '2025-10-23',
      author: 'Sabrina Costa',
      content: 'Conteúdo completo do artigo...'
    }
    // Adicione mais artigos...
  ];
}
```

## 🎨 **Personalização**

### **Configuração de Feeds**

Personalize os feeds editando o método `generateFeeds()`:

```javascript
generateFeeds() {
  // Feed principal (todos os artigos)
  this.generateMainFeed();
  
  // Feeds por categoria
  this.generateCategoryFeeds();
  
  // Feeds por tags populares
  this.generateTagFeeds();
  
  // Feed de atualizações recentes
  this.generateRecentFeed();
}
```

### **Metadados do Feed**

Configure informações do feed:

```javascript
const feed = new RSS({
  title: 'Dashboard Sabrina Costa - Documentação',
  description: 'Documentação completa do Dashboard Sabrina Costa.',
  feed_url: 'https://sabrina-costa.vercel.app/feeds/rss.xml',
  site_url: 'https://sabrina-costa.vercel.app/docs/',
  image_url: 'https://sabrina-costa.vercel.app/assets/images/logo.png',
  language: 'pt-BR',
  managingEditor: 'Sabrina Costa',
  webMaster: 'Sabrina Costa',
  copyright: '2025 Sabrina Costa',
  ttl: 60 // Time to live em minutos
});
```

### **Categorias e Tags**

Configure categorias personalizadas:

```javascript
const categories = ['tutorial', 'how-to', 'reference', 'explanation'];

categories.forEach(category => {
  const categoryArticles = this.articles.filter(article => 
    article.category === category
  );
  // Gerar feed para categoria...
});
```

## 🔧 **Configurações Avançadas**

### **1. Monitoramento de Mudanças**

Para monitorar mudanças automaticamente:

```bash
# Iniciar monitor de mudanças
node scripts/rss-watcher.js
```

### **2. Integração com GitHub Actions**

O sistema cria automaticamente um workflow:

```yaml
# .github/workflows/rss.yml
name: Generate RSS Feeds

on:
  push:
    branches: [main]
    paths:
      - 'docs/**/*.md'
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
          git push
```

### **3. Scripts NPM**

Adicione scripts ao `package.json`:

```json
{
  "scripts": {
    "rss:generate": "node scripts/generate-rss.js",
    "rss:watch": "node scripts/rss-watcher.js",
    "rss:setup": "node scripts/setup-rss.js"
  }
}
```

### **4. Configuração de URLs**

Configure as URLs base:

```javascript
class RSSFeedGenerator {
  constructor() {
    this.baseUrl = 'https://sabrina-costa.vercel.app'; // Sua URL
    this.docsPath = path.resolve(__dirname, '..');
    this.outputPath = path.resolve(__dirname, '../feeds');
  }
}
```

## 📱 **Tipos de Feeds**

### **1. Feed Principal**

- **URL:** `/feeds/rss.xml`
- **Conteúdo:** Todos os artigos
- **Frequência:** Atualizado a cada mudança

### **2. Feeds por Categoria**

- **Tutoriais:** `/feeds/tutorial.xml`
- **Guias Práticos:** `/feeds/how-to.xml`
- **Referência:** `/feeds/reference.xml`
- **Explicações:** `/feeds/explanation.xml`

### **3. Feeds por Tags**

- **Início:** `/feeds/tag-início.xml`
- **Deploy:** `/feeds/tag-deploy.xml`
- **Automação:** `/feeds/tag-automação.xml`
- **API:** `/feeds/tag-api.xml`
- **Métricas:** `/feeds/tag-métricas.xml`

### **4. Feed de Atualizações**

- **URL:** `/feeds/recent.xml`
- **Conteúdo:** 10 artigos mais recentes
- **Frequência:** Atualizado diariamente

## 🚀 **Deploy**

### **1. Configuração Local**

```bash
# Instalar dependências
npm install

# Gerar feeds iniciais
npm run rss:generate

# Iniciar monitor (opcional)
npm run rss:watch
```

### **2. Deploy Automático**

O GitHub Actions cuidará do deploy automático:

1. **Push para main:** Gera feeds automaticamente
2. **Agendamento diário:** Atualiza feeds às 2h da manhã
3. **Commit automático:** Salva mudanças no repositório

### **3. Verificação**

- [ ] Feeds são gerados corretamente
- [ ] URLs estão funcionando
- [ ] Conteúdo está atualizado
- [ ] GitHub Actions está funcionando
- [ ] Página de feeds está acessível

## 📊 **Analytics e Monitoramento**

### **1. Logs de Mudanças**

O sistema gera logs em `feeds/change-log.json`:

```json
[
  {
    "timestamp": "2025-10-23T18:00:00.000Z",
    "file": "docs/tutorials/01-quickstart.md",
    "action": "rss_regenerated"
  }
]
```

### **2. Estatísticas**

```javascript
// Obter estatísticas dos feeds
const stats = watcher.getStats();
console.log('Total feeds:', stats.totalFeeds);
console.log('Last generated:', stats.lastGenerated);
```

### **3. Monitoramento de Performance**

```javascript
// Verificar tamanho dos feeds
Object.entries(stats.feedSizes).forEach(([file, size]) => {
  console.log(`${file}: ${size} bytes`);
});
```

## 🐛 **Troubleshooting**

### **Problemas Comuns**

**Feeds não são gerados:**
- Verifique se as dependências estão instaladas
- Confirme se o Node.js está na versão 18+
- Verifique os logs de erro

**Feeds não são atualizados:**
- Confirme se o GitHub Actions está funcionando
- Verifique se os arquivos estão sendo commitados
- Teste a geração manual

**URLs não funcionam:**
- Verifique se o `baseUrl` está correto
- Confirme se os feeds estão no diretório correto
- Teste o acesso direto aos arquivos XML

### **Debug**

```bash
# Gerar feeds manualmente
node scripts/generate-rss.js

# Verificar logs
cat feeds/change-log.json

# Testar URLs
curl https://sabrina-costa.vercel.app/feeds/rss.xml
```

## 📚 **Recursos Adicionais**

- [Exemplo de RSS feed](feeds/rss-example.xml)
- [Script de geração](scripts/generate-rss.js)
- [Monitor de mudanças](scripts/rss-watcher.js)
- [Página de feeds](feeds/index.html)

---

**🎉 Sistema de RSS feeds configurado com sucesso!**

Os usuários agora podem assinar os feeds para receber notificações automáticas de atualizações da documentação.
