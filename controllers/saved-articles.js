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

// Route to return (unsave) an Article.
router.put("/returned/:id", function(req, res) {
    // Update the article's boolean "saved" status to 'false.'
    db.Article.update(
        {_id: req.params.id},
        {saved: req.body.saved}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

module.exports = router;