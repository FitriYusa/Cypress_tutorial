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
      
    Scenario Outline: Add Contact details
      Given the user is in profile page
      When the user initiate the Contact details
      And the user provides valid Contact details details
      | method    | detail               | country   | phone       |
      | WhatsApp  | 1123456789           | Malaysia  | true        |
      | WhatsApp  | 1124356789           | Malaysia  | true        |
      | Email     | yovami3872@biscoine.com |          | false       |
      | Instagram | ali_abu              |           | false       |
      | Tik Tok   | ali_abu              |           | false       |
      And the user submits the Contact details form
      Then the user can view Contact details on profile page
      
    Scenario Outline: Add My Docs
      Given the user is in profile page
      When the user initiate the My Docs
      And the user provides valid My Docs details
      | documentType        | filePath         |
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