var Project = require ('../models/project.js');

exports.findByUser = function(req, res){
// Hard coding req.user. This should be injected into request using
// a middleware that authenticate the logged in user.
    req.user = {id: 1};

    Project.find({userId: req.user.id}, function(err, data){
        if(err) {
            res.send(500, err);
        }else {
            res.json(data);
        }
    });
};
