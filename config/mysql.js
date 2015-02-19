var mysql_db = require('mysql');
var config = require('./config');
var log = require('./applog');

function handleDisconnect() {
  var mysql_connection = mysql_db.createConnection(config.mysql); // Recreate the connection, since
                                                  // the old one cannot be reused.
  mysql_connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      log.error('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  mysql_connection.on('error', function(err) {
    log.error('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

  return mysql_connection;
}
module.exports = handleDisconnect ();