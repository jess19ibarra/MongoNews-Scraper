// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// PORT Setup
var PORT = process.env.PORT || 3000;

// Initialize express
var app = express();

// Express Router
var router = express.Router();

// Require Routes
require("./config/routes")(router);

// Designate the public folder as a static dir
app.use(express.static(__dirname + "/public"));

// Handlebars connection
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// Body-Parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Router for requests to go through
app.use(router);

// Deployed DB
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Mongoose connection
mongoose.connect(db, function(error) {
  // Connection errors with mongoose
  if (error) {
    console.log(error);
  } // Successful connection message
  else {
    console.log("Connection to mongoose was successful");
  }
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
