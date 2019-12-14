module.exports = function () {

    this.cadastrarUsuario = async function(app, req, res) {
      let db = app.config.dbConnection();
      let authModel = app.models.authModel;
      let usuario = req.body;

      console.log(usuario)


      //await authModel.cadastrarUsuario(app);
      let tarefas;
      res.redirect('/home');
    }

    this.login = async function(app, req, res) {
      res.render('login');
    }

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
  
      res.render('cadastro');
    }
   
    return this;
  }
  