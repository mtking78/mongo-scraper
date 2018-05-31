// *** Dependencies *** //
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

// *** Database setup *** //
// Use the deployed or local database.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper";
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
// Connect to the Mongo DB (old localhost)
// mongoose.connect("mongodb://localhost/mongo-scraper");

// Initialize the app with Express.
var app = express();

// *** Middleware *** //
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

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import and use routes.
var scraperRoutes = require("./controllers/controller.js");
var savedRoutes = require("./controllers/saved-articles.js");
app.use(scraperRoutes, savedRoutes);

// Start the Server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});