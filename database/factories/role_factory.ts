import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'
import { UserFactory } from '#database/factories/user_factory'

export const RoleFactory = factory
  .define(Role, async ({ faker }) => {
    return {
      name: faker.helpers.arrayElement(['Admin', 'User']),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
    }
  })
  .relation('users', () => UserFactory)
  .build()
