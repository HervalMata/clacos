import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEditAddressValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    city_id: schema.number([
      rules.exists({ table: 'cities', column: 'id' }),
    ]),
    street: schema.string({ trim: true }, [rules.maxLength(255)]),
    number: schema.string.nullableAndOptional({ trim: true }, [rules.maxLength(20)]),
    district: schema.string({ trim: true }, [rules.maxLength(255)]),
    ref_point: schema.string.nullableAndOptional({ trim: true }, [rules.maxLength(20)]),
    complement: schema.string.nullableAndOptional({ trim: true }, [rules.maxLength(20)]),
  });


  public messages: CustomMessages = {}
}
