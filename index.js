let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Getir Assignment'));

app.use('/', apiRoutes);

app.listen(3000, function () {
    console.log("Running Assignment on port " + port);
});

module.exports = app;