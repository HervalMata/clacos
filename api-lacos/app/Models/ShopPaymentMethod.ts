import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ShopPaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public shop_id: number

  @column({ isPrimary: true })
  public payment_method_id: number
}
