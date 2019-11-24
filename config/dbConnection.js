let mysql = require('mysql');

let connMysql = function () {
    return connection = mysql.createConnection({
        host:     'localhost',
        user:     'root',
        password: '',
        database: 'taskly'
    });
}

module.exports = function () {
    return connMysql;
};
