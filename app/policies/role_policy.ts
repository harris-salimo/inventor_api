import User from '#models/user'
import Role from '#models/role'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class RolePolicy extends BasePolicy {
  viewAny(_: User): AuthorizerResponse {
    return true
  }

  create(user: User): AuthorizerResponse {
    return user.role.name === 'Admin'
  }

  view(user: User, _: Role): AuthorizerResponse {
    return user.role.name === 'Admin'
  }

  edit(user: User, _: Role): AuthorizerResponse {
    return user.role.name === 'Admin'
  }

  delete(user: User, _: Role): AuthorizerResponse {
    return user.role.name === 'Admin'
  }
}
