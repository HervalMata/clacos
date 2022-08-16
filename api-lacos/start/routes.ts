import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/client/register', 'ClientsController.store')
Route.group(() => {
  Route.get('auth/me', 'AuthController.me');
}).middleware('auth');

Route.get('/', async () => {
  return {
    lacos: "Cris Laços",
  };
});
