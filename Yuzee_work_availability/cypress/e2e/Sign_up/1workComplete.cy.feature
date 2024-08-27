Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email
      And the new user submits the verification code
      And the new user have work experience completing the onboarding
      Then the new user will be redirect to the user control center page
      And the user initiate to Go to profile

    # Hobbies
      Scenario Outline: Add Hobbies
        Given the user work complete onboarding is in profile page
        When the user initiate the Hobbies
        And the user provides valid Hobbies details
        | hobbies                 |
        | Baseball                |
        | Fashion Shows & Tours   |
        | Historic Walking Areas  |
        | Squash                  |
        And the user submit the Hobbies form update
        Then the user can view Hobbies on profile page
        | hobbies                 |
        | Baseball                |
        | Fashion Shows & Tours   |
        | Historic Walking Areas  |
        | Squash                  |