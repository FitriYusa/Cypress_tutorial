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
       cy.fillForm()
})

When("the user submits the registration form", () => {
    cy.get('[type="submit"]').contains('Sign Up').click()
})

Then("the user should receive verification code via email and submit", () => {
    cy.API()
})

Then("the user be redirect to the profile setup page", () => {
    cy.compbtn()
})