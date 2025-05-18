import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth/login'

export default class AuthenticationController {
  /**
   * @store
   * @summary Authenticate user
   * @description Authenticate user
   * @requestBody <loginValidator>
   */
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const accessToken = await auth.use('api').createToken(user, ['*'], { name: 'access_token' })
    response.encryptedCookie('token', accessToken.value, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response.ok({ message: 'LOGGED_IN' })
  }

  /**
   * @destroy
   * @summary Logout user
   * @description Authenticate user
   */
  async destroy({ auth, response }: HttpContext) {
    response.clearCookie('token')

    await auth.use('api').invalidateToken()

    return response.ok({ message: 'LOGGED_OUT' })
  }
}
