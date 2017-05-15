var topics = ["chris gethard", "mst3k", "richard ayoade", "karl pilkington", "big fat quiz", "comedy bang bang"];

// button click function
$("button").on("click", function(){

  var searchItem = $(this).attr("");

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
      image.attr("src", results[i].images.fixed_height_still.url);
      searchDiv.append(rating);
      searchDiv.append(searchImage);
      $("#gifs").prepend(searchDiv);
    }
  });
});