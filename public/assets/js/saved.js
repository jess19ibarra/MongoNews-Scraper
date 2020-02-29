$(document).ready(function() {
  // Click listener for Clear Articles button
  $(".clear").on("click", function() {
    $.get("/api/clear").then(function() {
      $(".article-container").empty();
    });
  });

  // Click listener for Delete From Saved button
  $(document).on("click", ".btn.delete", function() {
    var articleId = $(this)
      .parents(".card")
      .attr("data-id");

    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + articleId
    }).then(function(data) {
      location.reload();
      console.log(data);
    });
  });

  // Click listener for Article Comments button
  $(document).on("click", ".btn.comments", function() {
    var articleId = $(this)
      .parents(".card")
      .attr("data-id");

    $.ajax({
      method: "GET",
      url: "/api/articles/" + articleId
    }).then(function(data) {
      console.log(data);
      $("#commentsDiv").empty();
      $("#articleId").text(data.title);
      $(".postComment").attr("data-id", data._id);

      if (data.comments.length !== 0) {
        for (var i = 0; i < data.comments.length; i++) {
          $("#commentsDiv").append(
            "<div><i class='far fa-comment fa-lg'></i> " +
              data.comments[i].body +
              "<button type='button' class='btn btn-sm px-3 delete-comment' data-id='" +
              data.comments[i]._id +
              "'><i class='fas fa-times'></i></button></div>"
          );
        }
      } else {
        $("#commentsDiv").append(
          "<p class='text-center'> No comments yet.</p>"
        );
      }
      $("#commentsModal").modal("show");
    });
  });

  // Click listener for Post Comment button
  $(document).on("click", ".btn.postComment", function(event) {
    event.preventDefault();

    var articleId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/api/articles/" + articleId,
      data: {
        body: $("#commentBody")
          .val()
          .trim()
      }
    }).then(function(data) {
      console.log(data);
      location.reload();
    });
  });

  // Click listener for comment delete button
  $(document).on("click", ".btn.delete-comment", function() {
    var commentId = $(this).attr("data-id");

    $(this)
      .parent("div")
      .remove();

    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + commentId
    }).then(function(data) {
      console.log(data);
    });
  });
});
