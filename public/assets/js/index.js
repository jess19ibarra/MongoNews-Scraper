$(document).ready(function() {
  // Click listener for Scrape New Articles button
  $(document).on("click", ".scrape-new", function() {
    $.ajax({
      method: "GET",
      url: "/api/scrape"
    }).then(function() {
      location.reload();
    });
  });

  // Click listener for Clear Articles button
  $(".clear").on("click", function() {
    $.get("/api/clear").then(function() {
      $(".article-container").empty();
    });
  });

  // Click listener for Save Article button on index page
  $(document).on("click", ".btn.save", function() {
    var articleId = $(this).attr("data-id");

    $.ajax({
      method: "PUT",
      url: "/api/articles/" + articleId,
      data: {
        saved: true
      }
    }).then(function(data) {
      location.reload();
      console.log(data);
    });
  });
});
