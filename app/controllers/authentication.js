'use strict';
var soap = require('soap');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

exports.login = function (req, res) {
    if ((req.body.username === 'admin' && req.body.password === 'admin')) {
        var profile = { 
            "username": "admin" ,
            role:"admin"
         };
         var token = jwt.sign(profile, config.secret, { expiresInMinutes: 60*5 }); 
         res.json({token: token});
    } else if ((req.body.username === 'user' && req.body.password === 'user')) {
        var profile = { 
            "username": "user" ,
            role:"user"
         };
         var token = jwt.sign(profile, config.secret, { expiresInMinutes: 60*5 }); 
         res.json({token: token});
    } else {
        res.format({
            'application/json': function () {
                res.send({ status:false, messages:"Invalid username or password" });
            }
        });
        return;
    }
};

