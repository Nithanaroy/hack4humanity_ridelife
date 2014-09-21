var User = require('../models/user.js');

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
 * Fetches the drivers nearby based on the given location
 * @param  {object} req
 * @param  {object} res
 * @return {json object list of users}
 */
exports.getNearByUsers = function(req, res) {
	var help_needed_at = req.location;
	var requested_user = req.user;

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