import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.integer('shop_id').unsigned().notNullable().references('id').inTable('shops')
      table.integer('payment_method_id').unsigned().notNullable().references('id').inTable('payment_methods')
      table.integer('order_address_id').unsigned().notNullable().references('id').inTable('order_addresses')
      table.decimal('value', 10, 2).notNullable()
      table.decimal('payback', 10, 2).nullable()
      table.decimal('cost_delivery', 10, 2).notNullable().defaultTo(0)
      table.string('obs').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
