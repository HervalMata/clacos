import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: number

  @column()
  public productId: number

  @column()
  public quantity: number

  @column()
  public value: number

  @column()
  public obs: string | null

  @hasOne(() => Product, {
    localKey: 'productId',
    foreignKey: 'id',
  })
  public product: HasOne<typeof Product>
}
