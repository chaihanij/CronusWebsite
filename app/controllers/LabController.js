var model = require('../models/LabModel');
var log = require('../../config/applog');

function getListLab (req, res) {
    // body...
    var resultData = model.listLab(req, res);
    // console.log(resultData);
    // res.json(resultData);
}
function borrowLab (req, res) {
    model.updateUID(req, res);
}
function returnLab (req, res) {
     model.updateUID(req, res);
}
function updateLab (req, res) {
     model.updateLab(req, res);
}
function getLab (req, res) {
     model.selectLab(req, res);
     // model.testQuery();
     // res.json({});
}
function getTools (req, res) {
    model.getTools(req, function(err,tools){
    	// console.log(tools.develop);
    	// console.log(tools.network);
    	// console.log(tools.equinox);
    	// console.log(tools.etc);
    	if(err) throw err;  
    	res.json(tools)
    });
    // model.testQuery() 
}
function updateTools (req, res) {
    model.updateTools(req.body, function(err) {
        if (err) {
            log.error(err);
            res.json({status:false, message:err});
            throw err;
        }
        res.json({status:true, message:"success"});
    });
 
}
function updateToolsStatus (req, res) {
   console.log(req.body);
    model.updateToolsStatus(req.body ,function(err){
        if (err) {
            log.error(err);
            res.json({status:false, message:err});
            throw err;
        }
        res.json({status:true, message:"success"});
    });
} 

exports.getListLab = getListLab;
exports.borrowLab = borrowLab;
exports.returnLab = returnLab;
exports.getLab = getLab;
exports.updateLab = updateLab;
exports.getTools = getTools;
exports.updateTools = updateTools;
exports.updateToolsStatus = updateToolsStatus;