describe('GH',() => {

    it('user_serach', () => {
        cy.visit('https://gh-users-search.netlify.app/')

        cy.get('[placeholder="enter github user name"]').type('sa')
    })
})