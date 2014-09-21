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
	User.save(req.user, function(err, data) {
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
		asu_id: req.asu_id
	}, function(err, user) {
		if (err) {
			res.send(500, data);
		} else {
			res.json(user);
		};
	});
}