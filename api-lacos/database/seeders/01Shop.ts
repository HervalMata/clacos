import City from 'App/Models/City';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Shop from 'App/Models/Shop';
import State from 'App/Models/State';
import User from 'App/Models/User';
import CitiesShop from 'App/Models/CitiesShop';
import { faker } from '@faker-js/faker';

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

    for (let i = 2; i <= 10; i++) {
      await User.create({
        email: `shop${i}@crislacos.com`,
        password: '12345678',
        type: 'shops',
      });
    }

    for (let i = 2; i <= 10; i++) {
      await Shop.create({
        name: `Shop ${1}`,
        logo: `https://picsum.photos/id/${i}/200/200`,
        online: true,
        blocked: false,
        userId: i,
      });
    }

    await State.createMany([
      {
        name: 'Rio de Janeiro',
        uf: 'RJ'
      },
      {
        name: 'Minas Gerais',
        uf: 'MG'
      },
      {
        name: 'Espirito Santo',
        uf: 'ES'
      },
    ]);

    await City.createMany([
      {
        name: 'Teresópolis',
        state_id: 1,
      },
      {
        name: 'Juiz de Fora',
        state_id: 2,
      },
      {
        name: 'Colatina',
        state_id: 3,
      },
    ]);

    for(let i = 1; i <= 10; i++) {
      await CitiesShop.create({
        city_id: faker.datatype.number({ min: 1, max: 2 }),
        shop_id: i,
        cost_delivery: faker.datatype.float({ min: 0, max: 3, precision: 0.5, }),
      });
    }
  }
}
