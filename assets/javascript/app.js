//document on ready function
$(document).ready(function() {
  //Array of categories for giphy site. This will be used in creation of category buttons
  var categories = ["Australian Shepherd", "Shih Tzu", "Golden Retriever", "Border Collie", "Labrador Retriever", "Boxer", "Rottweiler", "Pug", "Bulldog", "Doberman Pinscher", "Beagle"];


  //functions for application//
  ///////////////////////////
  //function to create buttons based on the array
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < categories.length; i++) {
      var button = $("<button type='button' class='btn btn-danger'>");
      button.addClass("categories");
      button.attr("data-name", categories[i]);
      button.text(categories[i]);
      $("#buttons-view").append(button);
    }
  }
//function for adding a new button to the array of existing buttons
  function newButton(categories) {
    var button = $("<button type='button' class='btn btn-danger'>");
    button.addClass("categories");
    button.attr("data-name", categories);
    button.text(categories);
    $("#buttons-view").append(button)
  }
//function to grab API data//
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

  //ON CLICK EVENT HANDLERS//
  //////////////////////////
  // This on click adds a new button
  $("#add-category").on("click", function(event) {
    event.preventDefault();
    var newCategory = $("#category-input").val().trim();
    newButton(newCategory);
  });
  // Adding a click event listener to all elements with a class of "categories"
  //This will call the API when a button is clicked
  $("#buttons-view").on("click", ".categories", displayCategoryGif);
  renderButtons();

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
