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
