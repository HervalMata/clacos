import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    shop_id: schema.number([
      rules.exists({ table: 'shops', column: 'id' }),
    ]),
    payment_method_id: schema.number([
      rules.exists({ table: 'payment_methods', column: 'id' }),
    ]),
    payback: schema.number.nullableAndOptional(),
    obs: schema.string.nullableAndOptional({ trim: true }),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        product_id: schema.number([
          rules.exists({ table: 'products', column: 'id' }),
        ]),
        quantity: schema.number(),
        obs: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    address_id: schema.number([
      rules.exists({ table: 'addresses', column: 'id' }),
    ]),
  });


  public messages: CustomMessages = {}
}
