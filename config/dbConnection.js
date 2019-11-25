const util = require( 'util' );
const mysql = require('mysql');

let connMysql = function () {
    
    const clearDbUrl = process.env.CLEARDB_DATABASE_URL;
    let settings;
    
    if(!clearDbUrl) {
        //Rodando local
        settings = {};
        settings.host = 'localhost';
        settings.user = 'root';
        settings.password = '';
        settings.database = 'taskly';
    }
    else { 
        //Rodando no Heroku com ClearDB
        settings = clearDbUrl;
    }
    
    const connection = mysql.createConnection(settings);

    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    }
}

module.exports = function () {
    return connMysql;
};
