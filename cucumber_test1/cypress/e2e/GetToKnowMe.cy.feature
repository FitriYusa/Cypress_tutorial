Feature: Get to Know Me

    Background: Open Get to know me
      Given the user is on the profile page
      And the user initiate Add to profile button
      And the user initiate Get to know me button
      And the user is on Get to know me form

    Scenario: Given the user is on the profile page
      When the user initiates Add to profile button 
      And the user initiate Get to know me button
      Then the user is on Get to know me form

    Scenario: Select privacy
      When the user selects preferred privacy level
      Then the user can view the privacy level displayed

    Scenario: Provide valid get to know me details
      When the user provides valid Get to know me details
      And the user submits the Get to know me form
      Then the user can view Get to know me on profile page

    Scenario: Provide valid My ideal jobs details
      When the user provides valid My ideal jobs details
      Then the user can view the My ideal jobs displayed

    Scenario: Provide valid My ideal courses details
      When the user provides valid My ideal courses details
      Then the user can view the My ideal jobs displayed

    Scenario: Maximum My ideal courses
      When the user provides maximum My ideal courses details
      Then an error message "Cannot select more than 10 courses" should be displayed

    Scenario: Provide valid My ideal fields details
      When the user provides valid My ideal fields details
      Then the user can view the My ideal fields displayed

    Scenario: My ideal fields
      When the user provides maximum My ideal fields details
      Then an error message "Cannot select more than 10 fields" should be displayed

    Scenario: Provide valid My ideal locations details
      When the user provides valid My ideal locations details
      Then the user can view the My ideal locations displayed 

    Scenario: Provide valid My reason for study details
      When the user provides valid My reason for study details
      Then the user can view the My reason for study displayed

    Scenario: Minimum My reason for study details
      When the user provides minimum My reason for study details
      Then an error message "Minimum 30 characters are required" should be displayed

    Scenario: Maximum My reason for study details
      When the user provides maximum My reason for study details
      Then an error message "Maximum 3000 characters allowed" should be displayed

    Scenario: Provide valid What are your aspirations & interests details
      When the user provides valid What are your aspirations & interests details
      Then the user can view the What are your aspirations & interests displayed

    Scenario: Minimum What are your aspirations & interests details
      When the user provides minimum What are your aspirations & interests details
      Then an error message "Minimum 30 characters are required" should be displayed

    Scenario: Maximum What are your aspirations & interests details
      When the user provides maximum What are your aspirations & interests details
      Then an error message "Maximum 220 characters allowed" should be displayed

    Scenario: Provide valid Strengths And Weaknesses details
      When the user provides valid Strengths And Weaknesses details
      Then the user can view the Strengths And Weaknesses displayed

    Scenario: Minimum Strengths And Weaknesses details
      When the user provides minimum Strengths And Weaknesses details
      Then an error message "Minimum 30 characters are required" should be displayed

    Scenario: Maximum Strengths And Weaknesses details
      When the user provides maximum Strengths And Weaknesses details
      Then an error message "Maximum 220 characters allowed" should be displayed