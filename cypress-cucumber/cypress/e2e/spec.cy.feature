Feature: Yuzee Sign up

    Background:
    Given the new user is on Yuzee homepage is open

    
    Scenario Outline: Completing Sign up process
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the user should receive verification code via email and submit
      Then the user be redirect to the profile setup page
