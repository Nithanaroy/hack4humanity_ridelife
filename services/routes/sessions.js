var Session = require ('../models/session.js');

/*exports.findAll = function(req, res){

};
*/
exports.save = function(req, res){
    Session.save(req.body, handleDatabaseResponse(req, res));
};

exports.findById = function(req, res){
    Session.findById(req.params.id, handleDatabaseResponse(req, res));
};

exports.findByUser = function(req, res){
    if(!req.query.user) {
        res.send(400, 'Do not know which user to get the sessions for!');
    }else {
        Session.find({leader: req.query.user}, handleDatabaseResponse(req, res));
    }
};

exports.updateSession = function(req, res){
    var pathElements = req.path.split('/').splice(1);
    var sessionId = pathElements[1];
    res.send(req.path);
};

var handleDatabaseResponse = function(req, res){
    return function(err, data){
        console.log(JSON.stringify(data));
        if(err){
            res.send(500, err);
        }else {
            res.json(data);
        }
    };
};
