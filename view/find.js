var mongoose = require('mongoose');

require('./model.js');

var Book = mongoose.model('BookModel');

Book.find(function(err, docs){
	if (err){
		console.log('err:', err);
		return;
	}else{
		console.log('log:', docs.toString());
		return;
	}
});