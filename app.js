var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get("/", function (request, response){
		response.sendFile(__dirname+"/views/index.html");
});

app.get('/database', function(req, res){
   res.render('database');
});

app.get('/data', function(req, res){
	 var firstname = req.query.firstname;

	 if (firstname != "") {
		 res.send("Your name is " + firstname);
	 } else {
		 	res.send("Please provide your first name")
	 }
});

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
