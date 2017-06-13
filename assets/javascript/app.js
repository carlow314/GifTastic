//document on ready
$(document).ready(function() {
  //global variable. Array of categories for giphy site
  var categories = ["Australian Shepherd", "Shih Tzu", "Golden Retriever", "Border Collie", "Labrador Retriever", "Boxer", "Rottweiler", "Pug", "Bulldog", "Doberman Pinscher", "Beagle"];
  //functions
  function renderButtons() {
    // Deleting the buttons prior to adding new buttons.
    $("#buttons-view").empty();
    // Looping through the array of categories
    for (var i = 0; i < categories.length; i++) {
      // Then dynamically generating buttons for each category in the array
      var button = $("<button type='button' class='btn btn-danger'>");
      // Adding a class of movie to our button
      button.addClass("categories");
      // Adding a data-attribute
      button.attr("data-name", categories[i]);
      // Providing the initial button text
      button.text(categories[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(button);
    }
  }

  function newButton(categories) {
    var button = $("<button type='button' class='btn btn-danger'>");
    // Adding a class of categories to our button
    button.addClass("categories");
    // Adding a data-attribute
    button.attr("data-name", categories);
    // Providing the initial button text
    button.text(categories);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(button)
  }
  // This function handles events where a category button is clicked
  $("#add-category").on("click", function(event) {
    //event.preventDefault takes away default values of the click event
    event.preventDefault();
    // This line grabs the input from the textbox
    var newCategory = $("#category-input").val().trim();
    newButton(newCategory);
    // Adding movie from the textbox to our array
    //categories.push(newCategory);
    // Calling renderButtons which handles the processing of our movie array
    //renderButtons();
  });
  // Adding a click event listener to all elements with a class of "categories"
  $("#buttons-view").on("click", ".categories", displayCategoryGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  // Create an AJAX call to retrieve data
  function displayCategoryGif() {
    var dogs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dogs + "&api_key=dc6zaTOxFJmzC&limit=9";
    $("#gif-view").html("");
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        var retrieval = response.data;
        console.log(response);
        for (i = 0; i < retrieval.length; i++) {
          var gifDisplay = $("<div class='dogs col-lg-4'>");
          var rating = $("<p class='rating'>").text("Rating: " + retrieval[i].rating);
          var giphyImage = $("<img>");
          giphyImage.attr("src", retrieval[i].images.fixed_height_small_still.url);
          giphyImage.attr("data-still", retrieval[i].images.fixed_height_small_still.url);
          giphyImage.attr("data-animate", retrieval[i].images.fixed_height_small.url);
          giphyImage.attr("data-state", "still");
          giphyImage.addClass("gif");
          console.log(retrieval[i].images.fixed_height_small_still);
          gifDisplay.prepend(giphyImage);
          gifDisplay.prepend(rating);
          $("#gif-view").prepend(gifDisplay);
        }
      })
  }

  //click function to pause and animate gifs
  $("#gif-view").on("click", ".gif", function() {
  // This variable will set the initial state of the gif to still images
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  })
});
