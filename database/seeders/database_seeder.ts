import { RoleFactory } from '#database/factories/role_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    for (const role of ['Admin', 'User']) {
      await RoleFactory.with('users', 2, (user) =>
        user.with('categories', 3, (category) => category.with('items', 5))
      )
        .merge({ name: role })
        .create()
    }
  }
}
