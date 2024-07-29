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

const serverID = 'vvocqwdp'
const emailDomain = `@${serverID}.mailosaur.net`

const randomString = new Date().getTime();
const emailAddress = `aliabu${randomString}${emailDomain}`;

Cypress.Commands.add('fillForm', () => {
    cy.contains('Add User').should('be.visible')
    cy.get('[id="firstName"]').type('ali')
    cy.get('[id="lastName"]').type('abu')
    cy.get('[id="email"]').type(emailAddress)
    cy.get('[id="password"]').type('Admin@1234')
})