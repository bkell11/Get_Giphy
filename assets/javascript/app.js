var athlete = ["Lebron James", "Tony Romo", "Allen Iverson", "Emmitt Smith"]


function renderButtons() {

    $("#athlete-buttons").empty();

    // Looping through the array of movies
    for (i = 0; i < athlete.length; i++) {

        var button = $("<button>");
        // Adding a class
        button.addClass("athlete");
        // Adding a data-attribute with a value of the movie at index i
        button.attr("data-athlete", athlete[i]);
        // Providing the button's text with a value of the movie at index i
        button.text(athlete[i]);
        // Adding the button to the HTML
        $("#athlete-buttons").append(button);
    }
}


$("#add-athlete").on("click", function (event) {
    event.preventDefault();

    var newAthlete = $("#athlete-input").val().trim();
    athlete.push(newAthlete);

    renderButtons();
});

renderButtons();

$("button").on("click", function () {
    var newAthlete = $(this).attr("data-athlete");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newAthlete + "&api_key=GyQSGSgJ5s08agB8yMd1Q6bWfG7qnH8s&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;
            for (i = 0; i < results.length; i++) {

                var athleteDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var athleteImage = $("<img>");
                athleteImage.attr("src", results[i].images.fixed_height.url);
                athleteDiv.append(rating);
                athleteDiv.append(athleteImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#athlete").prepend(athleteDiv);
            }
        });
});