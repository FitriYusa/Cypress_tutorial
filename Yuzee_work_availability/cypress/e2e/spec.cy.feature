Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email and submits
      Then the new user will be redirect to completeting the Onboarding
      Then the new user will be redirect to the user control center page
      When the user initiate to Go to profile

    Scenario Outline: Edit profile photo if no photo
      Given the user is in profile page
      When the user edit the profile photo
      And the user submit the profile photo
      Then the edited profile photo can be viewed

     Scenario Outline: Edit background photo if no photo
      Given the user is in profile page
      When the user edit the background photo
      And the user submit the background photo
      Then the edited background photo can be viewed

    Scenario Outline: Edit profile information
      Given the user is in profile page
      When the user initiate the edit profile
      And the user provides valid Edit profiles details
      And the user submits the Edit profiles form
      Then the edited profile information can be viewed


  