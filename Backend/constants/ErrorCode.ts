export const ErrorCode = {
  // Autenticação & Autorização (HTTP 401 / 403)
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',       // Usuário ou senha incorretos
  UNAUTHORIZED: 'UNAUTHORIZED',                     // Token ausente ou inválido
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',                   // Token JWT expirado
  TOKEN_INVALID: 'TOKEN_INVALID',                   // Token JWT corrompido
  FORBIDDEN: 'FORBIDDEN',                           // Sem permissão para o recurso

  // Validação de Dados de Entrada (HTTP 400 / 422)
  INVALID_PAYLOAD: 'INVALID_PAYLOAD',               // Body ou parâmetro formatado errado
  MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS', // Campos obrigatórios ausentes
  INVALID_FORMAT: 'INVALID_FORMAT',                 // Ex: e-mail ou UUID em formato inválido

  // Recursos Não Encontrados (HTTP 404)
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',         // Registro/entidade não existe no banco
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',               // Rota/endpoint inexistente

  // Regras de Negócio e Conflitos (HTTP 400 / 409)
  DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',         // Ex: e-mail ou CPF já cadastrado
  BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION', // Regra de negócio impediu a ação
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',         // Exemplo específico de regra de negócio

  // Erros Internos e Servidor (HTTP 500 / 503)
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',   // Erro genérico/inesperado
  DATABASE_ERROR: 'DATABASE_ERROR',                 // Falha de conexão/operação com o banco
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',       // Serviço externo indisponível
} as const;