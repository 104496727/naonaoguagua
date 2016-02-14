var mongoose = require('mongoose');

var uri = 'mongodb://101.200.157.44/naonaoguagua/';
mongoose.connect(uri);
var  BookSchema = new mongoose.Schema({
	name: String,
	author: String,
	publishTime: Date
});
mongoose.model('BookModel', BookSchema);
