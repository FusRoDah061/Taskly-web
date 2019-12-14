module.exports = function () {

    this.cadastrarUsuario = async function(app, req, res) {
      let db = app.config.dbConnection();
      let authModel = app.models.authModel;
      let usuario = req.body;

      req.assert("email", "Email é obrigatório").notEmpty();
      req.assert("senha", "Senha é obrigatória").notEmpty();
      let erros = req.validationErrors();
      console.log(erros);
      if (erros) {
          res.render('cadastro', { erros: erros });
          return;
      }
      
        let result = await authModel.cadastrarUsuario(usuario, db, app);
        console.log("result",result)
        if(result){
          req.session.autorizado = true;
          res.redirect('/home');
          return;
        }else{
          req.session.autorizado = false;
          let erro = 'Erro ao cadastrar'
          res.render('/', { erros: erro });
        }                  
      
    }

    this.login = async function(app, req, res) {
      res.render('login', { erros: {} });
    }

    this.inserirUsuario = async function(app, req, res) {  
      res.render('cadastro', { erros: {} });
    }
   
    this.authenticate = async function(app, req, res) {  
      //res.render('cadastro', { erros: {} });

      let usuario = req.body;
      req.assert("email", "Email é obrigatório").notEmpty();
      req.assert("senha", "Senha é obrigatória").notEmpty();
      let erros = req.validationErrors();
      console.log(erros);
      if (erros) {
          res.render('login', { erros: erros });
          return;
      }
      let db = app.config.dbConnection();
      let authModel = app.models.authModel;

      
      try {
        let result = await authModel.authenticate(usuario, db);
        console.log(result.length)
        if(result.length > 0){
          req.session.autorizado = true;
          res.redirect('/home');
          return;
        }else{
          console.log("Erro ao autenticar");
          req.session.autorizado = false;
          res.render('login', { erros: {} });
        } 
      } catch (error) {
        res.redirect('/login');
      }
      finally {
        try {
          await db.close();
        }
        catch(err) {}
      }

    
    }

    this.sair = async function(app, req, res) {  
      req.session.destroy( function(erro){
        res.redirect("/login");
      })
    }

    return this;
  }
  