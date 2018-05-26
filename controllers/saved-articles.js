// Dependencies
var express = require("express");
var router = express.Router();

// Require all models
var db = require("../models");

// Route to get all saved Articles from the db.
router.get("/saved-articles", function(req, res) {

    db.Article.find({})
    .then(function(savedData) {
        // Save all saved article data into a handlebars object.
        var hbsObject = {articles:savedData};
        console.log(hbsObject);
        // Send all found saved articles as an object to be used in the handlebars receieving section of the index.
        res.render("saved", hbsObject);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

module.exports = router;