var http = require('http'),
	express = require('express'),
	user = require('./routes/users'),
	session = require('./routes/sessions');

var app = express();
app.set('port', process.env.PORT || 3000);

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}

app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res) {
	res.send('Hack4Humanity: Index Page, Yet to be mapped');
});

app.get('/sessions', session.findByUser);
app.get('/sessions/:id', session.findById);
app.put('/sessions/:id/*', session.updateSession);
app.post('/sessions', session.save);

app.get('/users', user.getAll);
app.post('/save', user.create);
app.get('/nearby', user.getNearByUsers);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Hack4Humanity just started its ride! ' + app.get('port'));
});