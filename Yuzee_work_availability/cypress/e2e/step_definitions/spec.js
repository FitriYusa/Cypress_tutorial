import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

import {verifyOTP, Onboarding, fillFunction, assertDetails} from '../../support/function';

Given("the user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')
    cy.intercept('POST', 'https://auth.yuzee.click/quick-blox/api/v1/quickblox/login').as('signinRequest')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/user/*/workexperience').as('workExpRequest')
})

//sign in
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

//sign up
When("the new user initiate the account creation process", () => {
    cy.contains('Join Yuzee').click()
})

When("the new user provides valid registration details", () => {
    fillFunction('fillRegistration')
})

When("the user submits the registration form", () => {
    cy.get('[type="submit"]').contains('Sign Up').click()
})

Then("the new user should receive verification code via email", () => {
    verifyOTP ()
})

When("the new user submits the verification code", () => {
    cy.get('button[type="submit"]').contains("Continue").click();
})

When("the new user is student completing the Onboarding", () => {
    Onboarding('studentCompleteOnboarding');
})

When("the new user is student skipping the onboarding process", () => {
    Onboarding('studentSkipOnboarding');
})

When("the new user have work experience completing the onboarding", () => {
    Onboarding('workCompleteOnboarding')
})

When("the new user have work experience skipping the onboarding process", () => {
    Onboarding('workSkipOnboarding');
})

When("the new user have no work experience completing the onboarding process", () => {
    Onboarding('noExperienceCompleteOnboarding');
})

When("the new user have no work experience skipping the onboarding process", () => {
    Onboarding('noExperienceSkipOnboarding');
})

//user home page and user profile page
Then("the new user will be redirect to the user control center page", () => {
    cy.url({ timeout: 10000 }).should('include', '/user-control-center/landing')
})

When("the user initiate to Go to profile", () => {
    cy.get('[class="nav-item d-none-from-me"]').click()
    cy.get('[class="setting-item ml-0 ng-star-inserted"]').click()
})

Given("the user is student skipped onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Australian National University').scrollIntoView().should('be.visible')
})

Given("the user is student completed onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Kuala Lumpur,').scrollIntoView().should('be.visible')
    cy.get('[class="col-md-4"]').contains('Australian National University').scrollIntoView().should('be.visible')
    cy.get('[class="suggestion-block ng-star-inserted"]').contains('Running Tours').should('be.visible')
})

Given("the user work complete onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Kuala Lumpur,').scrollIntoView().should('be.visible')
    cy.get('[class="col-md-4"]').contains('Australian Company').scrollIntoView().should('be.visible')
    cy.get('[class="suggestion-block ng-star-inserted"]').contains('Running Tours').should('be.visible')

    cy.get('[class="student-experience-section mb-3"]')
	.should('contain.text', 'Broadcast Technician')
	.should('contain.text', 'Australian Company')
})

Given("the user work skip onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Australian Company').scrollIntoView().should('be.visible')

    cy.get('[class="student-experience-section mb-3"]')
	.should('contain.text', 'Broadcast Technician')
	.should('contain.text', 'Australian Company')
})

Given("no experience user complete onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Kuala Lumpur,').scrollIntoView().should('be.visible')
    cy.get('[class="suggestion-block ng-star-inserted"]').contains('Running Tours').should('be.visible')
})

Given("no experience user skip onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
})

//Edit profile photo if there is no photo
When("the user edit the profile photo", () => {
    cy.get('[class="img-over"]').click()
    cy.get('[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
    cy.get('[type="button"]').contains('Save').click()
})
When("the user submit the profile photo", () => {
    cy.get('[type="button"]').contains('Ok').click()
})
Then("the edited profile photo should be visible", () => {
    cy.url().should('include', '/profile')
    //bug, cannot see without reloading the page
    cy.reload()
})

//Edit profile photo if there is photo
When("the user initiate update profile photo", () => {
    cy.get('[class="img-over"]').click()
    cy.get('[class="btn fs-14 mr-3 popup-btn"]').click()
    cy.get('[class="btn popup-btn"]').click()
})
When("the user submit updated profile photo", () => {

})
Then("the user can view the updated photo", () => {

})

//Edit background photo
When("the user edit the background photo", () => {
    cy.get('[class="apply-baner cursor-pointer"]').click()
    cy.get('[type="file"]').invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png')
    cy.get('[type="button"]').contains('Save').click()
})
When("the user submit the background photo", () => {
    cy.get('[type="button"]').contains('Ok').click()
})
Then("the edited background photo should be visible", () => {
    cy.url().should('include', '/profile')
    //bug, cannot see without reloading the page
    cy.reload()
})

//Edit profile
When("the user initiate the edit profile", () =>{
    cy.get('[type="button"]').contains(' Edit Profile ').click()
})

When("the user provides valid Edit profiles details", () => {
    fillFunction('fillEditProfile')
})

When("the user submits the Edit profiles form", () => {
    cy.get('[type="submit"]').contains('Update').click()
})

Then("the edited profile information should be visible", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-8 popover-custom"]').should('include.text', ' Abu Ali ')
    cy.get('[class="col-md-8 popover-custom"]').should('include.text','bio is correct and Minimum 30 characters are required')
})

//Intro
//Get to know me
When("the user initiate the Get to know me", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Intro').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Get to know me ').should('be.visible').click()
})

When("the user provides valid Get to know me details", () =>{
    fillFunction('fillGetToKnowMe')
})

When("the user submits the Get to know me form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Get to know me on profile page", () => {
    cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains(' Get to know me ').scrollIntoView().should('be.visible')
    assertDetails('getToKnowMe')
    
})

//About me - video introductory
When("the user initiate the introductory videos", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Intro').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' About Me ').should('be.visible').click()
})

When("the user provides valid introductory videos details", () => {
    fillFunction('fillIntroductoryVideo')
})

When("the user submits the introductory videos form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view introductory videos on profile page", () => {
    cy.get('[class="block-title-md p-0 d-flex"]').contains(' Introductory Videos ').scrollIntoView().should('be.visible')
})

//About
//Contact Details
When("the user initiate the Contact details", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('About').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Contact Details ').should('be.visible').click()
})

When("the user provides valid Contact details details", (dataTable) =>{
    fillFunction('fillContactDetails', dataTable);
})

When("the user submits the Contact details form", () => {
    cy.get('[type="submit"]').contains('Save').click()
})

Then("the user can view Contact details on profile page", (dataTable) => {
    assertDetails('contactDetails', dataTable )
})

//My docs
When("the user initiate the My Docs", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('About').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' My Docs ').should('be.visible').click()
})

When("the user provides valid My Docs details", (dataTable) => {
    fillFunction('fillMyDocs', dataTable)
})

When("the user close the My Docs form", () => {
    cy.get('[class="close"]').click()
    cy.get('[type="button"]').contains('Yes').click()
})

Then("the user can view My Docs on profile page", (dataTable) => {
    assertDetails('myDocs', dataTable )
})


//Background
//Education
When("the user initiate the Education", () => {

    cy.intercept('GET', 'https://auth.yuzee.click/institute/api/v1/educationSystem/undefined/undefined').as('asd')

    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]', {timeout : 10000}).contains(' Education ').should('be.visible').click()
    
    cy.wait('@asd', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})

When("the user provides valid Education details", (dataTable) => {
    fillFunction('fillSubjects', dataTable)
})

When("the user submits the Education form", () => {
   
    cy.get('[type="submit"]').contains('Save').click()

    cy.get('[type="button"]').contains('Ok').click()
})

Then("the user can view Education on profile page", () => {
     cy.get('[class="block-sec block-sec-pad pr-0 ng-star-inserted"]').contains(' Education ').scrollIntoView().should('be.visible')
})

//Work Experience
When("the user initiate the Work Experience", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Work Experience ').should('be.visible').click()

})

When("the user provides valid work experience details", () => {
    fillFunction('fillWorkExperience')
})

When("the user submits the Work Experience form", () => {
    cy.get('[type="button"]').contains('Save').click()
    cy.get('[type="button"]').contains('Ok').click()

    cy.wait('@workExpRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
})

Then("the user can view Work Experience on profile page", () => {
    assertDetails("workExperience")
})

//Work Availability
When("the user initiate the Work Availability", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Work Availability ').should('be.visible').click()

})

When("the user provides valid work availability details", (dataTable) => {
    fillFunction('fillWorkAvailability', dataTable)
})

When("the user submits the Work Availability form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Work Availability on profile page", (dataTable) => {
    assertDetails('workAvailability', dataTable)
})

//Language Qualification
When("the user initiate the Language qualification", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Language Qualification ').should('be.visible').click()
})

When("the user provides valid language qualification details", (dataTable) => {
    fillFunction('fillLanguageQualifications', dataTable)
})

When("the user submits the language qualification form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view language qualification on profile page", () => {
    cy.wait(3000)
    cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains('Language Qualification').scrollIntoView().should('be.visible')
})

//Interest
//Hobbies
When("the user initiate the Hobbies", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Interests').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Interested Hobbies ').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Hobbies details", (dataTable) => {
    fillFunction('fillHobbies', dataTable)
})

When("the user submit the Hobbies form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

When("the user submit the Hobbies form update", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view Hobbies on profile page", (dataTable) => {
    assertDetails("hobbies", dataTable);
})


//Skills
When("the user initiate the Skills", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Skills').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Skills').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Skills details", (dataTable) => {
    fillFunction('fillSkills', dataTable)
})

When("the user submit the Skills form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

When("the user submit the Skills form (update)", () => {
    cy.get('[type="button"]').contains('Update').click()
})

Then("the user can view Skills on profile page", (dataTable) => {
    assertDetails("skills", dataTable)
})

//Accomplishment
//Award and certificates
When("the user initiate the Awards and certificates", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Awards and Certificates').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Awards and certificates details", () => {
    fillFunction('fillAward')
})

When("the user submits the Awards and certificates form", () => {
    cy.get('[type="button"]').contains(' Save ').click()
    // cy.get('[type="button"]').contains('Ok').click()
    //have error, after click on the Ok button, the popup does not close
})

Then("the user can view Awards and certificates on profile page", () => {
    assertDetails("award");
})

//Publications
When("the user initiate the Publications", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Publications ').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Publications details", () => {
    fillFunction('fillPublications')
})

When("the user submits the Publications form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Publications on profile page", () => {
    assertDetails("publication");
})

//Patent
When("the user initiate the Patent", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Patents').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Patent details", () => {
    fillFunction('fillPatentDetails', null, {isIssued : true})
})

When("the user provides valid pending Patent details", () => {
    fillFunction('fillPatentDetails', null, {isIssued : false})
})

When("the user submits the Patent form", () => {
    cy.get('[type="button"]').contains('Save').should('be.visible').click()
})

Then("the user can view Patent on profile page", () => {
    assertDetails('patent')
})

//Projects
When("the user initiate the Accomplishment projects", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Projects').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Accomplishment projects details", () => {
    fillFunction('fillProjectDetails', null, {isCurrent : false})
})

When("the user provide valid currently working Accomplishment projects details", () => {
    fillFunction('fillProjectDetails', null, {isCurrent : true})
})

When("the user submits the Accomplishment projects form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Accomplishment projects on profile page", () => {
    assertDetails("project", null, false)
})

Then("the user can view currently working Accomplishment projects on profile page", () => {
    assertDetails("project", null, true)
})

//Language
When("the user initiate the Language", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Languages').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Language details", () => {
    fillFunction('fillLanguage')
})

When("the user submits the Language form", () => {
    cy.get('[type="button"]').contains('Save').should('be.visible').click()
})

Then("the user can view Language on profile page", (dataTable) => {
    assertDetails('language', dataTable);
})
