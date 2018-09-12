//var databaseModel = require('../models/databaseModel')();
var controller = require('../controllers/controller');
var controllerBusca = require('../controllers/controllerBusca');


module.exports = function (app) {
	app.get('/buscas', function (req, res) {
		//res.render('site/buscas');
		controllerBusca.find(req, res);
	});

	app.get('/', function (req, res) {
		controller.login(req, res);
	});

	app.get('/home', function (req, res) {
		controller.index(req, res);
	});

	app.get('/graficos', function (req, res) {
		//res.render('site/graficos');
		controller.graficos(req, res);
	});

	app.get('/cadUsuario', function (req, res) {
		controller.cadUsuario(req, res);
	});

	app.post('/cadBanco', function (req, res) {
		//res.render('site/cadBanco');
		controller.storeDb(req, res);
	});

};
