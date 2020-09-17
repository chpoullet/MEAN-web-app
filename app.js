var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/information';
var str = "";


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

app.route('/database').get(function(req, res) {
   MongoClient.connect('mongodb://localhost', function(err, client) {
		 	 var db = client.db('information');
       var collection = db.collection('information');
       var cursor = collection.find({});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    Firstname " + item.firstName + "</br>";
           }
       }, function(err) {
           res.send(err);
           client.close();
          }
       );
   });
});





app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
