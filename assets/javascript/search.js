var topics = ["mst3k", "chris gethard", "richard ayoade", "karl pilkington", "big fat quiz", "comedy bang bang"];

// creates buttons from existing items in topics array
function createButtons(){
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++){
    var btn = $("<button>");
    btn.addClass("btn btn-danger");
    btn.attr("id", "image-button");
    btn.attr("data-name", topics[i]);
    //btn.attr("style", "margin: 5px")
    btn.text(topics[i]);
    $("#buttons").append(btn);
  }
}

createButtons();

// search button click function
$("#search-button").on("click", function(event){
  
  event.preventDefault();
  var searchTerm = $("#search-input").val();
  topics.push(searchTerm);
  createButtons();
  $("#search-input").val('');

});

// image button click function
$("#image-button").on("click", function(){

  var searchItem = $(this).attr("data-name");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response){
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var searchDiv = $("<div>");
      var rating = $("<p>").text("Rating: " + results[i].rating);
      var searchImage = $("<img>");
      searchImage.attr("src", results[i].images.fixed_height_still.url);
      searchImage.attr("data-state", "still");
      searchImage.attr("data-still", results[i].images.fixed_height_still.url);
      searchImage.attr("data-animate", results[i].images.fixed_height.url);
      searchImage.addClass("gif");
      searchDiv.append(searchImage);
      searchDiv.append(rating);
      $("#gifs").prepend(searchDiv);
    }
  });
});

// GIF pause/unpause function
$(".gif").on("click", function() {
     
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});