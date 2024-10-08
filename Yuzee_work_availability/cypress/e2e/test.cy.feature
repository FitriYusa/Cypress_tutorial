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

    #RPL
      Scenario Outline: Add RPL direct offer application
        Given the user is in apply page
        When the user initiate the RPL application
        When the user provides valid RPL direct offer details
        | subjects       | grade |  documentType                           | filePath         |
        | Communications | A     |  Australian keypass                     | cypress/images/2022-05-23.png    |
        | OOP            | A     |  Birth certificate                      | cypress/images/2022-05-23.png    |
        | HTML           | A     |  Passport                               | cypress/images/2022-05-23.png    |
        | Business       | A     |  Australian citizenship certificate     | cypress/images/2022-05-23.png    |
        | JS             | A     |  Medicare card                          | cypress/images/2022-05-23.png    |
        | Economics      | A     |  Driving License                        | cypress/images/2022-05-23.png    |
        | Physics        | B     |  Children Check                         | cypress/images/2022-05-23.png    |
        | Chemistry      | A     |  Police Check                           | cypress/images/2022-05-23.png    |
        | Literature     | B     |  First Aid Check                        | cypress/images/2022-05-23.png    |
        | Art            | A     |  CV/Resume                              | cypress/images/2022-05-23.png    |
        And the user submits the RPL form
        Then the user can view the RPL direct offer
