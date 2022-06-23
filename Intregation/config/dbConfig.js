const mysql = require('mysql');

function connectToDatabase () {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'dialogflow-db'
      });
      return new Promise((resolve,reject) => {
         connection.connect(
            (err) => {
                if(!err){
                  console.log('connection sucess to database.....');
                }
                else{
                  console.log('database connection failed.......');
                }
              }
         );
         resolve(connection);
      });
}

function queryDatabase(connection, query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
          resolve(results);
        });
      });
}

module.exports = {connectToDatabase , queryDatabase};