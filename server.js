var express	= require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	app = express();

mongoose.connect("mongodb://dbcustomer:dbcustomer123@ds041387.mlab.com:41387/customersdb",
	{ useNewUrlParser: true },
	function (err,res) {
	if(err) console.log("Error en la conexion hacia la DB" + err);
	else console.log("Conectado a la DB");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var model	= require('./model/customer')(app, mongoose);
var controller = require('./controller/customer');

var router = express.Router();

router.route("/customer")
	.get(controller.findAll);

router.route("/customer/:id")
	.get(controller.findById);

app.use("/", router);
	
app.listen(5000, function () {
	console.log("escuchando en el puerto 5000");
})