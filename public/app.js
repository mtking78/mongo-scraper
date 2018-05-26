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
        }).then(function() {
            console.log("Scrape complete");
            // Reload the page to get the scraped data.
            location.reload();
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
    $("#save-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();
        // Read data attribute from "save" button.
        var id = $(this).data("id");
        // Change boolean value to 'true' for "saved."
        var savedState = {
            saved: true
        };

        // Send the PUT request.
        $.ajax("/saved/" + id, {
            type: "PUT",
            data: savedState
        }).then(function() {
            // ??? Modal success message.
            console.log("Article has been saved");
            location.reload();
        });
    });

})