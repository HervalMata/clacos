import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shop_payment_methods'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('shop_id').unsigned().notNullable().references('id').inTable('shops')
      table.integer('payment_method_id').unsigned().notNullable().references('id').inTable('payment_methods')
      table.primary(['shop_id', 'payment_method_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
