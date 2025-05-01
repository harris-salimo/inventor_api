import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import { UserFactory } from '#database/factories/user_factory'
import { ItemFactory } from '#database/factories/item_factory'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      name: faker.word.noun({ length: { min: 3, max: 7 }, strategy: 'closest' }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
    }
  })
  .relation('user', () => UserFactory)
  .relation('items', () => ItemFactory)
  .build()
