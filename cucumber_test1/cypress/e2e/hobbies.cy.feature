Feature: Hobbies

    Background: Open Hobbies
      Given the user is on the profile page
      And the user initiate Add to profile button
      And the user initiate Interested Hobbies button
      Then the user is on Interested hobbies form

    Scenario: Initiate Get to know me from add to profile button
      When the user initiates Add to profile button
      And the user initiate Interested hobbies button
      Then the user is on Interested hobbies form

    Scenario: Initiate Get to know me from explore button
      When the user initiates Interested hobbies button from Add to your profile list
      Then the user is on Interested hobbies form

    Scenario: Select privacy
      When the user selects preferred privacy level
      Then the user can view the privacy level displayed

    Scenario: Provides valid hobbies details
      When the user provides valid Hobbies details
      And the user submit the Hobbies form update
      Then the user can view Hobbies on profile page displayed

    Scenario: Delete hobbies details
      When the user initiate delete hobbies
      Then the hobby should no longer be visible