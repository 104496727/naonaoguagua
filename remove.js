var mongoose = require('mongoose');

require('./model.js');

var Book = mongoose.model('BookModel');

Book.findOne({name:"Naonao"}, function(err, docs){
	if (err){
		console.log('error status:',err);
		return;
	}else{
		if (docs){
			docs.remove();
		}
	}
});