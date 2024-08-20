Feature: Yuzee user profile components

    Background:
      Given the user is on Yuzee homepage is open
      When the new user initiate the account creation process
      And the new user provides valid registration details
      And the user submits the registration form
      Then the new user should receive verification code via email
      And the new user submits the verification code
      And the new user will be redirect to completing the Onboarding
      Then the new user will be redirect to the user control center page
      And the user initiate to Go to profile

    # Edit profile photo ig there are no profile photo in the beginning
      Scenario Outline: Edit profile photo if no photo exist
        Given the user is in profile page
        When the user edit the profile photo
        And the user submit the profile photo
        Then the edited profile photo should be visible

    # Background photo
      Scenario Outline: Edit background photo
        Given the user is in profile page
        And the user edit the background photo
        And the user submit the background photo
        Then the edited background photo should be visible

    # Edit profile
      Scenario Outline: Edit profile information
        Given the user is in profile page
        When the user initiate the edit profile
        And the user provides valid Edit profiles details
        And the user submits the Edit profiles form
        Then the edited profile information should be visible

    # Get to know me
      Scenario Outline: Add Get to know me
        Given the user is in profile page
        When the user initiate the Get to know me
        And the user provides valid Get to know me details
        And the user submits the Get to know me form
        Then the user can view Get to know me on profile page

    # About me / Introductory videos
      Scenario Outline: Add introductory videos
        Given the user is in profile page
        When the user initiate the introductory videos
        And the user provides valid introductory videos details
        And the user submits the introductory videos form
        Then the user can view introductory videos on profile page

    # Contact details
      Scenario Outline: Add Contact details
        Given the user is in profile page
        When the user initiate the Contact details
        And the user provides valid Contact details details
        | method    | detail                            | country   | phone       |
        | Phone     | 1123456789                        | Malaysia  | true        |
        | WhatsApp  | 1124356789                        | Malaysia  | true        |
        | Email     | yovami3872@biscoine.com           |           | false       |
        | Instagram | ali_abu                           |           | false       |
        | Tik Tok   | ali_abu                           |           | false       |
        And the user submits the Contact details form
        Then the user can view Contact details on profile page
    
    # My Docs
      Scenario Outline: Add My Docs
        Given the user is in profile page
        When the user initiate the My Docs
        And the user provides valid My Docs details
        | documentType        | filePath         |
        | Australian keypass                     | cypress/images/2022-05-23.png    |
        | Birth certificate                      | cypress/images/2022-05-23.png    |
        | Passport                               | cypress/images/2022-05-23.png    |
        | Australian citizenship certificate     | cypress/images/2022-05-23.png    |
        | Medicare card                          | cypress/images/2022-05-23.png    |
        | Driving License                        | cypress/images/2022-05-23.png    |
        | Children Check                         | cypress/images/2022-05-23.png    |
        | Police Check                           | cypress/images/2022-05-23.png    |
        | First Aid Check                        | cypress/images/2022-05-23.png    |
        | CV/Resume                              | cypress/images/2022-05-23.png    |
        And the user close the My Docs form
        Then the user can view My Docs on profile page

    # Education
      Scenario Outline: Add Education
        Given the user is in profile page
        When the user initiate the Education
        And the user provides valid Education details
        | subjects       | grade |
        | Communications | A     |
        | OOP            | A     |
        | HTML           | A     |
        | Business       | A     |
        | JS             | A     |
        | Economics      | A     |
        | Physics        | B     |
        | Chemistry      | A     |
        | Literature     | B     |
        | Art            | A     |
        And the user submits the Education form
        Then the user can view Education on profile page

    # work experience
      Scenario Outline: Add work experience
        Given the user is in profile page
        When the user initiate the Work Experience
        And the user provides valid work experience details
        And the user submits the Work Experience form
        Then the user can view Work Experience on profile page

    # work availability
      Scenario Outline: Add work availability
        Given the user is in profile page
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

    # language qualification
      Scenario Outline: Add language qaulification
        Given the user is in profile page
        When the user initiate the Language qualification
        And the user provides valid language qualification details
        | Type              | scores         | file                                |
        | IELTS             | 9,9,9,9        | cypress/images/2022-05-23.png       |
        | MUET              | 5              | cypress/images/2022-05-23.png       |
        | CAE               | 230,230,230,230| cypress/images/2022-05-23.png       |
        | TOEFL             | 30,30,30,30    | cypress/images/2022-05-23.png       |
        | Cambridge English | 5              | cypress/images/2022-05-23.png       |
        And the user submits the language qualification form
        Then the user can view language qualification on profile page

    # Hobbies
      Scenario Outline: Add Hobbies
        Given the user is in profile page 
        When the user initiate the Hobbies
        And the user provides valid Hobbies details
        | hobbies                 |
        | Baseball                |
        | Fashion Shows & Tours   |
        | Historic Walking Areas  |
        | Squash                  |
        And the user submit the Hobbies form
        Then the user can view Hobbies on profile page

    # Skills 
      Scenario Outline: Add Skills
        Given the user is in profile page 
        When the user initiate the Skills
        And the user provides valid Skills details
        | skills                                     |
        | Microsoft Access                           |
        | Microsoft Applications                     |
        | Microsoft Assessment and Planning Toolkit  |
        | Microsoft Azure                            |
        | Microsoft Backoffice                       |
        And the user submit the Skills form
        Then the user can view Skills on profile page

    # Award and certificate
      Scenario Outline: Add Award and certificates
        Given the user is in profile page 
        When the user initiate the Awards and certificates
        And the user provides valid Awards and certificates details
        And the user submits the Awards and certificates form
        Then the user can view Awards and certificates on profile page

    # Publications
      Scenario Outline: Add Publications
        Given the user is in profile page
        When the user initiate the Publications
        And the user provides valid Publications details
        And the user submits the Publications form
        Then the user can view Publications on profile page

    # Patent
      Scenario Outline: Add Patent
        Given the user is in profile page 
        When the user initiate the Patent
        And the user provides valid Patent details
        And the user submits the Patent form
        Then the user can view Patent on profile page

    # Projects
      Scenario Outline: Add projects
        Given the user is in profile page
        When the user initiate the Accomplishment projects
        And the user provides valid Accomplishment projects details
        And the user submits the Accomplishment projects form
        Then the user can view Accomplishment projects on profile page

    # Accomplishment Language
      Scenario Outline: Add Language
        Given the user is in profile page
        When the user initiate the Language
        And the user provides valid Language details
        And the user submits the Language form
        Then the user can view Language on profile page