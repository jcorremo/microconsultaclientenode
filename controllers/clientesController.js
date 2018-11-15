var mongoose = require('mongoose');
var ClientesDB  = mongoose.model('Customer');

//GET - Return all tvshows in the DB
exports.findAllClients = function(req, res) {
	ClientesDB.find(function(err, clients) {
    if(err) res.send(500, err.message);
	res.status(200).jsonp(clients);
	});
};


