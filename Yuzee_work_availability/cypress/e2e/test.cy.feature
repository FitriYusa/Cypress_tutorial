Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email
      And the new user submits the verification code
      And the new user have no work experience skipping the onboarding process
      Then the new user will be redirect to the user control center page
      And the user initiate to Go to profile

    # About me / Introductory videos
      Scenario Outline: Add introductory videos
        Given no experience user skip onboarding is in profile page
        When the user initiate the introductory videos
        And the user provides valid introductory videos details
        And the user submits the introductory videos form
        Then the user can view introductory videos on profile page