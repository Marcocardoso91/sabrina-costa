/**
 * Formatação de Mensagens WhatsApp
 * 
 * Formata mensagens para envio via Evolution API
 * Inclui emojis, formatação e estruturação
 */

function formatAlertMessage(alert) {
  const emoji = getAlertEmoji(alert.severity);
  const date = formatDate(alert.date);
  
  let message = `${emoji} *Alerta: ${alert.metric}*\n\n`;
  message += `📅 Data: ${date}\n`;
  message += `📊 Valor: ${alert.value}\n`;
  message += `🎯 Threshold: ${alert.threshold}\n`;
  message += `⚠️ Severidade: ${alert.severity}\n\n`;
  
  if (alert.message) {
    message += `💬 ${alert.message}\n\n`;
  }
  
  message += `🔗 Dashboard: ${$env.DASHBOARD_URL || 'N/A'}`;
  
  return message;
}

function formatReportMessage(report) {
  const date = formatDate(report.date);
  
  let message = `📊 *Relatório Diário*\n`;
  message += `📅 ${date}\n\n`;
  
  message += `*Métricas do Dia:*\n`;
  message += `• CTR: ${report.ctr}% ${getTrendEmoji(report.ctrTrend)}\n`;
  message += `• CPC: R$ ${report.cpc.toFixed(2)} ${getTrendEmoji(report.cpcTrend)}\n`;
  message += `• CPM: R$ ${report.cpm.toFixed(2)}\n`;
  message += `• Novos Seguidores: ${report.newFollowers}\n`;
  message += `• Investimento: R$ ${report.cost.toFixed(2)}\n\n`;
  
  message += `*Comparação com Ontem:*\n`;
  message += `• CTR: ${report.ctrChange > 0 ? '+' : ''}${report.ctrChange.toFixed(2)}%\n`;
  message += `• Seguidores: ${report.followersChange > 0 ? '+' : ''}${report.followersChange}\n\n`;
  
  if (report.alerts && report.alerts.length > 0) {
    message += `⚠️ *Alertas Ativos:* ${report.alerts.length}\n\n`;
  }
  
  message += `✅ Tudo está funcionando bem!`;
  
  return message;
}

function formatReminderMessage(post) {
  const emoji = getPostTypeEmoji(post.type);
  
  let message = `${emoji} *Lembrete de Postagem*\n\n`;
  message += `📅 Hoje: ${formatDate(new Date())}\n`;
  message += `📝 Tipo: ${post.type}\n`;
  message += `🎯 Tema: ${post.theme}\n\n`;
  
  if (post.hook) {
    message += `💡 *Gancho Sugerido:*\n_"${post.hook}"_\n\n`;
  }
  
  if (post.cta) {
    message += `🔗 *CTA:*\n_"${post.cta}"_\n\n`;
  }
  
  message += `📱 Poste agora no Instagram!`;
  
  return message;
}

function formatWeeklyReportMessage(report) {
  let message = `📈 *Relatório Semanal*\n`;
  message += `📅 ${formatDate(report.startDate)} a ${formatDate(report.endDate)}\n\n`;
  
  message += `*Totais da Semana:*\n`;
  message += `• Investimento: R$ ${report.totalCost.toFixed(2)}\n`;
  message += `• Novos Seguidores: ${report.totalFollowers}\n`;
  message += `• Impressões: ${formatNumber(report.totalImpressions)}\n`;
  message += `• Cliques: ${formatNumber(report.totalClicks)}\n\n`;
  
  message += `*Médias:*\n`;
  message += `• CTR Médio: ${report.avgCTR.toFixed(2)}%\n`;
  message += `• CPC Médio: R$ ${report.avgCPC.toFixed(2)}\n`;
  message += `• Custo/Seguidor: R$ ${report.costPerFollower.toFixed(2)}\n\n`;
  
  message += `*Comparação com Semana Anterior:*\n`;
  message += `• Seguidores: ${formatChange(report.followersChange)}\n`;
  message += `• CTR: ${formatChange(report.ctrChange)}%\n`;
  message += `• Investimento: ${formatChange(report.costChange)}\n\n`;
  
  message += `📊 Relatório completo no dashboard!`;
  
  return message;
}

// Funções auxiliares
function getAlertEmoji(severity) {
  const emojis = {
    critical: '🚨',
    high: '⚠️',
    medium: '⚡',
    low: 'ℹ️'
  };
  return emojis[severity] || 'ℹ️';
}

function getTrendEmoji(trend) {
  if (trend > 0) return '📈';
  if (trend < 0) return '📉';
  return '➡️';
}

function getPostTypeEmoji(type) {
  const emojis = {
    reels: '🎬',
    carrossel: '📸',
    stories: '📱',
    post: '🖼️'
  };
  return emojis[type.toLowerCase()] || '📝';
}

function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  };
  
  return date.toLocaleDateString('pt-BR', options);
}

function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num);
}

function formatChange(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

// Para uso em n8n
if (typeof $input !== 'undefined') {
  const input = $input.item.json;
  const type = input.type || 'alert';
  
  let formatted;
  switch (type) {
    case 'alert':
      formatted = formatAlertMessage(input);
      break;
    case 'report':
      formatted = formatReportMessage(input);
      break;
    case 'reminder':
      formatted = formatReminderMessage(input);
      break;
    case 'weekly':
      formatted = formatWeeklyReportMessage(input);
      break;
    default:
      formatted = input.message || JSON.stringify(input);
  }
  
  return [{ 
    json: { 
      ...input,
      formattedMessage: formatted 
    } 
  }];
}

// Para testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatAlertMessage,
    formatReportMessage,
    formatReminderMessage,
    formatWeeklyReportMessage
  };
}

