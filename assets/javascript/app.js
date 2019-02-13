//Creates an array called tvShows
var tvShows = ["Desperate Housewives", "Daria", "South Park", "Friends", "Buffy the Vampire Slayer", "Saved by the Bell", "Perfect Strangers", "Full House", "The Ren & Stimpy Show", "The Powerpuff Girls", "Doctor Who"];

// function for displaying movie data, then deleting the movies-(6.2-WorkingMovieApp)
function buttons() {
	$(".buttonsArea").empty();

// Looping through the array of tvShows-(6.2-WorkingMovieApp)
for (var i = 0; i < tvShows.length; i++) {
	var button = $("<button>");
	button.html(tvShows[i]);
	button.addClass("btn btn-outline-secondary");
	button.attr("id", "tv-btn");
	button.attr("tv-title", tvShows[i]);
	$(".buttonsArea").append(button);
	}
}

// displayGifs function re-renders the HTML to display the appropriate content-(6.2-WorkingMovieApp)
function displayGifs() {
	var thisShow = $(this).attr("tv-title");
	console.log(thisShow);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisShow + "&api_key=O3EUoUzS6MC98XOKeTv3sJgz3m93BJFE&limit=10";

	// Performing an AJAX with the queryURL-the Get Method(6.3-dynamic-elements or 6.1-giphy-api)
	$.ajax({
		url: queryURL,
		method: "GET"

	// After data comes back from the request
	}).then(function (response) {
		console.log(response);
		var results = response.data;

	// looping through the movies
	for (var i = 0; i < results.length; i++) {
	var gifDiv = $("<div>");
	gifDiv.addClass("gifDiv");

	//Creating a line with the animation's rating-(6.3-DynamicElements)
	var p = $("<p>").text("Rating: " + results[i].rating);

	//centre text for the item's rating
	p.addClass("text-center");

	// Creating and storing a img tag-(6.3-DynamicElements)
	var gifImage = $("<img>");
	// Setting different attribute of the gifimage to a property pulled off the result item
	gifImage.addClass("gif");
	gifImage.attr("src", results[i].images.fixed_height_still.url);
	gifImage.attr("data-still", results[i].images.fixed_height_still.url);
	gifImage.attr("data-animate", results[i].images.fixed_height.url);
	gifImage.attr("data-state", "still");

	// Appending the line and animation to the gifDiv
	gifDiv.append(gifImage);
	gifDiv.append(p);
	

	// Prepending the gifDiv to HTML
	$(".mainArea").prepend(gifDiv);
		}
	});
	}

	// This function handles events where a movie button is clicked and grabs the input from textbox
	$("#submit-btn").on("click", function (event) {
	event.preventDefault();

	var newShow = $("#userInput").val().trim();
	tvShows.push(newShow);
	buttons();
});

	// displayGifs function
	$(document).on("click", "#tv-btn", displayGifs);

	// starts and stops the animated gif on click
	$(document).on("click", ".gif", function () {
	var state = $(this).attr("data-state");

	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value-(6.3-pausing-gifs)

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

buttons();
