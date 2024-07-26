describe('template spec', () => {

  //mailosaur
  const serverID = 'vvocqwdp'
  const emailDomain = `@${serverID}.mailosaur.net`

  const randomString = new Date().getTime();
  const emailAddress = `aliabu${randomString}${emailDomain}`;

  it('Sign up', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')

    cy.get('[id="signup"]').click()
    cy.get('[id="firstName"]').type('ali')
    cy.get('[id="lastName"]').type('abu')
    cy.get('[id="email"]').type(emailAddress)
    cy.get('[id="password"]').type('Admin@1234')

    cy.get('[id="submit"]').click()

    cy.get('[id="add-contact"]').click()

    cy.get('[id="firstName"]').type('Ali')
    cy.get('[id="lastName"]').type('Baba')
    cy.get('[id="birthdate"]').type('1994-05-24')
    cy.get('[id="email"]').type(emailAddress)
    cy.get('[id="phone"]').type('0112345552')
    cy.get('[id="street1"]').type('No 3 Jalan hang Tuah')
    cy.get('[id="street2"]').type('Melaka, 23344')
    cy.get('[id="city"]').type('Melaka')
    cy.get('[id="stateProvince"]').type('Melaka')
    cy.get('[id="postalCode"]').type('23344')
    cy.get('[id="country"]').type('Malaysia')
    cy.get('[id="submit"]').click()
    // cy.get('[id="logout"]').click()

    //cy.get('[id="cancel"]').click()


  })
})