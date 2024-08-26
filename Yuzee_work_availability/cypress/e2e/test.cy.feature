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

    # My Docs
      Scenario Outline: Add My Docs
        Given the user is in profile page
        When the user initiate the My Docs
        And the user provides valid My Docs details
        | documentType                           | filePath         |
        | Australian keypass                     | cypress/images/2022-05-23.png    |
        | Birth certificate                      | cypress/images/2022-05-23.png    |
        | Passport                               | cypress/images/2022-05-23.png    |
        | Australian citizenship certificate     | cypress/images/2022-05-23.png    |
        | Medicare card                          | cypress/images/2022-05-23.png    |
        | Driving License                        | cypress/images/2022-05-23.png    |
        | Children Check                         | cypress/images/2022-05-23.png    |
        | Police Check                           | cypress/images/2022-05-23.png    |
        | First Aid Check                        | cypress/images/2022-05-23.png    |
        | CV/Resume                              | cypress/images/2022-05-23.png    |
        And the user close the My Docs form
        Then the user can view My Docs on profile page
        | documentType                           | filePath         |
        | Australian keypass                     | 2022-05-23.png    |
        | Birth certificate                      | 2022-05-23.png    |
        | Passport                               | 2022-05-23.png    |
        | Australian citizenship certificate     | 2022-05-23.png    |
        | Medicare card                          | 2022-05-23.png    |
        | Driving License                        | 2022-05-23.png    |
        | Children Check                         | 2022-05-23.png    |
        | Police Check                           | 2022-05-23.png    |
        | First Aid Check                        | 2022-05-23.png    |
        | CV/Resume                              | 2022-05-23.png    |