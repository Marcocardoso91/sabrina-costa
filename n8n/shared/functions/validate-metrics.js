/**
 * Validação de Métricas do Instagram
 * 
 * Valida estrutura e tipos de dados recebidos das métricas
 * Para uso em n8n workflows
 */

function validateMetrics(data) {
  const requiredFields = [
    'date', 
    'ctr', 
    'cpc', 
    'cpm', 
    'frequency', 
    'visits', 
    'newFollowers', 
    'cost',
    'impressions',
    'clicks'
  ];
  
  const errors = [];
  const warnings = [];
  
  // Validar campos obrigatórios
  requiredFields.forEach(field => {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  });
  
  // Se faltam campos obrigatórios, retornar imediatamente
  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      warnings,
      data
    };
  }
  
  // Validações de tipo e range para CTR
  if (typeof data.ctr !== 'number') {
    errors.push('CTR deve ser um número');
  } else if (data.ctr < 0 || data.ctr > 100) {
    errors.push('CTR deve estar entre 0 e 100');
  } else if (data.ctr < 1.5) {
    warnings.push('CTR abaixo do threshold mínimo (1.5%)');
  }
  
  // Validações para CPC
  if (typeof data.cpc !== 'number') {
    errors.push('CPC deve ser um número');
  } else if (data.cpc < 0) {
    errors.push('CPC não pode ser negativo');
  } else if (data.cpc > 0.70) {
    warnings.push('CPC acima do threshold máximo (R$ 0.70)');
  }
  
  // Validações para CPM
  if (typeof data.cpm !== 'number') {
    errors.push('CPM deve ser um número');
  } else if (data.cpm < 0) {
    errors.push('CPM não pode ser negativo');
  } else if (data.cpm > 10.0) {
    warnings.push('CPM acima do threshold máximo (R$ 10.00)');
  }
  
  // Validações para Frequency
  if (typeof data.frequency !== 'number') {
    errors.push('Frequency deve ser um número');
  } else if (data.frequency < 0) {
    errors.push('Frequency não pode ser negativa');
  } else if (data.frequency > 3.0) {
    warnings.push('Frequência acima do threshold máximo (3.0)');
  }
  
  // Validações para Visits
  if (typeof data.visits !== 'number') {
    errors.push('Visits deve ser um número');
  } else if (data.visits < 0) {
    errors.push('Visits não pode ser negativo');
  }
  
  // Validações para New Followers
  if (typeof data.newFollowers !== 'number') {
    errors.push('newFollowers deve ser um número');
  } else if (data.newFollowers < 0) {
    errors.push('newFollowers não pode ser negativo');
  }
  
  // Validações para Cost
  if (typeof data.cost !== 'number') {
    errors.push('Cost deve ser um número');
  } else if (data.cost < 0) {
    errors.push('Cost não pode ser negativo');
  }
  
  // Validações para Impressions
  if (typeof data.impressions !== 'number') {
    errors.push('Impressions deve ser um número');
  } else if (data.impressions < 0) {
    errors.push('Impressions não pode ser negativo');
  }
  
  // Validações para Clicks
  if (typeof data.clicks !== 'number') {
    errors.push('Clicks deve ser um número');
  } else if (data.clicks < 0) {
    errors.push('Clicks não pode ser negativo');
  }
  
  // Validação de data
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Data deve estar no formato YYYY-MM-DD');
  } else if (data.date) {
    const dateObj = new Date(data.date);
    if (isNaN(dateObj.getTime())) {
      errors.push('Data inválida');
    }
    // Verificar se não é data futura
    if (dateObj > new Date()) {
      warnings.push('Data está no futuro');
    }
  }
  
  // Validação cruzada: CTR calculado vs CTR informado
  if (data.impressions > 0 && data.clicks >= 0) {
    const calculatedCTR = (data.clicks / data.impressions) * 100;
    const diff = Math.abs(calculatedCTR - data.ctr);
    if (diff > 0.5) { // Margem de 0.5%
      warnings.push(`CTR informado (${data.ctr}%) difere do calculado (${calculatedCTR.toFixed(2)}%)`);
    }
  }
  
  // Calcular custo por seguidor
  if (data.newFollowers > 0) {
    const costPerFollower = data.cost / data.newFollowers;
    if (costPerFollower > 1.30) {
      warnings.push(`Custo por seguidor alto: R$ ${costPerFollower.toFixed(2)}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data,
    metadata: {
      validatedAt: new Date().toISOString(),
      totalFields: Object.keys(data).length,
      requiredFields: requiredFields.length
    }
  };
}

// Para uso em n8n
if (typeof $input !== 'undefined') {
  const result = validateMetrics($input.item.json);
  return [{ json: result }];
}

// Para testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateMetrics };
}

