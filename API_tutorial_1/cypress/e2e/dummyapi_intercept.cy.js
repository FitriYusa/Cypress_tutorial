describe('API Intercept', () => {

    it('Tutorial', () => {
        cy.visit('https://dummyapi.io/explorer')

        cy.intercept({

            path: '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10'
        }).as('comments')

        cy.get('.flex > :nth-child(5)').click()
        cy.wait('@comments', { timeout: 10000 }).then(intercept => {
            expect(intercept.response.body.limit).equal(10)
        })

        //dont know
        // cy.intercept('/data/v1/tag?limit=10').as('text')

        // cy.get('.flex > :nth-child(6)').click()
        // cy.wait('@text').then(intercept => {
        //     cy.contains('"123456789"')
        // })


        // cy.intercept({
        //     path : '/data/v1/tag/water/post?limit=10'
        // }).as('post')

        // cy.get('.flex > :nth-child(7)').click()
        // cy.wait('@post', { timeout: 10000 }).then(intercept => {
        //     expect(intercept.response.body.limit).equal(10)
        // })

        // cy.get('.py-12 > :nth-child(3) > .flex > :nth-child(2)').click()

    })

    // if want to make a fake response
        it.only('Tutorial', () => {
        cy.visit('https://dummyapi.io/explorer')

        cy.intercept('GET', '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10', {limit:10, Name:'Testing Funda'}).as('comments')

        cy.get('.flex > :nth-child(5)').click()
        cy.wait('@comments', { timeout: 10000 }).then(intercept => {
            expect(intercept.response.body.limit).equal(10)
            expect(intercept.response.body.Name).equal('Testing Funda')
        })
    })
})