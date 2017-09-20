var express = require ("express");
var path = require ("path");

var app = express();
var PORT = process.env.PORT || 8000;

var bodyParser = require("body-parser");

var tableArray = [];
var waitlistArray = [];

//Set up parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Routing
app.get("/", function(req, res) {
 	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style", function(req, res) {
 	res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

//APIs



//Set up Listening
app.listen(PORT, function(){
	console.log("listening on Port " + PORT);
});