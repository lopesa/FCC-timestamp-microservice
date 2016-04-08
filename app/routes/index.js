'use strict';

var Timestamper = require(process.cwd() + '/app/controllers/timestamper.server.js');

module.exports = function (app) {
   var timestamper = new Timestamper();

   app.route('/*').get(timestamper.convert)
};
