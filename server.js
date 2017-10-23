var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var jsonparser = require('json-parser');
var mongoose = require('mongoose');

var config = require('./config/config')
var routes = require('./routes/searchandsave')

mongoose.connect(config.mongdburl, { useMongoClient: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes)


app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server started at : ' + PORT);
    }
})