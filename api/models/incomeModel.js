var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/naonaoguagua');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

var incomeSchema = mongoose.Schema({
    user : String,
    date : Date,
    income : Number,
    desc : String
});

module.exports = mongoose.model('IncomeModel', incomeSchema);
