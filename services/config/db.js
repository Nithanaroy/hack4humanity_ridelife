var mongo = require('mongojs');
var mongoUri = 'mongodb://pppdipcal1zy/mydb';
//var mongoUri = 'mongodb://localhost/mydb';

module.exports = mongo(mongoUri);
