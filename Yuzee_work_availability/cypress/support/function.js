//OTP
export function verifyOTP () {

  const serverID = "uhvpxryq";

  cy.get('@uniqueEmail').then((emailAddress) => { 
    // waiting for the API
    cy.wait('@signupRequest', { timeout: 30000 }).then((interception) => {
        
        let statusCode = interception.response.statusCode;

        if (statusCode === 200) {
        
        cy.contains("Verification Code")
        cy.mailosaurGetMessage(serverID, {
            sentTo: emailAddress
        })
        .then(email => {
            const OTP = email.html.codes.map(code => code.value);

            for (let i = 1; i <= 6; i++) {
                cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i - 1]}`)
            }
            // cy.get('button[type="submit"]').contains("Continue").click();
        });
        }
    });
  })
}

// Function to handle onboarding flow
export function Onboarding(type) {
  cy.url().should('include', '/profile-setup');
  cy.contains("Let's get this show on the road");
  cy.get('[type="submit"]').contains('Start!').click();

  cy.contains("How do you plan on using Yuzee?");
  cy.get('[class="col-md-4 ng-star-inserted"]').contains('Internship').click();
  cy.get('[class="col-md-4 ng-star-inserted"]').contains('Work Placement').click();
  cy.get('[class="col-md-4 ng-star-inserted"]').contains('Course').click();
  // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Job').click()
  // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Traineeship').click()
  cy.get('[type="submit"]').contains('Continue').click();

  switch(type) {
    case 'studentCompleteOnboarding':
      cy.get('span.slider.round').first().click();
      cy.get('[placeholder="University/School"]').type('Australian National University')
      cy.get('[role="option"]').contains('Australian National University').click()

      // Set start and end dates
      cy.get('[name="start_date"]').click();
      cy.get('[title="Select year"]').select('2020');
      cy.get('[title="Select month"]').select('Apr');
      cy.get('[role="gridcell"]').contains('21').click();

      cy.get('[name="end_date"]').click();
      cy.get('[title="Select year"]').select('2025');
      cy.get('[title="Select month"]').select('Jul');
      cy.get('[role="gridcell"]').contains('21').click();

      cy.get('[type="submit"]').contains('Continue').click();

      // //profile photo
      cy.wait(3000)
      cy.get('[class="btn img-logo"]').find('img').click()
      cy.get('input[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
      cy.get('[type="button"]', { timeout: 10000 }).contains('Save').click()
      cy.get('[type="button"]', { timeout: 10000 }).contains('Ok').click()
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Location
      cy.get('[placeholder="Search location"]', { timeout: 10000 }).type('Kuala Lumpur')
      cy.get('[role="option"]').contains('Kuala Lumpur').click()
      cy.get('[type="submit"]').contains('Continue').click();
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Hobby
      cy.wait(3000)
      cy.get('[bindlabel="hobby_name"]', { timeout: 10000 }).type('run');
      cy.contains('Running').click();
      cy.wait(3000)
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();

      break;

    case 'studentSkipOnboarding':
      cy.get('span.slider.round').first().click();
      cy.get('[placeholder="University/School"]').type('Australian National University')
      cy.get('[role="option"]').contains('Australian National University').click()
  
      // Set start and end dates
      cy.get('[name="start_date"]').click();
      cy.get('[title="Select year"]').select('2020');
      cy.get('[title="Select month"]').select('Apr');
      cy.get('[role="gridcell"]').contains('21').click();
  
      cy.get('[name="end_date"]').click();
      cy.get('[title="Select year"]').select('2025');
      cy.get('[title="Select month"]').select('Jul');
      cy.get('[role="gridcell"]').contains('21').click();
  
      cy.get('[type="submit"]').contains('Continue').click();

      cy.wait(3000)
      cy.contains('Skip').click();
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Skip').click();
      cy.wait(3000)
      cy.contains('Skip', { timeout: 10000 }).click();
      break;
    
    case 'workCompleteOnboarding':

      cy.get('[id="job_title"]').type('Broadcast Technician')
      cy.get('[role="option"]').contains('Broadcast Technician').click()
      cy.get('[id="company_name"]').type('Australian Company')
      cy.get('[role="option"]').contains('Australian Company').click()
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()
      //profile photo
      cy.wait(3000)
      cy.get('[class="btn img-logo"]').find('img').click()
      cy.get('input[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
      cy.get('[type="button"]', { timeout: 10000 }).contains('Save').click()
      cy.get('[type="button"]', { timeout: 10000 }).contains('Ok').click()
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Location
      cy.get('[placeholder="Search location"]', { timeout: 10000 }).type('Kuala Lumpur')
      cy.get('[role="option"]').contains('Kuala Lumpur').click()
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Continue').click();
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Hobby
      cy.wait(3000)
      cy.get('[bindlabel="hobby_name"]', { timeout: 10000 }).type('run');
      cy.contains('Running').click();
      cy.wait(3000)
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();

      break;
    
    case 'workSkipOnboarding':

      cy.get('[id="job_title"]').type('Broadcast Technician')
      cy.get('[role="option"]').contains('Broadcast Technician').click()
      cy.get('[id="company_name"]').type('Australian Company')
      cy.get('[role="option"]').contains('Australian Company').click()
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()

      cy.wait(3000)
      cy.contains('Skip').click();
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Skip').click();
      cy.wait(3000)
      cy.contains('Skip', { timeout: 10000 }).click();
      break;

    case 'noExperienceCompleteOnboarding':
      cy.get('span.slider.round').eq(1).click();
      cy.get('[type="submit"]').contains('Continue').click();
      cy.wait(3000)
      cy.get('[class="btn img-logo"]').find('img').click()
      cy.get('input[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
      cy.get('[type="button"]', { timeout: 10000 }).contains('Save').click()
      cy.get('[type="button"]', { timeout: 10000 }).contains('Ok').click()
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Location
      cy.get('[placeholder="Search location"]', { timeout: 10000 }).type('Kuala Lumpur')
      cy.get('[role="option"]').contains('Kuala Lumpur').click()
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Continue').click();
      // cy.contains('Skip', { timeout: 10000 }).click();

      // Hobby
      cy.wait(3000)
      cy.get('[bindlabel="hobby_name"]', { timeout: 10000 }).type('run');
      cy.contains('Running').click();
      cy.wait(3000)
      cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();
      cy.wait(3000)
      break;

    case 'noExperienceSkipOnboarding':
      cy.get('span.slider.round').eq(1).click();
      cy.get('[type="submit"]').contains('Continue').click();
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Skip').click();
      cy.wait(3000)
      cy.get('[type="submit"]').contains('Skip').click();
      cy.wait(3000)
      cy.contains('Skip', { timeout: 10000 }).click();
      break;

    default:
      throw new Error("Invalid onboarding flow type.");
  }
  // Community
  cy.wait(3000)
  cy.get('[type="submit"]', { timeout: 30000 }).contains('Continue').click();
  cy.wait(3000)
  cy.get('[type="submit"]', { timeout: 30000 }).contains('Go!').click();
  cy.wait(3000)
}

// Utility function to select a date
export function selectDate(month, year, day) {
    cy.get('[title="Select month"]').select(month);
    cy.get('[title="Select year"]').select(year);
    cy.get('[role="gridcell"]').contains(day).click();
}

//Fill function
export function fillFunction (type, dataTable, additionalData = {}) {
  switch(type){
    case 'fillRegistration':
      cy.generateUniqueEmail()
      //First and last name
      cy.get('[formcontrolname="firstName"]').type("ali")
      cy.get('[formcontrolname="lastName"]').type("abu")
  
      //Select date
      cy.get('[class="calendar-icon icon-lg"]').click()
      selectDate('Jul', '1997', '6');
  
      //Gender
      cy.get('[formcontrolname="gender"]').click()
      cy.contains('Male').click()
  
      cy.get('[formcontrolname="postal_code"]').type("3000")
  
      cy.get('@uniqueEmail').then((emailAddress) => {
          cy.get('[formcontrolname="email"]').type(emailAddress)
      })
      
      cy.get('[formcontrolname="password"]').type("Admin@12345")
      cy.get('[formcontrolname="confirmPassword"]').type("Admin@12345")
      break;

    case 'fillEditProfile':
      cy.get('.select-control > .ng-select-container > .ng-value-container').click()
      cy.get('[role="option"]').contains('Job').click()
  
      cy.get('[placeholder="Select a date"]').click()
      selectDate('Jul', '1997', '6');
  
      cy.get('[name="gender"]').click()
      cy.get('[role="option"]').contains('Male')
  
      cy.get('[name="firstName"]').clear().type('Abu')
      cy.get('[name="lastName"]').clear().type('Ali')
  
      cy.get('[name="aboutMe"]').type('bio is correct and Minimum 30 characters are required')
  
      cy.get('[name="citizenship"]').click()
      cy.get('[role="listbox"]').scrollIntoView().contains('Malaysia').click()
  
      //location
      cy.get('[name="description"]', { timeout: 10000 }).type('Kuala Lumpur')
      cy.get('[role="option"]').contains('Kuala Lumpur').click()
      cy.get('[name="postalCode"]').clear().type('3432')
      break;
    
    case 'fillGetToKnowMe':
      cy.get('[name="jobs"]').type(' Accountant ')
      cy.get('[role="option"]').contains('Accountant').click()
      cy.contains('My ideal jobs').click()
  
      cy.get('[name="courses"]').type('beauty')
      cy.get('[role="option"]').contains(' Diploma of Beauty Therapy ').click()
      cy.contains('My ideal jobs').click()
  
      cy.get('[name="fields"]').click()
      cy.get('[role="option"]').contains(' Foundation ').click()
      cy.contains('My ideal jobs').click()
  
      cy.get('[name="searchVal"]', { timeout: 10000 }).type('Kuala Lumpur')
      cy.get('[role="option"]').contains('Kuala Lumpur').click()
  
      cy.get('[name="reason"]').type('Asdasdf fsadf asfda dfwqda sdcasd')
      break;

    case 'fillIntroductoryVideo':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
      cy.get('input[type="file"]').eq(0).invoke('removeClass', 'd-none').selectFile('cypress/images/3209828-uhd_3840_2160_25fps.mp4')
      
      cy.get('[name="title"]').type('asdkmndlf asdasd')
      cy.get('[id="description"').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')

      cy.get('input[type="file"]').eq(1).invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png');
      break;

    case 'fillContactDetails':
      dataTable.hashes().forEach((contact, index) => {
        // Select the contact method
        cy.get('[class="select-control"]').eq(index + 1).click();
        cy.get('[role="option"]').contains(contact.method).click();
    
        // Handle country selection if phone is true
        if (contact.phone === 'true') {
          cy.get('[class="iti__selected-flag dropdown-toggle"]').eq(index).click();
          cy.get('[placeholder="Search Country"]').eq(index).type(contact.country);
          cy.get('[class="iti__country-list"]').eq(index).contains(contact.country).click();
          cy.get('[id="phone"]').eq(index).type(contact.detail);
        } else {
          // For other contact types (e.g., email, Instagram, TikTok)
          cy.get('[placeholder="Enter contact detail"]').eq(index - 2).type(contact.detail);
        }
    
        // Click "Add contact" button
        if(index < 4){
            cy.get('[type="button"]').contains(' Add contact ').click();
        }
      });

      break;

    case 'fillMyDocs':
      dataTable.hashes().forEach((row) => {
        cy.get('[class="menu-div"]').contains(row.documentType).click();
        cy.get('[type="file"]').selectFile(row.filePath);
        cy.get('[type="button"]', { timeout: 10000 }).contains('Yes').click();
      });

      break;

    case 'fillEducation':

      cy.get('[name="form"]').should('be.visible')
      cy.get('[name="privacy_level"]').should('be.visible').click()
      cy.get('[role="option"]').contains('Public').should('be.visible').click()

      cy.get('[name="education_title"]').click()
      cy.get('[role="option"]').contains('Diploma').click()

      cy.get('[name="institute_name"]').clear().type('Australian National University')
      cy.get('[role="option"]', {timeout : 10000}).contains('Australian National University').click()

      //location
      // cy.get('[name="description"]').type('Cyberjaya')
      // cy.get('[role="option"]').contains('Cyberjaya').click()
      // cy.get('[name="postal_code"]').type('43300')

      cy.get('[name="course_name"]').type('Diploma in Infomation Technology')

      cy.get('[name="examType"]').click() 
      cy.get('[role="option"]').contains(' Malay ').click()
      // cy.get('[role="option"]').contains(' English ').click()
      cy.get('[role="option"]').contains(' Korean ').click()

      cy.contains('Study Language').click()
      cy.get('[name="studyMode"]').click()
      cy.get('[role="option"]').contains('Online').click()

      cy.get('[name="start_date"]').click()
      selectDate('Mar', '2022', '22');

      cy.get('[name="end_date"]').click()
      selectDate('Nov', '2025', '22');

      cy.get('[name="system"]').click()
      cy.get('[role="option"]').contains('C-GPA (out of 5)').scrollIntoView().should('be.visible').click()
      cy.get('[name="cgpa"]').type('3.5')

      cy.get('[class="slider round"]').click()
      cy.get('[id="type_0"]').click()
      cy.get('[role="option"]').contains('Semester').should('be.visible').click()
      
      let index = 0;
      dataTable.hashes().forEach((entry, i) => {
      if (i > 0 && i % 5 === 0) {
          cy.get('[type="button"]').contains('Add Term/Semester').click();
        }
    
        // Fill out the subject and grade
        cy.get('[placeholder="Enter a subject"]').eq(index).type(entry.subjects);
        cy.get('[placeholder="Enter a grade"]').eq(index).type(entry.grade);
    
        // Click "Add Subject" button
        if (i % 5 !== 4) {
          cy.get('[placeholder="Enter a grade"]').eq(index).closest('.row').find('button').contains('Add Subject').click();
        }
  
        index++;
      });

      cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
      break;
    
    case 'fillWorkExperience':

      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

      //Job title
      cy.get('[name="job_title"]').type('Accountant')
      cy.get('[role="option"]').contains('Accountant').should('be.visible').click()

      //Job type
      cy.get('[name="preferredWorkTypes"]').click();
      cy.get('[role="option"]').contains('Internship').should('be.visible').click();

      //Company name
      cy.get('[name="company_name"]').type('Australian Company')
      cy.get('[role="listbox"]').contains('Australian Company').should('be.visible').click()

      //Location
      // cy.get('[name="description"]').clear().type('Geelong Victoria, Australia').should('have.value', 'Geelong Victoria, Australia')
      // cy.get('[role="option"]').contains('Geelong Victoria, Australia').should('be.visible').click()
      // cy.get('[name="postal_code"]').type('3435')

      //Checkbox
      // cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click()

      //start and end date
      cy.get('[name="start_date"]').click()
      selectDate('Apr', '2020', '21');

      cy.get('[name="end_date"]').click()
      selectDate('Apr', '2024', '21');
      
      //Job description
      cy.get('[name="job_description"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      cy.get('[name="showSkills"]').click()
      cy.get('[role="option"]').contains(' .NET ').click()
      cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

      //collaborations
      cy.get('[name="collaborations"]').should('be.visible').click()
      cy.get('[role="option"]').contains(' Abu Ali ').click()
      cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

      //attach file
      cy.get('[ type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')  

      break;

    case 'fillWorkAvailability':
      
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

      cy.get('[name="preferredWorkTypes"]').click();
      cy.get('[role="option"]').contains('Internship').should('be.visible').click();
      
      cy.get('[name="work_status"]').click()
      cy.contains('Unemployed').should('be.visible').click()

      cy.get('[name="distance"]').type('30')

      cy.get('[name="duration"]').type('3')

      cy.get('[name="duration_type"]').click()
      cy.contains('month(s)').click()

      cy.get('[name="workTypes"]').click()
      cy.contains('Full-Time').click()
      let i=0;
      dataTable.hashes().forEach((row, index) => {
    
          cy.get('[bindvalue="id"]').eq(index + 1).click()
          cy.get('[role="option"]').eq(index).contains(row.day).should('be.visible').click()
          cy.get('[name="selectTime"]').eq(index + i).click()
          cy.get('[role="option"]').contains(row.startTime).click()
          cy.get('[name="selectTime"]').eq(index + 1 + i).click()
          cy.get('[role="option"]').contains(row.endTime).click()
    
          if(index < (dataTable.hashes().length - 1)){
              cy.contains('Add Availability').should('be.visible').click()
              i++
          }
          
      });
      break;

    case 'fillLanguageQualifications':
      let comboboxStartIndex = 1; // Start index for the comboboxes
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

      dataTable.hashes().forEach((qualification, index) => {
        // Select the exam type
        cy.get('[role="combobox"]').eq(comboboxStartIndex).click();
        cy.get('[role="option"]').contains(qualification.Type).click();
    
        // Declare scores outside the if-else block to use later
        let scores = [];
    
        if (qualification.Type === 'MUET' || qualification.Type === 'Cambridge English') {
          // handle 1 score
          cy.get(`[id^="over_all_marks_${index}"]`).type(qualification.scores);
        } else {
          // Handle the scores if there are multiple scores
          scores = qualification.scores.split(',');
          scores.forEach((score, scoreIndex) => {
            cy.get('[role="combobox"]').eq(comboboxStartIndex + 1 + scoreIndex).click();
            cy.get('[role="option"]').contains(score).click();
          });
        }
    
        // Upload the file
        cy.get('[type="file"]').eq(index).selectFile(qualification.file);
    
        // Move the starting index for the next qualification
        // Move forward by the number of scores + 1 for the type selector
        comboboxStartIndex += (scores.length + 1); 
    
        // Click the "Add Qualification" button
        if (index < dataTable.hashes().length - 1) {
          cy.get('[type="button"]').contains(' Add Qualification ').click();
        }
      });
      break;

    case 'fillHobbies':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[name="hobbies"]').type('as')

      dataTable.hashes().forEach((row) => {
        cy.get('[role="option"]').contains(row.hobbies).click()
      });

      cy.contains('Tell us your hobbies').click()
      break;

    case 'fillSkills':

      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

      cy.get('[name="skills"]').type('microsoft')

      dataTable.hashes().forEach((row) => {
        cy.get('[role="option"]').contains(row.skills).click()
      })
      cy.get('[class="col-md-12 common-input-mb"]').contains('Skills and Endorsement').click()
      break;

    case 'fillAward':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[id="title"]').type('Awards')
      cy.get('[name="name"]').type('Tata Consultancy Services')
      cy.contains('Tata Consultancy Services').click()
  
      cy.get('[placeholder="Select a date"]').click()
      selectDate('Aug', '2020', '6');
  
      cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      cy.get('[name="collaborations"]').type(' Australian National University ')
      cy.get('[role="option"]').contains(' Australian National University ').click()
      cy.contains('Associated with').click()
  
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')

      break;
    
    case 'fillPublications':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[id="title"]').type('Firecracker Award')
      cy.get('[name="publication"]').type('Tata Consultancy Services')
      cy.get('[role="option"]').contains('Tata Consultancy Services').click()
      cy.get('[name="publicUrl"]').type('mass.com')
  
      cy.get('[placeholder="Select a date"]').click()
      selectDate('Aug', '2020', '6');
  
      cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
  
      cy.get('[name="collaborations"]').type('adam')
      cy.get('[role="option"]').contains(' Adam Cof ').click()
      cy.contains('Other Authors').click()
  
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
      break;
    
    case 'fillPatentDetails':
      const { isIssued } = additionalData;
      cy.get('[name="privacy_level"]').click();
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
    
      cy.get('[id="title"]').type('Patent Title');
      cy.get('[name="citizenship"]').click();
      cy.get('[role="option"]').contains('Malaysia').scrollIntoView().click();
    
      if (isIssued) {
        cy.get('[id="Patent Issued"]').click();
        cy.get('[id="patent_number"]').type('32112333');
      } else {
        cy.get('[id="Patent Pending"]').click();
        cy.get('[id="application_number"]').type('32112333');
      }
    
      cy.get('[placeholder="Select a date"]').click();
      selectDate('Aug', '2020', '6');
      cy.get('[id="pat_url"]').type('fastr.com');
      cy.get('[id="description"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
    
      cy.get('[name="collaborations"]').type('adam');
      cy.get('[role="option"]').contains(' Adam Cof ').click();
    
      cy.contains('Other Inventors').click();
    
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png');
      break;

    case 'fillProjectDetails':
      const { isCurrent } = additionalData;
      cy.get('[name="privacy_level"]').click();
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
    
      cy.get('[id="title"]').type('Project Juliet');
      cy.get('[name="projectUrl"]').type('https://example.com');
    
      cy.get('[name="start_date"]').click();
      selectDate('Jul', '2024', '2');
      
      if (isCurrent) {
        cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click();
      } else {
        cy.get('[name="end_date"]').click();
        selectDate('Aug', '2024', '4');
      }
    
      cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
    
      cy.get('[name="collaborations"]').type('g');
      cy.get('[role="option"]').contains(' Bridget Lynch ').click();
      cy.get('[class="ng-star-inserted"]').contains('labels.Other Contributors').click();
    
      cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg');
      break;

    case 'fillLanguage':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[formcontrolname="title"]').click()
      cy.get('[role="option"]').contains('Malay').scrollIntoView().click()
  
      cy.get('[formcontrolname="language_proficiency_type"]').click()
      cy.get('[role="option"]').contains('Native or bilingual Proficiency').should('be.visible').click()
  
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
      break;

    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
}

//Assertion function
export function assertDetails(type, dataTable = null, isCurrent = false) {
  switch (type) {
    case 'getToKnowMe':
      cy.get('[class="mt-3 ng-star-inserted"]')
        .should('contain.text', 'Accountant')
        .and('contain.text', 'Diploma of Beauty Therapy')
        .and('contain.text', 'Foundation')
        .and('contain.text', 'Kuala Lumpur');
      break;

    case 'contactDetails':
      cy.get('[class="pr-24 mb-3"]', {timeout: 10000}).contains(' Contact Details ').scrollIntoView().should('be.visible')
      dataTable.hashes().forEach(detail => {
        cy.get('[class="detail-section ng-star-inserted"]')
          .should('contain.text', detail.method)
          .and('contain.text', detail.detail);
      });
      break;
    
    case 'myDocs':
        cy.get('[class="pr-24 mb-3"]').contains(' My Docs ').scrollIntoView().should('be.visible')
        dataTable.hashes().forEach(detail => {
          cy.get('[class="doc-list ng-star-inserted"]')
              .should('contain.text', detail.documentType)
              .and('contain.text', detail.filePath)
        });
        break;
    
    case 'workExperience':
      cy.get('[type="button"]').contains(' See more ').click()
      cy.get('[class="block-title-md mb-3 p-0 d-flex mar-r"]').should('contain.text', ' Work Experience ')
      cy.get('[class="col-md-4"]').contains('Australian Company').scrollIntoView().should('be.visible')
      cy.get('[class="post-title"]')
          .should('contain.text', 'Accountant')
          .and('contain.text', 'Australian Company')
          .and('contain.text', '21/Apr/2020')
          .and('contain.text', '21/Apr/2024')
          .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      
          break;

    case 'workAvailability':
      cy.get('[class="work-row"]').contains('Internship').scrollIntoView().click()
      dataTable.hashes().forEach((row) => {
        cy.get('[class="common-scroll-bar pr-21"]')
        .should('contain.text', 'Unemployed')
        .and('contain.text', '30 Km')
        .and('contain.text', '3')
        .and('contain.text', 'Month')
        .and('contain.text', 'Full_time')
        .and('contain.text', row.day)
        .and('contain.text', row.time)
      })
        
      break;

    case 'hobbies':
      dataTable.hashes().forEach(detail => {
        cy.get('[class="suggestion-block ng-star-inserted"]')
          .should('contain.text', detail.hobbies);
      });
      break;

    case 'skills':
      cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains(' Skills and Endorsement ').scrollIntoView().should('be.visible')
      dataTable.hashes().forEach(detail => {
        //class="suggestion-block ng-star-inserted"
        cy.get('[class="mb-4"]')
          .should('contain.text', detail.skills);
      });
      break;

    case 'award':
      cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
      cy.get('[class="accomplish-row"]').contains('Awards and Certificates').click()
      cy.get('[class="acc-content-block"]')
        .should('contain.text', 'Awards')
        .and('contain.text', 'Tata Consultancy Services')
        .and('contain.text', '06/Aug/2020')
        .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
      break;

    case 'publication':
      cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
      cy.get('[class="accomplish-row"]').contains('Publication').click()
      cy.get('[class="acc-content-block"]')
        .should('contain.text', 'Firecracker Award')
        .and('contain.text', 'Tata Consultancy Services')
        .and('contain.text', '06/Aug/2020')
        .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      break;

    case 'patent':
      cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
      cy.get('[class="accomplish-row"]').contains('Patent').click()
      cy.get('[class="acc-content-block"]')
        .should('contain.text', 'Patent Title')
        .and('contain.text', 'Patent Number: 32112333')
        .and('contain.text', '06/Aug/2020')
        .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
      break;

    case 'project':
      cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
      cy.get('[class="accomplish-row"]').contains('Project').click()

      const projectDetails = cy.get('[class="acc-content-block"]')
        .should('contain.text', 'Project Juliet')
        .and('contain.text', '02/Jul/2024')
        .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');

      if (isCurrent) {
        projectDetails.and('contain.text', 'Present');
      } else {
        projectDetails.and('contain.text', '04/Aug/2024');
      }
      break;

    case 'language':
      cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
      cy.get('[class="accomplish-row"]').contains('Language').click()
      dataTable.hashes().forEach(row => {
        cy.get('[class="acc-content-block"]')
          .should('contain.text', row.language)
          .and('contain.text', row.proficient);
      });
      break;

    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

export function editDetails(type, dataTable = null){
  switch(type) {
    case 'getToKnowMe':
      cy.get('[class="ng-value ng-star-inserted"]')
        .contains('Accountant')
        .parent()
        .find('[class="ng-value-icon right ng-star-inserted"]')
        .click()  
      cy.get('[name="jobs"]').type('Actor')
      cy.get('[role="option"]').contains('Actor').click()
      cy.contains('My ideal jobs').click()

      cy.get('[name="fields"]').click()
      cy.get('[class="ng-value ng-star-inserted"]')
          .contains('Diploma of Beauty Therapy')
          .parent()
          .find('[class="ng-value-icon right ng-star-inserted"]')
          .click() 
      cy.get('[name="courses"]').type('Visual')
      cy.get('[role="option"]').contains(' Bachlor in Visual Communication ').click()
      cy.contains('My ideal jobs').click()

      cy.get('[name="fields"]').click()
      cy.get('[class="ng-value ng-star-inserted"]')
          .contains('Foundation')
          .parent()
          .find('[class="ng-value-icon right ng-star-inserted"]')
          .click()   
          
      cy.get('[role="option"]').contains(' Education ').click()
      cy.contains('My ideal jobs').click()

      cy.get('[name="reason"]').type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      break;
    case 'addHobbies':
      cy.get('[class="btn btn-dots mr-0 edit-blue-btn ng-star-inserted"]').click()

      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[name="hobbies"]').type('po')
      
      dataTable.hashes().forEach((row) => {
          if (row.new_hobbies && row.new_hobbies.trim()) {
              cy.get('[role="option"]', {timeout : 10000}).contains(row.new_hobbies).click();
            }
      });
      cy.contains('Tell us your hobbies').click()
  
      cy.get('[type="button"]').contains('Update').click()
  
      assertDetails("hobbies", dataTable);
      break;
    case 'addSkills':
      cy.get('[class="btn btn-dots mr-0 edit-blue-btn ng-star-inserted"]').click()

      cy.get('[name="skills"]').type('ab')
      cy.get('[role="option"]').contains('ABC Analysis').click()
  
      cy.get('[class="col-md-12 common-input-mb"]').contains('Skills and Endorsement').click()
      cy.get('[type="button"]').contains('Update').click()
  
      cy.get('[class="block-sec block-sec-pad pr-0 ng-star-inserted"]').contains('Skills').scrollIntoView().should('be.visible')
      dataTable.hashes().forEach(detail => {
        //class="suggestion-block ng-star-inserted"
        cy.get('[class="mb-4"]')
          .should('contain.text', detail.skills);
      });
      break;
    case 'award':
      cy.get('[id="title"]').clear().type('New Awards')
      cy.get('[name="name"]').clear().type('Aston University')
      cy.get('[role="option"]').contains('Aston University, Aston Street, Birmingham, UK').click()
  
      cy.get('[placeholder="Select a date"]').click()
      selectDate('Aug', '2020', '15');
      cy.get('[name="details"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
      cy.get('[class="ng-value-icon right ng-star-inserted"]').click()
      cy.get('[name="collaborations"]').type('Daniyal Institution')
      cy.get('[role="option"]').contains(' Daniyal Institution Dubai - United Arab Emirates ').click()
      cy.contains('Associated with').click()
      break;
    case 'publication':
      cy.get('[id="title"]').clear().type('New Awards')
      cy.get('[name="publication"]').clear().type('Aston University')
      cy.get('[role="option"]').contains('Aston University, Aston Street, Birmingham, UK').click()
      cy.get('[name="publicUrl"]').clear().type('NewURLlink.com')
  
      cy.get('[placeholder="Select a date"]').click()
      selectDate('Aug', '2020', '16');
  
      cy.get('[name="details"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
  
      // cy.get('[class="ng-value-icon right ng-star-inserted"]').eq(0).click()
  
      cy.get('[class="ng-value ng-star-inserted"]')
          .contains(' Adam Cof ')
          .parent()   
          .find('[class="ng-value-icon right ng-star-inserted"]')
          .click()
  
      cy.get('[name="collaborations"]').type('adam')
      cy.get('[role="option"]').contains(' Adam John ').click()
      cy.contains('Title').click()
  
      cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
      break;
    case 'patent':
      cy.get('[name="privacy_level"]').click();
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
    
      cy.get('[id="title"]').clear().type('New Patent Title');
      cy.get('[name="citizenship"]').click();
      cy.get('[role="option"]').contains('Malaysia').scrollIntoView().click();
    
      cy.get('[id="Patent Pending"]').click();
      cy.get('[id="application_number"]').type('62112333');
  
      cy.get('[placeholder="Select a date"]').click();
      selectDate('Aug', '2020', '14');
      cy.get('[id="pat_url"]').clear().type('Newfastr.com');
      cy.get('[id="description"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
    
      cy.get('[name="collaborations"]').type('adam');
      cy.get('[role="option"]').contains('Adam John').click();
    
      cy.contains('Description').click();
    
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png');
      break;
    case 'project':
      cy.get('[name="privacy_level"]').click();
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
      
      cy.get('[id="title"]').clear().type('New Project Juliet');
      cy.get('[name="projectUrl"]').clear().type('https://example.com');
  
      cy.get('[name="start_date"]').click();
      selectDate('Jul', '2024', '2');
        
      cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click();
      
      cy.get('[name="details"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
  
      cy.get('[name="collaborations"]').type('Adam');
      cy.get('[role="option"]').contains('Adam John').click();
      cy.get('[class="ng-star-inserted"]').contains('labels.Other Contributors').click();
  
      cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg');
      break;
    case 'language':
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[formcontrolname="title"]').click()
      cy.get('[role="option"]').contains('English').scrollIntoView().click()
  
      cy.get('[formcontrolname="language_proficiency_type"]').click()
      cy.get('[role="option"]').contains('Native or bilingual Proficiency').should('be.visible').click()
  
      cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
      break;
  }
}