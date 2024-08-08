Feature: Yuzee Add work availability

    Background:
    Given the user is on Yuzee homepage is open

    Scenario Outline: Add work availability
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

    Scenario Outline: Add language
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
      