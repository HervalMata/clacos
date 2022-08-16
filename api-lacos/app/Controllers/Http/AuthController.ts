import Shop from 'App/Models/Shop';
import User from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Client from 'App/Models/Client';
import Admin from 'App/Models/Admin';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findByOrFail('email', email)

      let expiry;
      switch (user.type) {
        case 'clients':
          expiry = '30days';
          break;

        case 'shops':
          expiry = '7days';
          break;

        case 'admins':
          expiry = '1days';
          break;

        default:
          expiry = '30days';
          break;
      }

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: expiry,
        name: user.serialize().email,
      });

      response.ok(token);
    } catch (error) {
      return response.badRequest('Invalid credentials');
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke();
    } catch {
      return response.unauthorized('No authorization for it');
    }

    return response.ok({ revoked: true });
  }

  public async me({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()

    let data;

    switch (userAuth.type) {
      case 'clients':
        const client = await Client.findByOrFail('userId', userAuth.id)
        data = {
          id_client: client.id,
          name: client.name,
          phone: client.phone,
          email: userAuth.email,
        }
        break;

      case 'shops':
        const shop = await Shop.findByOrFail('userId', userAuth.id)
        data = {
          id_shop: shop.id,
          name: shop.name,
          logo: shop.logo,
          online: shop.online,
          blocked: shop.blocked,
          email: userAuth.email,
        }
        break;

      case 'admins':
        const admin = await Admin.findByOrFail('userId', userAuth.id)
        data = {
          id_admin: admin.id,
          name: admin.name,
          email: userAuth.email,
        }
        break;

      default:
        return response.unauthorized('Unauthorized user - type not found');
    }

    return response.ok(data);
  }
}
