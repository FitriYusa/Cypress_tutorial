describe('Parabank tutorial', () => {


    it('Sign up', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm')

        cy.get('#loginPanel > :nth-child(3) > a').click()
        
        cy.get('[id="customer.firstName"]').type('Abu')
        cy.get('[id="customer.lastName"]').type('Bakar')
        cy.get('[id="customer.address.street"]').type('No 23 Jalan huasin')
        cy.get('[id="customer.address.city"]').type('Pekan')
        cy.get('[id="customer.address.state"]').type('MU')
        cy.get('[id="customer.address.zipCode"]').type('23444')
        cy.get('[id="customer.phoneNumber"]').type('0944222145')
        cy.get('[id="customer.ssn"]').type('543216')
        cy.get('[id="customer.username"]').type('AbBakar22')
        cy.get('[id="customer.password"]').type('Admin@1234')
        cy.get('[id="repeatedPassword"]').type('Admin@1234')

        // cy.get('[colspan="2"] > .button').click()
        cy.get('[type="submit"]').contains('Register').click()
    })
})