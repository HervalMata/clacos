import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public city_id: number

  @column()
  public street: string

  @column()
  public number: string | null

  @column()
  public district: string

  @column()
  public ref_point: string | null

  @column()
  public complement: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => City, {
    localKey: 'cityId',
    foreignKey: 'id',
  })
  public city: HasOne<typeof City>
}
