import User from '#models/user'
import Category from '#models/category'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CategoryPolicy extends BasePolicy {
  viewAny(_: User): AuthorizerResponse {
    return true
  }

  create(user: User): AuthorizerResponse {
    return user.role.name === 'User'
  }

  view(user: User, category: Category): AuthorizerResponse {
    return user.role.name === 'Admin' || user.id === category.user.id
  }

  edit(user: User, category: Category): AuthorizerResponse {
    return user.id === category.user.id
  }

  delete(user: User, category: Category): AuthorizerResponse {
    return user.role.name === 'Admin' || user.id === category.user.id
  }
}
