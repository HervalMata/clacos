import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

Route.get('/', async () => {
  return {
    lacos: "Cris Laços",
  };
});
