var globals = require('../config/globals');

module.exports = function(socket) {

	globals.socket = socket;

	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('request_ride', function(msg) {
		console.log('message: ' + msg);

		// socket.broadcast.emit('hi', "Hello There");
	});
}