Feature: Yuzee Add work availability

    Background:
        
    Scenario Outline: Edit profiles details
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user edit profile and background image as well initiate the Edit profiles
      And the user provides valid Edit profiles details
      And the user submits the Edit profiles form
      Then the user can view Edit profiles on profile page
      
    Scenario Outline: Add Get to know me
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Get to know me
      And the user provides valid Get to know me details
      And the user submits the Get to know me form
      Then the user can view Get to know me on profile page
      
     Scenario Outline: Add introductory videos
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the introductory videos
      And the user provides valid introductory videos details
      And the user submits the introductory videos form
      Then the user can view introductory videos on profile page
      
    Scenario Outline: Add Contact details
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Contact details
      And the user provides valid Contact details details
      And the user submits the Contact details form
      Then the user can view Contact details on profile page
      
    Scenario Outline: Add My Docs
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the My Docs
      And the user provides valid My Docs details
      And the user close the My Docs form
      Then the user can view My Docs on profile page
      
     Scenario Outline: Add work experience
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Work Experience
      And the user provides valid work experience details
      And the user submits the Work Experience form
      Then the user can view Work Experience on profile page

    Scenario Outline: Add work availability
	    Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Work Availability
      And the user provides valid work availability details
      And the user submits the Work Availability form
      Then the user can view Work Availability on profile page

    Scenario Outline: Add language qaulification
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Language qualification
      And the user provides valid language qualification details
      | Type              | Reading | Writing | Listening | Speaking |
      | IELTS             | 9       | 9       | 9         | 9        |
      | CAE               | 230     | 230     | 230       | 230      |
      | TOEFL             | 30      | 30      | 30        | 30       |
      | MUET              |         |         |           |          |
      | Cambridge English |         |         |           |          |
      And the user submits the language qualification form
      Then the user can view language qualification on profile page
      
    Scenario Outline: Add Hobbies
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Hobbies
      And the user provides valid Hobbies details
      And the user submit the Hobbies form
      Then the user can view Hobbies on profile page
      
    Scenario Outline: Add Skills
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Skills
      And the user provides valid Skills details
      And the user submit the Skills form
      Then the user can view Skills on profile page
      
     Scenario Outline: Add work availability
	    Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile
      Then the user will be redirect to profile page
      When the user initiate the Accomplishment_projects
      And the user provides valid Accomplishment_projects details
      And the user submits the Accomplishment_projects form
      Then the user can view Accomplishment_projects on profile page
    