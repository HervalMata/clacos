import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Shop from 'App/Models/Shop';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'shop@crislacos.com',
      password: '123456',
      type: 'shops',
    });

    await Shop.create({
      name: 'CrisLaços',
      logo: 'assets/CrisLogo.jpeg',
      online: true,
      blocked: false,
      userId: user.id,
    });
  }
}
