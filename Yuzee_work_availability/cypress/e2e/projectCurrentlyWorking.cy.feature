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

    # Projects
      Scenario Outline: Add projects currently working
        Given the user is in profile page
        When the user initiate the Accomplishment projects
        And the user provide valid currently working Accomplishment projects details
        And the user submits the Accomplishment projects form
        Then the user can view currently working Accomplishment projects on profile page

    # Projects
      Scenario Outline: Add projects
        Given the user is in profile page
        When the user initiate the Accomplishment projects
        And the user provides valid Accomplishment projects details
        And the user submits the Accomplishment projects form
        Then the user can view Accomplishment projects on profile page