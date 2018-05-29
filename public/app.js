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

    $(".notes-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Save the id from the button
        var articleId = $(this).attr("data-id");

        // Make the ajax call for the article
        $.ajax({
            method: "GET",
            url: "/saved-articles/" + articleId,
            success: function () {
                // Open the notes modal
                $('#notesModal').modal('show');
            }
        })
        // Add the note information
        .then(function(data) {
            console.log(data);
        });
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