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

    # Skills 
      Scenario Outline: Add Skills
        Given no experience user skip onboarding is in profile page
        When the user initiate the Skills
        And the user provides valid Skills details
        | skills                                     |
        | Microsoft Access                           |
        | Microsoft Applications                     |
        | Microsoft Assessment and Planning Toolkit  |
        | Microsoft Azure                            |
        | Microsoft Backoffice                       |
        And the user submit the Skills form
        Then the user can view Skills on profile page
        | skills                                     |
        | Microsoft Access                           |
        | Microsoft Applications                     |
        | Microsoft Assessment and Planning Toolkit  |
        | Microsoft Azure                            |
        | Microsoft Backoffice                       |
        And the user add more skills
        | skills                                     |
        | Microsoft Access                           |
        | Microsoft Applications                     |
        | Microsoft Assessment and Planning Toolkit  |
        | Microsoft Azure                            |
        | Microsoft Backoffice                       |
        | ABC Analysis                               |
        And the user delete skills
        | skills                                     |
        | ABC Analysis                               |
        | Microsoft Applications                     |
        | Microsoft Assessment and Planning Toolkit  |
        | Microsoft Azure                            |
        | Microsoft Backoffice                       |