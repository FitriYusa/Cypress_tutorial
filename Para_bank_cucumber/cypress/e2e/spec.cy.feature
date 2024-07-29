Feature: Para Bank sign up

    Background:
    Given the user is on Para Bank homepage

    
    Scenario Outline: Completing Sign up process
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the sign in form
      Then the user be redirect to the homepage