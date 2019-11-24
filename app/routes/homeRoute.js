module.exports = function(app){
	app.get('/home', function(req, res){
		app.app.controllers.homeController.getTarefas(app, req, res);
	});

	app.get('/tarefas/delete', function(req, res) {
		app.app.controllers.homeController.deletarTarefa(app, req, res);
	});
}
