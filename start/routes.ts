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

const AuthenticationController = () => import('#controllers/auth/authentication_controller')
const RegistrationController = () => import('#controllers/auth/registration_controller')

router.post('registration', [RegistrationController, 'store'])
router.post('login', [AuthenticationController, 'store'])
router
  .delete('logout', [AuthenticationController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
