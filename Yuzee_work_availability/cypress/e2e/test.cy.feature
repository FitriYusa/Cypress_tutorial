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

    # work availability
      Scenario Outline: Add work availability
        Given no experience user skip onboarding is in profile page
        When the user initiate the Work Availability
        And the user provides valid work availability details
        | day       | startTime | endTime   |
        | Monday    | 8:00 AM   | 8:00 PM   |
        | Tuesday   | 8:00 AM   | 8:00 PM   |
        | Wednesday | 9:00 AM   | 6:00 PM   |
        | Thursday  | 10:00 AM  | 7:00 PM   |
        | Friday    | 10:00 AM  | 7:00 PM   |
        And the user submits the Work Availability form
        Then the user can view Work Availability on profile page
        | day       | time   |
        | Monday    | 8:00 AM - 8:00 PM   |
        | Tuesday   | 8:00 AM - 8:00 PM   |
        | Wednesday | 9:00 AM - 6:00 PM   |
        | Thursday  | 10:00 AM - 7:00 PM   |
        | Friday    | 10:00 AM - 7:00 PM   |
        And the user initiate edit work availability
        | day       | startTime | endTime   |
        | Monday    | 8:00 AM   | 8:00 PM   |
        | Tuesday   | 8:00 AM   | 8:00 PM   |
        | Wednesday | 8:00 AM   | 8:00 PM   |
        | Thursday  | 8:00 AM   | 8:00 PM   |
        | Friday    | 8:00 AM   | 8:00 PM   |