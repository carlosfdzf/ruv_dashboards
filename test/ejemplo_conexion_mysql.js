var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "ruv_dashboards",
    port: 3306
});

connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
    if (err) console.log(err);
    console.log('The solution is: ', rows);
    connection.end();
});