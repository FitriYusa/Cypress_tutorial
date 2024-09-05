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

    # My Docs
      Scenario Outline: Add My Docs
        Given no experience user skip onboarding is in profile page  
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
	      And the user initiate edit My Docs
        And the user provides valid edit My Docs details
        | documentType                           | filePath         |
        | Australian keypass                     | cypress/images/pexels-alex-andrews-271121-2295744.jpg    |
        | Birth certificate                      | cypress/images/pexels-alex-andrews-271121-2295744.jpg   |
        | Passport                               | cypress/images/pexels-alex-andrews-271121-2295744.jpg   |
        | Australian citizenship certificate     | cypress/images/pexels-alex-andrews-271121-2295744.jpg    |
        | Medicare card                          | cypress/images/pexels-alex-andrews-271121-2295744.jpg    |
        | Driving License                        | cypress/images/pexels-alex-andrews-271121-2295744.jpg   |
        | Children Check                         | cypress/images/pexels-alex-andrews-271121-2295744.jpg    |
        | Police Check                           | cypress/images/pexels-alex-andrews-271121-2295744.jpg   |
        | First Aid Check                        | cypress/images/pexels-alex-andrews-271121-2295744.jpg  |
        | CV/Resume                              | cypress/images/pexels-alex-andrews-271121-2295744.jpg   |
        Then the user can view edited My Docs
        | documentType                           | filePath         |
        | Australian keypass                     | pexels-alex-andrews-271121-2295744.jpg    |
        | Birth certificate                      | pexels-alex-andrews-271121-2295744.jpg    |
        | Passport                               | pexels-alex-andrews-271121-2295744.jpg    |
        | Australian citizenship certificate     | pexels-alex-andrews-271121-2295744.jpg    |
        | Medicare card                          | pexels-alex-andrews-271121-2295744.jpg    |
        | Driving License                        | pexels-alex-andrews-271121-2295744.jpg    |
        | Children Check                         | pexels-alex-andrews-271121-2295744.jpg    |
        | Police Check                           | pexels-alex-andrews-271121-2295744.jpg    |
        | First Aid Check                        | pexels-alex-andrews-271121-2295744.jpg    |
        | CV/Resume                              | pexels-alex-andrews-271121-2295744.jpg    |
        And the user initiate delete My Docs
        | documentType                           |
        | Australian keypass                     |
        | Birth certificate                      |
        | Passport                               |
        | Australian citizenship certificate     |
        | Medicare card                          | 
        | Driving License                        |
        | Children Check                         |
        | Police Check                           |
        | First Aid Check                        |
        | CV/Resume                              |
        Then the user cannot view the My Docs