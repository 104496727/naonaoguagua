var express = require('express');

var app = express();

app.use(express.static('./public'));
app.use(express.static('./js'));

app.get('/', function(req, res){
    res.end('hello\n');
});


app.listen(18001, function(){
    console.log('express runnint on http://101.200.157.44:18001');
});
