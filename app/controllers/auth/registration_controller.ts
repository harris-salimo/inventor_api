import Role from '#models/role'
import { registerValidator } from '#validators/auth/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistrationsController {
  /**
   * @store
   * @summary Register user
   * @description Register user
   * @requestBody <registerValidator>
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const userRole = await Role.findByOrFail('name', 'User')
    const user = await userRole.related('users').create(payload)

    return response.created({ id: user.id, fullName: user.fullName, email: user.email })
  }
}
