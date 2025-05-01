import Role from '#models/role'
import RolePolicy from '#policies/role_policy'
import { createRoleValidator, updateRoleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * @summary Role
 */
export default class RolesController {
  /**
   * @index
   * @summary Display a list of role
   * @description Display a list of role
   */
  async index({ response, bouncer }: HttpContext) {
    const roles = await Role.all()

    if (await bouncer.with(RolePolicy).denies('viewAny')) {
      return response.forbidden()
    }

    return {
      roles,
    }
  }

  /**
   * @store
   * @summary Handle form submission for the create action
   * @description Handle form submission for the create action
   * @requestBody <createRoleValidator>
   */
  async store({ request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createRoleValidator)

    if (await bouncer.with(RolePolicy).denies('create')) {
      return response.forbidden()
    }

    const role = await Role.create(payload)

    return response.created({ role })
  }

  /**
   * @show
   * @summary Show individual role
   * @description Show individual role
   */
  async show({ response, params, bouncer }: HttpContext) {
    const role = await Role.findOrFail(params.id)

    if (await bouncer.with(RolePolicy).denies('view', role)) {
      return response.forbidden()
    }

    return {
      role,
    }
  }

  /**
   * @update
   * @summary Handle form submission for the edit action
   * @description Handle form submission for the edit action
   * @requestBody <updateRoleValidator>
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateRoleValidator)

    const role = await Role.findOrFail(params.id)

    if (await bouncer.with(RolePolicy).denies('edit', role)) {
      return response.forbidden()
    }

    const updatedRole = await role.merge(payload).save()

    return {
      role: updatedRole,
    }
  }

  /**
   * @destroy
   * @summary Delete role
   * @description Delete role
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const role = await Role.findOrFail(params.id)

    if (await bouncer.with(RolePolicy).denies('delete', role)) {
      return response.forbidden()
    }

    await role.delete()

    return response.noContent()
  }
}
