import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities_shops'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('city_id').unsigned().notNullable().references('id').inTable('cities')
      table.integer('shop_id').unsigned().notNullable().references('id').inTable('shops')
      table.decimal('cost_delivery', 8, 2).nullable()
      table.primary(['city_id', 'shop_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
