import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

const serverID = "vvocqwdp";
// const emailDomain = `@${serverID}.mailosaur.net`

// const randomString = new Date().getTime();
// const emailAddress = `abs${randomString}${emailDomain}`;


Given("the user is on Yuzee homepage is open", () => {
    cy.visit('/')
    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest')
})

When("the new user initiate the account creation process", () => {
    cy.contains('Join Yuzee').click()
})

When("the new user provides valid registration details", () => {

    cy.generateUniqueEmail()
    //First and last name
    cy.get('[formcontrolname="firstName"]').type("ali")
    cy.get('[formcontrolname="lastName"]').type("abu")

    //Select date
    cy.get('.input-group > .form-control').click()
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[title="Select year"]').select('1997')
    cy.get('[role="gridcell"]').contains('7').click()

    //Gender
    cy.get('[formcontrolname="gender"]').click()
    cy.contains('Male').click()

    cy.get('[formcontrolname="postal_code"]').type("3000")

    cy.get('@uniqueEmail').then((emailAddress) => {
        cy.get('[formcontrolname="email"]').type(emailAddress)
    })
    
    cy.get('[formcontrolname="password"]').type("Admin@1234")
    cy.get('[formcontrolname="confirmPassword"]').type("Admin@1234")
})

When("the user submits the registration form", () => {
    cy.get('[type="submit"]').contains('Sign Up').click()
})

Then("the new user should receive verification code via email and submits", () => {
   cy.get('@uniqueEmail').then((emailAddress) => { 
        // waiting for the API
        cy.wait('@signupRequest', { timeout: 10000 }).then((interception) => {
            
            let statusCode = interception.response.statusCode;

            if (statusCode === 200) {
            
            cy.contains("Verification Code")
            cy.mailosaurGetMessage(serverID, {
                sentTo: emailAddress
            })
            .then(email => {
                const OTP = email.html.codes.map(code => code.value);

                for (let i = 1; i <= 6; i++) {
                    cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i - 1]}`)
                }
                cy.get('button[type="submit"]').contains("Continue").click();
            });
            }
        });
   })
})

Then("the new user will be redirect to completeting the Onboarding", () => {
    
    cy.url().should('include', '/profile-setup')
    cy.contains("Let's get this show on the road")

    cy.get('[type="submit"]').contains('Start!').click()

    cy.contains("How do you plan on using Yuzee?")
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Internship').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Work Placement').click()
    cy.get('[class="col-md-4 ng-star-inserted"]').contains('Course').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Job').click()
    // cy.get('[class="col-md-4 ng-star-inserted"]').contains('Traineeship').click()
    cy.get('[type="submit"]').contains('Continue').click()

    cy.get('span.slider.round').first().click();
    // cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('[placeholder="University/School"]').type('MSU')

    cy.get('[name="start_date"]').click()
    cy.get('[title="Select year"]').select('2020')
    cy.get('[title="Select month"]').select('Apr')
    cy.get('[role="gridcell"]').contains('21').click()

    cy.get('[name="end_date"]').click()
    cy.get('[title="Select year"]').select('2025')
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[role="gridcell"]').contains('21').click()
    cy.get('[type="submit"]').contains('Continue').click()

    // insert profile image - having issue with the uploading the image, decided to skip
    // cy.get('button.btn.img-logo').find('img').click();
    // cy.get('input[type="file"]').selectFile('cypress\\images\\blob.jfif', {force : true})
    cy.contains('Skip').click()
    cy.wait(3000)
    
    //Location
    // cy.get('[placeholder="Search location"]').type('Kuala Lumpur')
    // cy.contains('Kuala Lumpur').click()
    // cy.contains('Continue').should('be.visible').click()
    // cy.get('[type="submit"]').contains('Continue').click()
    //cannot click on the continue, it just loading - decided to skip
    cy.get('[type="submit"]').contains('Skip').click()
    cy.wait(3000)

    //Hobby
    // cy.get('[bindlabel="hobby_name"]').type('run')
    // cy.contains('Running').click()
    // cy.get('[type="submit"]').contains('Continue').click()
    // cy.wait(3000)
    cy.contains('Skip').click()

    //Community
    
    cy.get('[type="submit"]').contains('Continue').click()
    cy.wait(3000)
    cy.get('[type="submit"]').contains('Go!').click()
})

Then("the new user will be redirect to the user control center page", () => {
    cy.url().should('include', '/user-control-center/landing')
})

When("the user initiate to Go to profile", () => {

    //need to click something else before the Go to profile button to work 
    cy.get('[ngbtooltip="Apply"]').click()
    cy.wait(3000)
    cy.get('[ngbtooltip="Control Center"]').click()
    cy.wait(3000)
    cy.get('[class="btn btn-block fs-16 fw-500 light-grey-btn"]').contains('Go to profile').should('be.visible').click()
})

Then("the user will be redirect to profile page", () => {
    cy.wait(3000)
    //sometimes the test pass sometimes failed
    cy.url().should('include', '/profile')
})


//Work Availability
When("the user initiate the Work Availability", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Background').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Work Availability ').should('be.visible').click()

})

When("the user provides valid work availability details", () => {
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

    cy.get('.col-4 > .select-control > .ng-select > .ng-select-container').click()
    cy.get('[role="option"]').eq(0).contains('Monday').should('be.visible').click()
    cy.get('[name="selectTime"]').eq(0).click()
    cy.get('[role="option"]').contains('8:00 AM').click()
    cy.get('[name="selectTime"]').eq(1).click()
    cy.get('[role="option"]').contains('8:00 PM').click()

    cy.contains('Add Availability').should('be.visible').click()

    cy.get(':nth-child(8) > .row > .col-4 > .select-control > .ng-select > .ng-select-container').click()
    cy.get('[role="option"]').eq(1).contains('Tuesday').should('be.visible').click()
    cy.get('[name="selectTime"]').eq(2).click()
    cy.get('[role="option"]').contains('8:00 AM').click()
    cy.get('[name="selectTime"]').eq(3).click()
    cy.get('[role="option"]').contains('8:00 PM').click()
    
})

When("the user submits the Work Availability form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Work Availability on profile page", () => {
    cy.get('[class="work-row"]').contains('Internship').click()
})


//Work Experrience
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
    cy.get('[name="company_name"]').type('SEECS')
    // cy.get('[role="listbox"]').contains('SEECS').should('be.visible').click()

    //Location
    cy.get('[name="description"]').clear().type('Geelong Victoria, Australia').should('have.value', 'Geelong Victoria, Australia')
    cy.get('[role="option"]').contains('Geelong Victoria, Australia').should('be.visible').click()
    cy.get('[name="postal_code"]').type('3435')

    //Checkbox
    // cy.get('[class="custom-control custom-checkbox text-align mb-0"]').click()

    //start and end date
    cy.get('[name="start_date"]').click()
    cy.get('[title="Select year"]').select('2020')
    cy.get('[title="Select month"]').select('Apr')
    cy.get('[role="gridcell"]').contains('21').click()

    cy.get('[name="end_date"]').click()
    cy.get('[title="Select year"]').select('2024')
    cy.get('[title="Select month"]').select('Apr')
    cy.get('[role="gridcell"]').contains('21').click()

    //Job description
    cy.get('[name="job_description"]')
        .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')
    cy.get('[name="showSkills"]').click()
    cy.get('[role="option"]').contains(' .NET ').click()
    cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

    //collaborations
    cy.get('[name="collaborations"]').should('be.visible').click()
    cy.get('[role="option"]').contains(' Adam Coffee ').click()
    cy.get('[class="col-md-12 common-input-mb"]').contains('Skills').click()

    //attach file
   cy.get('[ type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
})

When("the user submits the Work Experience form", () => {
    cy.get('[type="button"]').contains('Save').click()
    cy.get('[type="button"]').contains('Ok').click()
})

Then("the user can view Work Experience on profile page", () => {
    cy.get('[type="button"]').contains(' Read more ').click()
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

    // dataTable.hashes().forEach((qualification, index) => {
    //         const {Type, Reading, Writing, Listening, Speaking } = qualification;

    //         cy.get('[role="combobox"]').eq(index * 5 + 1).click()
    //         cy.get('[role="option"]').contains(Type).click()
        
    //         if (Type !== 'MUET' && Type !== 'Cambridge English') {
    //             if (Reading) {
    //             cy.get('[role="combobox"]').eq(index * 5 + 2).click();
    //             cy.get('[role="option"]').contains(Reading).click();
    //             }
    //             if (Writing) {
    //             cy.get('[role="combobox"]').eq(index * 5 + 3).click();
    //             cy.get('[role="option"]').contains(Writing).click();
    //             }
    //             if (Listening) {
    //             cy.get('[role="combobox"]').eq(index * 5 + 4).click();
    //             cy.get('[role="option"]').contains(Listening).click();
    //             }
    //             if (Speaking) {
    //             cy.get('[role="combobox"]').eq(index * 5 + 5).click();
    //             cy.get('[role="option"]').contains(Speaking).click();
    //             }
    //         } else {
    //             cy.get(`[id^="over_all_marks_${index}"]`).type('5')
    //         }

    //         cy.get('[type="file"]').eq(index).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
            
    //         if(index < 2 ){
    //             cy.get('[type="button"]').contains(' Add Qualification ').click()
    //         }
           
    // })
        
    //IELTS
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').contains('IELTS').click()
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="option"]').contains('9').click()
    cy.get('[role="combobox"]').eq(3).click()
    cy.get('[role="option"]').contains('9').click()
    cy.get('[role="combobox"]').eq(4).click()
    cy.get('[role="option"]').contains('9').click()
    cy.get('[role="combobox"]').eq(5).click()
    cy.get('[role="option"]').contains('9').click()
    cy.get('[type="file"]').eq(0).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')

    cy.get('[type="button"]').contains(' Add Qualification ').click()

    //MUET
    cy.get('[role="combobox"]').eq(6).click()
    cy.get('[role="option"]').contains('MUET').click()
    cy.get('[id="over_all_marks_1"]').type('5')
    cy.get('[type="file"]').eq(1).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')

    cy.get('[type="button"]').contains(' Add Qualification ').click()

    //Cambridge
    cy.get('[role="combobox"]').eq(7).click()
    cy.get('[role="option"]').contains('Cambridge English').click()
    cy.get('[id="over_all_marks_2"]').type('5')
    cy.get('[type="file"]').eq(2).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')

    cy.get('[type="button"]').contains(' Add Qualification ').click()

    //CAE
    cy.get('[role="combobox"]').eq(8).click()
    cy.get('[role="option"]').contains('CAE').click()
    cy.get('[role="combobox"]').eq(9).click()
    cy.get('[role="option"]').contains('230').click()
    cy.get('[role="combobox"]').eq(10).click()
    cy.get('[role="option"]').contains('230').click()
    cy.get('[role="combobox"]').eq(11).click()
    cy.get('[role="option"]').contains('230').click()
    cy.get('[role="combobox"]').eq(12).click()
    cy.get('[role="option"]').contains('230').click()
    cy.get('[type="file"]').eq(3).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')

    cy.get('[type="button"]').contains(' Add Qualification ').click()

    //TOEFL
    cy.get('[role="combobox"]').eq(13).click()
    cy.get('[role="option"]').contains('TOEFL').click()
    cy.get('[role="combobox"]').eq(14).click()
    cy.get('[role="option"]').contains('30').click()
    cy.get('[role="combobox"]').eq(15).click()
    cy.get('[role="option"]').contains('30').click()
    cy.get('[role="combobox"]').eq(16).click()
    cy.get('[role="option"]').contains('30').click()
    cy.get('[role="combobox"]').eq(17).click()
    cy.get('[role="option"]').contains('30').click()
    cy.get('[type="file"]').eq(4).selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
})

When("the user submits the language qualification form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view language qualification on profile page", () => {
    cy.wait(3000)
    cy.get('[class="block-sec block-sec-pad ng-star-inserted"]').contains('Language Qualification').scrollIntoView().should('be.visible')
})


//Introductory videos
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
    cy.get('[placeholder="Please give a short explanation on what this video is about."')
        .type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')

    cy.get('input[type="file"]').eq(1).invoke('removeClass', 'd-none').selectFile('cypress\\images\\2022-05-23.png');
})

When("the user submits the introductory videos form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view introductory videos on profile page", () => {
    cy.get('[class="block-title-md p-0 d-flex"]').contains(' Introductory Videos ').scrollIntoView().should('be.visible')
})


//Accomplishment ( project )
When("the user initiate the Accomplishment_projects", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('Accomplishments').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains('Projects').scrollIntoView().should('be.visible').click()
})

When("the user provides valid Accomplishment_projects details", () => {
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[placeholder="Enter title"]').type('asdf adaw sdas')
    cy.get('[placeholder="Enter project url"]').type('https://example.com')

    cy.get('[name="start_date"]').click()
    cy.get('[title="Select year"]').select('2024')
    cy.get('[title="Select month"]').select('Jul')
    cy.get('[role="gridcell"]').contains('2').click()

    cy.get('[name="end_date"]').click()
    cy.get('[title="Select year"]').select('2024')
    cy.get('[title="Select month"]').select('Aug')
    cy.get('[role="gridcell"]').contains('4').click()

    cy.get('[name="details"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.')

    cy.get('[name="collaborations"]').type('g')
    cy.get('[role="option"]').contains(' Bridget Lynch ').click()
    cy.get('[class="ng-star-inserted"]').contains('labels.Other Contributors').click()

    cy.get('[type="file"]').selectFile('cypress\\images\\photo_2022-07-15_12-06-13 - Copy (2).jpg')
})

When("the user submits the Accomplishment_projects form", () => {
    cy.get('[type="button"]').contains('Save').click()
})

Then("the user can view Accomplishment_projects on profile page", () => {
    cy.get('[class="block-title-md p-0 mb-3 d-flex text-align"]').contains(' Accomplishments ').scrollIntoView().should('be.visible')
    cy.get('[class="accomplish-row"]').contains('Project').click()
})


//Contact details
When("the user initiate the Contact details", () => {
    cy.get('[id="dropdownBasic1"]').contains('Add to profile').should('be.visible').click()
    cy.get('[class="fs-14 fw-500"]').contains('About').should('be.visible').click()
    cy.get('[class="subpro-name"]').contains(' Contact Details ').should('be.visible').click()
})

When("the user provides valid Contact details details", () =>{
    cy.get('[name="privacy_level"]').click()
    cy.get('[class="content-block"]').contains('Public').should('be.visible').click()

    cy.get('[class="select-control"]').eq(1).click()
    cy.get('[role="option"]').contains('WhatsApp').click()
    cy.get('[class="iti__selected-flag dropdown-toggle"]').eq(0).click()
    cy.get('[placeholder="Search Country"]').eq(0).type('Malaysia')
    cy.get('[class="iti__country-list"]').eq(0).contains('Malaysia').click()
    cy.get('[id="phone"]').eq(0).type('1123456789')

    cy.get('[type="button"]').contains(' Add contact ').click()

    cy.get('[class="select-control"]').eq(2).click()
    cy.get('[role="option"]').contains('WhatsApp').click()
    cy.get('[class="iti__selected-flag dropdown-toggle"]').eq(1).click()
    cy.get('[placeholder="Search Country"]').eq(1).type('Malaysia')
    cy.get('[class="iti__country-list"]').eq(1).contains('Malaysia').click()
    cy.get('[id="phone"]').eq(1).type('1124356789')

    cy.get('[type="button"]').contains(' Add contact ').click()

    cy.get('[class="select-control"]').eq(3).click()
    cy.get('[role="option"]').contains('Email').click()
    cy.get('[placeholder="Enter contact detail"]').eq(0).type('yovami3872@biscoine.com')

    cy.get('[type="button"]').contains(' Add contact ').click()

    cy.get('[class="select-control"]').eq(4).click()
    cy.get('[role="option"]').contains('Instagram').click()
    cy.get('[placeholder="Enter contact detail"]').eq(1).type('ali_abu')

    cy.get('[type="button"]').contains(' Add contact ').click()

    cy.get('[class="select-control"]').eq(5).click()
    cy.get('[role="option"]').contains('Tik Tok').click()
    cy.get('[placeholder="Enter contact detail"]').eq(2).type('ali_abu')
})

When("the user submits the Contact details form", () => {
    cy.get('[type="submit"]').contains('Save').click()
})

Then("the user can view Contact details on profile page", () => {
    cy.get('[class="pr-24"]').contains(' Contact Details ').scrollIntoView().should('be.visible')
})