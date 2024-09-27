Feature: About me

    Background: Open About me form
      Given the user is on the profile page

    Scenario: Initiate about me from Add to profile button
      When the user initiate Add to profile button
      And the user initiate About me button
      Then the user is on About me form displayed

    Scenario: initiate about me from introductory button
      When the user initiate About me button
      Then the user is on About me form displayed

    Scenario: Provides valid about me details
      Given the user is on About Me and provide valid About Me details
      When the user provides valid introductory videos details
      And the user submits the introductory videos form
      Then the user can view introductory videos on profile page

    Scenario: Provides small size about me video
      Given the user is on About Me and provide small size About Me video
      When the user provides a small size introductory video
      Then an error message "File duration is too small. Please choose a larger file." should be displayed
      
    Scenario: Provides big size of about me video
      Given the user is on About Me and provide big size About Me video
      When the user provides a big size introductory video
      Then an error message "should be less then 240mb" should be displayed

    Scenario: Select privacy
      Given the user is on About Me and want to select privacy
      When the user selects preferred privacy level
      Then the user can view the privacy level displayed

    Scenario: Blank Title of about me video
      Given the user is on About Me and have blank Title
      When the user leaves the Title introductory video blank
      Then an error message "This field is required" should be displayed

    Scenario: Provides minimum Title of about me video
      Given the user is on About Me and provide min Title
      When the user provides a minimum Title introductory video
      Then an error message "Minimum 2 characters are required" should be displayed

    Scenario: Provides maximum Title of about me video
      Given the user is on About Me and provide max Title
      When the user provides a maximum Title introductory video
      Then an error message "Maximum 100 characters allowed" should be displayed

    Scenario: Blank short explanation of about me video
      Given the user is on About Me and have blank Short Explanation
      When the user leaves the Title introductory video blank
      Then an error message "This field is required" should be displayed

    Scenario: Provides minimum short explanation of about me video
      Given the user is on About Me and provide min Short Explanation
      When the user provides a minimum Title introductory video
      Then an error message "Minimum 30 characters are required" should be displayed

    Scenario: Provides maximum short explanation of about me video
      Given the user is on About Me and provide max Short Explanation
      When the user provides a maximum Title introductory video
      Then an error message "Maximum 220 characters allowed" should be displayed

    Scenario: Provides small size of cover photo
      Given the user is on About Me and provide small size of Cover Photo
      When the user provides a small size of cover photo
      Then an error message "File size is too small. Please choose a larger file." should be displayed

    Scenario: Provides different types of file for cover photo
      Given the user is on About Me and provide different types of file Cover Photo
      When the user provides a different types of file for cover photo
      Then an error message "Allowed file types: .png,.jpeg,.jpg,.webp,.bmp" should be displayed