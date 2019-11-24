const util = require( 'util' );
const mysql = require('mysql');

let connMysql = function () {
    const connection = mysql.createConnection({
        host:     'localhost',
        user:     'root',
        password: '',
        database: 'taskly'
    });

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
