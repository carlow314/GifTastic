//document on ready
$(document).ready(function() {
  //global variable. Array of categories for giphy site
  var GifDiv = $("#gif-view");
  var categories = ["Australian Shepherd", "Shih Tzu", "Golden Retriever", "Border Collie", "Labrador Retriever", "Boxer", "Rottweiler", "Pug", "Bulldog", "Doberman Pinscher", "Beagle"];
  //functions
  function renderButtons() {
    // Deleting the buttons prior to adding new buttons. If this step isn't
    //done you will have repeat buttons
    $("#buttons-view").empty();
    // Looping through the array of categories
    for (var i = 0; i < categories.length; i++) {
      // Then dynamically generating buttons for each category in the array
      var button = $("<button type='button' class='btn btn-info'>");

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
    var button = $("<button type='button' class='btn btn-info addbutton'>");
    // Adding a class of movie to our button
    button.addClass("categories");
    // Adding a data-attribute
    button.attr("data-name", categories);
    // Providing the initial button text
    button.text(categories);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(button)


  }
  // This function handles events where a movie button is clicked
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
  $(document).on("click", ".categories", displayCategoryGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  // Create an AJAX call to retrieve data
  function displayCategoryGif() {
    var dogs = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dogs + "&api_key=dc6zaTOxFJmzC&limit=12";
    $("#gif-view").html("");
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        var retrieval = response.data;
        console.log(response);
        for (i = 0; i < retrieval.length; i++) {
          var gifDisplay = $("<div class='dogs col-lg-3'>");
          var rating = $("<p>").text("Rating: " + retrieval[i].rating);
          var giphyImage = $("<img>").attr("src", retrieval[i].images.fixed_height_small.url);
          gifDisplay.append(rating);
          gifDisplay.append(giphyImage);
          $("#gif-view").append(gifDisplay);
        }
      })
  }
});
