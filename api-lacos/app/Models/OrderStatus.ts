import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Status from './Status'

export default class OrderStatus extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public order_id: number

  @column({ isPrimary: true })
  public status_id: number

  @column()
  public obs: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasOne(() => Status, {
    localKey: 'status_id',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>
}
