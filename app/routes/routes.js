'use strict';
var express = require('express');
var router = express.Router();

// import controllers and api function
/**
 * Initialise log4js first, so we don't miss any log messages
 */
var log = require('../../config/applog');
// log.debug("This is router");
// log.info("router.js");
// log.warn("This is router");
// log.error("This is router");
// log.fatal("This is router");

var index = require('./index');
var authen = require('../controllers/authentication');
var documentController = require('../controllers/DocumentController');


// View Render
router.route('/').get(index.index);
router.route('/partials/:name').get(index.partials);
//  API
router.route('/login.htm').post(authen.login);
// documnet
router.route('/api/documnet/home.htm').get(documentController.home);
router.route('/api/documnet/folder.htm').post(documentController.folder);
router.route('/api/documnet/getfolderfromurl.htm').post(documentController.getFolderFromURL);
router.route('/api/documnet/removefile.htm').post(documentController.removeFile);
router.route('/api/documnet/renamefile.htm').post(documentController.renameFile);
router.route('/api/documnet/createfolder.htm').post(documentController.createFolder);
router.route('/api/documnet/uploadfiles.htm').post(documentController.uploadFiles);

module.exports = router;