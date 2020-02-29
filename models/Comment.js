var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String
});

// Create Comment model with previously defined schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export Comment model
module.exports = Comment;
