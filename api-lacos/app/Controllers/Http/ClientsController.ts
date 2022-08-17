import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';
import User from 'App/Models/User';
import CreateClientValidator from 'App/Validators/CreateclientValidator';
import EditClientValidator from 'App/Validators/EditclientValidator';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator)

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: 'clients',
    });

    const client = await Client.create({
      name: payload.name,
      phone: payload.phone,
      userId: user.id,
    });

    return response.ok({
      id: client.id,
      name: client.name,
      email: user.email,
      phone: client.phone,
    });
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(EditClientValidator)
    const userAuth = await auth.use('api').authenticate()

    const trx = await Database.transaction()

    try {
      const user = await User.findByOrFail('id', userAuth.id)
      const client = await Client.findByOrFail('user_id', userAuth.id)

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        });
      } else {
        user.merge({
          email: payload.email,
        });
      }

      await user.save()

      client.merge({
        name: payload.name,
        phone: payload.phone,
      });

      await client.save()

      await trx.commit()

      return response.ok({
        id: client.id,
        name: client.name,
        email: user.email,
        phone: client.phone,
      });
    } catch {
      await trx.rollback()
      return response.badRequest('Something in the request is wrong')
    }
  }
}
