import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CitiesShop extends BaseModel {
  @column({ isPrimary: true })
  public city_id: number

  @column({ isPrimary: true })
  public shop_id: number

  @column()
  public cost_delivery: number
}
