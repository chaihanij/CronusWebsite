'use strict';

module.exports = {
	secret : 'cronusTeam',
	app: {
		title: 'Cronus Website',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'Mysql, express, angularjs, bootsrap, node.js,'
	},
	port: process.env.PORT || 3000,
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'log/access.log'
		}
	},
	log4js : { appenders: [{ type: 'file', filename: 'log/app.log' }]},
	log4jsLevle : 'ERROR',
	mysql : {
		host     : '10.239.23.178',
   	 	user     : 'cronus',
	    password : 'cronus',
	    port : 3306, 
	    database:'cronus_db',
	    multipleStatements: true
	} 
};