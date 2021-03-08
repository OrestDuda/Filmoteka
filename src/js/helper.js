const Handlebars = require("handlebars");
Handlebars.registerHelper('dateCut', function (dateString) {
    return dateString.slice(0, 10);
  });

//возьми тескст посчитай длины, если ддлинный встявь спан,
// и поменяй класс на мор, если короткый - ничего не делай

