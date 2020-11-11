let Airtable = require('airtable');

let base = new Airtable({apiKey: 'keyfpZwKVsD8rJeMF'}).base('appEix67CO2YQY2rP');

let fetchRecord = function(slug) {
  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  let formula = `Slug="${slug}"`;

  let title = document.querySelector('.dynamic-title');
  let main_img = document.querySelector('.dynamic-main-img');
  let description = document.querySelector('.dynamic-description');
  let process = document.querySelector('.dynamic-process');
  let created_year = document.querySelector('.dynamic-year');
  let media = document.querySelector('.dynamic-meida');
  let role = document.querySelector('.dynamic-role');
  let credits = document.querySelector('.dynamic-credits');

  base('Main').select({
    filterByFormula: formula,
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        title.innerHTML = record.fields.Title;
        main_img.setAttribute('src', record.fields.Project_img[0].thumbnails.full.url);
        description.innerHTML = record.fields.Description;
        process.innerHTML = record.fields.Process;
        created_year.innerHTML = new Date (record.fields.Created_date).getFullYear();//convret Date to year
        
        let raw_data= record.fields.Media;
        console.log(`media: ${raw_data.toString()}`);
        // media.innerHTML = raw_data.toString();

        role.innerHTML = record.fields.Role;
        credits.innerHTML = record.fields.Credits;
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

let makeNavigation = function() {
  let navigationContainer = document.querySelector('.dynamic-navigation');

  base('Main').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        listItem.classList.add('dropdown-item');
        let link = 'case_study.html?' + record.fields.Slug;

        anchor.innerHTML = record.fields.Title;
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
  let searchParam = document.location.search;

  let slug = searchParam.substring(1);

  fetchRecord(slug);

  makeNavigation()
});