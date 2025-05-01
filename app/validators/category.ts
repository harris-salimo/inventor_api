import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new category.
 */
export const createCategoryValidator = vine.compile(
  vine.object({ name: vine.string().maxLength(50), description: vine.string().optional() })
)

/**
 * Validator to validate the payload when updating
 * an existing category.
 */
export const updateCategoryValidator = vine.compile(
  vine.object({ name: vine.string().maxLength(50), description: vine.string().optional() })
)
