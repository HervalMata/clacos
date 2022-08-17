import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import PaymentMethod from './Paymentmethod';
import Category from './Category';

export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public logo: string | null;

  @column()
  public blocked: boolean;

  @column()
  public online: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'shop_id',
    localKey: 'id',
  })
  public categories: HasMany<typeof Category>

  @manyToMany(() => PaymentMethod, {
    pivotTable: 'shop_payment_method',
    localKey: 'id',
    pivotForeignKey: 'shop_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'payment_method_id',
  })
  public paymentmethods: ManyToMany<typeof PaymentMethod>
}
