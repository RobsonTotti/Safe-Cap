//var databaseModel = require('../models/databaseModel')();
var controller = require('../controllers/controller');
var controllerBusca = require('../controllers/controllerBusca');
var controllerLogin = require('../controllers/controllerLogin');


module.exports = function (app) {
	app.get('/buscas', function (req, res) {
		//res.render('site/buscas');
		controllerBusca.find(req, res);
	});

	app.get('/', function (req, res) {
		controller.login(req, res);
	});

	app.get('/home', function (req, res) {
		controller.home(req, res);
	});

	app.post('/', function (req, res) {
		controllerLogin.acessar(req, res);
	});

	app.get('/teste', function (req, res) {
		controller.teste(req, res);
	});

	app.get('/temperatura', function (req, res) {
		//res.render('site/graficos');
		controller.temperatura(req, res);
	});

	app.get('/eventos', function (req, res) {
		//res.render('site/graficos');
		controller.eventos(req, res);
	});

	app.get('/cadUsuario', function (req, res) {
		controller.cadUsuario(req, res);
	});

	app.post('/cadBanco', function (req, res) {
		//res.render('site/cadBanco');
		controller.storeDb(req, res);
	});

};
