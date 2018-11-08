var express = require ("express"), /*express nos ayuda a la creacion del servidor http */
	app = express(),
	bodyParser = require("body-parser"),/*nos permite hacer el parse de json*/
	methodOverride = require("method-override");/*nos permite implementar y personalizar los metodos HTTP*/

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/',function (req,res) {
	res.send("Hello World!");
});

app.use(router);

app.listen(3000,function() {
	console.log("Server is running in http://localhost:3000");
});