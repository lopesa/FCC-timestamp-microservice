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
         timeZoneOffsetSecs, 
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
               // for consistent formatting
               dates.natural = new Date(inputDate).toLocaleString(
                  'en-US', {
                     month: 'long',
                     day: 'numeric',
                     year: 'numeric'
                  }
               );

               // the timezone conversion is done here.
               timeZoneOffsetSecs = new Date(inputDate).getTimezoneOffset() * 60
               dates.linux = new Date(inputDate) / 1000 - timeZoneOffsetSecs;
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
               // the conversion to string, including timezone corretion
               dates.natural = new Date(Number(inputDate) * 1000).toLocaleString(
                  'en-US', {
                     timeZone: 'UTC',
                     month: 'long',
                     day: 'numeric',
                     year: 'numeric'
                  }
               );
               // it just is
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
