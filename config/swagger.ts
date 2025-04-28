import env from '#start/env'
import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  tagIndex: 2,
  productionEnv: 'production',
  info: {
    title: 'title',
    version: '1.0.0',
    description: '',
  },
  snakeCase: true,
  debug: env.get('NODE_ENV') === 'development',
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {},
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: env.get('NODE_ENV') !== 'development',
}
