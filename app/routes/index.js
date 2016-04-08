'use strict';

var Timestamper = require(process.cwd() + '/app/controllers/timestamper.server.js');

module.exports = function (app) {
   var timestamper = new Timestamper();

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

   app.route('/*').get(timestamper.convert)
};
