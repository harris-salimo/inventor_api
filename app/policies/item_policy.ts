import User from '#models/user'
import Item from '#models/item'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ItemPolicy extends BasePolicy {
  viewAny(_: User): AuthorizerResponse {
    return true
  }

  create(user: User): AuthorizerResponse {
    return user.role.name === 'User'
  }

  view(user: User, item: Item): AuthorizerResponse {
    return user.role.name === 'Admin' || user.id === item.category.user.id
  }

  edit(user: User, item: Item): AuthorizerResponse {
    return user.id === item.category.user.id
  }

  delete(user: User, item: Item): AuthorizerResponse {
    return user.role.name === 'Admin' || user.id === item.category.user.id
  }
}
