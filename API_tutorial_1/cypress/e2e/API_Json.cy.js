describe("aa", () => {

    it("dd", () => {
        cy.visit('https://jsonplaceholder.typicode.com/')

        
    })
})

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));