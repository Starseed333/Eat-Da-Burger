console.log('inside server.js');

var express = require("express");
var methodOverride = require('method-override');
var app = express();

var bodyParser = require("body-parser");



var port = process.env.PORT || 3000;



// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set up Handlebars.
var exphbs = require("express-handlebars");
//Set up Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(port);
