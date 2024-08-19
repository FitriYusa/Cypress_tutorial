
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

export function fillMyDocs(dataTable){
  dataTable.hashes().forEach((row) => {
    cy.get('[class="menu-div"]').contains(row.documentType).click();
    cy.get('[type="file"]').selectFile(row.filePath);
    cy.get('[type="button"]', { timeout: 10000 }).contains('Yes').click();
});
}

// Utility function to select a date
export function selectDate(month, year, day) {
    cy.get('[title="Select month"]').select(month);
    cy.get('[title="Select year"]').select(year);
    cy.get('[role="gridcell"]').contains(day).click();
  }

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