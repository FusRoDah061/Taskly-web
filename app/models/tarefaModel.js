module.exports = function () {

  const DATE_FORMAT = '%d/%m/%Y %H:%i';

  this.getTarefasBacklog = async function(idUsuario, connection) {
    let sql = `select id, id_usuario, descricao, progresso, date_format(created_at, '${DATE_FORMAT}') as created_at 
               from tarefa 
               where progresso <= 0 and 
                     id_usuario = ${idUsuario}`;
    return await connection.query(sql);
  }

  this.getTarefasEmAndamento = async function(idUsuario, connection) {
    let sql = `select id, id_usuario, descricao, progresso, date_format(created_at, '${DATE_FORMAT}') as created_at  
               from tarefa 
               where progresso > 0 and 
                     progresso < 100 and 
                     id_usuario = ${idUsuario}`;
    return await connection.query(sql);
  }

  this.getTarefasConcluidas = async function(idUsuario, connection) {
    let sql = `select id, id_usuario, descricao, progresso, date_format(created_at, '${DATE_FORMAT}') as created_at   
               from tarefa 
               where progresso = 100 and 
                     id_usuario = ${idUsuario}`;
    return await connection.query(sql);
  }

  this.getTarefa = async function(idUsuario, idTarefa, connection) {
    let sql = `select select id, id_usuario, descricao, progresso, date_format(created_at, '${DATE_FORMAT}') as created_at    
               from tarefa 
               where id = ${idTarefa} and 
                     id_usuario = ${idUsuario}`;
    return await connection.query(sql);
  }

  this.deleteTarefa = async function(idTarefa, connection) {
    let sql = `delete from tarefa where id = ${idTarefa}`;
    return await connection.query(sql);
  }

  this.atualizarTarefa = async function(tarefa, connection) {
    let sql = `update tarefa set descricao = '${tarefa.descricao}' where id = ${tarefa.id}`;
    return await connection.query(sql);
  }

  this.inserirTarefa = async function(tarefa, connection) {
    let sql = 'insert into tarefa set ?';
    return await connection.query(sql, tarefa);
  }

  return this;
}
