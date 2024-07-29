import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"


Given("the user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/quick-blox/api/v1/quickblox/login').as('signinRequest');
})

When("the user initiate the sign in", () => {
    cy.contains('Sign in').click()
})

When("the user provides valid sign in details", () => {
    cy.get('[placeholder="Email"]').clear().type('abs1722237343963@vvocqwdp.mailosaur.net')
    cy.get('[type="password"]').clear().type('Admin@1234')
})

When("the user submit the sign in form", () => {
    cy.get('[type="submit"]').contains('Sign in').click()

    cy.wait('@signinRequest', { timeout: 10000 }).then((interception) => {
      
        let statusCode = interception.response.statusCode;
  
        expect(statusCode).to.equal(200)

    });

})

Then("the user will be in homepage", () => {

    // cy.url().should('include', 'https://dev.yuzee.click/user-control-center/landing')
})