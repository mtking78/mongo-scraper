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
        // console.log(hbsObject);
        // Send all found saved articles as an object to be used in the handlebars receieving section of the index.
        res.render("saved", hbsObject);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

// Route to get a specific saved Article and populate it with its notes.
router.get("/getnotes/:id", function(req,res) {
    // Find the article by req.params.id,
    db.Article.findOne(
        {_id: req.params.id}
    )
    // run the populate method with note,
    .populate("notes")
    // respond with the article with the note included.
    .then(function(dbArticle) {
        // If all Articles are successfully found, send them back to the client.
        res.json(dbArticle);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

// Route for saving/updating an Article's associated Note.
router.post("/postnotes/:id", function(req, res) {
    // Save the new note that gets posted to the Notes collection,
    // then find an article from the req.params.id,
    // and update it's "note" property with the _id of the new note.
    console.log(req.body);
    console.log("xxxxxxx");
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
            {_id: req.params.id},
            {$push:
                {notes: dbNote._id}
            },
            // {note: dbNote._id},
            {new: true }
        );
    })
    // respond with the article with the note included.
    .then(function(dbArticle) {
        // If all Notes are successfully found, send them back to the client.
        res.json(dbArticle);
    })
    .catch(function(error) {
        // If an error occurs, send the error to the client.
        res.json(error);
    });
});

// Route for updating a Note.
router.get("/getsinglenote/:id", function(req,res) {
    db.Note.findOne(
        {_id: req.params.id}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Route to delete a Note.
router.delete("/deletenote/:id", function(req,res) {
    db.Note.remove(
        {_id: req.params.id}
    )
    // Todo - remove note from article as well
    // .then(function (dbArticle) {
    //     db.Article.findOneAndDelete(
    //         {_id: req.params.id},
    //         {notes: dbNote._id},
    //         // {new: true }
    //     );
    // })
    .then(function(dbNote) {
        res.json(dbNote);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Route to return (unsave) an Article.
router.put("/returned/:id", function(req, res) {
    // Update the article's boolean "saved" status to 'false.'
    db.Article.update(
        {_id: req.params.id},
        {saved: false}
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