import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

import {verifyOTP, selectDate, Onboarding, fillFunction, assertDetails, editDetails, deleteDetails} from '../../support/function';

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
    cy.url({ timeout: 60000 }).should('include', '/user-control-center/landing')
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
Given("the user is in home page", () => {
    cy.url({ timeout: 60000 }).should('include', '/user-control-center/landing')
})

//Education Application
//Vocational
When("the user initiate the vocational education application", () => {
    cy.get('[class="text-center pt-2 mb-3"]').contains('Education').click()
    cy.get('[class="post-title cursor-pointer mt-3"]').contains(' Vocational ').click()
})
//Undergraduate
When("the user initiate the Undergraduate education application", () => {
    cy.get('[class="text-center pt-2 mb-3"]').contains('Education').click()
    cy.get('[class="post-title cursor-pointer mt-3"]').contains(' Undergraduate ').click()
})

//direct appliction
When("the user provides valid direct application details", (dataTable) => {
    cy.url({ timeout: 60000 }).should('include', '/create-course-application/id')

    cy.get('[class="btn-content-inner"]').contains(' Direct application ').click()
    cy.get('[class="btn-content-inner"]').contains(' Create New ').click()
    cy.get('[class="btn-content-inner"]').contains(' Direct application ').click()
    cy.get('[class="btn-content-inner"]').contains(' Create New ').click()
    cy.wait(5000)

    cy.get('[class="pl-18 img-content-width ng-star-inserted"]').contains('Ali Abu').click()

    fillFunction('fillVocational', dataTable, { applicationType: 'direct-application' })
})
When("the user submits the direct application form", () => {
    cy.wait(5000)
    cy.contains('button', 'Submit').click()
})
Then("the user can view the direct application application", () => {
    cy.wait(5000)
    cy.contains('button', 'Go to my Applications ').click()
    cy.get('[class="sec-block-pad section-bg"]')
        .should('be.visible')
    cy.get('[class="default-content-list"]')
        .should('contain.text', 'Angular Js')
        .and('contain.text', 'Australian National University')
        .and('contain.text', 'Jan 2025')
        .and('contain.text', 'FULL_TIME')
        .and('contain.text', 'ONLINE')
        .and('contain.text', 'Campbellfield, Victoria, Australia')
})

//mulitple offer
When("the user provides valid mulitple offer details" , (dataTable) => {
    cy.url({ timeout: 60000 }).should('include', '/create-course-application/id')

    cy.get('[class="btn-content-inner"]').contains('Receive multiple offers').click()
    cy.get('[class="btn-content-inner"]').contains(' Create New ').click()
    cy.get('[class="btn-content-inner"]').contains('Receive multiple offers').click()
    cy.get('[class="btn-content-inner"]').contains(' Create New ').click()
    cy.wait(5000)

    cy.get('[class="pl-18 img-content-width ng-star-inserted"]').contains('Ali Abu').click()
    fillFunction('fillVocational', dataTable, { applicationType: 'multiple-offer' })
})
When("the user submits the mulitple offer form", () => {

})
Then("the user can view the mulitple offer application", () => {

})

//
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
When("the user initiate edit Get to know me", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()

})
When("the user provides valid edit Get to know me details", () => {
    editDetails('getToKnowMe')
})
When("the user submit the edited Get to know me form", () => {
    cy.get('[type="button"]').contains('Save').click()
})
Then("the user can view edited Get to know me form", () => {
    cy.get('[class="mt-3 ng-star-inserted"]')
    .should('contain.text', 'Actor')
    .and('contain.text', 'Bachlor in Visual Communication')
    .and('contain.text', 'Education')
    .and('contain.text', 'Kuala Lumpur');
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
    cy.get('[class="block-title-md p-0 d-flex"]',{timeout : 60000}).contains(' Introductory Videos ').scrollIntoView().should('be.visible')
    cy.get('[class="pr-1 wrap-txt-double fs-13 fw-500 desc-w"]',{timeout : 60000}).should('contain.text', 'Video Title') 
})
When("the user initiate edit introductory videos", () => {
    cy.get('[class="dropdown-toggle border-0 btn btn-dots img-hover"]')
        .click()
        .get('[class="dropdown-item"]')
        .contains('Edit')
        .click()
})
When("the user provides valid edit introductory videos details", () => {
    editDetails('introductoryVideos')    
})
When("the user submit the edited introductory videos form", () => {
    cy.get('[type="button"]').contains('Update').click()    
})
Then("the user can view edited introductory videos", () => {
    cy.get('[class="pr-1 wrap-txt-double fs-13 fw-500 desc-w"]',{timeout : 60000}).should('contain.text', 'New Video Title')

    cy.get('[class="cursor-pointer h-owl"]').click()
    cy.get('[class="pt-4"]').should('contain.text', 'New description. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')    
})
When("the user initiate delete introductory videos", () => {
    deleteDetails('introductoryVideos')
})
Then("the user cannot view the introductory videos", () => {    
    cy.get('[class="about-video video-width vid-shadow"]').should('not.exist')
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
//edit
When("the user initiate edit Contact details", () => {
    cy.get('[class="btn edit-blue-btn ml-auto ng-star-inserted"]').click()    
})
When("the user provides valid edit Contact details", () => {
    cy.get('[type="text"]', {timeout : 10000}).eq(6).clear().type('aasd_123');    
})
When("the user submit the edited Contact details form", () => {
    cy.get('[type="submit"]').contains('Update').click()    
    cy.wait(5000)
})
Then("the user can view edited Contact details", () => {
    cy.get('[class="detail-section ng-star-inserted"]')
    .should('contain.text', 'Instagram')
    .and('contain.text', 'aasd_123');    
})
//delete
Then("the user initiate delete one Contact details", () => {
    cy.get('[class="btn edit-blue-btn ml-auto ng-star-inserted"]').click()
    cy.get('.row')
    .find('.select-txt')     // Locate the element with the text 'Email'
    .contains('Email')        // Ensure it contains the text 'Email'
    .parents('.row')          // Go back up to the parent '.row'
    .find('.ico-w-12')        // Find the button with the class 'ico-w-12'
    .click();                 // Click the button

    cy.get('[type="submit"]').contains('Update').click()
    cy.wait(5000)
})
When("the user cannot view the deleted Contact Details", () => {
    cy.get('[class="detail-section ng-star-inserted"]', {timeout : 10000}).should('not.contain.text', 'yovami3872@biscoine.com')
})
Then("the user initiate delete Contact details", () => {
    cy.get('[class="btn edit-blue-btn ml-auto ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
When("the user cannot view the Contact details", () => {
    cy.get('[class="detail-section ng-star-inserted"]').should('not.exist')       
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
Then("the user can view My Docs on profile page", (dataTable) => {
    cy.get('[class="close"]').click()
    cy.get('[type="button"]').contains('Yes').click()

    assertDetails('myDocs', dataTable )
})
When("the user initiate edit My Docs", () => {
    cy.get('[class="btn btn-dots edit-blue-btn ml-auto ng-star-inserted"]').scrollIntoView().click()
})
When("the user provides valid edit My Docs details", (dataTable) => {
    editDetails('myDocs', dataTable)
    cy.wait(5000)  
})
Then("the user can view edited My Docs", (dataTable) => {
    cy.get('[class="close"]').click()
    cy.get('[type="button"]').contains('Yes').click()

    assertDetails('myDocs', dataTable )
})
When("the user initiate delete My Docs", (dataTable) => {
    cy.get('[class="btn btn-dots edit-blue-btn ml-auto ng-star-inserted"]').scrollIntoView().click()

    dataTable.hashes().forEach((row) => {
        cy.get('[class="menu-div"]').contains(row.documentType).click();
        cy.get('[class="txt-button btn border-0 btn-remove ng-star-inserted"]').contains(' Delete ').click()

        cy.get('[type="button"]', { timeout: 10000 }).contains('Yes').click();
    })
})
Then("the user cannot view the My Docs", () => {
    cy.get('[class="close"]').click()
    cy.get('[type="button"]').contains('Yes').click()

    cy.get('[class="doc-list ng-star-inserted"]').should('not.exist')
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
    fillFunction('fillEducation', dataTable)
})
When("the user submits the Education form", () => {
   
    cy.get('[type="submit"]').contains('Save').click()

    cy.get('[type="button"]',{timeout : 10000}).contains('Ok').click()
})
Then("the user can view Education on profile page", () => {
    cy.get('[class="block-sec block-sec-pad pr-0 ng-star-inserted"]').contains(' Education ').scrollIntoView().should('be.visible')

    cy.get('[type="button"]').contains(' See more ').click()
    cy.get('[class="post-title"]')
        .should('contain.text', ' Diploma In Infomation Technology ')
        .and('contain.text', 'Australian National University')
        .and('contain.text', 'Campbellfield')
        .and('contain.text', 'Mar/2022')
        .and('contain.text', 'Nov/2025')
        .and('contain.text', 'CGPA: 3.5')
    
    cy.wait(5000)
    cy.get('[class="close"]').click()
})
//edit
When("the user initiate edit education", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Education details", () => {
    editDetails('education')
})
When("the user submit the edited Education form", () => {
    cy.get('[type="button"]').contains('Update').click()    
    cy.get('[type="button"]').contains('Ok').click()    
})
Then("the user can view edited Education", () => {
    cy.get('[type="button"]').contains(' See more ').click()
    cy.get('[class="suggestion-block ng-star-inserted"]').should('not.contain.text', 'English')
    
    cy.get('[class="cus-list-pipe pl-0 list-unstyled"]').should('not.contain.text', 'Online')
    cy.get('[class="cus-list-pipe pl-0 list-unstyled"]').should('contain.text', 'Classroom')
})
//delete
When("the user initiate delete Education", () => {
    cy.get('[class="close"]').click()
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Education", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Education')
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
//edit
When("the user initiate edit Work Experience", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Work Experience details", () => {
    editDetails('workExperience')
})
When("the user submit the edited Work Experience form", () => {
    cy.get('[type="button"]').contains('Update').click()
    cy.get('[type="button"]').contains('Ok').click()    
})
Then("the user can view edited Work Experience", () => {
    cy.get('[type="button"]').contains(' See more ').click()
    cy.get('[class="block-title-md mb-3 p-0 d-flex mar-r"]').should('contain.text', ' Work Experience ')
    cy.get('[class="post-title"]')
        .should('contain.text', ' Computer And Information Research Scientist ')
        .and('contain.text', 'Eztek Software')
        .and('contain.text', '21/Mar/2020')
        .and('contain.text', '21/Mar/2024')
        .and('contain.text', 'New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
})
//delete
When("the user initiate delete Work Experience", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Work Experience", () => {
    cy.get('[class="post-title"]')
        .contains('Computer And Information Research Scientist')
        .should('not.exist')
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
//edit
When("the user initiate edit work availability", () => {
    // cy.get('[class="work-row"]').contains('Internship').scrollIntoView().click()
    cy.get('[class="common-scroll-bar pr-21"]')
        .parent()
        .find('[class="ico-w-14"]')
        .click()
})
When("the user provides valid edit work availability details", (dataTable) => {
    editDetails('workAvailability', dataTable)
})
When("the user submit the edited work availability form", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view edited work availability", (dataTable) => {
    dataTable.hashes().forEach((row) => {
      cy.get('[class="common-scroll-bar pr-21"]')
      .should('contain.text', 'Unemployed')
      .and('contain.text', '30 Km')
      .and('contain.text', '3')
      .and('contain.text', 'Month')
      .and('contain.text', 'Full_time')
      .and('contain.text', row.day)
      .and('contain.text', row.time)
    })
})
//delete
When("the user initiate delete work availability", () => {
    cy.get('[class="common-scroll-bar pr-21"]')
        .parent()
        .find('[class="ico-w-14"]')
        .click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the work availability", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text',' Work Availability ')
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
Then("the user can view language qualification on profile page", (dataTable) => {
    cy.wait(3000)
    cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains('Language Qualification').scrollIntoView().should('be.visible')

    dataTable.hashes().forEach((row) => {
        cy.get('[class="col-6 text-align ng-star-inserted"]').should('contain.text', row.Type)
        cy.get('[class="col-6 align-end"]').should('contain.text', row.scores)
    })
})
//edit
When("the user initiate edit language qualification", () => {
    cy.get('[class="btn btn-dots mr-0 edit-blue-btn edit-btn ng-star-inserted"]').click()
})
When("the user provides valid edit language qualification details", () => {
    for(let i =2; i<6 ;i++){
        cy.get('[role="combobox"]').eq(i).click();
        cy.get('[role="option"]').contains(/^8$/).click();
    }
    cy.get(`[id^="over_all_marks_1"]`).clear().type('6')
    cy.get(`[id^="over_all_marks_4"]`).clear().type('6')
})
When("the user submit the edited language qualification form", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view edited language qualification", (dataTable) => {
        dataTable.hashes().forEach((row) => {
        cy.get('[class="col-6 text-align ng-star-inserted"]').should('contain.text', row.Type)
        cy.get('[class="col-6 align-end"]').should('contain.text', row.scores)
    })
})
//delete
When("the user initiate delete language qualification", () => {
    cy.get('[class="btn btn-dots mr-0 edit-blue-btn edit-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')    
})
Then("the user cannot view the language qualification", () => [
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text',' Language Qualification ')
])

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
//add hobbies
When("the user add more hobbies", (dataTable) => {
    editDetails('addHobbies', dataTable)
})
//delete hobbies
When("the user delete hobbies", (dataTable) => {
    cy.get('[class="btn btn-dots mr-0 edit-blue-btn ng-star-inserted"]').click()

    cy.get('[class="ng-value ng-star-inserted"]')
        .contains('Historic Walking Areas')
        .parent()
        .find('[class="ng-value-icon right ng-star-inserted"]')
        .click()
        cy.get('[type="button"]').contains('Update').click()

    assertDetails("hobbies", dataTable)

    cy.get('[class="btn btn-dots mr-0 edit-blue-btn ng-star-inserted"]').click()
    
    deleteDetails('deleteFunction')

    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Hobbies')

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
//add skills
When("the user add more skills", (dataTable) => {
    editDetails('addSkills', dataTable)
})
//delete skills
When("the user delete skills", (dataTable) => {
    cy.get('[class="block-sec block-sec-pad pr-0 ng-star-inserted"]')
    .parent()
    .find('[class="btn btn-dots mr-0 edit-blue-btn ng-star-inserted"]')
    .click()

    cy.get('[class="ng-value ng-star-inserted"]')
        .contains(' Microsoft Access ')
        .parent()
        .find('[class="ng-value-icon"]')
        .click()
        cy.get('[type="button"]').contains('Update').click()

    cy.get('[class="block-sec block-sec-pad pr-0 ng-star-inserted"]').contains('Skills').scrollIntoView().should('be.visible')
    dataTable.hashes().forEach(detail => {
        //class="suggestion-block ng-star-inserted"
        cy.get('[class="mb-4"]')
        .should('contain.text', detail.skills);
    });
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
//edit
When("the user initiate edit award", () => {
    //edit button
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit awards and certificates details", () => {
    editDetails('award')
})
When("the user submit the edited award and certificates form", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view edited award and certificates form", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Awards and Certificates').click()
    cy.get('[class="acc-content-block"]')
      .should('contain.text', 'New Awards')
      .and('contain.text', 'Aston University, Aston Street, Birmingham, UK')
      .and('contain.text', '15/Aug/2020')
      .and('contain.text', 'New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
})
//delete
When("the user initiate delete award", () => {
    //edit button
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the award", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Accomplishments')
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
//edit
When("the user initiate edit publications", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Publications details", () => {
    editDetails('publication')
})
When("the user submit the edited Publications form", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view edited Publications form", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Publication').click()
    cy.get('[class="acc-content-block"]')
      .should('contain.text', 'New Awards')
      .and('contain.text', 'Aston University, Aston Street, Birmingham, UK')
      .and('contain.text', '16/Aug/2020')
      .and('contain.text', 'New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
})
//delete
When("the user initiate delete Publications", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Publication", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Publication')
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
//edit
When("the user initiate edit patent", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Patent details", () => {
    cy.get('[name="privacy_level"]').click();
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
  
    cy.get('[id="title"]').clear().type('New Patent Title');
    cy.get('[name="citizenship"]').click();
    cy.get('[role="option"]').contains('Malaysia').scrollIntoView().click();
  
    cy.get('[id="Patent Pending"]').click();
    cy.get('[id="application_number"]').type('62112333');

    cy.get('[placeholder="Select a date"]').click();
    selectDate('Aug', '2020', '14');
    cy.get('[id="pat_url"]').clear().type('Newfastr.com');
    cy.get('[id="description"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
  
    cy.get('[name="collaborations"]').type('adam');
    cy.get('[role="option"]').contains('Adam John').click();
  
    cy.contains('Description').click();
  
    cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png');
})
When("the user submit the edited Patent form", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view edited Patent", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Patent').click()
    cy.get('[class="acc-content-block"]')
        .should('contain.text', 'New Patent Title')
        .and('contain.text', 'Application Number: 62112333')
        .and('contain.text', '14/Aug/2020')
        .and('contain.text', 'New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
})
//delete
When("the user initiate delete Patent", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Patent", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Patent')
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
//edit
When("the user initiate edit Accomplishment project", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Accomplishment project details", () => {
    cy.get('[name="privacy_level"]').click();
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click();
    
    cy.get('[id="title"]').clear().type('New Project Juliet');
    cy.get('[name="projectUrl"]').clear().type('https://example.com');

    cy.get('[name="start_date"]').click();
    selectDate('Jul', '2024', '2');
      
    cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click();
    
    cy.get('[name="details"]').clear().type('New description is correct. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');

    cy.get('[name="collaborations"]').type('Adam');
    cy.get('[role="option"]').contains('Adam John').click();
    cy.get('[class="ng-star-inserted"]').contains('labels.Other Contributors').click();

    cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg');
})
When("the user submit the edited Accomplishment project form", () => {
    cy.get('[type="button"]').contains('Update').click()  
})

Then("the user can view edited Accomplishment project form", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Project').click()

    cy.get('[class="acc-content-block"]')
        .should('contain.text', 'Project Juliet')
        .and('contain.text', '02/Jul/2024')
        .and('contain.text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
        .and('contain.text', 'Present')    
})
When("the user initiate delete Accomplishment project", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Accomplishment project", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Project')

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
//edit
When("the user initiate edit Language", (   ) => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
})
When("the user provides valid edit Language details", () => {
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[formcontrolname="title"]').click()
    cy.get('[role="option"]').contains('English').scrollIntoView().click()

    cy.get('[formcontrolname="language_proficiency_type"]').click()
    cy.get('[role="option"]').contains('Native or bilingual Proficiency').should('be.visible').click()

    cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
})
When("the user submit the edited Language form", () => {
    cy.get('[type="button"]').contains('Update').click() 
})
Then("the user can view edited Language form", (dataTable) => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Language').click()
    dataTable.hashes().forEach(row => {
      cy.get('[class="acc-content-block"]')
        .should('contain.text', row.language)
        .and('contain.text', row.proficient);
    });    
})
//delete
When("the user initiate delete Language", () => {
    cy.get('[class="btn btn-dots ml-auto edit-blue-btn ng-star-inserted"]').click()
    deleteDetails('deleteFunction')
})
Then("the user cannot view the Language", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').should('not.contain.text','Langauge')
})