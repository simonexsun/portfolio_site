// @ts-check
let Airtable = require("airtable");

let base = new Airtable({
  apiKey:
    "patt4vaEGwtdtm08J.fb3e35a7b086c1a9a7e6aca8c7097a111787bbbb1c7231a97d5016f6a06eaad9",
}).base("appEix67CO2YQY2rP");

let fetchCaseStudy = function (slug) {
  if (!slug) {
    console.log("No slug provided, cancelling API call");
    return;
  }

  let formula = `Slug="${slug}"`;
  // get text DOM
  // Introduction
  let title = document.querySelector(".dynamic_title");
  let created_year = document.querySelector(".dynamic_year");
  let institution = document.querySelector(".dynamic_institution");
  let subtitle = document.querySelector(".dynamic_subtitle");
  let description = document.querySelector(".dynamic_description");
  // Background Research
  let challenge = document.querySelector(".dynamic_challenge");
  let inspiration = document.querySelector(".dynamic_inspiration");
  let questions = document.querySelector(".dynamic_questions");
  let methods = document.querySelector(".dynamic_methods");
  let insights = document.querySelector(".dynamic_insights");
  // Concept Development
  let brainstorm = document.querySelector(".dynamic_brainstorm");
  let scoping = document.querySelector(".dynamic_scoping");
  let solution = document.querySelector(".dynamic_solution");
  let method_def = document.querySelector(".dynamic_method_def");
  let characters = document.querySelector(".dynamic_characters");
  let character_relationship = document.querySelector(
    ".dynamic_character_relationship"
  );
  let win = document.querySelector(".dynamic_win");
  let controls = document.querySelector(".dynamic_controls");

  // Fabrication Process
  let sketches = document.querySelector(".dynamic_sketches");
  //Game
  let networking = document.querySelector(".dynamic_networking");
  let map = document.querySelector(".dynamic_map");
  let NavMesh = document.querySelector(".dynamic_NavMesh");
  let UI = document.querySelector(".dynamic_UI");
  let controller = document.querySelector(".dynamic_controller");

  let prototypes = document.querySelector(".dynamic_prototypes");
  let prototype_1 = document.querySelector(".dynamic_prototype_1");
  let prototype_2 = document.querySelector(".dynamic_prototype_2");
  let prototype_3 = document.querySelector(".dynamic_prototype_3");
  let prototype_4 = document.querySelector(".dynamic_prototype_4");

  // Research related
  let r_prototypes = document.querySelector(".dynamic_r_prototypes");
  let interview = document.querySelector(".dynamic_interview");
  let data_anaylsis = document.querySelector(".dynamic_data_anaylsis");
  let r_insights = document.querySelector(".dynamic_r_insights");

  let iterations = document.querySelector(".dynamic_iterations");
  let testing = document.querySelector(".dynamic_testing");

  // Takeaways
  let reflection = document.querySelector(".dynamic_reflection");

  // get images DOM
  // Introduction
  let cover_img = document.querySelector(".dynamic_cover_img");
  let project_img = document.querySelector(".dynamic_project_img");
  let project_img_lightbox = document.querySelector(
    ".dynamic_project_img_lightbox"
  );
  // Background Research
  let challenge_img = document.querySelector(".dynamic_challenge_img");
  let inspiration_img = document.querySelector(".dynamic_inspiration_img");
  let questions_img = document.querySelector(".dynamic_questions_img");
  let methods_img = document.querySelector(".dynamic_methods_img");
  let insights_img = document.querySelector(".dynamic_insights_img");
  // Concept Development
  let brainstorm_img = document.querySelector(".dynamic_brainstorm_img");  
  let scoping_img = document.querySelector(".dynamic_scoping_img");
  let solution_img = document.querySelector(".dynamic_solution_img");
  let method_def_img = document.querySelector(".dynamic_method_def_img");
  let characters_img = document.querySelector(".dynamic_characters_img");
  let character_relationship_img = document.querySelector(
    ".dynamic_character_relationship_img"
  );
  let win_img = document.querySelector(".dynamic_win_img");
  let controls_img = document.querySelector(".dynamic_controls_img");

  // Fabrication Process
  let sketches_img = document.querySelector(".dynamic_sketches_img");
  //Game
  let networking_img = document.querySelector(".dynamic_networking_img");
  let map_img = document.querySelector(".dynamic_map_img");
  let NavMesh_img = document.querySelector(".dynamic_NavMesh_img");
  let UI_img = document.querySelector(".dynamic_UI_img");
  let controller_img = document.querySelector(".dynamic_controller_img");
  let prototypes_img_div = document.querySelector(
    ".dynamic_prototypes_img_container"
  );

  let prototype_1_img = document.querySelector(".dynamic_prototype_1_img");
  let prototype_2_img = document.querySelector(".dynamic_prototype_2_img");
  let prototype_3_img = document.querySelector(".dynamic_prototype_3_img");
  let prototype_4_img = document.querySelector(".dynamic_prototype_4_img");

  // Research related
  let r_prototypes_img = document.querySelector(".dynamic_r_prototypes_img");
  let interview_img = document.querySelector(".dynamic_interview_img");
  let data_anaylsis_img = document.querySelector(".dynamic_data_anaylsis_img");
  let r_insights_img = document.querySelector(".dynamic_r_insights_img");

  let iterations_img = document.querySelector(".dynamic_iterations_img");
  let testing_img = document.querySelector(".dynamic_testing_img");


  base("Case_Study")
    .select({
      filterByFormula: formula,
      maxRecords: 1,
      view: "All",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          //retrive & fill text function
          function retrieveText(object, fieldName) {
            if (record.fields[fieldName] !== undefined && object !== null) {
              if (record.fields[fieldName] == "skip") {
                // skip content if undefined
                object.style.display = "none";
              } else {
                // show title or content if defined
                object.innerHTML = record.fields[fieldName];
              }
            } else {
              // hide title or content if undefined
              // console.log(`${fieldName} is undefined.`);
              try {
                object.previousElementSibling.style.display = "none"; //find the element that display title
                object.style.display = "none";
              } catch (error) {
                console.log(error);
              }
            }
          }

          //retrive & fill images function
          function retrieveImage(object, fieldName) {
            if (record.fields[fieldName] !== undefined && object !== null) {
              object.setAttribute(
                "src",
                record.fields[fieldName][0].thumbnails.full.url
              );
            } else if (object !== null) {
              object.style.display = "none";
              // object.setAttribute('src', record.fields.Placeholder_img[0].thumbnails.full.url);
            }
          }

          // retrieve text
          // Introduction
          retrieveText(title, "Title");
          retrieveText(subtitle, "Subtitle");
          retrieveText(institution, "Institution");
          created_year.innerHTML = new Date(
            record.fields.Created_date
          ).getFullYear(); //convret Date to year
          retrieveText(description, "Description");
          // Background Research
          retrieveText(challenge, "Challenge");
          retrieveText(inspiration, "Inspiration");
          retrieveText(questions, "Questions");
          retrieveText(methods, "Methods");
          retrieveText(insights, "Insights");
          // Concept Development
          retrieveText(brainstorm, "Brainstorm");
          retrieveText(scoping, "Scoping");
          retrieveText(solution, "Solution");
          retrieveText(method_def, "R_method_definition");
          retrieveText(characters, "Characters");
          retrieveText(character_relationship, "Character_relationship");
          retrieveText(win, "Win");
          retrieveText(controls, "Controls");

          // Fabrication Process
          retrieveText(sketches, "Sketches");
          // Game
          retrieveText(networking, "Networking");
          retrieveText(map, "Map");
          retrieveText(NavMesh, "NavMesh");
          retrieveText(UI, "UI");
          retrieveText(controller, "Controller");

          retrieveText(prototypes, "Prototypes");
          retrieveText(r_prototypes, "R_prototypes");
          retrieveText(prototype_1, "Prototype_1");
          retrieveText(prototype_2, "Prototype_2");
          retrieveText(prototype_3, "Prototype_3");
          retrieveText(prototype_4, "Prototype_4");

          // Research related
          retrieveText(interview, "Interview");
          retrieveText(data_anaylsis, "Data_anaylsis");
          retrieveText(r_insights, "R_insights");

          retrieveText(iterations, "Iterations");
          retrieveText(testing, "Testing");

          // Takeaways
          retrieveText(reflection, "Reflection");

          // retrieve images
          // Introduction
          retrieveImage(cover_img, "Cover_img");
          retrieveImage(project_img, "Project_img");
          retrieveImage(project_img_lightbox, "Project_img");
          // Background Research
          retrieveImage(challenge_img, "Challenge_img");
          retrieveImage(inspiration_img, "Inspiration_img");
          retrieveImage(questions_img, "Questions_img");
          retrieveImage(methods_img, "Methods_img");

          retrieveImage(insights_img, "Insights_img");
          // Concept Development
          retrieveImage(brainstorm_img, "Brainstorm_img");
          retrieveImage(scoping_img, "Scoping_img");
          retrieveImage(solution_img, "Solution_img");
          retrieveImage(method_def_img, "R_method_definition_img");
          retrieveImage(characters_img, "Characters_img");
          retrieveImage(
            character_relationship_img,
            "Character_relationship_img"
          );
          retrieveImage(win_img, "Win_img");
          retrieveImage(controls_img, "Controls_img");

          // Fabrication Process
          retrieveImage(sketches_img, "Sketches_img");
          //Game
          retrieveImage(networking_img, "Networking_img");
          retrieveImage(map_img, "Map_img");
          retrieveImage(NavMesh_img, "NavMesh_img");
          retrieveImage(UI_img, "UI_img");
          retrieveImage(controller_img, "Controller_img");

          record.fields.Prototypes_img.forEach(function (attachment) {
            let fileType = attachment.type.substring(
              0,
              attachment.type.indexOf("/")
            ); //trim string after "/"
            console.log(fileType);

            let prototypes_media;
            if (fileType == "video") {
              prototypes_media = document.createElement("video");
              prototypes_media.setAttribute("controls", "controls");
              prototypes_media.setAttribute("src", attachment.url);
              prototypes_media.setAttribute("alt", "Prototypes Image");
              prototypes_media.classList.add("dynamic_prototypes_img");
            } else {
              prototypes_media = document.createElement("img");
              prototypes_media.setAttribute("src", attachment.url);
              prototypes_media.setAttribute("alt", "Prototypes Image");
              prototypes_media.classList.add("dynamic_prototypes_img");
            }

            try {
              prototypes_img_div.appendChild(prototypes_media);
            } catch (e) {
              console.error(`error appending prototype img: ${e}`);
            }
            // let url = location.pathname;
            // let pos = url.lastIndexOf("case_study_");
            // let index_length = "case_study_".length;
            // let view_name = location.pathname.substring(pos + index_length, 2);
            // prototypes_img.setAttribute("id", view_name);
          });

          retrieveImage(prototype_1_img, "Prototype_1_img");
          retrieveImage(prototype_2_img, "Prototype_2_img");
          retrieveImage(prototype_3_img, "Prototype_3_img");
          retrieveImage(prototype_4_img, "Prototype_4_img");

          // Research related
          retrieveImage(r_prototypes_img, "R_prototypes_img");
          retrieveImage(interview_img, "Interview_img");
          retrieveImage(data_anaylsis_img, "Data_anaylsis_img");
          retrieveImage(r_insights_img, "R_insights_img");

          retrieveImage(iterations_img, "Iterations_img");
          retrieveImage(testing_img, "Testing_img");

          // hide sections if all h3 and p are hidden (i.e. there's no content)
          document.querySelectorAll("section").forEach((section) => {
            const content = section.querySelectorAll("h3, p");
            if (content.length > 0 && [...content].every(
                (el) => getComputedStyle(el).display === "none"
              )
            ){
              section.style.display = "none";
              console.log("h3 and p are hidden");
            }
          });

        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};

// dynamic navigation setup
let makeNavigation = function (slug) {
  // slug is only defined on case studies, otherwise undefined
  let navigationContainer = document.querySelector(".dynamic_navigation");

  // returns URL
  function caseStudyForRecord(record) {
    return `case_study_${record.fields.Case_study_model}.html?${record.fields.Slug}`;
  }

  base("Case_Study")
    .select({
      view: "Representative",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          // Add representative work links to drop down menu
          let list_item = document.createElement("li");
          let anchor = document.createElement("a");
          anchor.classList.add("dropdown_item");
          anchor.classList.add("type_body_2");
          anchor.classList.add("project_link");
          let link = caseStudyForRecord(record);

          anchor.innerHTML = record.fields.Title;
          anchor.setAttribute("href", link);

          list_item.appendChild(anchor);
          navigationContainer.appendChild(list_item);
        });

        // on case studies, do forward and back links
        if (slug) {
          const pos = records.findIndex((el) => el.fields.Slug === slug);
          if (pos !== -1) {
            const previousButton = document.querySelector("#previous");
            const nextButton = document.querySelector("#next");

            // hide prev/next button if it's the first/last case study
            if (pos - 1 < 0) {
              previousButton.style.display = "none";
            }
            if (pos + 1 > records.length - 1) {
              nextButton.style.display = "none";
            }

            // deploy links for prev/next buttons
            previousButton.onclick = function () {
              let prevPos = pos - 1;
              window.location.href = caseStudyForRecord(records[prevPos]);
            };

            nextButton.onclick = function () {
              let nextPos = pos + 1;
              window.location.href = caseStudyForRecord(records[nextPos]);
            };
          }
        }

        // Add "All Works" link to drop down menu
        let list_item = document.createElement("li");
        let anchor = document.createElement("a");
        anchor.classList.add("dropdown_item");
        anchor.classList.add("type_body_2");
        anchor.classList.add("project_link");
        let link = "index.html#category_title";

        anchor.innerHTML = "All Works…";
        anchor.setAttribute("href", link);

        list_item.appendChild(anchor);
        navigationContainer.appendChild(list_item);
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};

/**
 * ....makeGallery("Typography")
 *
 * @param {string} airtableViewName
 */
function makeGallery(airtableViewName) {
  const gallery = document.querySelector(".gallery_container");
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }

  let category_title = document.querySelector("#category_title");
  category_title.innerHTML = airtableViewName + " Projects";

  // returns URL
  function caseStudyForRecord(record) {
    return `case_study_${record.fields.Case_study_model}.html?${record.fields.Slug}`;
  }

  base("Case_Study")
    .select({
      view: airtableViewName,
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        let gallery_item = document.createElement("div");
        gallery_item.classList.add("gallery_item");

        let gallery_img = document.createElement("img");
        gallery_img.setAttribute(
          "src",
          record.fields.Cover_img[0].thumbnails.large.url
        );

        let link = caseStudyForRecord(record);
        let img_anchor = document.createElement("a");
        img_anchor.classList.add("project_link");
        img_anchor.setAttribute("href", link);

        let caption = document.createElement("p");
        caption.classList.add("caption");
        caption.innerHTML = record.fields.Title;

        gallery_item.appendChild(gallery_img);
        gallery_item.appendChild(caption);
        img_anchor.appendChild(gallery_item);
        gallery.appendChild(img_anchor);
      });
    });
}

let fetchAboutPage = function () {
  let bio = document.querySelector(".dynamic_bio");
  let statement = document.querySelector(".dynamic_statement");
  let CV_link = document.querySelector(".dynamic_CV");
  let photo = document.querySelector(".dynamic_photo");

  base("About_Page")
    .select({
      maxRecords: 1,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          function retrieveText(object, fieldName) {
            if (record.fields[fieldName] !== undefined && object !== null) {
              object.innerHTML = record.fields[fieldName];
            } else {
              // console.log(`${fieldName} is undefined.`)
            }
          }

          retrieveText(bio, "Bio");
          // retrieveText(statement, "Statement");

          CV_link.setAttribute("href", record.fields.CV[0].url);
          photo.setAttribute("src", record.fields.Photo[0].url);
        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};
