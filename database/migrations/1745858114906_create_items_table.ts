import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id')
        .unsigned()
        .nullable()
        .references('categories.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name', 50).notNullable()
      table.text('description').nullable()
      table.string('status_color', 7).notNullable().defaultTo('#00c951')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
