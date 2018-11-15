var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://10.239.104.63/clientes', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/clientes')(app, mongoose);
var clenteCTRL = require('./controllers/clientesController');

// API routes
var clientesRoute = express.Router();

clientesRoute.route('/clientes')
  .get(clenteCTRL.findAllClients);

app.use('/', clientesRoute);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
