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
app.post("/api/new", function(req, res) {
  var newTable = req.body;
  
});

//Functions
var pushToArray = function(tableObj){
	if(tableArray.length < 6){
		tableArray.push(tableObj);
	}else{
		waitlistArray.push(tableObj);
	}
};

var clearRestaurant = function(){
	tableArray = [];
	waitlistArray = [];
};

var clearTable = function(tableIndex){
	tableArray.splice(tableIndex, 1);
	if(waitlistArray.length > 0){
		tableArray.push(waitlistArray[0]);		
	}
};

//Set up Listening
app.listen(PORT, function(){
	console.log("listening on Port " + PORT);
});