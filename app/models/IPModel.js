var mySql = require('../../config/mysql');
var log = require('../../config/applog');

function getIP (callback){
	var sql ="SELECT `id`, `ip_address`, `des`, `uid` FROM `tb_ipaddress`;";
    mySql.query(sql, function(err, rows) {
       	// if (err) {
       	// 	log.error(err);
       	// 	throw err;
       	// }
        // if (rows != null){
        //     console.log(rows);
        // }
        callback(err, rows);
    });
}

function updateUIDIP (data, callback) {
	var sql = "UPDATE `cronus_db`.`tb_ipaddress` SET`uid` = '"+ data.uid +"',`last_update` = NOW() WHERE `id` = '"+ data.id+"' AND `ip_address` ='"+data.ip_address+"';"
    mySql.query(sql, function(err, result) {
        callback(err,result);
    });
}

function updateDES (data,callback) {
	var sql = "UPDATE `cronus_db`.`tb_ipaddress` SET `des` = '"+ data.des +"',`last_update` = NOW() WHERE `id` = '"+ data.id+"' AND `ip_address` ='"+data.ip_address+"';"
    mySql.query(sql, function(err, result) {
        callback(err,result);
    });
}
exports.updateDES = updateDES;
exports.getIP = getIP;
exports.updateUIDIP = updateUIDIP;