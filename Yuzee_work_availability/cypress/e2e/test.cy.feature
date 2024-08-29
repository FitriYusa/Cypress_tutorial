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

    # language qualification
      Scenario Outline: Add language qaulification
        Given no experience user skip onboarding is in profile page
        When the user initiate the Language qualification
        And the user provides valid language qualification details
        | Type              | scores         | file                                |
        | IELTS             | 9,9,9,9        | cypress/images/2022-05-23.png       |
        | MUET              | 5              | cypress/images/2022-05-23.png       |
        | CAE               | 230,230,230,230| cypress/images/2022-05-23.png       |
        | TOEFL             | 30,30,30,30    | cypress/images/2022-05-23.png       |
        | Cambridge English | 5              | cypress/images/2022-05-23.png       |
        And the user submits the language qualification form
        Then the user can view language qualification on profile page