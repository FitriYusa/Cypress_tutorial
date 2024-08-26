import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

import { fillRegistration,
              verifyOTP,
              completeOnboarding,
              selectDate,
              fillSubjects,
              fillContactDetails,
              fillMyDocs,
              fillDaysAvailable,
              uploadQualifications,
              fillHobbies,
              fillSkills,
              fillProjectDetails,
              fillPatentDetails,
              assertDetails
             } from '../../support/function';

// const serverID = "vvocqwdp";
// const emailDomain = `@${serverID}.mailosaur.net`

// const randomString = new Date().getTime();
// const emailAddress = `abs${randomString}${emailDomain}`;


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
    fillRegistration()
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

When("the new user will be redirect to completing the Onboarding", () => {
    completeOnboarding();
})

When("the new user will skip the onboarding process", () => {
    completeOnboarding(true);
})

//user home page and user profile page
Then("the new user will be redirect to the user control center page", () => {
    cy.url({ timeout: 10000 }).should('include', '/user-control-center/landing')
})

When("the user initiate to Go to profile", () => {

    //need to click something else before the Go to profile button to work 
    // cy.get('[ngbtooltip="Apply"]').click()
    // cy.wait(3000)
    // cy.get('[ngbtooltip="Control Center"]').click()
    // cy.wait(3000)
    // cy.get('[class="btn btn-block fs-16 fw-500 light-grey-btn"]').contains('Go to profile').should('be.visible').click()

    cy.get('[class="nav-item d-none-from-me"]').click()
    cy.get('[class="setting-item ml-0 ng-star-inserted"]').click()

})

Given("the user skip onboarding is in profile page", () => {
    cy.url().should('include', '/profile')
})


Given("the user is in profile page", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-4"]').contains('Kuala Lumpur,').scrollIntoView().should('be.visible')
    cy.get('[class="col-md-4"]').contains('Australian National University').scrollIntoView().should('be.visible')
    cy.get('[class="suggestion-block ng-star-inserted"]').contains('Running Tours').should('be.visible')
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

    cy.get('.select-control > .ng-select-container > .ng-value-container').click()
    cy.get('[role="option"]').contains('Job').click()

    cy.get('[placeholder="Select a date"]').click()
    selectDate('Jul', '1997', '6');

    cy.get('[name="gender"]').click()
    cy.get('[role="option"]').contains('Male')

    cy.get('[name="firstName"]').clear().type('Abu')
    cy.get('[name="lastName"]').clear().type('Ali')

    cy.get('[name="aboutMe"]').type('bio is correct and Minimum 30 characters are required')

    cy.get('[name="citizenship"]').click()
    cy.get('[role="listbox"]').scrollIntoView().contains('Malaysia').click()

    //location
    cy.get('[name="description"]', { timeout: 10000 }).type('Kuala Lumpur')
    cy.get('[role="option"]').contains('Kuala Lumpur').click()
    cy.get('[name="postalCode"]').clear().type('3432')
})

When("the user submits the Edit profiles form", () => {
    cy.get('[type="submit"]').contains('Update').click()
})

Then("the edited profile information should be visible", () => {
    cy.url().should('include', '/profile')
    cy.get('[class="col-md-8"]').should('include.text', ' Abu Ali ')
    cy.get('[class="col-md-8"]').should('include.text','bio is correct and Minimum 30 characters are required')
})


//Intro
//Get to know me
When("the user initiate the Get to know me", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Intro').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Get to know me ').should('be.visible').click()
})

When("the user provides valid Get to know me details", () =>{
    cy.get('[name="jobs"]').type(' Accountant ')
    cy.get('[role="option"]').contains('Accountant').click()
    cy.contains('My ideal jobs').click()

    cy.get('[name="courses"]').type('beauty')
    cy.get('[role="option"]').contains(' Diploma of Beauty Therapy ').click()
    cy.contains('My ideal jobs').click()

    cy.get('[name="fields"]').click()
    cy.get('[role="option"]').contains(' Foundation ').click()
    cy.contains('My ideal jobs').click()

    cy.get('[name="searchVal"]', { timeout: 10000 }).type('Kuala Lumpur')
    cy.get('[role="option"]').contains('Kuala Lumpur').click()

    cy.get('[name="reason"]').type('Asdasdf fsadf asfda dfwqda sdcasd')
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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
    cy.get('input[type="file"]').eq(0).invoke('removeClass', 'd-none').selectFile('cypress/images/3209828-uhd_3840_2160_25fps.mp4')
    
    cy.get('[name="title"]').type('asdkmndlf asdasd')
    cy.get('[id="description"').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')

    cy.get('input[type="file"]').eq(1).invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png');
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
    fillContactDetails(dataTable);
})

When("the user submits the Contact details form", () => {
    cy.get('[type="submit"]').contains('Save').click()
})

Then("the user can view Contact details on profile page", (dataTable) => {
    cy.get('[class="pr-24"]').contains(' Contact Details ').scrollIntoView().should('be.visible')
    assertDetails('contactDetails', dataTable )
})

//My docs
When("the user initiate the My Docs", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('About').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' My Docs ').should('be.visible').click()
})

When("the user provides valid My Docs details", (dataTable) => {
    fillMyDocs(dataTable);
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
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Education ').should('be.visible').click()
})

When("the user provides valid Education details", (dataTable) => {
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[name="education_title"]').click()
    cy.get('[role="option"]').contains('Diploma').click()

    cy.get('[name="institute_name"]').clear().type('Australian National University')
    cy.get('[role="option"]').contains('Australian National University').click()

    //location
    // cy.get('[name="description"]').type('Cyberjaya')
    // cy.get('[role="option"]').contains('Cyberjaya').click()
    // cy.get('[name="postal_code"]').type('43300')

    cy.get('[name="course_name"]').type('Diploma in Infomation Technology')

    cy.get('[name="examType"]').click() 
    cy.get('[role="option"]').contains(' Malay ').click()
    // cy.get('[role="option"]').contains(' English ').click()
    cy.get('[role="option"]').contains(' Korean ').click()

    cy.contains('Study Language').click()
    cy.get('[name="studyMode"]').click()
    cy.get('[role="option"]').contains('Online').click()

    cy.get('[name="start_date"]').click()
    selectDate('Mar', '2022', '22');

    cy.get('[name="end_date"]').click()
    selectDate('Nov', '2025', '22');

    cy.get('[name="system"]').click()
    cy.get('[role="option"]').contains('C-GPA (out of 5)').scrollIntoView().should('be.visible').click()
    cy.get('[name="cgpa"]').type('3.5')

    cy.get('[class="slider round"]').click()
    cy.get('[id="type_0"]').click()
    cy.get('[role="option"]').contains('Semester').should('be.visible').click()

    fillSubjects(dataTable);

    cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    //Job title
    cy.get('[name="job_title"]').type('Accountant')
    cy.get('[role="option"]').contains('Accountant').should('be.visible').click()

    //Job type
    cy.get('[name="preferredWorkTypes"]').click();
    cy.get('[role="option"]').contains('Internship').should('be.visible').click();

    //Company name
    cy.get('[name="company_name"]').type('Australian Company')
    cy.get('[role="listbox"]').contains('Australian Company').should('be.visible').click()

    //Location
    // cy.get('[name="description"]').clear().type('Geelong Victoria, Australia').should('have.value', 'Geelong Victoria, Australia')
    // cy.get('[role="option"]').contains('Geelong Victoria, Australia').should('be.visible').click()
    // cy.get('[name="postal_code"]').type('3435')

    //Checkbox
    // cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click()

    //start and end date
    cy.get('[name="start_date"]').click()
    selectDate('Apr', '2020', '21');

    cy.get('[name="end_date"]').click()
    selectDate('Apr', '2024', '21');
    
    //Job description
    cy.get('[name="job_description"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
    cy.get('[name="showSkills"]').click()
    cy.get('[role="option"]').contains(' .NET ').click()
    cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

    //collaborations
    cy.get('[name="collaborations"]').should('be.visible').click()
    cy.get('[role="option"]').contains(' Abu Ali ').click()
    cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

    //attach file
    cy.get('[ type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
})

When("the user submits the Work Experience form", () => {
    cy.get('[type="button"]').contains('Save').click()
    cy.get('[type="button"]').contains('Ok').click()

    cy.wait('@workExpRequest', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
})

Then("the user can view Work Experience on profile page", () => {
    cy.get('[type="button"]').contains(' Read more ').click()
})

//Work Availability
When("the user initiate the Work Availability", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Work Availability ').should('be.visible').click()

})

When("the user provides valid work availability details", (dataTable) => {
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[name="preferredWorkTypes"]').click();
    cy.get('[role="option"]').contains('Internship').should('be.visible').click();
    
    cy.get('[name="work_status"]').click()
    cy.contains('Unemployed').should('be.visible').click()

    cy.get('[name="distance"]').type('30')

    cy.get('[name="duration"]').type('3')

    cy.get('[name="duration_type"]').click()
    cy.contains('month(s)').click()

    cy.get('[name="workTypes"]').click()
    cy.contains('Full-Time').click()

    fillDaysAvailable (dataTable)
})

When("the user submits the Work Availability form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Work Availability on profile page", () => {
    cy.get('[class="work-row"]').contains('Internship').scrollIntoView().click()
})

//Language Qualification
When("the user initiate the Language qualification", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Language Qualification ').should('be.visible').click()
})

When("the user provides valid language qualification details", (dataTable) => {
    
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()
    uploadQualifications(dataTable)
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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[name="hobbies"]').type('as')
    fillHobbies(dataTable);
   
    cy.contains('Tell us your hobbies').click()
})

When("the user submit the Hobbies form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

When("the user submit the Hobbies form update", () => {
    cy.get('[type="button"]').contains('Update').click()
})
Then("the user can view Hobbies on profile page", (dataTable) => {
    cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains(' Interested Hobbies ').scrollIntoView().should('be.visible')
    assertDetails("hobbies", dataTable);
})


//Skills
When("the user initiate the Skills", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Skills').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Skills').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Skills details", (dataTable) => {
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[name="skills"]').type('microsoft')
    fillSkills(dataTable)

    cy.get('[class="col-md-12 common-input-mb"]').contains('Skills and Endorsement').click()

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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[id="title"]').type('Awards')
    cy.get('[name="name"]').type('as')
    cy.contains('Aston University').click()

    cy.get('[placeholder="Select a date"]').click()
    selectDate('Aug', '2020', '6');

    cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
    cy.get('[name="collaborations"]').type(' Australian National University ')
    cy.get('[role="option"]').contains(' Australian National University ').click()
    cy.contains('Associated with').click()

    cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[id="title"]').type('Firecracker Award')
    cy.get('[name="publication"]').type('as')
    cy.get('[role="option"]').contains('Aston University').click()
    cy.get('[name="publicUrl"]').type('mass.com')

    cy.get('[placeholder="Select a date"]').click()
    selectDate('Aug', '2020', '6');

    cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')

    cy.get('[name="collaborations"]').type('adam')
    cy.get('[role="option"]').contains(' Adam Cof ').click()
    cy.contains('Other Authors').click()

    cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
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
    fillPatentDetails(true)
})

When("the user provides valid pending Patent details", () => {
    fillPatentDetails(false)
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
    fillProjectDetails(false);
})

When("the user provide valid currently working Accomplishment projects details", () => {
    fillProjectDetails(true);
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
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[formcontrolname="title"]').click()
    cy.get('[role="option"]').contains('Malay').scrollIntoView().click()

    cy.get('[formcontrolname="language_proficiency_type"]').click()
    cy.get('[role="option"]').contains('Native or bilingual Proficiency').should('be.visible').click()

    cy.get('[type="file"]').selectFile('cypress\\images\\2022-05-23.png')
})

When("the user submits the Language form", () => {
    cy.get('[type="button"]').contains('Save').should('be.visible').click()
})

Then("the user can view Language on profile page", (dataTable) => {
    assertDetails('language', dataTable);
})
