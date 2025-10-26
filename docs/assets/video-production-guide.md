# 🎬 Guia de Produção de Vídeos - Dashboard Sabrina Costa

> **Objetivo:** Criar 7 vídeos/GIFs de demonstração para os tutoriais principais da documentação

---

## 📋 **Lista de Vídeos a Produzir**

### 1. **Como fazer login no dashboard** (GIF 30s)
- **Duração:** 30 segundos
- **Formato:** GIF animado
- **Conteúdo:**
  - Abrir página de login
  - Inserir email e senha
  - Clicar em "Entrar"
  - Redirecionamento para dashboard
  - Mostrar interface principal

**Script:**
```
1. Navegar para /login (2s)
2. Preencher email: sabrina@example.com (3s)
3. Preencher senha: ******** (3s)
4. Clicar "Entrar" (2s)
5. Loading/redirecionamento (3s)
6. Dashboard carregado (5s)
7. Mostrar métricas principais (10s)
8. Fade out (2s)
```

### 2. **Como visualizar métricas** (GIF 45s)
- **Duração:** 45 segundos
- **Formato:** GIF animado
- **Conteúdo:**
  - Acessar seção de métricas
  - Filtrar por período
  - Visualizar gráficos
  - Exportar dados

**Script:**
```
1. Clicar em "Métricas" no menu (3s)
2. Mostrar filtros de data (5s)
3. Selecionar período (últimos 30 dias) (5s)
4. Mostrar gráfico de CTR (8s)
5. Mostrar gráfico de CPC (8s)
6. Mostrar tabela de dados (8s)
7. Clicar em "Exportar CSV" (3s)
8. Download iniciado (5s)
```

### 3. **Como adicionar métrica manualmente** (GIF 60s)
- **Duração:** 60 segundos
- **Formato:** GIF animado
- **Conteúdo:**
  - Acessar formulário de métricas
  - Preencher dados
  - Validar informações
  - Salvar métrica

**Script:**
```
1. Clicar em "Adicionar Métrica" (3s)
2. Preencher data (5s)
3. Inserir Reach: 1500 (5s)
4. Inserir CTR: 7.5% (5s)
5. Inserir CPC: R$ 0.09 (5s)
6. Inserir CPM: R$ 2.50 (5s)
7. Inserir Frequency: 1.2 (5s)
8. Inserir Profile Visits: 45 (5s)
9. Inserir New Followers: 12 (5s)
10. Inserir Cost: R$ 20.00 (5s)
11. Clicar "Salvar" (3s)
12. Confirmação de sucesso (4s)
13. Métrica aparece na lista (5s)
```

### 4. **Como configurar alertas** (Vídeo 3min)
- **Duração:** 3 minutos
- **Formato:** MP4 (Loom/YouTube)
- **Conteúdo:**
  - Acessar configurações de alertas
  - Definir thresholds
  - Configurar WhatsApp
  - Testar alerta

**Script:**
```
1. Introdução (15s)
   - "Vou mostrar como configurar alertas automáticos"

2. Acessar configurações (20s)
   - Menu > Configurações > Alertas
   - Explicar interface

3. Configurar CTR Alert (45s)
   - Threshold: CTR < 5%
   - Mensagem personalizada
   - Ativar notificação

4. Configurar CPC Alert (45s)
   - Threshold: CPC > R$ 0.15
   - Mensagem de alerta
   - Configurar horário

5. Configurar WhatsApp (30s)
   - Número do WhatsApp
   - Testar conexão
   - Verificar configuração

6. Testar alerta (25s)
   - Simular condição
   - Verificar envio
   - Confirmar recebimento

7. Conclusão (20s)
   - Resumo das configurações
   - Próximos passos
```

### 5. **Como importar workflow n8n** (Vídeo 5min)
- **Duração:** 5 minutos
- **Formato:** MP4 (Loom/YouTube)
- **Conteúdo:**
  - Acessar n8n
  - Importar workflow
  - Configurar variáveis
  - Testar execução

**Script:**
```
1. Introdução (20s)
   - "Vou mostrar como importar e configurar workflows n8n"

2. Acessar n8n (30s)
   - URL do n8n
   - Login
   - Interface principal

3. Importar Workflow 1 (60s)
   - Download do arquivo JSON
   - Import > From File
   - Selecionar arquivo
   - Confirmar importação

4. Configurar variáveis (90s)
   - API URL do backend
   - Webhook secret
   - WhatsApp settings
   - Database connection

5. Testar workflow (60s)
   - Executar manualmente
   - Verificar logs
   - Confirmar funcionamento

6. Importar outros workflows (60s)
   - Workflow 2: Alertas
   - Workflow 3: Relatório
   - Workflow 4: Lembretes

7. Configurar cron jobs (30s)
   - Horários de execução
   - Frequência
   - Timezone

8. Conclusão (30s)
   - Resumo da configuração
   - Monitoramento
   - Troubleshooting
```

### 6. **Como fazer deploy frontend** (Vídeo 4min)
- **Duração:** 4 minutos
- **Formato:** MP4 (Loom/YouTube)
- **Conteúdo:**
  - Conectar repositório ao Vercel
  - Configurar build
  - Deploy automático
  - Verificar funcionamento

**Script:**
```
1. Introdução (15s)
   - "Deploy do frontend no Vercel"

2. Preparar repositório (30s)
   - Verificar arquivos
   - Commit changes
   - Push para GitHub

3. Conectar ao Vercel (60s)
   - Login no Vercel
   - Import Project
   - Selecionar repositório
   - Configurar projeto

4. Configurar build (45s)
   - Framework: Other
   - Build Command: (vazio)
   - Output Directory: .
   - Install Command: (vazio)

5. Configurar variáveis (45s)
   - API_URL
   - Environment variables
   - Preview vs Production

6. Deploy (30s)
   - Deploy automático
   - Build logs
   - Deploy status

7. Verificar funcionamento (45s)
   - Acessar URL
   - Testar login
   - Verificar API calls
   - Testar responsividade

8. Configurar domínio (30s)
   - Custom domain
   - SSL certificate
   - DNS settings

9. Conclusão (20s)
   - Deploy concluído
   - Monitoramento
   - Próximos passos
```

### 7. **Como fazer deploy backend** (Vídeo 5min)
- **Duração:** 5 minutos
- **Formato:** MP4 (Loom/YouTube)
- **Conteúdo:**
  - Configurar Vercel Functions
  - Variáveis de ambiente
  - Database connection
  - Testar endpoints

**Script:**
```
1. Introdução (20s)
   - "Deploy do backend no Vercel"

2. Preparar código (45s)
   - Estrutura de pastas
   - package.json
   - vercel.json
   - Dependencies

3. Configurar Vercel (60s)
   - Import project
   - Framework: Other
   - Build settings
   - Output directory

4. Configurar variáveis (90s)
   - DATABASE_URL
   - JWT_SECRET
   - CORS_ORIGIN
   - N8N_API_KEY
   - EVOLUTION_API_KEY

5. Deploy (45s)
   - Build process
   - Function deployment
   - Logs de build
   - Deploy status

6. Testar endpoints (60s)
   - Health check
   - Auth endpoint
   - Metrics endpoint
   - Error handling

7. Configurar domínio (30s)
   - API domain
   - CORS settings
   - SSL certificate

8. Monitoramento (30s)
   - Vercel dashboard
   - Function logs
   - Performance metrics
   - Error tracking

9. Conclusão (30s)
   - Deploy concluído
   - Próximos passos
   - Troubleshooting
```

---

## 🛠️ **Ferramentas Recomendadas**

### **Para GIFs:**
- **LICEcap** (Windows/Mac) - Simples e eficiente
- **Gifox** (Mac) - Interface moderna
- **Kap** (Mac) - Open source
- **ScreenToGif** (Windows) - Gratuito

### **Para Vídeos:**
- **Loom** - Gravação rápida e compartilhamento
- **OBS Studio** - Gravação profissional
- **QuickTime** (Mac) - Nativo
- **Camtasia** - Edição avançada

### **Para Edição:**
- **DaVinci Resolve** - Gratuito e profissional
- **Adobe Premiere** - Profissional
- **Final Cut Pro** (Mac) - Nativo
- **OpenShot** - Open source

---

## 📐 **Especificações Técnicas**

### **GIFs:**
- **Resolução:** 1280x720 (HD)
- **FPS:** 10-15 fps
- **Duração:** 30-60 segundos
- **Tamanho:** < 5MB
- **Loop:** Infinito
- **Compressão:** Otimizada

### **Vídeos:**
- **Resolução:** 1920x1080 (Full HD)
- **FPS:** 30 fps
- **Codec:** H.264
- **Bitrate:** 2-5 Mbps
- **Áudio:** 128 kbps
- **Formato:** MP4

---

## 🎨 **Diretrizes de Design**

### **Visual:**
- ✅ Cursor visível e destacado
- ✅ Cliques com feedback visual
- ✅ Transições suaves
- ✅ Texto legível
- ✅ Cores consistentes

### **Narração:**
- ✅ Tom profissional mas acessível
- ✅ Ritmo moderado
- ✅ Pausas para absorção
- ✅ Explicações claras
- ✅ Sem jargões técnicos

### **Estrutura:**
- ✅ Introdução clara
- ✅ Passos numerados
- ✅ Destaque para pontos importantes
- ✅ Resumo no final
- ✅ Call-to-action

---

## 📁 **Estrutura de Arquivos**

```
docs/assets/videos/
├── gifs/
│   ├── 01-login-dashboard.gif
│   ├── 02-visualizar-metricas.gif
│   └── 03-adicionar-metrica.gif
├── videos/
│   ├── 04-configurar-alertas.mp4
│   ├── 05-importar-workflow-n8n.mp4
│   ├── 06-deploy-frontend.mp4
│   └── 07-deploy-backend.mp4
├── thumbnails/
│   ├── 04-configurar-alertas.jpg
│   ├── 05-importar-workflow-n8n.jpg
│   ├── 06-deploy-frontend.jpg
│   └── 07-deploy-backend.jpg
└── scripts/
    ├── 01-login-script.md
    ├── 02-metricas-script.md
    ├── 03-adicionar-script.md
    ├── 04-alertas-script.md
    ├── 05-n8n-script.md
    ├── 06-frontend-script.md
    └── 07-backend-script.md
```

---

## 🚀 **Plano de Produção**

### **Semana 1:**
- [ ] Configurar ferramentas de gravação
- [ ] Criar scripts detalhados
- [ ] Gravar GIFs (1-3)
- [ ] Editar e otimizar GIFs

### **Semana 2:**
- [ ] Gravar vídeos (4-7)
- [ ] Editar vídeos
- [ ] Criar thumbnails
- [ ] Upload para plataformas

### **Semana 3:**
- [ ] Integrar em documentação
- [ ] Testar em diferentes dispositivos
- [ ] Otimizar para performance
- [ ] Documentar processo

---

## 📊 **Métricas de Sucesso**

### **Qualidade:**
- ✅ Resolução adequada
- ✅ Áudio claro
- ✅ Duração otimizada
- ✅ Conteúdo relevante

### **Engajamento:**
- ✅ Taxa de conclusão > 80%
- ✅ Tempo médio de visualização
- ✅ Feedback positivo
- ✅ Redução de tickets de suporte

### **Performance:**
- ✅ Tempo de carregamento < 3s
- ✅ Compatibilidade cross-browser
- ✅ Funcionamento em mobile
- ✅ Acessibilidade

---

## 🔄 **Manutenção**

### **Atualizações:**
- ✅ Revisar vídeos a cada 3 meses
- ✅ Atualizar quando houver mudanças na UI
- ✅ Manter sincronização com documentação
- ✅ Backup de arquivos originais

### **Versionamento:**
- ✅ v1.0 - Versão inicial
- ✅ v1.1 - Atualizações menores
- ✅ v2.0 - Mudanças significativas
- ✅ Changelog de alterações

---

**🎬 Com este guia, você terá tudo que precisa para criar vídeos profissionais que melhoram significativamente a experiência do usuário na documentação!**
