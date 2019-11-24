module.exports = function () {

  this.getTarefas = async function(app, req, res) {

    let db = app.config.dbConnection();
    let tarefaModel = app.app.models.tarefaModel;

    let tarefasBacklog = [];
    let tarefasEmAndamento = [];
    let tarefasConcluidas = [];
    let erro = null;

    try{
      tarefasBacklog = await tarefaModel.getTarefasBacklog(1, db);
      tarefasEmAndamento = await tarefaModel.getTarefasEmAndamento(1, db);
      tarefasConcluidas = await tarefaModel.getTarefasConcluidas(1, db);
    }
    catch (err) {
      console.log(err);
      erro = err;
    }
    finally {
      await db.close();
    }

    res.render('home', {
      tarefas: {
        backlog: tarefasBacklog,
        emAndamento: tarefasEmAndamento,
        concluidas: tarefasConcluidas
      },
      erro: erro
    });
  }

  return this;
}