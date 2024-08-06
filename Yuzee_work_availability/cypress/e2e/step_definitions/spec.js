import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

const serverID = "vvocqwdp";
const emailDomain = `@${serverID}.mailosaur.net`

const randomString = new Date().getTime();
const emailAddress = `abs${randomString}${emailDomain}`;


Given("the user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')
})

When("the new user initiate the account creation process", () => {
    cy.contains('Join Yuzee').click()
})

When("the new user provides valid registration details", () => {
    //First and last name
    cy.get('[formcontrolname="firstName"]').type("ali")
    cy.get('[formcontrolname="lastName"]').type("abu")

    //Select date
    cy.get('.input-group > .form-control').click()
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

Then("the new user should receive verification code via email and submits", () => {
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

Then("the new user will be redirect to completeting the Onboarding", () => {
    
    cy.url().should('include', '/profile-setup')
    cy.contains("Let's get this show on the road")

    cy.get('[type="submit"]').contains('Start!').click()

    cy.contains("How do you plan on using Yuzee?")
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Internship').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Work Placement').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Course').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Job').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Traineeship').click()
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

    // insert profile image - having issue with the uploading the image, decided to skip
    // cy.get('button.btn.img-logo').find('img').click();
    // cy.get('input[type="file"]').selectFile('cypress\\images\\blob.jfif', {force : true})
    cy.contains('Skip').click()
    cy.wait(5000)
    
    //Location
    cy.get('[placeholder="Search location"]').type('Kuala Lumpur')
    cy.contains('Kuala Lumpur').click()
    cy.contains('Continue').should('be.visible').click()
    cy.get('[type="submit"]').contains('Continue').click()
    //cannot click on the continue, it just loading - decided to skip
    // cy.get('[type="submit"]').contains('Skip').click()
    cy.wait(5000)

    //Hobby
    cy.get('[bindlabel="hobby_name"]').type('run')
    cy.contains('Running').click()
    cy.get('[type="submit"]').contains('Continue').click()
    cy.wait(5000)

    //Community
    
    cy.get('[type="submit"]').contains('Continue').click()
    cy.wait(3000)
    cy.get('[type="submit"]').contains('Go!').click()
})

Then("the new user will be redirect to the user control center page", () => {
    cy.url().should('include', '/user-control-center/landing')
})

When("the user initiate to Go to profile", () => {

    //need to click something else before the Go to profile button to work 
    cy.get('[ngbtooltip="Apply"]').click()
    cy.wait(3000)
    cy.get('[ngbtooltip="Control Center"]').click()
    cy.wait(3000)
    cy.get('[class="btn btn-block fs-16 fw-500 light-grey-btn"]').contains('Go to profile').should('be.visible').click()
})

Then("the user will be redirect to profile page", () => {
    cy.wait(3000)
    //sometimes the test pass sometimes failed
    cy.url().should('include', '/profile')
})

When("the user initiate the Work Availability", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Work Availability ').should('be.visible').click()

})

When("the user provides valid work availability details", () => {
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

    cy.get('.col-4 > .select-control > .ng-select > .ng-select-container').click()
    cy.get('[role="option"]').eq(0).contains('Monday').should('be.visible').click()
    cy.get('[name="selectTime"]').eq(0).click()
    cy.get('[role="option"]').contains('8:00 AM').click()
    cy.get('[name="selectTime"]').eq(1).click()
    cy.get('[role="option"]').contains('8:00 PM').click()

    cy.contains('Add Availability').should('be.visible').click()

    cy.get(':nth-child(8) > .row > .col-4 > .select-control > .ng-select > .ng-select-container').click()
    cy.get('[role="option"]').eq(1).contains('Tuesday').should('be.visible').click()
    cy.get('[name="selectTime"]').eq(2).click()
    cy.get('[role="option"]').contains('8:00 AM').click()
    cy.get('[name="selectTime"]').eq(3).click()
    cy.get('[role="option"]').contains('8:00 PM').click()
    
})

When("the user submits the Work Availability form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Work Availability on profile page", () => {
    cy.get('[class="work-row"]').contains('Internship').click()
})