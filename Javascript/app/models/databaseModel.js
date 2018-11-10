var db = require('../../config/databaseConnection');
var ibmdb = require('ibm_db');

module.exports = function () {

	this.dadosUsuario = function (retorno) {
		ibmdb.open(db, function (erro, conn) {
			consulta = "SELECT 			DTEVENTO,			TEMPERATURA,			STATUS,			U.NOME		FROM			EVENTO AS E,		USUARIO AS U 		WHERE 			U.IDUSUARIO = E.IDUSUARIO				ORDER BY idevento DESC LIMIT 1"
			return conn.query(consulta, retorno);
		});
	}

	this.temperatura = function (retorno) {
		ibmdb.open(db, function (erro, conn) {
			consulta = "SELECT LEFT(DTEVENTO, 16) AS DTEVENTO, TEMPERATURA FROM EVENTO ORDER BY IDEVENTO DESC LIMIT 26"
			return conn.query(consulta, retorno);
		});
	}

	this.login = function(dados, retorno){
		ibmdb.open(db, function (erro, conn) {
			var select = "SELECT COALESCE(COUNT(*), 0) AS COUNT FROM USUARIO WHERE EMAIL = '" + dados.email + "' AND SENHA = '" + dados.password + "'"

			console.log(select)

			return conn.query(select, retorno);
		});
	}
	return this
};
