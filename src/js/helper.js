const Handlebars = require('handlebars');
Handlebars.registerHelper('dateCut', function (dateString) {
  return dateString.slice(0, 10);
});
