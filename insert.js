var mongoose = require('mongoose');

// 相当于执行model.js
require('./model.js');

var Book = mongoose.model('BookModel');
var book = new Book({
	name: "Ting Chen",
	author : "Green",
	publishTime: new Date()
});

book.author = 'Naonao';


book.save(function(err){
	console.log('save status:', err ? 'fail' : 'success');
});
