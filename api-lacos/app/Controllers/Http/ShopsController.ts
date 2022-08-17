import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CitiesShop from 'App/Models/CitiesShop';
import City from 'App/Models/City';
import Order from 'App/Models/Order';
import Shop from 'App/Models/Shop';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopsController {
  public async orders({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const shop = await Shop.findByOrFail('user_id', userAuth.id)

    const orders = await Order.query()
          .where('shop_id', shop.id)
          .preload('client')
          .preload('order_status', (statusQuery) => {
            statusQuery.preload('status')
          }).orderBy('order_id', 'desc');

    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const idShop: number = params.id;

    let arrayCities: any = [];

    const cities = await CitiesShop.query().where('shop_id', idShop);

    for await (const city of cities) {
      const city_ = await City.findByOrFail('id', city.city_id);
      arrayCities.push({
        id: city_.id, city: city_.name, cost_delivery: city.cost_delivery,
      });
    }

    const shop = await Shop.query()
          .where('id', idShop)
          .preload('categories', (categoriesQuery) => {
            categoriesQuery.preload('products');
          }).preload('paymentmethods').firstOrFail();

    return response.ok({
      id: shop.id,
      name: shop.name,
      logo: shop.logo,
      blocked: shop.blocked,
      online: shop.online,
      cities: arrayCities,
      payment_methods: shop.paymentmethods,
      categories: shop.categories,
    });
  }
}
