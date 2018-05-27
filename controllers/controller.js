// Dependencies
var express = require("express");
var router = express.Router();

// *** Scraping Tools *** //
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

// *** Route for Scraping *** //
router.get("/scrape", function(req, res) {
    // Get the entire body of the html with a request.
    axios.get("https://www.theonion.com/c/news-in-brief")
    .then(function(response) {
        // Load the response into cheerio and save it as a short-hand selector "$"
        var $ = cheerio.load(response.data);

        // Get every h1 within an article tag...
        $("article h1").each(function(i, element) {
            // Save an empty result object
            var result = {};
            console.log(result);
            // Get the text and href of every link, save them as properties of the result object.
            result.title = $(this).text();
            result.link = $(this).children("a").attr("href");

            // Create a new Article with the `result` object built from scraping.
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console:
                console.log(dbArticle);
            })
            .catch(function(error) {
                // Send the error, if it exists.
                return res.json(error);
            });
        });

        // Alert the client if the scrape was completed:
        res.send("Scrape was successful!");
    });
});

// *** Routes to export to server.js *** //

// Route to get all Articles from the db.
router.get("/", function(req, res) {
    // Limit set to only show first 20 articles.
    db.Article.find({}).limit(20)
    .then(function(scrapedData) {
        // Save all scraped data into a handlebars object.
        var hbsObject = {articles:scrapedData};
        console.log(hbsObject);
        // Send all found articles as an object to be used in the handlebars receieving section of the index.
        res.render("index", hbsObject);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

// Route to save an Article.
router.put("/saved/:id", function(req, res) {
    // Update the article's boolean "saved" status to 'true.'
    db.Article.update(
        {_id: req.params.id},
        {saved: true}
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