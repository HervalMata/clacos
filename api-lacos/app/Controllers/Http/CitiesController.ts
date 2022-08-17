import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import City from 'App/Models/City';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CitiesController {
  public async index({ response }: HttpContextContract) {
    const cities = await City.query().whereHas('shops', (query) => {
      query.where('blocked', false);
    }).preload('state');

    return response.ok(cities);
  }

  public async Shops({ params, response }: HttpContextContract) {
    const city = await City.query().where('id', params.id).preload('shops').firstOrFail();

    return response.ok(city.shops);
  }
}
