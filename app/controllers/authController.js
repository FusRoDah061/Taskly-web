module.exports = function () {

    this.authenticate = async function(app, req, res) {
  
      let db = app.config.dbConnection();
      let tarefaModel = app.models.tarefaModel;
  
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
        try {
          await db.close();
        }
        catch(err) {}
      }
  
      res.render('auth');
    }
   
    return this;
  }
  