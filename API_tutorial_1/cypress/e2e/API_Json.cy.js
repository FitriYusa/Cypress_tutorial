describe("aa", () => {

    it("dd", () => {
        cy.visit('https://jsonplaceholder.typicode.com/')

        // cy.get('[id="run-button"]').click()
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then((response) => response.json())
        // .then((json) => console.log(json));

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: 'foo',
              body: 'bar',
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
    })
})

