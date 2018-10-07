var databaseModel = require('../models/databaseModel')();

module.exports.index = function (req, res) {
    databaseModel.all(function (err, result) {
        res.render('site/home', { databases: result });
    });
};

module.exports.graficos = function (req, res) {
    res.render('site/graficos');
};

module.exports.login = function (req, res) {
    console.log(res)
    res.render('site/login');
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
