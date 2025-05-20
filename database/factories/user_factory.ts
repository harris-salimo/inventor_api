import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { RoleFactory } from '#database/factories/role_factory'
import { CategoryFactory } from '#database/factories/category_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      password: 'password',
      avatar: faker.image.avatar(),
      emailVerifiedAt: faker.date.past().toUTCString(),
    }
  })
  .relation('role', () => RoleFactory)
  .relation('categories', () => CategoryFactory)
  .build()
