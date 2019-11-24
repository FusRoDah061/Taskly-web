module.exports = function(app){
	app.get('/home', function(req, res){
		app.app.controllers.homeController.getTarefas(app, req, res);
	});
}
