import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new role.
 */
export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    description: vine.string().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing role.
 */
export const updateRoleValidator = vine.compile(
  vine.object({ name: vine.string().maxLength(50), description: vine.string().optional() })
)
