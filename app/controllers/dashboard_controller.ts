import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * @handle
   * @summary Display a list of category
   * @description Display a list of category
   */
  async handle({ auth }: HttpContext) {
    const authUserCategories = await auth.user?.related('categories').query()

    return {
      categories: authUserCategories,
    }
  }
}
