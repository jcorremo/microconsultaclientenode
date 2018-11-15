exports = module.exports = function(app, mongoose) {

	var clienteSchema = new mongoose.Schema({ 
		codigo: { type: String }, 
   	identificador: { type: String },  
   	tipoIdentificador: { type: String }, 
   	nombre: { type: String },  
   	tipoCliente: { type: String },  
   	codigoSolicitante: { type: String },  
   	razonSocial: { type: String }
   });

	mongoose.model('Customer', clienteSchema);

};
