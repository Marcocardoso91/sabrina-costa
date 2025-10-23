/**
 * Cálculo de Thresholds e Alertas
 * 
 * Detecta quando métricas ultrapassam limites configurados
 * Retorna alertas estruturados
 */

function calculateThresholds(metrics, customThresholds = {}) {
  // Thresholds padrão
  const defaultThresholds = {
    CTR_MIN: 1.5,
    CPC_MAX: 0.70,
    CPM_MAX: 10.0,
    FREQUENCY_MAX: 3.0,
    COST_PER_FOLLOWER_MAX: 1.30
  };
  
  // Mesclar com custom thresholds (env vars ou config)
  const thresholds = {
    ...defaultThresholds,
    ...customThresholds,
    // Sobrescrever com env vars se disponíveis
    CTR_MIN: typeof $env !== 'undefined' && $env.CTR_MIN ? parseFloat($env.CTR_MIN) : defaultThresholds.CTR_MIN,
    CPC_MAX: typeof $env !== 'undefined' && $env.CPC_MAX ? parseFloat($env.CPC_MAX) : defaultThresholds.CPC_MAX,
    CPM_MAX: typeof $env !== 'undefined' && $env.CPM_MAX ? parseFloat($env.CPM_MAX) : defaultThresholds.CPM_MAX,
    FREQUENCY_MAX: typeof $env !== 'undefined' && $env.FREQUENCY_MAX ? parseFloat($env.FREQUENCY_MAX) : defaultThresholds.FREQUENCY_MAX,
    COST_PER_FOLLOWER_MAX: typeof $env !== 'undefined' && $env.COST_PER_FOLLOWER_MAX ? parseFloat($env.COST_PER_FOLLOWER_MAX) : defaultThresholds.COST_PER_FOLLOWER_MAX
  };
  
  const alerts = [];
  
  // Verificar CTR (quanto maior, melhor)
  if (metrics.ctr < thresholds.CTR_MIN) {
    alerts.push({
      metric: 'CTR',
      type: 'below_minimum',
      severity: getSeverity(metrics.ctr, thresholds.CTR_MIN, 'below'),
      value: metrics.ctr,
      threshold: thresholds.CTR_MIN,
      message: `CTR está abaixo do mínimo esperado (${thresholds.CTR_MIN}%)`,
      recommendation: 'Revisar copy dos anúncios e testar novos ganchos'
    });
  }
  
  // Verificar CPC (quanto menor, melhor)
  if (metrics.cpc > thresholds.CPC_MAX) {
    alerts.push({
      metric: 'CPC',
      type: 'above_maximum',
      severity: getSeverity(metrics.cpc, thresholds.CPC_MAX, 'above'),
      value: metrics.cpc,
      threshold: thresholds.CPC_MAX,
      message: `CPC está acima do máximo aceitável (R$ ${thresholds.CPC_MAX})`,
      recommendation: 'Otimizar segmentação ou pausar anúncios com CPC alto'
    });
  }
  
  // Verificar CPM (quanto menor, melhor)
  if (metrics.cpm > thresholds.CPM_MAX) {
    alerts.push({
      metric: 'CPM',
      type: 'above_maximum',
      severity: getSeverity(metrics.cpm, thresholds.CPM_MAX, 'above'),
      value: metrics.cpm,
      threshold: thresholds.CPM_MAX,
      message: `CPM está acima do máximo aceitável (R$ ${thresholds.CPM_MAX})`,
      recommendation: 'Revisar segmentação e criativos'
    });
  }
  
  // Verificar Frequência (quanto menor, melhor)
  if (metrics.frequency > thresholds.FREQUENCY_MAX) {
    alerts.push({
      metric: 'Frequency',
      type: 'above_maximum',
      severity: getSeverity(metrics.frequency, thresholds.FREQUENCY_MAX, 'above'),
      value: metrics.frequency,
      threshold: thresholds.FREQUENCY_MAX,
      message: `Frequência está muito alta (${thresholds.FREQUENCY_MAX})`,
      recommendation: 'Expandir audiência ou pausar campanha para evitar fadiga'
    });
  }
  
  // Calcular custo por seguidor
  if (metrics.newFollowers > 0) {
    const costPerFollower = metrics.cost / metrics.newFollowers;
    
    if (costPerFollower > thresholds.COST_PER_FOLLOWER_MAX) {
      alerts.push({
        metric: 'Cost Per Follower',
        type: 'above_maximum',
        severity: getSeverity(costPerFollower, thresholds.COST_PER_FOLLOWER_MAX, 'above'),
        value: costPerFollower,
        threshold: thresholds.COST_PER_FOLLOWER_MAX,
        message: `Custo por seguidor está alto (R$ ${costPerFollower.toFixed(2)})`,
        recommendation: 'Otimizar objetivo da campanha para conversões'
      });
    }
  }
  
  // Alertas adicionais baseados em análise cruzada
  if (metrics.clicks > 0 && metrics.visits === 0) {
    alerts.push({
      metric: 'Conversion',
      type: 'warning',
      severity: 'medium',
      value: 0,
      threshold: null,
      message: 'Cliques sem conversão em visitas',
      recommendation: 'Verificar link de destino e página de landing'
    });
  }
  
  if (metrics.impressions > 1000 && metrics.clicks < 10) {
    const lowCTR = (metrics.clicks / metrics.impressions) * 100;
    alerts.push({
      metric: 'Engagement',
      type: 'warning',
      severity: 'medium',
      value: lowCTR,
      threshold: 1.0,
      message: 'Baixo engajamento apesar de muitas impressões',
      recommendation: 'Testar novos criativos e copy'
    });
  }
  
  return {
    hasAlerts: alerts.length > 0,
    alertCount: alerts.length,
    alerts,
    thresholds,
    metrics,
    analyzedAt: new Date().toISOString()
  };
}

function getSeverity(value, threshold, direction) {
  const difference = direction === 'above' 
    ? ((value - threshold) / threshold) * 100
    : ((threshold - value) / threshold) * 100;
  
  if (difference > 50) return 'critical';
  if (difference > 30) return 'high';
  if (difference > 15) return 'medium';
  return 'low';
}

function prioritizeAlerts(alerts) {
  const severityOrder = {
    'critical': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  };
  
  return alerts.sort((a, b) => {
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

function summarizeAlerts(alertsResult) {
  if (!alertsResult.hasAlerts) {
    return {
      summary: '✅ Todas as métricas dentro dos limites esperados',
      status: 'healthy',
      alertCount: 0
    };
  }
  
  const criticalCount = alertsResult.alerts.filter(a => a.severity === 'critical').length;
  const highCount = alertsResult.alerts.filter(a => a.severity === 'high').length;
  
  let status = 'healthy';
  let summary = '';
  
  if (criticalCount > 0) {
    status = 'critical';
    summary = `🚨 ${criticalCount} alerta(s) crítico(s) detectado(s)`;
  } else if (highCount > 0) {
    status = 'warning';
    summary = `⚠️ ${highCount} alerta(s) de alta prioridade`;
  } else {
    status = 'info';
    summary = `ℹ️ ${alertsResult.alertCount} alerta(s) de baixa prioridade`;
  }
  
  return {
    summary,
    status,
    alertCount: alertsResult.alertCount,
    criticalCount,
    highCount
  };
}

// Para uso em n8n
if (typeof $input !== 'undefined') {
  const metrics = $input.item.json;
  const customThresholds = metrics.thresholds || {};
  
  const result = calculateThresholds(metrics, customThresholds);
  const summary = summarizeAlerts(result);
  
  return [{ 
    json: { 
      ...result,
      summary 
    } 
  }];
}

// Para testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateThresholds,
    getSeverity,
    prioritizeAlerts,
    summarizeAlerts
  };
}

