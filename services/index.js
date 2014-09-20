var http = require('http'),
    express = require('express'),
    session = require('./routes/sessions');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res){
   res.send('Hack4Humanity: Index Page, Yet to be mapped'); 
});

app.get('/sessions', session.findByUser);
app.get('/sessions/:id', session.findById);
app.put('/sessions/:id/*', session.updateSession);
app.post('/sessions', session.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Hack4Humanity just started its ride! ' + app.get('port'));
});
