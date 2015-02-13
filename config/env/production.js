'use strict';

module.exports = {
	db: {
		host     : '10.239.23.178',
    	user     : 'cronus',
    	password : 'cronus',
    	port 	 : 3306, //port mysql
    	database :'cronus_db'
    },
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	}
};
