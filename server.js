'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');

var app = express();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

// prettify json responses
app.set('json spaces', 3);

routes(app);



app.listen(3000, function () {
   console.log('Node.js listening on port 3000...');
});