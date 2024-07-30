class LoginPage {
    enterURL() {
      cy.visit("https://testgrid.io/");
    }
    clickSignInLink() {
      cy.get('[title="Sign in"]').click();
      return this;
    }
    enterEmailPassword(username, password) {
      cy.get("#email").clear().type(username);
      cy.get("#password").clear().type(password);
      return this;
    }
    clickSignButton() {
      cy.get(".signin-button").click();
      return this;
    }
    verifyPageTitle() {
      return cy.title().should("eq", "TestGrid | The Cloud Based Mobile Automated Testing Platform on Real iOS and Android Devices");
    }
    verifyUserLoggedIn() {
      return cy.contains('Dashboard')
    }
    verifyCodelessLink() {
      return cy.get("#tgtestcase").click();
    }
    verifyCodelessLinkOpen() {
      return cy.contains("Lets get you started with codeless automation");
    }
    clickLogoutLink() {
        cy.get("[data-toggle='dropdown']").click(); cy.contains("Logout").click();
        return
    }
    }
    const login = new LoginPage();
    export default login;