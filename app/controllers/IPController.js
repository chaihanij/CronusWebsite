var model = require('../models/IPModel');
var log = require('../../config/applog');

function getIP(req ,res) {
	model.getIP(function (err, rows) {
		if (err) {
       		log.error(err);
       		throw err;
       	}
        res.json(rows); 
	});
}
function borrowIP(req ,res) {
	var postData = req.body;
	model.updateUIDIP(postData, function (err,result){ 
		if (err) {
			log.error(err);
            res.json({status:false, message:err});
            throw err;  
        }
        res.json({status:true, message:result.message});
	});
} 
function returnIP(req ,res) {
	var postData = req.body;
	model.updateUIDIP(postData, function (err,result){ 
		if (err) {
			log.error(err);
            res.json({status:false, message:err});
            throw err;  
        }
        res.json({status:true, message:result.message});
	});
} 
function updateDescriptionIP (req ,res) {
	var postData = req.body;
	model.updateDES(postData, function (err,result){ 
		if (err) {
			log.error(err);
            res.json({status:false, message:err});
            throw err;  
        }
        res.json({status:true, message:result.message});
	});
} 
exports.borrowIP = borrowIP;
exports.returnIP = returnIP;
exports.getIP = getIP;
exports.updateDescriptionIP = updateDescriptionIP;