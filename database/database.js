const mySql = require('mysql');

const con = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "camping-don-matias"
});


module.exports = con;