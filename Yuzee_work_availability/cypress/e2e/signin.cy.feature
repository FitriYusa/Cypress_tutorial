Feature: Yuzee sign in

  Background:
    Given the user is on Yuzee homepage is open

  Scenario Outline: Create Institution process
    When the user initiate the sign in 
    And the user provides valid sign in details
    | email                                  |
    | abs1722237343963@vvocqwdp.mailosaur.net       |
    And the user submit the sign in form
    Then the new user will be redirect to the user control center page
