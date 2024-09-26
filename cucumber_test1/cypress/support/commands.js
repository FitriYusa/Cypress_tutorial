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

const serverID = "vvocqwdp";
const emailDomain = `@${serverID}.mailosaur.net`;

Cypress.Commands.add('generateUniqueEmail', () => {

    const randomString = new Date().getTime();
    const emailAddress = `aliabu${randomString}${emailDomain}`;
    
    cy.wrap(emailAddress).as('uniqueEmail')
})

Cypress.Commands.add("getAuthToken", (username, password) => {
    cy.request({
      method: "POST",
      url: "https://auth.yuzee.click/auth/realms/yuzee/protocol/openid-connect/token",
      form: true,
      body: {
        grant_type: "password",
        scope: "openid email profile",
        username: username,
        password: password,
      },
    }).then((response) => {
      // Ensure the request was successful
      expect(response.status).to.eq(200);
  
      const accessToken = response.body.access_token;
      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const EntityId = tokenPayload.sub;
      const expiryTime = tokenPayload.exp * 1000; // JWT expiry is in seconds, convert to ms
  
      Cypress.env("authToken", accessToken);
      Cypress.env("EntityId", EntityId);
      Cypress.env("authTokenExpiry", expiryTime); // Save token expiry time
  
      cy.log(`Auth Token: ${accessToken}`);
      cy.log(`Entity ID: ${EntityId}`);
      cy.log(`Auth Token Expiry: ${new Date(expiryTime).toLocaleString()}`);
  
      return { accessToken, EntityId, expiryTime };
    });
  });

Cypress.Commands.add("ensureAuthToken", (username, password) => {
const currentTime = Date.now();
const authTokenExpiry = Cypress.env("authTokenExpiry");

// If token is expired or not set, fetch a new one
if (!authTokenExpiry || currentTime > authTokenExpiry) {
    cy.log("Auth Token expired or missing. Fetching a new one...");
    return cy.getAuthToken(username, password);
} else {
    cy.log("Auth Token is still valid.");
    return Cypress.env("authToken");
}
});