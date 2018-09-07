var db = require('../../config/databaseConnection');
//var ibmdb = require('ibm_db');

module.exports = function () {
	this.all = function (retorno) {
		var con = db();
		con.query('select * from usuario',function(erro,resultado){
		  console.log(resultado);
		});
	}
	return this
};
