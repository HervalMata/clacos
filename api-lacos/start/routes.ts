import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/client/register', 'ClientsController.store')
Route.get('/cities', 'CitiesController.index')
Route.get('/cities/:id/shops', 'CitiesController.shops')

Route.group(() => {
  Route.get('auth/me', 'AuthController.me');
  Route.put('/client', 'ClientsController.update')
}).middleware('auth');

Route.get('/', async () => {
  return {
    lacos: "Cris Laços",
  };
});
