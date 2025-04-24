import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth/login'

export default class AuthenticationController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    return await auth.use('api').createToken(user)
  }

  async destroy({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()

    return response.noContent()
  }
}
