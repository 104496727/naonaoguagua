var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/naonaoguagua');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected pay connection!");
});

var paySchema = mongoose.Schema({
    user : String,
    date : Date,
    pay : Number,
    desc : String
});

module.exports = mongoose.model('PayModel', paySchema);
