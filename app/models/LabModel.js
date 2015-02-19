var mySql = require('../../config/mysql');
var log = require('../../config/applog');
function listLab (req, res) {
    var sql ="SELECT * FROM cronus_db.tb_labs;";
    var query = mySql.query(sql, function(err, rows) {
        if (err) throw err;
        if (rows != null){
            res.json(rows);
        }
     });
}
function selectLab (req, res) {
    var data = req.body;
    var sql ="SELECT * FROM cronus_db.tb_labs WHERE `id` = ? and `ip_address` = ?";
    var query = mySql.query(sql, [ data.id, data.ip ],function(err, rows) {
        if (err) throw err;
        if (rows != null){
            res.json(rows);
        }
     });
}

function updateUID (req, res) {
    console.log(req.route.path);
    var data;
    if ( req.route.path == "/api/lab/borrowlab.htm" ) {
        data = req.body;
    } else {
        data = req.body;
        data.user.username = "";
    }
    
    var sql = "UPDATE `cronus_db`.`tb_labs` SET `last_update` = NOW() ,`uid` = '"+ data.user.username + "' WHERE `id` = '"+ data.lab.id +"' AND `ip_address` = '" + data.lab.ip_address +"'";
    mySql.query(sql, function (err, result) {
        if (err) {
            log.error(err);
            res.json({status:false, message:err});
            throw err;
        }
        console.log(result);
        res.json({status:true, message:result.message});
        
    });
}

function updateLab (req, res) {
    var labUpdate =  req.body.lab;
    var dataUpdate = [ labUpdate.ip_address, labUpdate.hostname, labUpdate.purpose, labUpdate.status, labUpdate.os, labUpdate.cpu, labUpdate.ram, labUpdate.disk, labUpdate.remark, labUpdate.id.toString()];

    var sql =   "UPDATE `cronus_db`.`tb_labs` SET `ip_address` = \'" + labUpdate.ip_address  +"\' ,`hostname` = \'"+ labUpdate.hostname +"\' , `purpose` = \'"+labUpdate.purpose +"\',`status` = \'"+labUpdate.status + "\' ,`os` =\'"+labUpdate.os+"\' ,`cpu` = \'"+ labUpdate.cpu +"\', `ram` = \'"+ labUpdate.ram +"\', `disk` =\'"+ labUpdate.disk +"\', `remark` = \'"+ labUpdate.remark +"\', `last_update` =  NOW() WHERE `id` = \'"+labUpdate.id+"\'"; 

    var query = mySql.query(sql ,function(err, result) {
        if (err) {
            res.json({status:false, message:err});
            log.error(err);
            throw err;  
        }
        res.json({status:true, message:result.message});
    });
}
function getTools(req, callback) {

	var queryToolsDevelop = "SELECT * FROM cronus_db.tb_tools where `type` = 'develop' and `id` = ?;"
	var queryToolsNetwork = "SELECT * FROM cronus_db.tb_tools where `type` = 'network' and `id` = ?;"
	var queryToolsEquinox = "SELECT * FROM cronus_db.tb_tools where `type` = 'equinox' and `id` = ?;"
	var queryToolsETC = "SELECT * FROM cronus_db.tb_tools where `type` = 'etc' and `id` = ?;"
	mySql.query(queryToolsDevelop, [ req.body.id ], function(err, toolsDevelop) {
    	mySql.query(queryToolsNetwork, [ req.body.id ], function(err, toolsNetwork) {
    		mySql.query(queryToolsEquinox, [ req.body.id ], function(err, toolsEquinox) {
    			mySql.query(queryToolsETC, [ req.body.id ], function(err, toolsETC) {
    				var tools = {};
    				tools.develop = toolsDevelop;
    				tools.network = toolsNetwork;
    				tools.equinox = toolsEquinox;
    				tools.etc = toolsETC;
    				callback(err, tools)
    			});
    		});
    	});
	});
}
function updateTools(data,callback) {
    var device = data.searchObject;
    var tools = data.tools;
    var object  = {} ;
    object.id = device.id;
    object.ip = device.ip;
    object.tools = tools.tools;
    object.status = tools.status;
    object.version = tools.version;
    object.type = tools.type;
    var query = "INSERT INTO `cronus_db`.`tb_tools`SET ?";
    mySql.query(query, object , function(err) {
        callback(err);
    });
    
}
function updateToolsStatus(data,callback) {

    var query = "UPDATE `cronus_db`.`tb_tools` SET `status` =" + data.tools.status +"  WHERE `id` = '" + data.searchObject.id + "' and `ip` = '" + data.searchObject.ip +"'  and `tools` = '" + data.tools.tools + "'";
    mySql.query(query, function(err) {
        callback(err);
    });  
   
}
function testQuery (callback) {
    var globloData;
    mySql.query('SELECT * FROM cronus_db.tb_labs',function (err, rows) {
        if (err) throw err;
        if (rows != null){
            console.log(rows);
        }
    });
}

exports.testQuery = testQuery;
exports.listLab = listLab;
exports.updateUID = updateUID;
exports.updateLab = updateLab;
exports.selectLab = selectLab;
exports.getTools = getTools;
exports.updateTools = updateTools;
exports.updateToolsStatus = updateToolsStatus;