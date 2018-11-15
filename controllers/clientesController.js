var mongoose = require('mongoose');
var ClientesDB  = mongoose.model('Clientes');

//GET - Return all tvshows in the DB
exports.findAllClients = function(req, res) {
	ClientesDB.find(function(err, clients) {
    if(err) res.send(500, err.message);

    console.log('GET /clients')
		res.status(200).jsonp(clients);
	});
};


