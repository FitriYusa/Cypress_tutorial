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

    # Accomplishment Language
      Scenario Outline: Add Language
        Given no experience user skip onboarding is in profile page
        When the user initiate the Language
        And the user provides valid Language details
        And the user submits the Language form
        Then the user can view Language on profile page
        | language | proficient |
        | Malay    | Native or bilingual Proficiency |
        And the user initiate edit Language
        And the user provides valid edit Language details
        And the user submit the edited Language form
        Then the user can view edited Language form
        | language | proficient |
        | English    | Native or bilingual Proficiency |
        And the user initiate delete Language
        Then the user cannot view the Language