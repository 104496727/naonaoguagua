var mongoose = require('mongoose');

require('./model.js');

var Book = mongoose.model('BookModel');

var cond = {
	$or: [
	{author: 'Naonao'},
	{author: 'TingChen'}
	]
};
Book.find(cond, function(err, docs){
	if (err){
		console.log('err:', err);
		return;
	}else{
		console.log('docs:', docs.toString());
	}
});