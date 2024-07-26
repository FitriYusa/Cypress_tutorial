describe('Signup pop up button', () => {

    //mailosaur
    const serverID = 'vvocqwdp'
    const emailDomain = `@${serverID}.mailosaur.net`

    const randomString = new Date().getTime();
    const emailAddress = `aliabu${randomString}${emailDomain}`;

    
    // it('Navigate through sign up pop up button',() => {

    //     cy.visit('/')

    //     cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')

    //     cy.contains('Join Yuzee').click()

    //     cy.get('[placeholder="First Name"]').type('ali')
    //     cy.get('[placeholder="Last Name"]').type('abu')

    //     cy.get('[placeholder="Select a date"]').click()
    //     cy.get('[title="Select year"]').select('1998')
    //     cy.get('[title="Select month"]').select('Dec')
    //     cy.get('[role="gridcell"]').contains('21').click()

    //     cy.get('[id="gender"]').click()
    //     cy.get('[role="option"]').contains('Male').click()

    //     cy.get('[id="postal_code"]').type('3000')
    //     cy.get('[placeholder="Email"]').type(emailAddress)
    //     cy.get('[placeholder="Password"]').type('Admin@1234')
    //     cy.get('[placeholder="Confirm Password"]').type('Admin@1234')

    //     cy.get('[type="submit"]').contains('Sign Up').click()

    //     cy.wait('@signupRequest', { timeout: 10000 }).then ((interception) => {
            
    //         let statusCode = interception.response.statusCode;

    //         if(statusCode === 200) {
                
    //             cy.contains("Verification Code")

    //             cy.mailosaurGetMessage(serverID, {
    //                 sentTo: emailAddress
    //             })
    //             .then(email => {

    //                 const OTP = email.html.codes.map(code => code.value);

    //                 for (let i = 1; i <= 6; i++){
    //                     cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i-1]}`)
    //                 }
    //                 cy.get('button[type="submit"]').contains('Continue').click()
    //             })
    //         }
    //     })

    //     cy.get('[type="submit"]').contains('Start!').click()

    //     cy.get('[class="col-md-4 ng-star-inserted"]').contains('Internship').click()
    //     cy.get('[class="col-md-4 ng-star-inserted"]').contains('Work Placement').click()
    //     cy.get('[class="col-md-4 ng-star-inserted"]').contains('Course').click()
    //     cy.get('[class="col-md-4 ng-star-inserted"]').contains('Job').click()
    //     cy.get('[class="col-md-4 ng-star-inserted"]').contains('Traineeship').click()
    //     cy.get('[type="submit"]').contains('Continue').click()

        
    //     cy.get('span.slider.round').first().click();
    //     // cy.get('input[type="checkbox"]').should('be.checked')
    //     cy.get('[placeholder="University/School"]').type('MSU')

    //     cy.get('[name="start_date"]').click()
    //     cy.get('[title="Select year"]').select('2020')
    //     cy.get('[title="Select month"]').select('Apr')
    //     cy.get('[role="gridcell"]').contains('21').click()

    //     cy.get('[name="end_date"]').click()
    //     cy.get('[title="Select year"]').select('2025')
    //     cy.get('[title="Select month"]').select('Jul')
    //     cy.get('[role="gridcell"]').contains('21').click()
    //     cy.get('[type="submit"]').contains('Continue').click()

    //     // insert profile image
    //     // cy.get('[type="button"]').click()
    //     cy.get('button.btn.img-logo').find('img').click();
    //     // cy.get('[class="drag-files"]').click()
    //     cy.get('input[type="file"]').selectFile('cypress\\images\\blob.jfif', {force : true})


    //     // cy.get('[type="submit"]').contains('Skip').click()


    // })

    // it('Navigating to sign in pop up', () => {
    //     cy.visit('/')

    //     cy.contains('Sign in').click()
    //     cy.get('[formcontrolname="email"]').clear().type(emailAddress)
    //     cy.get('[formcontrolname="password"]').clear().type("Admin@1234")

    //     cy.get('[type="submit"]').contains('Sign in').click()
    // })

    it('test every button', () => {
        
        cy.visit('/')

        cy.get('[type="submit"]').contains('Request for offers').click()
        //can be type as below
        //cy.get('button.btn.btn-blue.theme-btn').contains('Request for offers').click()

        cy.get('[class="logo"]').click()

        cy.get('[role="tab"]').contains('Application').click()
        cy.get('[role="tab"]').contains('Apprenticeships').click()
        cy.get('[role="tab"]').contains('Ask a Question').click()

        cy.get('[type="button"]').contains('buttons.Join Yuzee as a Business or Institution').click()
        cy.get('[class="btn-cont-block btn-input d-flex min-h-new"]').contains('Public').click()

        cy.get('[type="button"]').contains('buttons.Join Yuzee as a Business or Institution').click()
        cy.get('[class="btn-cont-block btn-input d-flex min-h-new"]').contains('Private').click()

        cy.get('[type="button"]').contains('buttons.Join Yuzee as a Business or Institution').click()
        cy.get('[class="btn-cont-block btn-input d-flex min-h-new"]').contains('NA').click()

    })
})


