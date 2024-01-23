const mysql = require("mysql2");

let connDB = () =>
{

    var conn = mysql.createConnection({
        host: '65.109.114.250',
        user: 'root',
        database: 'test',
        password: '19948523cK*',
        port: 3306
    });

    return conn;
}

module.exports = connDB