exports = module.exports = function(app, mongoose) {

	var clienteSchema = new mongoose.Schema({ 
		codigo: String, 
   	identificador: String,  
   	tipoIdentificador: String, 
   	nombre: String,  
   	tipoCliente: String,  
   	codigoSolicitante: String,  
   	razonSocial: String
   });

	mongoose.model('Clientes', clienteSchema);

};
