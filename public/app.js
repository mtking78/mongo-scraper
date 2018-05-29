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
            $("#scrapeCloseBtn").on("click", function() {
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
            function () {
                $('#saveArticleModal').modal('show');
            }
        }).then(function() {
            // console.log("Article has been saved");
            $("#saveArticleCloseBtn").on("click", function() {
                location.reload();
            });
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
            function () {
                $('#returnArticleModal').modal('show');
            }
        }).then(function() {
            // console.log("Article removed");
            $("#saveArticleCloseBtn").on("click", function() {
                location.reload();
            });
        });
    });

})