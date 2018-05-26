// *** Dependencies *** //
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();
var PORT = 3000;

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongo-scraper");

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes
var scraperRoutes = require("./controllers/controller.js");
var savedRoutes = require("./controllers/saved-articles.js");
app.use(scraperRoutes, savedRoutes);

// Start the Server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});