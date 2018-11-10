var databaseModel = require('../models/databaseModel')();
var controller = require('../controllers/controller');
var db = require('../../config/databaseConnection');
var ibmdb = require('ibm_db');
const crypto = require("crypto");
const decipher = crypto.createDecipher('aes192', 'a password');


module.exports.acessar = function (req, res) {
    var dados = req.body;

    var password = dados.senha
    //password = criptografar(password)
    console.log("SENHA: "+ password)

    dados.password = password

    databaseModel.login(dados, function (err, result) {

        console.log(result)

        if(result[0].COUNT == 0){
            console.log("Nada")
            var erro = "Usuário ou senha inválidos"
            res.render('site/login', { erros: erro, informacao: {} });
        }else{
            /*select = "SELECT ID, IDGRUPO FROM USUARIO WHERE EMAIL = '" + dados.email + "' AND SENHA = '" + dados.password + "'"

            ibmdb.open(db, function (erro, conn) {
                conn.query(select, function (err, data) {
                    if (err) console.log(err);
                    else {
                        console.log(data)
                        //var id = data[0].IDCADPESSOA
                        //var idgrupo = data[0].IDGRUPO
                        //exportar(id, idgrupo)*/
                        controller.home(req, res);
                        //res.render('site/home'/*, { databases: result }*/);
                    //}
        
                //});
        
            //});

        }

    });
}