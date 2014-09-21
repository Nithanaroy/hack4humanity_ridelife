var User = require('../models/user.js');
var globals = require('../config/globals');

/**
 * Pulls all the users from DB
 * @param  {object} req
 * @param  {object} res
 * @return {json list of users}
 */
exports.getAll = function(req, res) {
	User.find({}, function(error, users) {
		if (error) {
			res.send(500, err);
		} else {
			res.json(users);
		};
	});
};

/**
 * saves a user into users collection
 * @param  {object} req
 * @param  {object} res
 * @return {status json}
 */
exports.create = function(req, res) {
	console.log(req.body, req.params, req.query);
	User.save(req.body.user, function(err, data) {
		if (err) {
			res.send(500, data)
		} else {
			res.json({
				status: ' saved 1 user'
			});
		}
	});
}

/**
 * User presses help needed button
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.helpNeeded = function(req, res) {
	var help_needed_at = req.query.location;
	var requested_user_id = req.query.user_id;

	// Broadcast this message to all other clients
	var io = globals.io;
	// console.log('testing in users', socket);
	io.emit('hi', "A guy requested for help. Update the balloon");

	res.send(200);
}

/**
 * This method is invoked when a user accepts to give a ride
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.givingRide = function(req, res) {
	var user_id = req.query.user_id;

	User.find({
		asu_id: user_id
	}, function(err, user) {
		if (err) {
			res.send(500, data);
		} else {
			
			var io = globals.io;
			// console.log(socket, user);
			// console.log(user[0].phone_no + "|" + user[0].license);
			io.emit('assigned_driver', JSON.stringify(user[0]));
			
			res.send(200);
		};
	});
}

/**
 * Fetches the drivers nearby based on the given location
 * @param  {object} req
 * @param  {object} res
 * @return {json object list of users}
 */
exports.getNearByUsers = function(req, res) {
	var help_needed_at = req.query.location;
	var requested_user_id = req.query.user_id;

	// TODO: For now returning all users without using location
	User.find({}, function(error, users) {
		if (error) {
			res.send(500, err);
		} else {
			res.json(users);
		};
	});
}

/**
 * Finds a user using ASU ID
 * @param  {object} req
 * @param  {object} res
 * @return {json user object if found, else null}
 */
exports.findUserById = function(req, res) {
	User.find({
		asu_id: req.params.id
	}, function(err, user) {
		if (err) {
			res.send(500, data);
		} else {
			res.json(user);
		};
	});
}

/**
 * Takes a ASU ID and password and sends all user details
 * @param  {object} req request object
 * @param  {object} res response object
 * @return {object} user object
 */
exports.login = function(req, res) {
	console.log(req.body, req.params, req.query);
	asu_id = req.body.id;
	password = req.body.password; // TODO: Not using for now
	User.find({asu_id: asu_id}, function(err, user) {
		if (err) { res.send(500, err); }
		else {
			res.json(user[0]); // TODO: Will be undefined response if no users are found
		}
	});
}

/**
 * Exchange the tokens
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.completeRide = function(req, res) {
	drunker_id = req.query.drunker_id;
	rider_id = req.query.rider_id;

	User.Inc({asu_id: drunker_id}, { $inc: { tokens: -2} }, function(err, data) {
		User.Inc({asu_id: rider_id}, { $inc: { tokens: 1} }, function(err, data) {
			res.send(200);
		});
	})
}