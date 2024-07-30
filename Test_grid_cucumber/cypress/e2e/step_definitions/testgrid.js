import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("I navigate to the Website", () => {
    cy.visit("https://testgrid.io/");
});

When("I click on Sign In Link", () => {
    cy.get('[title="Sign in"]').click();
})

When("I entered valid credential", (datatable) => {

    datatable.hashes().forEach(row => {
        cy.get("#email").clear().type(row.email);
        cy.get("#password").clear().type(row.validpassword);;
    
    });
   
})

When("Click on sign in button", () => {
    cy.get(".signin-button").click();

    cy.wait(10000)

    cy.get('body').then($body => {
        if ($body.find('.buttons.mb-3.warning_buttons').length > 0) {
          cy.get('[type="button"]').contains("Yes").click(); // Click the "Yes" button
        } else {
          cy.log('Popup not found, proceeding without interaction');
        }
      });
})


Then("Validate user is logged in", () => {
    cy.contains('Dashboard')
})

Then("Validate the title after login", () => {
    cy.title().should("eq", "TestGrid | The Cloud Based Mobile Automated Testing Platform on Real iOS and Android Devices");
})

When("I click on Codeless link", () => {
    cy.get("#tgtestcase").click();
})

Then("Validate Codeless link should be open", () => {
    cy.contains("Lets get you started with codeless automation");
})

When("I click logout link", () => {
    cy.get("[data-toggle='dropdown']").click(); cy.contains("Logout").click();
})