import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/client/register', 'ClientsController.store')
Route.get('/cities', 'CitiesController.index')
Route.get('/cities/:id/shops', 'CitiesController.shops')

Route.get('/shops/:id', 'ShopsController.show')

Route.put('/client/register', 'ClientsController.store')

Route.group(() => {
  Route.get('auth/me', 'AuthController.me');
  Route.resource('/addresses', 'AddressesController').only([
    'store', 'index', 'update', 'destroy'
  ])
  Route.post('/orders', 'OrdersController.store')
  Route.get('/orders', 'OrdersController.index')
  Route.get('/orders/:hash_id', 'OrdersController.show')
  Route.get('/shop/orders', 'ShopsController.orders')
  Route.put('/client', 'ClientsController.update')
}).middleware('auth');

Route.get('/', async () => {
  return {
    lacos: "Cris Laços",
  };
});
