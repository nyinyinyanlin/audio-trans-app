var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var exphbs  = require('express-handlebars');
var fs = require('fs');

app.use(express.static('app/public'))
app.use(express.static('app/audio'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res){
	var files = fs.readdirSync(__dirname+'/audio');
	var file_names = [null];
	files.forEach(function(value){file_names.push(value.replace(__dirname+'/audio/',''));});
	res.render('home',{'files':file_names});
});

server.listen(8000);
