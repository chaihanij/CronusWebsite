'use strict';
var documentModel = require('../models/DocumentModel');

var log = require('../../config/applog');

var urlHome = ['Home'];
function home (req, res){
	var listFiles = documentModel.getHome();
	var resData = {};
	var urlPath = urlHome;
	resData.urlPath = urlPath;
	resData.Listfiles = listFiles;
    res.json(resData);
};
function folder (req, res){
	// console.log(req.body.folder.urlpath);
	var url = req.body.folder.urlpath;
	var listFiles = documentModel.getfolder(url);
	// console.log(listFiles);
	var resData = {};
	// public/file/docs/
	// console.log(url.substring(4));
	resData.urlPath = url.replace('public/file/docs','Home').split('/');
	resData.Listfiles = listFiles;
    res.json(resData);
};
function getFolderFromURL (req, res) {
	// console.log(req.body);
	var urlPath = req.body
	var url = "";
	for (var i = 0; i < urlPath.length; i++) {
		if( (urlPath.length -1 ) == i) {
			url += urlPath[i];
		} else {
			url += urlPath[i]+"/";
		}	
	};
	var listFiles = documentModel.getfolder(url.replace('Home','public/file/docs'));
	var resData = {};
	resData.urlPath = urlPath;
	resData.Listfiles = listFiles;
	res.json(resData);
};
function removeFile (req, res) {
	var data = req.body;
	var responseData = documentModel.removeFile(data);
	res.json(responseData);
};
function renameFile (req, res) {
	// console.log(req);
	var data = req.body;
	var responseData = documentModel.renameFile(data);
	res.json(responseData);
};
function createFolder (req, res) {
	var data = req.body;
	var responseData = documentModel.createFolder(data);
	var status = {} ;
	if ( responseData != null ) {
		status.code = true;
        status.message = "Success";  
	} else {
		status.code = false;
        status.message = "Error";  
	} 
	res.json(responseData);
};
function uploadFiles(req, res){
	var user = {};
	user.username = req.body.username;
	user.role = req.body.role;
	var urlpaht = req.body.url;
	var files = req.files;
	var data = documentModel.uploadFile(user, urlpaht, files);

	res.json(data);
}

exports.home = home;
exports.folder = folder;
exports.getFolderFromURL = getFolderFromURL;
exports.removeFile = removeFile;
exports.renameFile = renameFile;
exports.createFolder = createFolder;
exports.uploadFiles = uploadFiles;