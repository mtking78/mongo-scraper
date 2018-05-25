// Wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // Function to clear out all the articles.
    function clear() {
        $("#well-section").empty();
    }

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

    $("#clear-btn").on("click", function() {
        // Keep the page from reloading.
        event.preventDefault();

        // Empty the articles section.
        clear();
    });

})