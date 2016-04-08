// this relies on Date.parse() so it might not be great
// production ready code. I'd imagine there's an NPM module that's
// done the work of properly putting dates into a date object.
// However, much of what I read about the downsides of Date.parse was
// written ~2012/13 so maybe it's better now.

'use strict';

function timestamper () {
   this.convert = function (req, res) {
      // res.send(req.params[0])
      var inputDate = req.params[0],
         buildDates,
         finalDateObj;

      buildDates = function buildDates() {
         var dates = {}
         // string case
         if (isNaN(inputDate)) {
            // catches non-date strings
            if (isNaN(Date.parse(inputDate))) {
               dates.natural = null;
               dates.linux = null;
            }
            else {
               dates.natural = new Date(inputDate).toDateString();
               dates.linux = new Date(inputDate).getTime();
            }
         }

         // number case
         else {
            // catches non date numbers 
            if (isNaN(new Date(Number(inputDate)))) {
               dates.natural = null;
               dates.linux = null;
            }
            else {            
               dates.natural = new Date(Number(inputDate)).toDateString();
               dates.linux = inputDate;
            }
         }
         return dates;
      }

      finalDateObj = buildDates();

      res.send(finalDateObj);
   }
}

module.exports = timestamper;
