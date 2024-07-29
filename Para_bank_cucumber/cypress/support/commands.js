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

const randomString = new Date().getTime();
const username = `Abu${randomString}`;

Cypress.Commands.add('fillForm', () => { 
    cy.get('[id="customer.firstName"]').type('Abu').should('have.value','Abu')
    cy.get('[id="customer.lastName"]').type('Bakar').should('have.value', 'Bakar')
    cy.get('[id="customer.address.street"]').type('No 23 Jalan huasin').should('have.value', 'No 23 Jalan huasin')
    cy.get('[id="customer.address.city"]').type('Pekan').should('have.value', 'Pekan')
    cy.get('[id="customer.address.state"]').type('MU').should('have.value', 'MU')
    cy.get('[id="customer.address.zipCode"]').type('23444').should('have.value', '23444')
    cy.get('[id="customer.phoneNumber"]').type('0944222145').should('have.value', '0944222145')
    cy.get('[id="customer.ssn"]').type('543216').should('have.value', '543216')
    cy.get('[id="customer.username"]').type(username).should('have.value', username)
    cy.get('[id="customer.password"]').type('Admin@1234').should('have.value', 'Admin@1234')
    cy.get('[id="repeatedPassword"]').type('Admin@1234').should('have.value', 'Admin@1234')
})