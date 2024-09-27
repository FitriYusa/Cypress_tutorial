import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"


Given("Given the user is on the profile page", () => {

})

When("When the user provides valid Hobbies details", () => {
    cy.request({
        method: "GET",
        url: "https://auth.yuzee.click/common/api/v1/hobbies/pageNumber/1/pageSize/10?searchText=",
        form: true,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
})