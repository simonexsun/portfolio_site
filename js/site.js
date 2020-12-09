let Airtable = require('airtable');

let base = new Airtable({apiKey: 'keyfpZwKVsD8rJeMF'}).base('appEix67CO2YQY2rP');

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
  let project_img_lightbox = document.querySelector('.dynamic_project_img_lightbox');
  let sketch_img = document.querySelector('.dynamic_sketch_img');
  let process_img = document.querySelector('.dynamic_process_img');
  let final_product_img_div = document.querySelector('.dynamic_final_product_img_container');

  base('Case_Study').select({
    filterByFormula: formula,
    maxRecords: 1,
    view: "Active"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      //retrive text
      function retrieveText(object,fieldName){
        if (record.fields[fieldName] !== undefined){
          object.innerHTML=record.fields[fieldName];
        }
        else{console.log(`${fieldName} is undefined.`);}
      }

      //retrive images
      function retrieveImage(object,fieldName){
        if (record.fields[fieldName] !== undefined){
          object.setAttribute('src', record.fields[fieldName][0].thumbnails.full.url);
        }
        else{  
          object.setAttribute('src', record.fields.Placeholder_img[0].thumbnails.full.url);
        }
      }

      console.log(`I am a ${record.fields.Catagory} project`);
      
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
      retrieveImage(project_img_lightbox,"Project_img");
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
};

// slug is only defined on case studies, otherwise undefined
let makeNavigation = function(slug) {
  let navigationContainer = document.querySelector('.dynamic_navigation');

  // returns URL
  function caseStudyForRecord(record) {
    return `case_study_${record.fields.Catagory}.html?${record.fields.Slug}`;
  }

  base('Case_Study').select({
    view: "Active"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      let list_item = document.createElement('li');
      let anchor = document.createElement('a');
      list_item.classList.add('dropdown_item');
      list_item.classList.add('type_body_2');
      anchor.classList.add('project_link');
      let link = caseStudyForRecord(record);

      anchor.innerHTML = record.fields.Title;
      anchor.setAttribute('href', link);

      list_item.appendChild(anchor);
      navigationContainer.appendChild(list_item);
    });
    
    // on case studies, do forward and back links
    if (slug) {
      const pos = records.findIndex(el => el.fields.Slug === slug);
      if (pos !== -1) {
        const previousButton = document.querySelector('#previous');
        const nextButton = document.querySelector('#next');

        previousButton.onclick = function() {
          let prevPos = pos - 1;
          if (prevPos < 0) {
            prevPos = records.length - 1;
          }
          window.location.href = caseStudyForRecord(records[prevPos]);
        }

        nextButton.onclick = function() {
          let nextPos = pos + 1;
          if (nextPos > records.length-1) {
            nextPos =0;
          }
          window.location.href = caseStudyForRecord(records[nextPos]);
        }
      }
    }

  }, function done(err) {
    if (err) { console.error(err); return; }
  });
};

function makeGallery(){
  let gallery = document.querySelector('.gallery_container');

  // returns URL
  function caseStudyForRecord(record) {
    return `case_study_${record.fields.Catagory}.html?${record.fields.Slug}`;
  }

  base('Case_Study').select({
    view: "Active"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {

      let gallery_item = document.createElement('div');
      gallery_item.classList.add('gallery_item');

      let gallery_img= document.createElement('img');
      gallery_img.setAttribute('src', record.fields.Cover_img[0].thumbnails.large.url);

      let link = caseStudyForRecord(record);
      let img_anchor = document.createElement('a');
      img_anchor.classList.add('project_link');
      img_anchor.classList.add('caption');
      img_anchor.innerHTML = record.fields.Title;
      img_anchor.setAttribute('href', link);

      gallery_item.appendChild(gallery_img);
      gallery_item.appendChild(img_anchor);
      gallery.appendChild(gallery_item);

    });
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

