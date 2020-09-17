var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/';


app.set('view engine', 'pug');
app.set('views','./views');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/information")
var nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String
});
var User = mongoose.model("User", nameSchema)

app.get("/", function (req, res){
		res.render('index');
});

app.post('/details', (req, res) => {
	var Details = new User(req.body);
	Details.save()
		.then(item => {
			res.send("Item successfully saved to the database. Go to /database.")
		})
});

app.get('/database', function(req, res) {
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("information");
  	dbo.collection("users").find({}, { projection: { _id: 0, firstName: 1, lastName: 1 } }).toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
    	db.close();
  	});
	});
});





app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
