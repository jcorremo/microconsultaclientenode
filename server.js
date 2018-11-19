var express	= require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	app = express();

var portAPI = process.env.PORTAPI || '5000';
var portDB = process.env.PORTDB;
var hostDB = process.env.HOSTDB;
var userDB = process.env.USERDB;
var passDB = process.env.PASSDB;
var nameDB = process.env.NAMEDB;

mongoose.connect("mongodb://"+userDB+":"+passDB+"@"+hostDB+":"+portDB"/"+nameDB,
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
	
app.listen(portAPI, function () {
	console.log("escuchando en el puerto "+portAPI);
})