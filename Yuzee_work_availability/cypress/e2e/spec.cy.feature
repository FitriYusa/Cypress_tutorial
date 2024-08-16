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