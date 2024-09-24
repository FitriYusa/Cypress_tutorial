Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open

    Scenario: Sign up
        When the new user initiate the account creation process
        And the new user provides valid registration details
        And the user submits the registration form
        Then the new user should receive verification code via email
        And the new user submits the verification code