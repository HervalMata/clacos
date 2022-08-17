import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Shop from './Shop';
import State from './State';

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public state_id: number;

  @column()
  public active: boolean;

  @hasOne(() => State, {
    foreignKey: 'id',
    localKey: 'state_id',
  })
  public state: HasOne<typeof State>

  @manyToMany(() => Shop, {
    pivotTable: 'cities_shops',
    localKey: 'id',
    pivotForeignKey: 'city_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'shop_id',
  })
  public shops: ManyToMany<typeof Shop>
}
