import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new item.
 */
export const createItemValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    description: vine.string().optional(),
    statusColor: vine.string().maxLength(7).optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing item.
 */
export const updateItemValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    description: vine.string().optional(),
    statusColor: vine.string().maxLength(7).optional(),
  })
)
