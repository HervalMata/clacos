import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().notNullable().references('id').inTable('orders')
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products')
      table.decimal('value', 10, 2).notNullable()
      table.decimal('quantity', 10, 3).notNullable()
      table.string('obs').nullable()
      table.primary(['order_id', 'product_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
