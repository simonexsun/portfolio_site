let Airtable = require('airtable');

let base = new Airtable({apiKey: 'keyfpZwKVsD8rJeMF'}).base('appEix67CO2YQY2rP');
let slugList=[];

let fetchCaseStudy = function(slug) {

  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  let formula = `Slug="${slug}"`;
  // text
  let title = document.querySelector('.dynamic_title');
  let subtitle = document.querySelector('.dynamic_subtitle');
  let description = document.querySelector('.dynamic_description');
  let concept = document.querySelector('.dynamic_concept');
  let fabricating = document.querySelector('.dynamic_fabricating');
  let summary = document.querySelector('.dynamic_summary');
  let created_year = document.querySelector('.dynamic_year');
  let institution = document.querySelector('.dynamic_institution');
  let reflection = document.querySelector('.dynamic_reflection');

  // images
  let cover_img = document.querySelector('.dynamic_cover_img');
  let project_img = document.querySelector('.dynamic_project_img');
  let sketch_img = document.querySelector('.dynamic_sketch_img');
  let process_img = document.querySelector('.dynamic_process_img');
  let final_product_img_div = document.querySelector('.dynamic_final_product_img_container');

  base('Case_Study').select({
    filterByFormula: formula,
    maxRecords: 1
    // view: "CD"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      function retrieveText(object,fieldName){
        if (record.fields[fieldName] !== undefined){
          object.innerHTML=record.fields[fieldName];
        }
        else{console.log(`${fieldName} is undefined.`);}
      }

      function retrieveImage(object,fieldName){
        if (record.fields[fieldName] !== undefined){
          object.setAttribute('src', record.fields[fieldName][0].thumbnails.full.url);
        }
        else{console.log(`${fieldName} is undefined.`);}
      }
      
      // text
      retrieveText(title,"Title");
      retrieveText(subtitle,"Subtitle");
      retrieveText(institution,"Institution");
      created_year.innerHTML = new Date (record.fields.Created_date).getFullYear();//convret Date to year
      retrieveText(description,"Description");
      retrieveText(concept,"Concept");
      retrieveText(fabricating,"Fabricating");
      retrieveText(summary,"Summary");
      retrieveText(reflection,"Reflection");

      // images
      retrieveImage(cover_img,"Cover_img");
      retrieveImage(project_img,"Project_img");
      retrieveImage(sketch_img,"Sketch_img");
      retrieveImage(process_img,"Process_img");
      record.fields.Final_product_img.forEach(function(attachment){
        let final_product_img = document.createElement('img');
        final_product_img.setAttribute('src', attachment.url);
        final_product_img.setAttribute( 'alt', "Final Project Image");
        final_product_img.classList.add('dynamic_final_product_img');
        final_product_img_div.appendChild(final_product_img);
      });
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

let makeNavigation = function(slug) {
  let navigationContainer = document.querySelector('.dynamic_navigation');
  let previousButton = document.querySelector('#previous');
  let nextButton = document.querySelector('#next');

  base('Case_Study').select({
    // view: "CD"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      let listItem = document.createElement('li');
      let anchor = document.createElement('a');
      listItem.classList.add('dropdown_item');
      listItem.classList.add('type_body_2');
      anchor.classList.add('project_link');
      let link = 'case_study.html?' + record.fields.Slug;

      anchor.innerHTML = record.fields.Title;
      anchor.setAttribute('href', link);

      listItem.appendChild(anchor);
      navigationContainer.appendChild(listItem);

      slugList.push(record.fields.Slug);  
      for (let i = 0; i < slugList.length; i++){
        if (slug == slugList[i]){
          previousButton.onclick = function(){
            if(i > 0){
              i = i-1;
            }
            else if(i == 0){
              i = slugList.length-1;
            }
            window.location.href = "case_study.html?" +  slugList[i];
          }
          nextButton.onclick = function(){
            if(i < slugList.length-1){
              i = i+1;
            }
            else if(i == slugList.length-1){
              i = 0;
            }
            window.location.href = "case_study.html?" +  slugList[i];
          }
          console.log("location now is ", slugList[i], i);
        }
      }

      

    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

let fetchAboutPage = function(){
  let bio = document.querySelector('.dynamic_bio');
  let statement = document.querySelector('.dynamic_statement');
  let CV_link = document.querySelector('.dynamic_CV');
  let photo = document.querySelector('.dynamic_photo');

  base('About_Page').select({
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      bio.innerHTML=record.fields.Bio;
      statement.innerHTML=record.fields.Statement;
      CV_link.setAttribute('href', record.fields.CV[0].url);
      photo.setAttribute('src', record.fields.Photo[0].url);
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

