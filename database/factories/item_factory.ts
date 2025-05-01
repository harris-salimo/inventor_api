import factory from '@adonisjs/lucid/factories'
import Item from '#models/item'
import { CategoryFactory } from '#database/factories/category_factory'

export const ItemFactory = factory
  .define(Item, async ({ faker }) => {
    return {
      name: faker.word.noun({ length: { min: 3, max: 5 }, strategy: 'closest' }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      statusColor: faker.helpers.arrayElement(['#fb2c36', '#efb100', '#00c951']),
    }
  })
  .relation('category', () => CategoryFactory)
  .build()
