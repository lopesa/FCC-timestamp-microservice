'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');

var app = express();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

// prettify json responses
app.set('json spaces', 3);

// from example heroku app
app.set('port', (process.env.PORT || 5000));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});