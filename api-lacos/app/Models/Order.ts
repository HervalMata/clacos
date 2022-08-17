import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public hash_id: string

  @column()
  public client_id: number

  @column()
  public shop_id: number

  @column()
  public payment_method_id: number

  @column()
  public order_address_id: number

  @column()
  public value: number

  @column()
  public payback: number | null

  @column()
  public cost_delivery: number

  @column()
  public obs: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
