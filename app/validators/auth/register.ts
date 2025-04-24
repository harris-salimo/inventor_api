import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8).confirmed(),
  })
)
