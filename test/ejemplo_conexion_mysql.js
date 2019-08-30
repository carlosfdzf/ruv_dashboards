var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b2e704cf0da4f1",
    password: "d6737e46 ",
    database: "heroku_31848d8700d88d8",
    port: 3306
});


connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
    if (err) console.log(err);
    console.log('The solution is: ', rows);
    connection.end();
});