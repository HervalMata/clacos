import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import OrderStatus from './Orderstatus'
import Shop from './Shop'
import OrderAddress from './Orderaddress'
import PaymentMethod from './Paymentmethod'
import OrderProduct from './Orderproduct'

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

  @hasOne(() => Shop, {
    foreignKey: 'id',
    localKey: 'shop_id',
  })
  public shop: HasOne<typeof Shop>

  @hasMany(() => OrderProduct, {
    foreignKey: 'order_product_id',
    localKey: 'id',
  })
  public products: HasMany<typeof OrderProduct>

  @hasOne(() => OrderAddress, {
    foreignKey: 'id',
    localKey: 'order_address_id',
  })
  public address: HasOne<typeof OrderAddress>

  @hasOne(() => PaymentMethod, {
    foreignKey: 'id',
    localKey: 'payment_method_id',
  })
  public payment_method: HasOne<typeof PaymentMethod>
}
