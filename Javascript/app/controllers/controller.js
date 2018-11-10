var databaseModel = require('../models/databaseModel')();
var controller = require('../controllers/controller');
var db = require('../../config/databaseConnection');
var ibmdb = require('ibm_db');
const crypto = require("crypto");
const decipher = crypto.createDecipher('aes192', 'a password');


module.exports.index = function (req, res) {
    //databaseModel.all(function (err, result) {
    res.render('site/home'/*, { databases: result }*/);
    //});
};

module.exports.eventos = function (req, res) {
    res.render('site/eventos');
};

module.exports.temperatura = function (req, res) {
    databaseModel.temperatura(function (err, result){
        console.log(result)
        res.render('site/temperatura', { valores: result });
    });
};

module.exports.login = function (req, res) {
    console.log(res)
    res.render('site/login', {erros: {}, informacao: {}});
};

module.exports.teste = function (req, res) {
    //console.log(res)
    res.render('site/teste');
};
module.exports.cadUsuario = function (req, res) {
    res.render('site/cadUsuario');
};

module.exports.store = function (req, res) {
    var dados = req.body;
    console.log(dados);
    databaseModel.save(dados, function (err, result) {
        //res.render('site/cadUsuario', { databases: result });
        res.render('site/cadUsuario');
    });
};

module.exports.home = function (req, res) {
    console.log(res)
    databaseModel.dadosUsuario (function (err, result) {
        res.render('site/home', {valores : result, erros : err});
    });
};




const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes192",
    segredo : "a password",
    tipo : "hex"
};

function criptografar(senha) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};
