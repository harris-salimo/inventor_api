import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryId: number | null

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare statusColor: string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
