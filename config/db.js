var mongo = require('mongojs');
// var mongoUri = 'mongodb://pppdipcal1zy/mydb';
var mongoUri = 'mongodb://localhost/hack4humanity';

module.exports = mongo(mongoUri);
