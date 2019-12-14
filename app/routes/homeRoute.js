module.exports = function(app){
	app.get('/home', function(req, res){
		if(	req.session.autorizado){
			app.controllers.homeController.getTarefas(app, req, res);
		} else {
			console.log("Vocẽ não está autorizado");
			app.controllers.authController.login(app, req, res);
		}
	});

	app.get('/tarefas/delete', function(req, res) {
		app.controllers.homeController.deletarTarefa(app, req, res);
	});

	app.post('/tarefas', function(req, res){
		app.controllers.homeController.criarTarefa(app, req, res);
	});

	app.post('/tarefas/progresso', function(req, res){
		app.controllers.homeController.atualizarProgressoTarefa(app, req, res);
	});
}
