var mysql = require('mysql');

var conn = function(){
  return mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'safecap'
  });
};

module.exports = conn;
