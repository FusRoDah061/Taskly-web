module.exports = function () {

    this.cadastrarUsuario = async function(usuario, connection) {
        // let senhaCriptograda = crypto.createHash("md5").update(usuario.password).digest("hex");
        // usuario.senha = senhaCriptograda;
      let sql = `insert into usuario set ?`;
      return await connection.query(sql, usuario);
    }

    this.authenticate = async function(usuario, connection) {
      let sql = "select * from usuario where email = '" + usuario.email + "' and senha = '" + usuario.senha + "'";
      return await connection.query(sql);
    }
  
    return this;
}