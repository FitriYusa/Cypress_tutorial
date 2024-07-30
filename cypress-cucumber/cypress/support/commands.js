// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('defineTheFlyingDistanceForATrip', (departure, destination, distance) => {
//      cypress.log(`Setting flying distance between $(departure) and $(destination) to $(distance) km`);
// });

const serverID = "vvocqwdp";
const emailDomain = `@${serverID}.mailosaur.net`

const randomString = new Date().getTime();
const emailAddress = `abs${randomString}${emailDomain}`;

Cypress.Commands.add('fillForm',() => { 
     //First and last name
     cy.get('[formcontrolname="firstName"]').type("ali")
     cy.get('[formcontrolname="lastName"]').type("abu")
 
     //Select date
     cy.get('[placeholder="Select a date"]').click()
     cy.get('[title="Select month"]').select('Jul')
     cy.get('[title="Select year"]').select('1997')
     cy.get('[role="gridcell"]').contains('7').click()
 
     //Gender
     cy.get('[formcontrolname="gender"]').click()
     cy.contains('Male').click()
 
     cy.get('[formcontrolname="postal_code"]').type("3000")
     cy.get('[formcontrolname="email"]').type(emailAddress)
     cy.get('[formcontrolname="password"]').type("Admin@1234")
     cy.get('[formcontrolname="confirmPassword"]').type("Admin@1234")
 })

 Cypress.Commands.add('API', () => {
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
            cy.get('button[type="submit"]').contains("Continue").click();
        });
        }
    });

 })

 Cypress.Commands.add('compbtn', () => {
    cy.url().should('eq', 'https://env3.yuzee.click/profile-setup')
    cy.contains("Let's get this show on the road")

    cy.get('[type="submit"]').contains('Start!').click()

    cy.contains("How do you plan on using Yuzee?")
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Internship').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Work Placement').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Course').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Job').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Traineeship').click()
    cy.get('[type="submit"]').contains('Continue').click()

    cy.get('span.slider.round').first().click();
    // cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('[placeholder="University/School"]').type('MSU')

    cy.get('[name="start_date"]').click()
    cy.get('[title="Select year"]').select('2020')
    cy.get('[title="Select month"]').select('Apr')
    cy.get('[role="gridcell"]').contains('21').click()

    cy.get('[name="end_date"]').click()
    cy.get('[title="Select year"]').select('2025')
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[role="gridcell"]').contains('21').click()
    cy.get('[type="submit"]').contains('Continue').click()

    // insert profile image
    // cy.get('[type="button"]').click()
    cy.get('button.btn.img-logo').find('img').click();
    // cy.get('[class="drag-files"]').click()
    cy.get('input[type="file"]').selectFile('cypress\\images\\blob.jfif', {force : true})
 })