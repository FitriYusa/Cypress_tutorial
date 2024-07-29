describe("techlist", () => {
    it("practice form", () => {
        cy.visit("https://www.techlistic.com/p/selenium-practice-form.html")

        cy.get('[name="firstname"]').type("ali")
        cy.get('[name="lastname"]').type("abu")
        
        cy.get('[name="sex"][value="Male"]').click()
        cy.get('[name="sex"][value="Male"]').should('be.checked');

        cy.get('[name="exp"][value="4"]').click()


        cy.get('[name="profession"][value="Automation Tester"]').click()

        // cy.get('[name="continents"]').click()

        cy.contains('Browser Commands').click()

        cy.get('[type="file"]').click()
        cy.get('input[type="file"]').selectFile('cypress\\images\\blob.jfif', {force : true})
    })
})