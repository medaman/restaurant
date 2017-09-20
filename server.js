var express = require ("express");
var path = require ("path");

var app = express();
var PORT = process.env.PORT || 8000;

var bodyParser = require("body-parser");

var tableArray = [];
var waitlistArray = [];

var homepageCounter = 0;
var tablepageCounter = 0;
var reservationpageCounter = 0;

//Set up parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Routing
app.get("/", function(req, res) {
	homepageCounter ++;
 	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style", function(req, res) {
 	res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/tables", function(req, res) {
	tablepageCounter++;
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
	reservationpageCounter++;
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/api/homepageCounter", function(req, res) {
	return res.json(homepageCounter);
})

app.get("/api/tablepageCounter", function(req, res) {
	return res.json(tablepageCounter);
})

app.get("/api/reservationpageCounter", function(req, res) {
	return res.json(reservationpageCounter);
})
//APIs
app.post("/api/new", function(req, res) {
  var newTable = req.body;
  pushToArray(newTable);
  res.json(newTable);
});

app.get("/api/table", function(req, res) {
	return res.json(tableArray);
});

app.get("/api/waitlist", function(req, res) {
	return res.json(waitlistArray);
});

app.post("/api/close", function(req, res){
	clearRestaurant();
	return res.json(tableArray);
});

app.post("/api/clear/", function(req, res){
	var tableIndex = parseInt(req.body.tableIndex);
	console.log(tableIndex);
	clearTable(tableIndex);
	return res.json(tableArray);
});

//Functions
var pushToArray = function(tableObj){
	if(tableArray.length < 5){
		tableArray.push(tableObj);
		console.log("table: " + tableArray);
	}else{
		waitlistArray.push(tableObj);
		console.log("waitlist: " + waitlistArray);
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
		waitlistArray.shift();
	}
};

//Set up Listening
app.listen(PORT, function(){
	console.log("listening on Port " + PORT);
});