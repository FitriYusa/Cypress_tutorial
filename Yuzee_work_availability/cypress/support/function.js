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