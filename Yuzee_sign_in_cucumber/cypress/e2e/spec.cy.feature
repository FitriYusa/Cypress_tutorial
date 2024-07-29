Feature: Yuzee Sign in

    Background:
    Given the user is on Yuzee homepage is open

    
    Scenario Outline: Sign in process
      When the user initiate the sign in 
      And the user provides valid sign in details
      When the user submit the sign in form
      Then the user will be in homepage
      