'use strict';
// Import lib
var fs = require('fs');
var path = require('path');
var log = require('../../config/applog');
// log.debug("This is router");
// log.info("router.js");
// log.warn("This is router");
// log.error("This is router");
// log.fatal("This is router");
var homePath = 'public/file/docs';
var backupHomePath = 'public/file/docs/backup'
var deletePath = 'public/file/delete'
function setIcon (extname) {
    var iconList = {
        'default':"file-generic",
        'odg':"file-text",
        'folder':"folder-generic",
        'folderuser':"folder-user",
        'folderpublic':"folder-public",
        'folderapp':"folder-app",
        'foldercamera':"folder-camera",
        'filegeneric':"file-generic",
        'txt':"file-text",
        'docx':"file-word",
        'doc':"file-word",
        'pdf':"file-acrobat",
        'xlsx':"file-excel",
        'code':"file-code",
        'html':"file-webcode",
        'photoshop':"file-photoshop",
        'flash':"file-flash",
        'lllustrator':"file-lllustrator",
        'compressed':"file-compressed",
        'rpm':"file-package",
        'film':"file-film",
        'sound':"file-sound",
        'disc':"file-disc",
        'gear':"file-gear",
        'png':"file-picture",
        'jpg':"file-picture",
        'pptx':"file-powerpoint",
        'zip':"file-compressed",
        'iso':"file-disc",
        'tar':"file-compressed",
        'script':"file-code",
        'sh':"file-code",
        'js':"file-code",
        'c':"file-code",
    };
    var prefix = extname.match(/[^\.][\w\d]*$/);
    prefix = (prefix) ? prefix[0] : "default" ;
    if ( iconList[prefix] == undefined )
        return "file-generic";
    return iconList[prefix];
};
function getHome() {
    // log.info("function gethome");
    var files = getDirectory(homePath);
    // log.debug("getHome" + "return [ " + files + " ]");
    return files;
}
function getDirectory (url) {
    // var url = url;
    // log.info("function getDirectory");
    var fullPath = path.resolve(url);
    // log.debug(fullPath);
    var joFiles = [];
    try {
        var listFiles = fs.readdirSync(fullPath);
        // log.debug(listFiles);
        for (var i = 0 ; i < listFiles.length ;i++) {
            var urlFile = url + "/" + listFiles[i];
            var objectFile = {};
            var filesFullPath = path.resolve(urlFile);
            try {
                var stats = fs.statSync(filesFullPath);
                objectFile.name = listFiles[i];
                objectFile.urlpath = urlFile.replace();
               
                objectFile.atime = stats["atime"] + "";
                objectFile.mtime = stats["mtime"] + "";
                objectFile.ctime = stats["ctime"] + "";
                if (stats.isDirectory()) {
                    objectFile.size = "--";
                    objectFile.icon = "folder-generic"
                    objectFile.kind = "folder";
                    objectFile.type = path.extname(filesFullPath);
                } else {
                    objectFile.size = stats["size"];
                    objectFile.kind = "file";
                    objectFile.type = path.extname(filesFullPath);
                    objectFile.icon = setIcon(path.extname(filesFullPath));
                }
            } catch (e) {
                log.error(e);
            }
            joFiles.push(objectFile);
            // log.debug(joFiles);
        }
    } catch (e) {
        log.error(e);
    }
    return joFiles;
};
function removeFile (data) {
    var date = new Date().getTime();
    var oldPath = data.folder.urlpath;
    var newPath = deletePath + '/' + data.folder.name + '_'+ date;
    var responseData = {};
    var status = fs.rename(path.resolve(oldPath), path.resolve(newPath));
    if (status == undefined){
        responseData.code = true;
        responseData.message = "Success";  
    } else {
        responseData.code = false;
        responseData.message = "Error";  
    }
    return responseData;
};
function renameFile(data) {
    console.log(data);
    var newName = data.newName;
    var name = data.folder.name;
    var oldPath = data.folder.urlpath;
    var newPath = data.folder.urlpath.replace(name,newName);
    var status = fs.rename(path.resolve(oldPath), path.resolve(newPath));
    var responseData = {};
    if (status == undefined){
        responseData.code = true;
        responseData.message = "Success";  
    } else {
        responseData.code = false;
        responseData.message = "Error";  
    }
    return responseData;
};
function createFolder (data) {
    
    var pathFolder = data.urlpath.replace('Home',homePath);
    var newFolder =  pathFolder + '/' + data.foldername;
    var objectFile = {};
    try {
        fs.mkdirSync(newFolder);
        var stats = fs.statSync(newFolder);
        
        objectFile.name = data.foldername;
        objectFile.urlpath = newFolder;
        objectFile.atime = stats["atime"] + "";
        objectFile.mtime = stats["mtime"] + "";
        objectFile.ctime = stats["ctime"] + "";
        objectFile.size = "--";
        objectFile.icon = "folder-generic"
        objectFile.kind = "folder";
        objectFile.type = ""
         return objectFile ;
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
        return;  
    }
    
} 
function uploadFile (user, urlpaht, files) {
    var listFiles = files.files; 
    var urlPaht = 'public/file/docs'+ urlpaht.substring(4);
    var listObjectFiles = [];
    if (listFiles.length == undefined) {
        var objectFile = {};
        try { 
            if (fs.existsSync(listFiles.path)){
                var urlCreate = urlPaht+ "/" +listFiles.originalname;
                if (!fs.existsSync(urlCreate)) {
                    var status = fs.writeFileSync(urlCreate, fs.readFileSync(listFiles.path));
                    // console.log(fs.existsSync(urlCreate));
                    if (fs.existsSync(urlCreate)) {
                        var stats = fs.statSync(urlCreate);
                        objectFile.name = listFiles.originalname;
                        objectFile.urlpath = urlCreate;
                        objectFile.atime = stats["atime"] + "";
                        objectFile.mtime = stats["mtime"] + "";
                        objectFile.ctime = stats["ctime"] + "";
                        objectFile.size = stats["size"];
                        objectFile.kind = "file";
                        objectFile.type = path.extname(urlCreate);
                        objectFile.icon = setIcon(path.extname(urlCreate));
                    }
                }  else {
                    var date = Date.now();
                    var urlCreateDate = urlPaht + "/" + date + "_"+listFiles.originalname;
                    var status = fs.writeFileSync(urlCreateDate, fs.readFileSync(listFiles.path));
                    if (fs.existsSync(urlCreateDate)) {
                        var stats = fs.statSync(urlCreateDate);
                        objectFile.name = date + "_"+listFiles.originalname;
                        objectFile.urlpath = urlCreateDate;
                        objectFile.atime = stats["atime"] + "";
                        objectFile.mtime = stats["mtime"] + "";
                        objectFile.ctime = stats["ctime"] + "";
                        objectFile.size = stats["size"];
                        objectFile.kind = "file";
                        objectFile.type = path.extname(urlCreateDate);
                        objectFile.icon = setIcon(path.extname(urlCreateDate));
                    }
                }
                listObjectFiles.push(objectFile);
            }
        } catch (e) {
            console.log(e);
            log.error(e);
        }

    } else if ( listFiles.length > 0 ){
        var listObjectFiles = [];
        for (var i = 0; i < listFiles.length; i++) {
            var objectFile = {};
            try { 
                if (fs.existsSync(listFiles[i].path)){ 
                    var urlCreate = urlPaht+ "/" + listFiles[i].originalname;
                    // console.log(urlCreate);
                    if (!fs.existsSync(urlCreate)) {
                        // console.log(listFiles[i].path)
                        var status = fs.writeFileSync(urlCreate, fs.readFileSync(listFiles[i].path));
                        if (fs.existsSync(urlCreate)) {
                            var stats = fs.statSync(urlCreate);
                            objectFile.name = listFiles[i].originalname;
                            objectFile.urlpath = urlCreate;
                            objectFile.atime = stats["atime"] + "";
                            objectFile.mtime = stats["mtime"] + "";
                            objectFile.ctime = stats["ctime"] + "";
                            objectFile.size = stats["size"];
                            objectFile.kind = "file";
                            objectFile.type = path.extname(urlCreate);
                            objectFile.icon = setIcon(path.extname(urlCreate));
                        }
                    } else {
                        var date = Date.now();
                        var urlCreateDate = urlPaht + "/" + date + "_"+listFiles[i].originalname;
                        var status = fs.writeFileSync(urlCreateDate, fs.readFileSync(listFiles[i].path));
                        if (fs.existsSync(urlCreateDate)) {
                            var stats = fs.statSync(urlCreateDate);
                            objectFile.name = date + "_" + listFiles[i].originalname;
                            objectFile.urlpath = urlCreateDate;
                            objectFile.atime = stats["atime"] + "";
                            objectFile.mtime = stats["mtime"] + "";
                            objectFile.ctime = stats["ctime"] + "";
                            objectFile.size = stats["size"];
                            objectFile.kind = "file";
                            objectFile.type = path.extname(urlCreateDate);
                            objectFile.icon = setIcon(path.extname(urlCreateDate));
                        }
                    }
                listObjectFiles.push(objectFile);  
                }
            } catch (e) {
                console.log(e);
                log.error(e);
            }
        };
    } 
    return listObjectFiles;
}

exports.createFolder = createFolder;
exports.renameFile = renameFile;
exports.removeFile = removeFile;
exports.getHome = getHome;
exports.getfolder = getDirectory;
exports.uploadFile = uploadFile;