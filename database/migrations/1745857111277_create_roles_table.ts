import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable().unique()
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable('users', (table) => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropForeign('role_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
