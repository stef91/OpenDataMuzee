/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
var connection = require('express-myconnection');

var mysql = require('mysql');
var connectionDetails= {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dai'
};

app.use('/', connection(mysql, connectionDetails, 'single'));

require('./config/express')(app);
require('./routes')(app);

app.get('/main', function(req, res){
  res.render('partials/' + req.params.partialPath);
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
var exports;
exports = module.exports = app;
