describe('Signup', () => {
  const serverID = "vvocqwdp";
  const emailDomain = `@${serverID}.mailosaur.net`

  const randomString = new Date().getTime();
  const emailAddress = `abs${randomString}${emailDomain}`;

  it('Navigating to sign up pop up', () => {
    cy.visit('/')

    //to intercept and .as is for naming (need to have in the beginning)
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest');

    cy.contains('Join Yuzee').click()

    //First and last name
    cy.get('[formcontrolname="firstName"]').type("ali")
    cy.get('[formcontrolname="lastName"]').type("abu")

    //Select date
    cy.get('[class="calendar-icon icon-lg"]').click()
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[title="Select year"]').select('1997')
    cy.get('[role="gridcell"]').contains('7').click()

    //Gender
    cy.get('[formcontrolname="gender"]').click()
    cy.contains('Male').click()

    cy.get('[formcontrolname="postal_code"]').type("3000")
    cy.get('[formcontrolname="email"]').type(emailAddress)
    cy.get('[formcontrolname="password"]').type("Admin@1234")
    cy.get('[formcontrolname="confirmPassword"]').type("Admin@1234")

    cy.get('[type="submit"]').contains('Sign Up').click()

    // waiting for the API
    cy.wait('@signupRequest', { timeout: 10000 }).then((interception) => {
      
      let statusCode = interception.response.statusCode;

      if (statusCode === 200) {
        
        cy.contains("Verification Code")

        cy.mailosaurGetMessage(serverID, {
          sentTo: emailAddress
        })
        .then(email => {
          const OTP = email.html.codes.map(code => code.value);

          for (let i = 1; i <= 6; i++) {
              cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i - 1]}`)
          }
          cy.get('button[type="submit"]').contains("Continue").click();
      });
      }
    });
  })
  
})