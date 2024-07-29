import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

Given("the user is on Empty sign in page", () => {
    cy.visit('/')
})

When("the new user initiate the account creation process", () => {
    cy.get('[id="signup"]').click()
})

When("the new user provides valid registration details", () => {
    cy.fillForm()
})

When("the user submits the registration form", () => {
    cy.get('[id="submit"]').click()
})

Then("the user be redirect to the profile setup page", () => {
    cy.contains('Contact List').should('be.visible')
})