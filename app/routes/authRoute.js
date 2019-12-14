module.exports = function(app){
	app.get('/', function(req, res){
		app.controllers.authController.authenticate(app, req, res);
	});

	app.get('/login', function(req, res){
		app.controllers.authController.login(app, req, res);
	});

	app.post('/auth/authenticate', function(req,res){
		app.controllers.authController.authenticate(app, req, res);
	})

	app.post('/auth/cadastrar_usuario',function(req,res){
		console.log(req.body)
		app.controllers.authController.cadastrarUsuario(app, req, res);
	})
}
