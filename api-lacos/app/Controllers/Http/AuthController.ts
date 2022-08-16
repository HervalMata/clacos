import User from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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
}
