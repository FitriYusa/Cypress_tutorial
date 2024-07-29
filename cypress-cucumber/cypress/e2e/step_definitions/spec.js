import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

const serverID = "vvocqwdp";
const emailDomain = `@${serverID}.mailosaur.net`

const randomString = new Date().getTime();
const emailAddress = `abs${randomString}${emailDomain}`;


Given("the new user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest');
});

When("the new user initiate the account creation process", () => {
    cy.contains('Join Yuzee').click()
});

When("the new user provides valid registration details", () => {
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

When("the user submits the registration form", () => {
    cy.get('[type="submit"]').contains('Sign Up').click()
})

Then("the user should receive verification code via email and submit", () => {
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

Then("the user be redirect to the profile setup page", () => {
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