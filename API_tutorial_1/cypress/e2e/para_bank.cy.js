describe('Parabank tutorial', () => {

    const randomString = new Date().getTime();
    const username = `Abu${randomString}`;
    
    it('Sign up', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm')

        // cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')

        cy.get('#loginPanel > :nth-child(3) > a').click()
        
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

        // cy.get('[colspan="2"] > .button').click()
        cy.get('[type="submit"]').contains('Register').click()

        cy.contains('Your account was created successfully. You are now logged in').should('be.visible')

        // cy.wait('@signupRequest', { timeout: 10000 }).then((intercept) => {
            
        //     let statusCode = interception.response.statusCode;

        //     if (statusCode === 200) {

        //         cy.contains("Verification Code")

        //         cy.mailosaurGetMessage(serverID, {
        //           sentTo: emailAddress
        //         })
        //         .then(email => {
        //           const OTP = email.html.codes.map(code => code.value);
        
        //           for (let i = 1; i <= 6; i++) {
        //               cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i - 1]}`)
        //           }
        //           cy.get('button[type="submit"]').contains("Continue").click();
        //       });
        //     }
        // })
    })
})