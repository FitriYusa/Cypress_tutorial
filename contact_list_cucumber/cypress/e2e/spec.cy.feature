Feature: Sign in saucedemo

Background: 
Given the user is on Empty sign in page

  Scenario Outline: Completing Sign up process
    When the new user initiate the account creation process
    And the new user provides valid registration details
    And the user submits the registration form
    Then the user be redirect to the profile setup page