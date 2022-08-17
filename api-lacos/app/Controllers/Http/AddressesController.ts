import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';
import Client from 'App/Models/Client';
import CreateEditAddressValidator from 'App/Validators/CreateeditaddressValidator';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressesController {
  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    const getClient = await Client.query()
                    .where('id', client.id)
                    .preload('addresses', (CityQuery) => {
                      CityQuery.preload('city', (queryState) => {
                        queryState.preload('state');
                      });
                    }).firstOrFail();

    return response.ok(getClient.addresses);
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateEditAddressValidator)
    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    const address = await Address.create({
      city_id: payload.city_id,
      client_id: client.id,
      street: payload.street,
      number: payload.number,
      district: payload.district,
      ref_point: payload.ref_point,
      complement: payload.complement,
    });

    return response.ok(address);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CreateEditAddressValidator)
    const address = await Address.findOrFail(params.id)

    address.merge(payload);
    await address.save();

    return response.ok(address);
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const resp = await Address.query().where('id', params.id).delete()

      if (resp.includes(1)) {
        return response.noContent();
      } else {
        return response.notFound();
      }
    } catch (error) {
      return response.badRequest();
    }
  }
}
