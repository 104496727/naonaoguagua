var mongoose = require('mongoose');

require('./model.js');

var Book = mongoose.model('BookModel');

Book.findOne({author:"Naonao"} , function(err, docs){
	if (err){
		console.log('err', err);
		return;
	}

	console.log("find one result tt:", docs.toString());
});