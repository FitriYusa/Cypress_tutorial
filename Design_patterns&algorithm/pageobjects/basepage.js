// Import the necessary libraries and modules for Selenium WebDrive
var webdriver = require ('selenium-webdriver');
const { By } = require ('selenium-webdriver');

//create a new WebDriver instance for the Chrome browser
var driver = new webdriver.Builder().forBrowser('chrome').build();

//set an implicit timeout for WebDriver to wait for elements (10 seconds)
driver.manage().setTimeouts({ implicit: (10000) });

//Define a BasePage class, which serves as a common base for all Page Objects
class BasePage
