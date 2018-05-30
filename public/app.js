// Wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // Function to clear out all the articles.
    function clear() {
        $("#well-section").empty();
    }

    // Run a scrape and display the results.
    $("#scrape-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();

        // Empty the articles section.
        clear();

        // Run the scaping route in controller.js with a GET request.
        $.ajax("/scrape", {
            type: "GET",
            function () {
                $('#scrapeModal').modal('show');
            }
        }).then(function() {
            // console.log("Scrape complete");
            // Reload the page to get the scraped data.
            $(".scrapeCloseBtn").on("click", function() {
                location.reload();
            });
        });
    });

    // Clear the scraped results.
    $("#clear-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();

        // Empty the articles section.
        clear();
    });

    // Save an Article.
    $(".save-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Read data attribute from "save" button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/saved/" + id,
            type: "PUT",
            success: function () {
                // Show the 'save' success message in the modal,
                $('#saveArticleModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            // console.log("Article has been saved");
            $(".saveArticleCloseBtn").on("click", function() {
                location.reload();
            });
        });
    });

    // Get notes for an article.
    $(".notes-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Save the id from the button
        var articleId = $(this).attr("data-id");
        // Make the ajax call for the article
        $.ajax({
            method: "GET",
            url: "/getnotes/" + articleId,
            success: function () {
                // Open the notes modal
                $('#notesModal').modal('show');
            }
        })
        // Add the note information
        .then(function(data) {
            console.log(data);
            var id = data._id;
            // Set the title in the header.
            $(".modal-title").html(data.title);
            // Create a data-id attribute for the button.
            $(".saveNoteBtn").attr("data-id", id);

            // If there's already a note for the article...
            if (data.notes) {
                console.log(data);
                // // Place the title of the note in the title input
                // $("#titleinput").val(data.note.title);
                // // Place the body of the note in the body textarea
                // $("#bodyinput").val(data.note.body);
                
                $(".noteArea").val(data.notes.title);
            }
        });
    });

    $(".saveNoteBtn").on("click", function() {
        var articleId = $(this).attr("data-id");
        $.ajax({
            url: "/postnotes/" + articleId,
            method: "POST",
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            // $("#notes").empty();
        });
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });


    // Return (unsave) an Article.
    $(".return-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Read data attribute from "return" button.
        var id = $(this).data("id");

        // Send the PUT request.
        $.ajax({
            url: "/returned/" + id,
            type: "PUT",
            success: function () {
                // Show the 'return' success message in the modal,
                $('#returnArticleModal').modal('show');
            }
        })
        // then update the page when the modal is closed.
        .then(function() {
            // console.log("Article removed");
            $(".returnArticleCloseBtn").on("click", function() {
                location.reload();
            });
        });
    });

})