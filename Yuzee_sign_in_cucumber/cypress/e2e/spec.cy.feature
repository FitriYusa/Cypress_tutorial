Feature: Yuzee Create Institution

    Background:
      Given the user is on Yuzee homepage is open

    
    Scenario Outline: Create Institution process
      
      When the user initiate the sign in 
      And the user provides valid sign in details
        | email                                      |
        | abs1722237343963@vvocqwdp.mailosaur.net    |
      And the user submit the sign in form
      Then the user will be in homepage
      
      Given the user initiate the insitution
      And the user provides valid information details
      When the user submit the application


      Given the user initiate the education
      When the user provides valid application details
        | institute                           | course                                              | intake                       |
        | Aust Link Pty Ltd                   | Certificate III Civil Construction Plant Operations | February 2024 - January 2025 |
        | Aust Link Pty Ltd                   | Certificate III Civil Construction Plant Operations | July 2024 - July 2025        |
        | Aust Link Pty Ltd                   | Certificate III Driving Operationsa                 | January 2024 - December 2024 |
        | Australian National University      | Angular Js                                          | January 2025                 |
        | Australian National University      | React Js                                            | January 2025                 |
        | Australian National University      | React Js                                            |  June 2025                   |