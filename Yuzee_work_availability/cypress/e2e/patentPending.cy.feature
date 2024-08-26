Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email
      And the new user submits the verification code
      And the new user will be redirect to completing the Onboarding
      Then the new user will be redirect to the user control center page
      And the user initiate to Go to profile

     # Patent
      Scenario Outline: Add Patent
        Given the user is in profile page 
        When the user initiate the Patent
        And the user provides valid pending Patent details
        And the user submits the Patent form
        Then the user can view Patent on profile page