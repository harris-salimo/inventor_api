import Category from '#models/category'
import Item from '#models/item'
import ItemPolicy from '#policies/item_policy'
import { createItemValidator, updateItemValidator } from '#validators/item'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * @summary Item
 */
export default class ItemsController {
  /**
   * @index
   * @summary Display a list of item
   * @description Display a list of item
   */
  async index({ params, bouncer, response }: HttpContext) {
    const category = await Category.findOrFail(params.categoryId)
    const userItems = await Item.findManyBy('categoryId', category.id)

    if (await bouncer.with(ItemPolicy).denies('viewAny')) {
      return response.forbidden()
    }

    return {
      items: userItems,
    }
  }

  /**
   * @store
   * @summary Handle form submission for the create action
   * @description Handle form submission for the create action
   * @requestBody <createItemValidator>
   */
  async store({ request, response, params, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createItemValidator)

    if (await bouncer.with(ItemPolicy).denies('create')) {
      return response.forbidden()
    }

    const category = await Category.findOrFail(params.categoryId)
    const item = await category.related('items').create(payload)

    return response.created({ item })
  }

  /**
   * @show
   * @summary Show individual item
   * @description Show individual item
   * @paramPath id
   */
  async show({ params, bouncer, response }: HttpContext) {
    const item = await Item.findOrFail(params.id)

    if (await bouncer.with(ItemPolicy).denies('view', item)) {
      return response.forbidden()
    }

    return {
      item,
    }
  }

  /**
   * @update
   * @summary Handle form submission for the edit action
   * @description Handle form submission for the edit action
   * @paramPath id
   * @requestBody <updateItemValidator>
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateItemValidator)

    const item = await Item.findOrFail(params.id)

    if (await bouncer.with(ItemPolicy).denies('edit', item)) {
      return response.forbidden()
    }

    const updatedItem = await item.merge(payload).save()

    return {
      item: updatedItem,
    }
  }

  /**
   * @destroy
   * @summary Delete item
   * @description Delete item
   * @paramPath id
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const item = await Item.findOrFail(params.id)

    if (await bouncer.with(ItemPolicy).denies('delete', item)) {
      return response.forbidden()
    }

    await item.delete()

    return response.noContent()
  }
}
