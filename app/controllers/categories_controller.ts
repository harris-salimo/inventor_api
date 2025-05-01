import Category from '#models/category'
import CategoryPolicy from '#policies/category_policy'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * @summary Category
 */
export default class CategoriesController {
  /**
   * @index
   * @summary Display a list of category
   * @description Display a list of category
   */
  async index({ auth, response, bouncer }: HttpContext) {
    if (await bouncer.with(CategoryPolicy).denies('viewAny')) {
      return response.forbidden()
    }

    const authUserCategories = await auth.user?.related('categories').query()

    return {
      categories: authUserCategories,
    }
  }

  /**
   * @store
   * @summary Handle form submission for the create action
   * @description Handle form submission for the create action
   * @requestBody <createCategoryValidator>
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createCategoryValidator)

    if (await bouncer.with(CategoryPolicy).denies('create')) {
      return response.forbidden()
    }

    const category = await auth.user?.related('categories').create(payload)

    return response.created({ category })
  }

  /**
   * @show
   * @summary Show individual category
   * @description Show individual category
   * @paramPath id
   */
  async show({ params, response, bouncer }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    if (await bouncer.with(CategoryPolicy).denies('view', category)) {
      return response.forbidden()
    }

    return {
      category,
    }
  }

  /**
   * @update
   * @summary Handle form submission for the edit action
   * @description Handle form submission for the edit action
   * @paramPath id
   * @requestBody <updateCategoryValidator>
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateCategoryValidator)

    const category = await Category.findOrFail(params.id)

    if (await bouncer.with(CategoryPolicy).denies('edit', category)) {
      return response.forbidden()
    }

    const updatedCategory = await category.merge(payload).save()

    return {
      category: updatedCategory,
    }
  }

  /**
   * @destroy
   * @summary Delete category
   * @description Delete category
   * @paramPath id
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    if (await bouncer.with(CategoryPolicy).denies('delete', category)) {
      return response.forbidden()
    }

    await category.delete()

    return response.noContent()
  }
}
