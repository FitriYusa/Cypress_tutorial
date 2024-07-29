import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

Given("the user is on Para Bank homepage", () => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm")
})

When("the new user initiate the account creation process", () => {
    cy.get('#loginPanel > :nth-child(3) > a').click()
})

When("the new user provides valid registration details", () => {
    cy.fillForm()
})
When("the user submits the sign in form" ,() => {
    cy.get('[type="submit"]').contains('Register').click()
})

Then("the user be redirect to the homepage", () => {
    cy.contains('Your account was created successfully. You are now logged in').should('be.visible')
})