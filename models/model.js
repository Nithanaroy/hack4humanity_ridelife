var db = require("../config/db"),
	ObjectId = require("mongojs").ObjectId;

var Model = function(collectionName) {
	this.collection = db.collection(collectionName);
};

Model.prototype.save = function(data, callback) {
	this.collection.save(data, callback);
};

Model.prototype.findById = function(id, callback) {
	this.collection.findOne({
		_id: ObjectId(id)
	}, callback);
};

Model.prototype.find = function(criteria, callback) {
	this.collection.find(criteria, callback);
};

Model.prototype.Inc = function(criteria, inc_criteria, callback) {
	this.collection.update(criteria, inc_criteria, callback);
}

module.exports = Model;