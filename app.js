'use strict';
const express         = require('express');
const errorHandler    = require('errorhandler');
const figlet          = require('figlet');
const path            = require('path');
const bodyParser      = require('body-parser');
const cookieParser    = require('cookie-parser');
const favicon         = require('serve-favicon');
const app             = express();
// const log             = require('./libs/log')(module);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
require('./routes')(app);

// webpack
const webpack       = require('webpack');
const config        = require('./config');

const http   = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT || config.get('port'), function() {
  figlet.text('connect', function(err, date) {
    if (err) {
      return console.log(err);
    } else {
      console.log(date);
    }
  });
});
