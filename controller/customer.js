const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');
var mongoose = require("mongoose"),
	customerModel = mongoose.model("customer");

/*
exports.findAll = function (req,res) {
	customerModel.find(function (err, customers) {
		if(err) res.send(500, err.message);
		else 
			res.status(200).send(customers);//stream de datos, debo retornar un observavle, subscribirme a el para el haga
			//la llamada y antes de retornar los datos, debo transformarlos
	});	
};
*/
var datosRespuesta  = [];

exports.findAll = function (req,res) {
	customerModel.find(function (err, customers) {
		if(err) 
			res.send(500, err.message);
		else 
			var custReactive = from(customers);
			custReactive
			.pipe(
				filter(val => 
					val.tipoIdentificador == "7"
				),
				map(val => {
					datosRespuesta.push({nombre:val.nombre});
				})
			)
			.subscribe(
				val => {
					console.log(val);
				},
				onerror => {
					console.log("algo");
				},
				onComplete => {
					res.status(200).send(datosRespuesta);
				}
			);
	});	
};



exports.findById = function(req,res) {
	customerModel.findById(req.params.id,function (err,customer) {
		if(err) res.send(500, err.message);
		else 
			console.log("METODO GET CON ID");
			res.status(200).send(customer);
	});
};