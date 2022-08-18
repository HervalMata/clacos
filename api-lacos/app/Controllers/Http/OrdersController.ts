import CitiesShop from 'App/Models/CitiesShop';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Client from 'App/Models/Client';
import Order from 'App/Models/Order';
import CreateOrderValidator from 'App/Validators/CreateorderValidator';
import Address from 'App/Models/Address';
import OrderAddress from 'App/Models/Orderaddress';
import Product from 'App/Models/Product';
import OrderProduct from 'App/Models/Orderproduct';
import OrderStatus from 'App/Models/Orderstatus';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
var randomstring = require('randomstring')

export default class OrdersController {
  public async store({ auth, response, request }: HttpContextContract) {
    const payload = await request.validate(CreateOrderValidator)

    const userAuth = await auth.use('api').authenticate();
    const client = await Client.findByOrFail('user_id', userAuth.id);

    let hash_ok: boolean = false;
    let hash_id: string = '';

    while (hash_ok == false) {
      hash_id = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
        capitalization: 'uppercase',
      });

      const hash = await Order.findBy('hash_id', hash_id);

      if (hash == null) {
        hash_ok = true;
      }
    }

    const trx = await Database.transaction();

    const address = await Address.findByOrFail('id', payload.shop_id);

    try {
      const addr = await OrderAddress.create({
        cityId: address.city_id,
        street: address.street,
        number: address.number,
        district: address.district,
        ref_point: address.ref_point,
        complement: address.complement,
      });

      const shopCity = await CitiesShop.query()
            .where('shop_id', payload.shop_id)
            .where('city_id', address.city_id).first();

      let totalValue = 0;

      for (const product of payload.products) {
        const prod = await Product.findByOrFail('id', product.product_id);
        totalValue += product.quantity * prod.price;
      }

      totalValue = shopCity ? totalValue + shopCity.cost_delivery : totalValue;

      totalValue = parseFloat(totalValue.toFixed(2));

      if (payload.payback != null && payload.payback < totalValue) {
        trx.rollback();
        return response.badRequest('O valor do troco não pode ser menor que o valor total do pedido');
      }

      const order = await Order.create({
        hash_id: hash_id,
        client_id: client.id,
        shop_id: payload.shop_id,
        payment_method_id: payload.payment_method_id,
        order_address_id: addr.id,
        value: totalValue,
        payback: payload.payback,
        cost_delivery: shopCity ? shopCity.cost_delivery : 0,
        obs: payload.obs,
      });

      payload.products.forEach(async (product) => {
        let getProduct = await Product.findByOrFail('id', product.product_id);

        await OrderProduct.create({
          orderId: order.id,
          productId: product.product_id,
          value: getProduct.price,
          quantity: product.quantity,
          obs: product.obs,
        });
      });

      await OrderStatus.create({
        order_id: order.id,
        status_id: 1,
      });

      await trx.commit();

      return response.ok(order);
    } catch (error) {
      await trx.rollback();
      return response.badRequest('Something in the request is wrong');
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate();
    const client = await Client.findByOrFail('user_id', userAuth.id);

    const orders = await Order.query()
          .where('client_id', client.id)
          .preload('shop')
          .preload('order_status', (statusQuery) => {
            statusQuery.preload('status');
          }).orderBy('order_id', 'desc');

    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const idOrder = params.hash_id;

    const order = await Order.query()
          .where('hash_id', idOrder)
          .preload('products', (productQuery) => {
            productQuery.preload('product');
          })
          .preload('client')
          .preload('address')
          .preload('shop')
          .preload('payment_method')
          .preload('order_status', (statusQuery) => {
            statusQuery.preload('status');
          })
          .first();

    if (order == null) {
      return response.notFound('Pedido não encontrado');
    }

    return response.ok(order);
  }
}
