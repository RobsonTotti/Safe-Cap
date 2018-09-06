var db = require('../../config/databaseConnection');
var ibmdb = require('ibm_db');

module.exports = function () {
	this.all = function (retorno) {

		ibmdb.open(db, function (erro, conn) {

			return conn.query("SELECT\
									H.IDCADBANCO,\
									C.NOME,\
									C.IPINTERNO,\
									H.STATUS,\
									H.ERROMSG,\
									H.DTINISTATUS\
								FROM\
									HISTDISPONIBILIDADE H\
								JOIN CADBANCO C ON\
									( C.IDCADBANCO = H.IDCADBANCO )\
								WHERE H.STATUS <> 'ON'\
								ORDER BY H.DTINISTATUS DESC\
								FETCH FIRST 50 ROWS ONLY", retorno);
		});
	}

	this.find = function (dados, retorno) {
		//console.log(dados)

		var consulta = "SELECT\
							H.IDCADBANCO,\
							C.NOME,\
							C.IPINTERNO,\
							H.STATUS,\
							H.ERROMSG,\
							H.DTINISTATUS\
						FROM\
							HISTDISPONIBILIDADE H\
						JOIN CADBANCO C ON\
							( C.IDCADBANCO = H.IDCADBANCO ) WHERE "
		try {
			var result = dados.split("&");
			console.log(result)
			var id = result[0];
			var nome = result[1];
			var ip = result[2];
			var status = result[3];
			var data = result[4];

			id = id.split("id=");
			nome = nome.split("nome=");
			ip = ip.split("ip=");
			status = status.split("status=");
			data = data.split("data=")

			id = id[1]
			nome = nome[1];
			ip = ip[1];
			status = status[1];
			data = data[1];

			var contador = false

			if (id != "") {
				if (contador == true) {
					consulta = consulta.concat(" AND ")
				}
				id = " H.IDCADBANCO = " + id;
				consulta = consulta.concat(id);
				contador = true;
			}

			if (nome != "") {
				if (contador == true) {
					consulta = consulta.concat(" AND ")
				}
				nome = " C.NOME = '" + nome + "'";
				consulta = consulta.concat(nome);
				contador = true;
			}

			if (ip != "") {
				if (contador == true) {
					consulta = consulta.concat(" AND ")
				}
				ip = " C.IPINTERNO = '" + ip + "'";
				consulta = consulta.concat(ip);
				contador = true;
			}

			if (status != "") {
				if (contador == true) {
					consulta = consulta.concat(" AND ")
				}
				status = " H.STATUS = '" + status + "'";
				consulta = consulta.concat(status);
				contador = true;
			}

			if (data != "") {
				if (contador == true) {
					consulta = consulta.concat(" AND ")
				}
				data = " DATE(H.DTINISTATUS) >= '" + data + "'";
				consulta = consulta.concat(data);
				contador = true;
			}



			console.log(id, nome, ip, status, data)
		} catch (e) {

		}






		var a = " WHERE H.IDCADBANCO = " + id + " ORDER BY H.DTINISTATUS DESC FETCH FIRST 50 ROWS ONLY"

		ibmdb.open(db, function (erro, conn) {
			console.log(consulta);
			return conn.query(consulta, retorno);
		});
		//WHERE H.IDCADBANCO = RIGHT('"+ id + "', LENGTH('" + id + "') - (3))\

	}


	this.save = function (dados, retorno) {
		ibmdb.open(db, function (erro, conn) {
			return conn.query("INSERT INTO USUARIO(NOME, SOBRENOME) VALUES('" + dados.nome + "', '" + dados.sobrenome + "')", retorno);
		});
	}

	this.saveDb = function (dados, retorno) {
		ibmdb.open(db, function (erro, conn) {
			return conn.query("INSERT INTO DBA.CADBANCO(IDCADFILA, FGDC, NOME, FGTIPOCONEXAO, IPINTERNO, PORTAINTERNA, IPEXTERNO, PORTAEXTERNA, FGEXECUCAO, STATUS, DTALTERACAOSTATUS, USUARIO, SENHA, FGDISPONIBILIDADE, FGMSG, DTALTERACAOMSG, DTCADASTRO, DTALTERACAO, FGATIVO, PROTOCOLO, THREAD, DTVALIDACAO, FGVALIDACAO, FGFIMVALIDACAO, FGCOLETA, IDCADFILACOLETA, THREADCOLETAEMPRESA, THREADCOLETAPARAMS, THREADCOLETAMSGBACKUP, THREADCOLETAINTEGRIDADE) VALUES(1, 'T', '" + dados.nome + "', 'I', '" + dados.ip + "', '" + dados.porta + "', '" + dados.ip + "', '" + dados.porta + "', 'F', 'ON', CURRENT TIMESTAMP, '" + dados.usuario + "', '" + dados.senha + "', 'T', 'T', CURRENT TIMESTAMP, CURRENT TIMESTAMP, CURRENT TIMESTAMP, 'T', 'TCPIP', 'Thread-1', CURRENT TIMESTAMP, 'T', 'T', 'T', 1, 'Thread-1', 'Thread-1', 'Thread-1', 'Thread-1')", retorno);
		});
	}


	return this
};
