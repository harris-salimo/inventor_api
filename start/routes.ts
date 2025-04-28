/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const AuthenticationController = () => import('#controllers/auth/authentication_controller')
const RegistrationController = () => import('#controllers/auth/registration_controller')

router.post('registration', [RegistrationController, 'store'])
router.post('login', [AuthenticationController, 'store'])
router
  .delete('logout', [AuthenticationController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.get('/', async ({ response }) => {
  return response.redirect('/docs')
})
