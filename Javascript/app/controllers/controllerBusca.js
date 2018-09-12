var databaseModel = require('../models/databaseModel')();

module.exports.find = function (req, res) {
    var dados = require('url').parse(req.url).query
    //console.log(dados)
    try{
        //result = dados.split("&");
        //console.log(result[0]);
        
        databaseModel.find(dados, function (err, result) {
            //console.log(result)
            console.log(result);
            res.render('site/buscas', { databases: result });
        });
    }catch(err){
        console.log("")
    }
};
