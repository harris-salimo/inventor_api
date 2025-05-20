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
const RolesController = () => import('#controllers/roles_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const ItemsController = () => import('#controllers/items_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.post('/registration', [RegistrationController, 'store'])
router.post('/login', [AuthenticationController, 'store'])
router
  .post('/logout', [AuthenticationController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router
  .resource('roles', RolesController)
  .apiOnly()
  .use('*', middleware.auth({ guards: ['api'] }))
router
  .resource('categories', CategoriesController)
  .apiOnly()
  .use('*', middleware.auth({ guards: ['api'] }))
router
  .resource('categories.items', ItemsController)
  .apiOnly()
  .use('*', middleware.auth({ guards: ['api'] }))

router
  .get('/user', ({ auth }) => {
    return auth.user
  })
  .use(middleware.auth({ guards: ['api'] }))

router.get('/dashboard', [DashboardController]).use(middleware.auth({ guards: ['api'] }))

router.get('/', async ({ response }) => {
  return response.redirect('/docs')
})
