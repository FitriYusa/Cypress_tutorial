describe('Fundamental test', () => {
  beforeEach(() => {
    cy.visit('/fundamentals')
  })
  it('Contains correct header text', () => {
    cy.getDataTest('fundamental-header').should('contain.text','Testing Fundamentals')
    // cy.get('[data-test = "fundamental-header"]').should('contain.text','Testing Fundamentals')
  })
  it('Accordion works correctly', () => {
    cy.visit('/fundamentals')
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
    cy.get('[data-test = "accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible')
    // cy.get('[data-test = "accordion-item-1"] div[role="button"]').click()
    cy.getDataTest('accordion-item-1').find (`div[role="button"]`).click()
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
  })
})