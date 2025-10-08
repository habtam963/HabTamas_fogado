const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',        
    database: 'fogado'
});
connection.connect(err => {
    if (err) throw err;
    console.log('MySQL kapcsolódva');
});
module.exports = connection;


