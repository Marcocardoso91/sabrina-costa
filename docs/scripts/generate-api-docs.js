#!/usr/bin/env node

/**
 * Auto-Generate API Documentation - Dashboard Sabrina Costa
 * Script para gerar documentação da API automaticamente usando swagger-jsdoc
 * 
 * @version 1.0.0
 * @author Marco Cardoso
 * @lastUpdated 2025-10-23
 */

const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURAÇÃO DO SWAGGER-JSDOC
// ============================================================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dashboard Sabrina Costa API',
      version: '1.0.0',
      description: `
        API RESTful completa para o Dashboard Sabrina Costa.
        
        ## Funcionalidades
        
        - 🔐 **Autenticação JWT** - Sistema seguro de login
        - 📊 **Gestão de Métricas** - CRUD completo de métricas do Instagram
        - 📅 **Cronograma de Posts** - Agendamento e gestão de conteúdo
        - 🚨 **Sistema de Alertas** - Notificações automáticas via WhatsApp
        - 🎣 **Ganchos Virais** - Biblioteca de hooks para conteúdo
        - 🔗 **Webhooks** - Integração com sistemas externos
        - ⚙️ **Configurações** - Gestão de parâmetros do sistema
        
        ## Autenticação
        
        Todos os endpoints protegidos exigem um JWT válido no header \`Authorization\`:
        \`\`\`
        Authorization: Bearer <seu-jwt-token>
        \`\`\`
        
        ## Rate Limiting
        
        A API implementa rate limiting para garantir estabilidade:
        - **100 requests/minuto** por IP
        - **1000 requests/hora** por usuário autenticado
        
        ## Códigos de Resposta
        
        - \`200 OK\` - Requisição bem-sucedida
        - \`201 Created\` - Recurso criado com sucesso
        - \`400 Bad Request\` - Dados inválidos
        - \`401 Unauthorized\` - Token ausente/inválido
        - \`403 Forbidden\` - Acesso negado
        - \`404 Not Found\` - Recurso não encontrado
        - \`429 Too Many Requests\` - Rate limit excedido
        - \`500 Internal Server Error\` - Erro interno
      `,
      contact: {
        name: 'Marco Cardoso',
        email: 'marco@example.com',
        url: 'https://github.com/Marcocardoso91'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://backend-smoky-theta.vercel.app/api',
        description: 'Servidor de Produção'
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para autenticação e gestão de usuários'
      },
      {
        name: 'Métricas',
        description: 'Gestão de métricas de desempenho do Instagram'
      },
      {
        name: 'Cronograma',
        description: 'Agendamento e gestão de posts'
      },
      {
        name: 'Alertas',
        description: 'Sistema de notificações e alertas'
      },
      {
        name: 'Ganchos',
        description: 'Biblioteca de ganchos virais e categorias'
      },
      {
        name: 'Webhooks',
        description: 'Endpoints para integração externa'
      },
      {
        name: 'Configurações',
        description: 'Gestão de configurações do sistema'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtido através do endpoint /auth/login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'Papel do usuário no sistema'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          },
          required: ['id', 'email', 'name', 'role']
        },
        Metric: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da métrica'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data da métrica (YYYY-MM-DD)'
            },
            reach: {
              type: 'integer',
              minimum: 0,
              description: 'Alcance (número de pessoas)'
            },
            ctr: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 100,
              description: 'Taxa de cliques (%)'
            },
            cpc: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Custo por clique (R$)'
            },
            cpm: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Custo por mil impressões (R$)'
            },
            frequency: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Frequência de exibição'
            },
            profileVisits: {
              type: 'integer',
              minimum: 0,
              description: 'Visitas ao perfil'
            },
            newFollowers: {
              type: 'integer',
              minimum: 0,
              description: 'Novos seguidores'
            },
            cost: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Custo total (R$)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          },
          required: ['date']
        },
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do post'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data agendada para o post'
            },
            weekNumber: {
              type: 'integer',
              minimum: 1,
              maximum: 52,
              description: 'Número da semana'
            },
            format: {
              type: 'string',
              enum: ['carousel', 'reel', 'story', 'post'],
              description: 'Formato do conteúdo'
            },
            theme: {
              type: 'string',
              description: 'Tema do post'
            },
            hook: {
              type: 'string',
              description: 'Gancho viral do post'
            },
            cta: {
              type: 'string',
              description: 'Call-to-action'
            },
            status: {
              type: 'string',
              enum: ['planned', 'published', 'cancelled'],
              description: 'Status do post'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          },
          required: ['date', 'format', 'theme']
        },
        Alert: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do alerta'
            },
            type: {
              type: 'string',
              description: 'Tipo do alerta'
            },
            message: {
              type: 'string',
              description: 'Mensagem do alerta'
            },
            thresholdValue: {
              type: 'number',
              format: 'float',
              description: 'Valor limite'
            },
            actualValue: {
              type: 'number',
              format: 'float',
              description: 'Valor atual'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Data do alerta'
            },
            sentAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de envio'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          },
          required: ['type', 'message', 'date']
        },
        Hook: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do gancho'
            },
            title: {
              type: 'string',
              description: 'Título do gancho'
            },
            content: {
              type: 'string',
              description: 'Conteúdo do gancho'
            },
            category: {
              type: 'string',
              description: 'Categoria do gancho'
            },
            usageCount: {
              type: 'integer',
              minimum: 0,
              description: 'Número de usos'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização'
            }
          },
          required: ['title', 'content', 'category']
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            code: {
              type: 'string',
              description: 'Código do erro'
            },
            details: {
              type: 'object',
              description: 'Detalhes adicionais do erro'
            }
          },
          required: ['message']
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            },
            data: {
              type: 'object',
              description: 'Dados retornados'
            }
          },
          required: ['message']
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    // Incluir todos os arquivos de rotas do backend
    './backend/routes/*.js',
    './backend/controllers/*.js',
    './backend/middleware/*.js'
  ]
};

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

function generateApiDocs() {
  console.log('🚀 Gerando documentação da API...');
  
  try {
    // Gerar especificação OpenAPI
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    
    // Validar especificação
    if (!swaggerSpec || !swaggerSpec.paths) {
      throw new Error('Especificação OpenAPI inválida');
    }
    
    // Criar diretório de saída se não existir
    const outputDir = path.join(__dirname, '..', 'api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Salvar especificação YAML
    const yamlPath = path.join(outputDir, 'openapi.yaml');
    const yamlContent = convertToYAML(swaggerSpec);
    fs.writeFileSync(yamlPath, yamlContent);
    console.log(`✅ Especificação YAML salva em: ${yamlPath}`);
    
    // Salvar especificação JSON
    const jsonPath = path.join(outputDir, 'openapi.json');
    fs.writeFileSync(jsonPath, JSON.stringify(swaggerSpec, null, 2));
    console.log(`✅ Especificação JSON salva em: ${jsonPath}`);
    
    // Gerar estatísticas
    const stats = generateStats(swaggerSpec);
    console.log('\n📊 Estatísticas da API:');
    console.log(`   - Endpoints: ${stats.endpoints}`);
    console.log(`   - Métodos HTTP: ${stats.methods.join(', ')}`);
    console.log(`   - Tags: ${stats.tags.join(', ')}`);
    console.log(`   - Schemas: ${stats.schemas}`);
    
    // Gerar relatório de cobertura
    generateCoverageReport(swaggerSpec);
    
    console.log('\n🎉 Documentação da API gerada com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao gerar documentação:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function convertToYAML(obj) {
  // Conversão simples para YAML (em produção, usar biblioteca como js-yaml)
  let yaml = 'openapi: 3.0.0\n';
  yaml += 'info:\n';
  yaml += `  title: ${obj.info.title}\n`;
  yaml += `  version: ${obj.info.version}\n`;
  yaml += `  description: |\n`;
  yaml += `    ${obj.info.description.split('\n').map(line => `    ${line}`).join('\n')}\n`;
  
  // Adicionar servidores
  yaml += 'servers:\n';
  obj.servers.forEach(server => {
    yaml += `  - url: ${server.url}\n`;
    yaml += `    description: ${server.description}\n`;
  });
  
  // Adicionar tags
  yaml += 'tags:\n';
  obj.tags.forEach(tag => {
    yaml += `  - name: ${tag.name}\n`;
    yaml += `    description: ${tag.description}\n`;
  });
  
  // Adicionar componentes
  yaml += 'components:\n';
  yaml += '  securitySchemes:\n';
  yaml += '    bearerAuth:\n';
  yaml += '      type: http\n';
  yaml += '      scheme: bearer\n';
  yaml += '      bearerFormat: JWT\n';
  
  // Adicionar schemas
  yaml += '  schemas:\n';
  Object.entries(obj.components.schemas).forEach(([name, schema]) => {
    yaml += `    ${name}:\n`;
    yaml += `      type: ${schema.type}\n`;
    if (schema.properties) {
      yaml += '      properties:\n';
      Object.entries(schema.properties).forEach(([prop, propSchema]) => {
        yaml += `        ${prop}:\n`;
        yaml += `          type: ${propSchema.type}\n`;
        if (propSchema.description) {
          yaml += `          description: ${propSchema.description}\n`;
        }
        if (propSchema.format) {
          yaml += `          format: ${propSchema.format}\n`;
        }
        if (propSchema.enum) {
          yaml += `          enum: [${propSchema.enum.join(', ')}]\n`;
        }
        if (propSchema.minimum !== undefined) {
          yaml += `          minimum: ${propSchema.minimum}\n`;
        }
        if (propSchema.maximum !== undefined) {
          yaml += `          maximum: ${propSchema.maximum}\n`;
        }
      });
    }
    if (schema.required) {
      yaml += `      required: [${schema.required.join(', ')}]\n`;
    }
  });
  
  // Adicionar paths (simplificado)
  yaml += 'paths:\n';
  Object.entries(obj.paths).forEach(([path, methods]) => {
    yaml += `  ${path}:\n`;
    Object.entries(methods).forEach(([method, spec]) => {
      yaml += `    ${method}:\n`;
      yaml += `      summary: ${spec.summary}\n`;
      if (spec.tags) {
        yaml += `      tags: [${spec.tags.join(', ')}]\n`;
      }
      if (spec.security) {
        yaml += '      security:\n';
        yaml += '        - bearerAuth: []\n';
      }
      if (spec.responses) {
        yaml += '      responses:\n';
        Object.entries(spec.responses).forEach(([code, response]) => {
          yaml += `        ${code}:\n`;
          yaml += `          description: ${response.description}\n`;
        }));
      }
    });
  });
  
  return yaml;
}

function generateStats(spec) {
  const endpoints = Object.keys(spec.paths).length;
  const methods = new Set();
  const tags = new Set();
  const schemas = Object.keys(spec.components.schemas).length;
  
  Object.values(spec.paths).forEach(path => {
    Object.values(path).forEach(method => {
      if (method.tags) {
        method.tags.forEach(tag => tags.add(tag));
      }
      if (method.summary) {
        methods.add(method.summary.split(' ')[0]);
      }
    });
  });
  
  return {
    endpoints,
    methods: Array.from(methods),
    tags: Array.from(tags),
    schemas
  };
}

function generateCoverageReport(spec) {
  const reportPath = path.join(__dirname, '..', 'api', 'coverage-report.md');
  
  let report = '# 📊 Relatório de Cobertura da API\n\n';
  report += `**Gerado em:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  
  // Estatísticas gerais
  const stats = generateStats(spec);
  report += '## 📈 Estatísticas Gerais\n\n';
  report += `- **Total de Endpoints:** ${stats.endpoints}\n`;
  report += `- **Total de Schemas:** ${stats.schemas}\n`;
  report += `- **Tags:** ${stats.tags.join(', ')}\n\n`;
  
  // Cobertura por tag
  report += '## 🏷️ Cobertura por Tag\n\n';
  stats.tags.forEach(tag => {
    const tagEndpoints = Object.entries(spec.paths)
      .filter(([path, methods]) => 
        Object.values(methods).some(method => method.tags?.includes(tag))
      ).length;
    
    report += `- **${tag}:** ${tagEndpoints} endpoints\n`;
  });
  
  // Endpoints por método HTTP
  report += '\n## 🔄 Endpoints por Método HTTP\n\n';
  const methodCounts = {};
  Object.values(spec.paths).forEach(methods => {
    Object.keys(methods).forEach(method => {
      methodCounts[method.toUpperCase()] = (methodCounts[method.toUpperCase()] || 0) + 1;
    });
  });
  
  Object.entries(methodCounts).forEach(([method, count]) => {
    report += `- **${method}:** ${count} endpoints\n`;
  });
  
  // Schemas mais utilizados
  report += '\n## 📋 Schemas Mais Utilizados\n\n';
  const schemaUsage = {};
  Object.values(spec.paths).forEach(methods => {
    Object.values(methods).forEach(method => {
      if (method.responses) {
        Object.values(method.responses).forEach(response => {
          if (response.content) {
            Object.values(response.content).forEach(content => {
              if (content.schema?.$ref) {
                const schemaName = content.schema.$ref.split('/').pop();
                schemaUsage[schemaName] = (schemaUsage[schemaName] || 0) + 1;
              }
            });
          }
        });
      }
    });
  });
  
  Object.entries(schemaUsage)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([schema, count]) => {
      report += `- **${schema}:** ${count} usos\n`;
    });
  
  // Recomendações
  report += '\n## 💡 Recomendações\n\n';
  report += '- ✅ Documentação completa gerada\n';
  report += '- ✅ Schemas bem definidos\n';
  report += '- ✅ Tags organizadas\n';
  report += '- 🔄 Considerar adicionar mais exemplos\n';
  report += '- 🔄 Implementar testes automatizados\n';
  report += '- 🔄 Adicionar validação de schemas\n';
  
  fs.writeFileSync(reportPath, report);
  console.log(`📊 Relatório de cobertura salvo em: ${reportPath}`);
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

if (require.main === module) {
  generateApiDocs();
}

module.exports = {
  generateApiDocs,
  swaggerOptions
};
