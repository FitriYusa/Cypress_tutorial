Feature: Edit profile

    Background: Open edit profile form
      Given the user is on the profile page

    Scenario: Initiate Edit profile 
      Given the user is in edit profile and wants to add "Looking for"
      When the user selects the edit profile button
      Then the user is in the edit profile form

    Scenario: Select minimum number of “Looking for”
      When the user selects one they are looking for
      Then the user can view the selected looking for displayed

    Scenario: Selecting all “Looking for” options
      When the user selects all they are looking for
      Then the user can view all of the selected looking for displayed

    Scenario: Maximum age for date of birth
      When the user selects the maximum date of birth
      Then the user can view the selected max DOB displayed

    Scenario: Minimum age for date of birth
      When the user selects the minimum date of birth
      Then the user can view the selected minimum DOB displayed

    Scenario: select above minimum age for date of birth
      When the user selects date above the minimum age
      Then an error message "User age should be greater than 13 years old" should be displayed

    Scenario: Selecting after the current date in date of birth
      When the user selects the date of birth after the current date
      Then the user should not be able to select the date

    Scenario: Select gender
      When the user selects a gender from the dropdown
      Then the user can view the selected gender displayed

    Scenario: Provide valid First and last name
      When the user provides a valid name
      Then the user can view the provided name displayed

    Scenario: Provide less than minimum First and last name character
      When the user provides a minimum character for name
      Then an error message "Minimum 2 characters are required" should be displayed

    Scenario: Provide more than maximum First and last name character
      When the user provides more than 30 characters
      Then an error message "Maximum 20 characters allowed" should be displayed

    Scenario: Provide special character for First and last name
      When the user provides more a special character
      Then an error message "Special characters are not allowed" should be displayed

    Scenario: Blank First and last name
      When the user leaves the First and last name blank
      Then an error message "This field is required" should be displayed

    Scenario: Provide valid bio details
      When the user provide valid bio details
      Then the user can view the bio detail displayed
      
    Scenario: Provide less than minimum bio character
      When the user provides less character bio detail
      Then an error message "Minimum 30 characters are required" should be displayed

    Scenario: Provide more than maximum bio character
      When the user enters a bio that exceeds the maximum character limit
      Then an error message "Maximum 220 characters allowed" should be displayed
      
    Scenario: Select Nationality
      When the user selects one of the nationality
      Then the user can view the selected nationality displayed
      
    Scenario: Select Australian Citizenship Type
      When the user selects an Australian Citizenship Type from the dropdown
      Then the user can view the selected Australian Citizenship Type displayed
      
    Scenario: Select Location
      When the user selects a location from the dropdown
      Then the user can view the selected location displayed
      
    Scenario: Provide a valid mobile number
      When the user selects a country number from the dropdown
      And the user provides a valid phone number
      Then the user can view the valid phone number displayed
      
    Scenario: Provide an invalid mobile number
      When the user selects a country number from the dropdown
      And the user provides an invalid phone number
      Then an error message "Phone number is not valid" should be displayed
      
    Scenario: Provide a valid alternative contact number
      When the user selects a country number from the dropdown
      And the user provides a valid  alternative contact number
      Then the user can view the valid phone number displayed

    Scenario: Provide an invalid alternative contact number
      When the user selects a country number from the dropdown
      And the user provides an invalid  alternative contact number
      Then an error message "Phone number is not valid" should be displayed

    Scenario: Provide an invalid alternative contact number
      When the user leaves the alternative contact number field blank
      Then an error message "This field is required" should not be displayed

    Scenario: Provide a valid alternative email
      When the user provides a valid alternative email
      Then the user can view the valid alternative email displayed

    Scenario: Provide an invalid alternative email
      When the user provides an invalid alternative email
      Then an error message "Email is invalid!" should be displayed

    Scenario: Not provide any alternative email
      When the user leaves the alternative email field blank
      Then an error message "This field is required" should not be displayed

    Scenario: Provide valid edit profiles details
      When the user initiate the edit profile
      And the user provides valid Edit profiles details
      And the user submits the Edit profiles form
      Then the edited profile information should be displayed
      