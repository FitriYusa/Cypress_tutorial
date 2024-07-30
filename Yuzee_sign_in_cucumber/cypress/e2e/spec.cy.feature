Feature: Yuzee Create Institution

    Background:
      Given the user is on Yuzee homepage is open

    
    Scenario Outline: Create Institution process
      
      When the user initiate the sign in 
      And the user provides valid sign in details
      And the user submit the sign in form
      Then the user will be in homepage
      When the user initiate the insitution
      And the user provides valid information details
      When the user submit the application