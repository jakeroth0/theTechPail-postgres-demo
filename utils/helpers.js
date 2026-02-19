const Handlebars = require('handlebars');

Handlebars.registerHelper('dateFormat', function(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date(date);
  const monthName = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${day} ${monthName}, ${year}`;
});
