import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

const serverID = "dmumkrpv";
const emailDomain = `@${serverID}.mailosaur.net`;
const randomString = new Date().getTime();
const emailAddress = `aliabu${randomString}${emailDomain}`;

Given("the user is on the profile page", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')

    cy.contains('Join Yuzee').click()
    //First and last name
    cy.get('[formcontrolname="firstName"]').type("ali")
    cy.get('[formcontrolname="lastName"]').type("abu")

    //Select date
    cy.get('[class="calendar-icon icon-lg"]').click()
    cy.get('[title="Select month"]').select('Jul');
    cy.get('[title="Select year"]').select('1997');
    cy.get('[role="gridcell"]').contains('6').click();

    //Gender
    cy.get('[formcontrolname="gender"]').click()
    cy.contains('Male').click()

    cy.get('[formcontrolname="postal_code"]').type("3000")

    cy.get('[formcontrolname="email"]').type(emailAddress)
    
    cy.get('[formcontrolname="password"]').type("Admin@12345")
    cy.get('[formcontrolname="confirmPassword"]').type("Admin@12345")
})

Given("the user is on the hobbies and want to select privacy", () => {

    cy.get('[class="nav-item d-none-from-me"]').click()
    cy.get('[class="setting-item ml-0 ng-star-inserted"]').click()

    cy.url().should('include', '/profile')

    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Interests').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Interested Hobbies ').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Hobbies details", () => {
    const Urls = [
        'https://auth.yuzee.click/common/api/v1/hobbies/pageNumber/1/pageSize/10?searchText=rugby',
        'https://auth.yuzee.click/users/api/v1/user/0ba70054-8bb7-4843-849c-0a4ae0862734/hobbies',
        'https://auth.yuzee.click/users/api/v1/users/user/0ba70054-8bb7-4843-849c-0a4ae0862734/profile/progress',
        'https://auth.yuzee.click/users/api/v1/user/0ba70054-8bb7-4843-849c-0a4ae0862734/hobbies'
      ];
    
    
      cy.get('[name="privacy_level"]').click()
      cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
  
      cy.get('[name="hobbies"]').type('as')

      dataTable.hashes().forEach((row) => {
        cy.get('[role="option"]', {timeout : 10000}).contains(row.hobbies).click()
      });

      cy.contains('Tell us your hobbies').click()

    cy.request({
        method: "GET",
        url: "https://auth.yuzee.click/common/api/v1/hobbies/pageNumber/1/pageSize/10?searchText=",
        form: true,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
    cy.request({
        method: "GET",
        url: "https://auth.yuzee.click/common/api/v1/hobbies/pageNumber/1/pageSize/10?searchText=rugby",
        form: true,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
    cy.request({
        method: "GET",
        url: "https://auth.yuzee.click/users/api/v1/users/user/0ba70054-8bb7-4843-849c-0a4ae0862734/profile/progress",
        form: true,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
    cy.request({
        method: "GET",
        url: "https://auth.yuzee.click/users/api/v1/user/0ba70054-8bb7-4843-849c-0a4ae0862734/hobbies",
        form: true,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })

    cy.get('[type="button"]').contains('Save').click()

    // Urls.forEach((url) => {    
    //     cy.request({
    //         method: "GET",
    //         url: ,
    //         form: true,
    //     }).then((response) => {
    //         expect(response.status).to.eq(200);
    //     })
    // })
    
})