const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');
const RxHttpRequest = require('rx-http-request').RxHttpRequest;

var mongoose = require("mongoose"),
	customerModel = mongoose.model("customer"),
	http = require('http');

function transformJSON(jsonCustomer){

	RxHttpRequest.get('http://localhost:8089/customer').subscribe(
		x => console.log(x.body),
		err => console.log(err),
		onComplete => console.log("REQUEST TERMINADO")
	);

	return {nombre : jsonCustomer.nombre + jsonCustomer.codigoSolicitante};
}

exports.findAll = function (req,res) {
	var customersResponse  = [];
	customerModel.find(function (err, customers) {
		if(err) 
			res.send(500, err.message);
		else 
			var observableCustomer = from(customers);
			observableCustomer.pipe(
				filter(val => val.tipoIdentificador == "7"),
				map(val => transformJSON(val))
			)
			.subscribe(
				x => customersResponse.push(x),
				onError => console.log(onError),
				onComplete => res.status(200).send(customersResponse)
			);
	});	
};

exports.findById = function(req,res) {
	customerModel.findById(req.params.id,function (err,customer) {
		if(err) 
			res.send(500, err.message);
		else 
			res.status(200).send(customer);
	});
};