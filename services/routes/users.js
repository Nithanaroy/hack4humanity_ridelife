var User = require ('../models/user.js');

exports.findById = function(req, res){
    User.findById(req.params.id, function(err, data){
        if(err) {
            res.send(500, err);
        }else {
            res.json(data);
        }
    });
};
