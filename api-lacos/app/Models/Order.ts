import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import OrderStatus from './Orderstatus'

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

  @hasOne(() => Client, {
    foreignKey: 'id',
    localKey: 'client_id',
  })
  public client: HasOne<typeof Client>

  @hasMany(() => OrderStatus, {
    foreignKey: 'order_id',
    localKey: 'id',
  })
  public order_status: HasMany<typeof OrderStatus>
}
