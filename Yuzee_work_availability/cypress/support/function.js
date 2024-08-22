// Utility function to select a date
export function selectDate(month, year, day) {
    cy.get('[title="Select month"]').select(month);
    cy.get('[title="Select year"]').select(year);
    cy.get('[role="gridcell"]').contains(day).click();
  }

// Utility function to fill a contact details
export function fillContactDetails(dataTable) {
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
}

// Utility function to fill my docs
export function fillMyDocs(dataTable){
  dataTable.hashes().forEach((row) => {
    cy.get('[class="menu-div"]').contains(row.documentType).click();
    cy.get('[type="file"]').selectFile(row.filePath);
    cy.get('[type="button"]', { timeout: 10000 }).contains('Yes').click();
});
}

  // Utility function for educaiton to fill subjects and semester
export function fillSubjects(dataTable) {
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
}

// Utility function to add language qualification
export function uploadQualifications(dataTable) {
  let comboboxStartIndex = 1; // Start index for the comboboxes

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
}

// Utility function to add hobbies
export function fillHobbies (dataTable) {
  dataTable.hashes().forEach((row) => {
      cy.get('[role="option"]').contains(row.hobbies).click()
  });
}

// Utility function to add skills
export function fillSkills (dataTable) {
  dataTable.hashes().forEach((row) => {
      cy.get('[role="option"]').contains(row.skills).click()
  })
}

// function to fill registration
export function fillRegistration () {
  
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
}

export function verifyOTP () {

  const serverID = "uhvpxryq";

  cy.get('@uniqueEmail').then((emailAddress) => { 
    // waiting for the API
    cy.wait('@signupRequest', { timeout: 10000 }).then((interception) => {
        
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
export function completeOnboarding(skip = false) {
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

  if (!skip) {
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
    cy.get('button.btn.img-logo').find('img').click()
    cy.get('input[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
    cy.get('[type="button"]', { timeout: 10000 }).contains('Save').click()
    cy.get('[type="button"]', { timeout: 10000 }).contains('Ok').click()
    cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click()
    // cy.contains('Skip', { timeout: 10000 }).click();

    // Location
    cy.get('[placeholder="Search location"]', { timeout: 10000 }).type('Kuala Lumpur')
    cy.get('[role="option"]').contains('Kuala Lumpur').click()
    cy.contains('Continue').should('be.visible').click();
    cy.get('[type="submit"]').contains('Continue').click();
    // cy.contains('Skip', { timeout: 10000 }).click();

    // Hobby
    cy.wait(5000)
    cy.get('[bindlabel="hobby_name"]', { timeout: 10000 }).type('run');
    cy.contains('Running').click();
    cy.wait(5000)
    cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();
    cy.wait(10000)

    // Community
    cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();
    cy.wait(10000)
    cy.get('[type="submit"]', { timeout: 300000 }).contains('Go!').click();
    cy.wait(3000)
  } else {
    // If skipping the onboarding process
    cy.get('span.slider.round').eq(1).click();
    cy.get('[type="submit"]').contains('Continue').click();
    cy.wait(3000)
    cy.contains('Skip').click();
    cy.wait(3000)
    cy.get('[type="submit"]').contains('Skip').click();
    cy.wait(3000)
    cy.contains('Skip', { timeout: 10000 }).click();
    cy.wait(3000)
    cy.get('[type="submit"]', { timeout: 10000 }).contains('Continue').click();
    cy.wait(3000)
    cy.get('[type="submit"]', { timeout: 300000 }).contains('Go!').click();
  }
}

export function fillDaysAvailable (dataTable) {
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
}


export function assertContactDetails (dataTable) {
  dataTable.hashes().forEach(detail => {
    cy.get('[class="detail-section ng-star-inserted"]')
      .should('contain.text', detail.method)
      .and('contain.text', detail.detail);
  });
}