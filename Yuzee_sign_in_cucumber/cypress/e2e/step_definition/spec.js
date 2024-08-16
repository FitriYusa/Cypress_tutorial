import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"


Given("the user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/quick-blox/api/v1/quickblox/login').as('signinRequest')
    cy.intercept('GET', 'https://auth.yuzee.click/accessibility-service/api/v1/claim/association/entityId/a19781dd-643b-41a9-b8ab-b925f4e605fc/entityType/USER').as('userRequest')
})

When("the user initiate the sign in", () => {
    cy.contains('Sign in').click()
})

When("the user provides valid sign in details", (dataTable) => {

    dataTable.hashes().forEach(row => {
        cy.get('[placeholder="Email"]').clear().type(row.email)
        cy.get('[type="password"]').clear().type('Admin@1234')
    })
    
})

When("the user submit the sign in form", () => {
    
    cy.get('[type="submit"]').contains('Sign in').click()

    cy.wait('@signinRequest', { timeout: 10000 }).then((interception) => {
      
        let statusCode = interception.response.statusCode;
  
        expect(statusCode).to.equal(200)

    });

})

Then("the user will be in homepage", () => {

    // cy.visit('/user-control-center/landing')
    cy.url({ timeout: 10000 }).should('include', '/user-control-center/landing')
})

// Given("the user initiate the insitution", () => {
//     cy.get('[id="dropdownPlace"]').click()
//     cy.get('.dropdown-toggle > .btn').click()
//     cy.get('.row > :nth-child(1) > .m-bottom > .btn-cont-block').click()
// })

// When("the user provides valid information details", () => {

//     cy.intercept('POST', 'https://auth.yuzee.click/institute/api/v1/').as('createRequest')

//     const randomString = new Date().getTime();
    
//     cy.get('[id="instituteName"]').type(`University of Bread ${randomString}`)
//     cy.get('[id="tagline"]').type('Sungguh Enak dimakan begitu saja')
//     cy.get('[id="description"]').type('Established in 1986, Gardenia Bakeries (KL) Sdn. Bhd. (Gardenia KL) is a joint venture between QAF Limited, a Singapore listed food group which also operates Gardenia Singapore and Gardenia Philippines, and Padiberas National Berhad of Malaysia. Our bakeries operate 24/7 to ensure that consumers enjoy fresh Gardenia products every day.')
//     cy.get('[name="webSite"]').type('https://www.gardenia.com.my/about-us')

//     cy.get('[placeholder="Yuzee Public URL"]').type('UOB')
    
//     cy.get('[placeholder="Enter the Code"]').eq(0).type('32984')
//     cy.get('[type="file"]').eq(0).selectFile('cypress\\images\\photo_2022-07-15_12-06-13.jpg', {force : true})

//     cy.get('[placeholder="Enter the Code"]').eq(1).type('3200')
//     cy.get('[type="file"]').eq(1).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy.jpg', {force : true})

//     cy.get('[placeholder="Enter the Code"]').eq(2).type('ABC3234')
//     cy.get('[type="file"]').eq(2).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg', {force : true})
    

//     cy.get('[type="button"]').contains('Next').click()
    
//     // cy.get('[role="combobox"]').eq(0).type('Kuala Lumpur')
//     // cy.contains('Kuala Lumpur, Malaysia').click()

//     cy.get('[name="city_name"]').type('Kuala Lumpur')
//     cy.get('[name="state_name"]').type('Kuala Lumpur')
//     cy.get('[name="country_name"]').type('Malaysia')

//     cy.get('[name="postal_code"]').clear().type('MY43200')

//     cy.get('[role="combobox"]').eq(1).click()
//     cy.contains('Monday').click()
//     cy.get('[role="combobox"]').eq(2).click()
//     cy.contains('7:00 AM').click()
//     cy.get('[role="combobox"]').eq(3).click()
//     cy.contains('7:00 PM').click()

//     cy.get('[type="button"]').contains(' Add day and time ').click()

//     cy.get('[role="combobox"]').eq(4).click()
//     cy.contains('Tuesday').click()
//     cy.get('[role="combobox"]').eq(5).click()
//     cy.contains('7:15 AM').click()
//     cy.get('[role="combobox"]').eq(6).click()
//     cy.contains('7:30 PM').click()
// })

// When("the user submit the application", () => {

//     cy.get('.ng-star-inserted > .btn-blue').should('be.visible').click()
    
//     // cy.wait('@createRequest', { timeout: 10000 }).then((interception) => {
//     //     expect(interception.response.statusCode).to.equal(200)
//     // })
   
// }) 

Given("the user initiate the education", () => {
    cy.wait('@userRequest')
    cy.intercept('GET','https://auth.yuzee.click/users/api/v1/users/user/id/a19781dd-643b-41a9-b8ab-b925f4e605fc').as('applicationRequest')

    cy.visit('/user-control-center/landing')
    cy.get(':nth-child(2) > .zoom-in-hover > img').click()
    cy.contains('h2','Undergraduate').click()
})

When("the user provides valid application details", (dataTable) => {
    
    
    cy.wait('@applicationRequest', { timeout : 10000}).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })

    cy.wait(3000)
    cy.contains('Direct application').should('be.visible').click()
    cy.wait(3000)
    cy.contains('Create New').should('be.visible').click()

    // for (let i = 0; i < 3; i++) {
    //     cy.contains('Direct application').should('be.visible').click()
    //     cy.contains('Create New').should('be.visible').click()
    // }

    cy.contains('Who is this application for?').should('be.visible')
    cy.contains("Student at").should('be.visible').click()

    cy.contains('Search institute').click({force : true})

    dataTable.hashes().forEach(row => {
        cy.contains(row.institute).click()
       
        cy.contains('Search Course').click({force : true})
        cy.contains(row.course).click();
        cy.get('.modal-footer > .btn-blue').click({force : true})
        cy.contains('Select intake').click({ force: true });
        cy.contains(row.intake).click({ force: true });
        
    })
    
    

    // cy.contains('Select study mode').click({force : true})
    // cy.contains('PART_TIME').click({force : true})
    // cy.contains('Select delivery type').click({force : true})
    // cy.contains('CLASSROOM').click({force : true})

    // cy.contains('Next').eq(0).click()
    // cy.contains('Next').eq(1).click()
})
