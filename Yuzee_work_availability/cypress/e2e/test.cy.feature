Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email
      And the new user submits the verification code
      And the new user is student skipping the onboarding process
      Then the new user will be redirect to the user control center page
      And the user initiate to Go to profile

    # work experience
      Scenario Outline: Add work experience
        Given the user is student skipped onboarding is in profile page
        When the user initiate the Work Experience
        And the user provides valid work experience details
        And the user submits the Work Experience form
        Then the user can view Work Experience on profile page