import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_statuses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().notNullable().references('id').inTable('orders')
      table.integer('status_id').unsigned().notNullable().references('id').inTable('statuses')
      table.string('obs').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })

      table.primary(['order_id', 'status_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
