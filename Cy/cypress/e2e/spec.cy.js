describe('Signup', () => {
  const serverID = "vvocqwdp";
  const emailDomain = `@${serverID}.mailosaur.net`

  const randomString = new Date().getTime();
  const emailAddress = `abs${randomString}${emailDomain}`;

  it('Navigating to sign up pop up', () => {
    cy.visit('/')

    cy.contains('Join Yuzee').click()
    cy.get('[formcontrolname="firstName"]').type("ali")
    cy.get('[formcontrolname="lastName"]').type("abu")

    cy.get('[placeholder="Select a date"]').click()
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[title="Select year"]').select('1997')
    cy.get('[role="gridcell"]').contains('7').click()

    cy.get('[formcontrolname="gender"]').click()
    cy.contains('Male').click()

    cy.get('[formcontrolname="postal_code"]').type("3000")
    cy.get('[formcontrolname="email"]').type(emailAddress)
    cy.get('[formcontrolname="password"]').type("Admin@1234")
    cy.get('[formcontrolname="confirmPassword"]').type("Admin@1234")

    cy.get('[type="submit"]').contains('Sign Up').click()
  })
  
})