var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keyRwH6xpeAi8hCZk'}).base('appIDR5r8rAhM94Ap');

var fetchRecord = function(slug) {
  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  var formula = 'Slug="' + slug + '"';
  // es6
  // let formula = `Slug="${slug}"`;

  var container = document.querySelector('.dynamic-data');
  var heading = document.querySelector('.dynamic-heading');
  var description = document.querySelector('.dynamic-description');

  base('Memories').select({
    filterByFormula: formula,
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      // container.innerHTML = record.fields.Description;
      heading.innerHTML = record.fields.Person;
      description.innerHTML = record.fields.Description;
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

var makeNavigation = function() {
  var navigationContainer = document.querySelector('.dynamic-navigation');

  base('Memories').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      var listItem = document.createElement('li');
      var anchor = document.createElement('a');

      var link = 'index.html?' + record.fields.Slug;

      anchor.innerHTML = link;
      anchor.setAttribute('href', link);

      listItem.appendChild(anchor);

      navigationContainer.appendChild(listItem);

    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}


document.addEventListener('DOMContentLoaded', function (event) {
  // DOM Loaded!
  var searchParam = document.location.search;

  var slug = searchParam.substring(1);

  fetchRecord(slug);

  makeNavigation()
});