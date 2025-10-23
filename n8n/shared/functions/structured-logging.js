/**
 * Sistema de Logs Estruturados
 * 
 * Padroniza logging em todos workflows n8n
 * Formato JSON para fácil parsing e análise
 */

function log(level, message, metadata = {}) {
  // Validar level
  const validLevels = ['debug', 'info', 'warn', 'error'];
  if (!validLevels.includes(level)) {
    level = 'info';
  }
  
  // Construir log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    workflow: typeof $workflow !== 'undefined' ? $workflow.name : 'unknown',
    execution_id: typeof $execution !== 'undefined' ? $execution.id : 'unknown',
    message,
    metadata: {
      ...metadata,
      environment: typeof $env !== 'undefined' ? $env.ENVIRONMENT : 'unknown',
      node: typeof $node !== 'undefined' ? $node.name : 'unknown'
    }
  };
  
  // Output baseado no level
  switch (level) {
    case 'error':
      console.error(JSON.stringify(logEntry));
      break;
    case 'warn':
      console.warn(JSON.stringify(logEntry));
      break;
    case 'debug':
    case 'info':
    default:
      console.log(JSON.stringify(logEntry));
  }
  
  return logEntry;
}

function logError(error, context = {}) {
  return log('error', error.message || 'Unknown error', {
    ...context,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    }
  });
}

function logInfo(message, data = {}) {
  return log('info', message, data);
}

function logWarn(message, data = {}) {
  return log('warn', message, data);
}

function logDebug(message, data = {}) {
  return log('debug', message, data);
}

// Para uso em n8n workflows
if (typeof $input !== 'undefined') {
  const input = $input.item.json;
  
  // Se receber um objeto com level e message, logar
  if (input.level && input.message) {
    const logEntry = log(input.level, input.message, input.metadata || {});
    return [{ json: logEntry }];
  }
  
  // Caso contrário, apenas passar adiante
  return [{ json: input }];
}

// Para testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    log,
    logError,
    logInfo,
    logWarn,
    logDebug
  };
}

