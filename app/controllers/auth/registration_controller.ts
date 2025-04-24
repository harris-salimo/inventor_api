import User from '#models/user'
import { registerValidator } from '#validators/auth/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistrationsController {
  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.created({ id: user.id, fullName: user.fullName, email: user.email })
  }
}
