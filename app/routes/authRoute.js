module.exports = function(app){
	app.get('/', function(req, res){
		app.controllers.authController.authenticate(app, req, res);
	});
}
