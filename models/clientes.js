exports = module.exports = function(app, mongoose) {

	var clienteSchema = new mongoose.Schema({
		nombre: { type: String },
		apellido: { type: String },
		edad: 	{ type: String },
		pais:  	{ type: String }
	});

	mongoose.model('Clientes', clienteSchema);

};
