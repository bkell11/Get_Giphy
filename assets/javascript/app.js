var athlete = ["Lebron James", "Mike Trout", "Allen Iverson", "Shaq", "Bryce Harper", "Freddie Freeman"]



function renderButtons() {

    $("#athlete-buttons").empty();

    for (i = 0; i < athlete.length; i++) {

        var button = $("<button>");

        button.addClass("athlete");

        button.attr("data-athlete", athlete[i]);

        button.text(athlete[i]);

        $("#athlete-buttons").append(button);
    }
}


$("#add-athlete").on("click", function (event) {
    event.preventDefault();

    if ($("#athlete-input").val().trim() === "") {
        return;
    }
    else {
        var newAthlete = $("#athlete-input").val().trim();
        athlete.push(newAthlete);

        renderButtons();
    }


});



function displayAthleteGif() {


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
                athleteImage.addClass("athlete-img");
                athleteImage.attr("src", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-animate", results[i].images.fixed_height.url);
                athleteImage.attr("data-state", "still");
                athleteDiv.append(rating);
                athleteDiv.append(athleteImage);


                $("#athlete").append(athleteDiv);
            }
        });
};


function startStopGif() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

$(document).on("click", ".athlete", displayAthleteGif);
$(document).on("click", ".athlete-img", startStopGif);
renderButtons();
