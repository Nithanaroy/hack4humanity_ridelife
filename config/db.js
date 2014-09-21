var mongo = require('mongojs');
// var mongoUri = 'mongodb://pppdipcal1zy/mydb';
// var mongoUri = 'mongodb://localhost/hack4humanity';
var mongoUri = 'mongodb://ridelife:saibaba@kahana.mongohq.com:10092/hack4humanity_ridelife';

module.exports = mongo(mongoUri);
