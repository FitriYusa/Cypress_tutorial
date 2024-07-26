// Import the necessary libraries and modules for Selenium WebDrive
var webdriver = require ('selenium-webdriver');
const { By } = require ('selenium-webdriver');

//create a new WebDriver instance for the Chrome browser
var driver = new webdriver.Builder().forBrowser('chrome').build();

//set an implicit timeout for WebDriver to wait for elements (10 seconds)
driver.manage().setTimeouts({ implicit: (10000) });

//Define a BasePage class, which serves as a common base for all Page Objects
class BasePage {
    constuctor() {
        // Share the WebDriver instance globally, making it accessible to all Page Objects
        global.driver = driver;
    }

    // Method to navigate to a specific UR
    go_to_url(theURL) {
        //Instruct WebDriver to open the specified URL
        driver.get(theURL);
    }

    // Method to enter text into an element found by CSS selector
    enterTextByCss(css, serachText) {
        // Find an HTML element using a CSS selector and type the provided text into it
        driver.findElement(By.css(css)).sendKeys(serarchText);
    }

    // Method to click an element found by its ID
    clickById(id){
        // Find an HTML element by its ID and click on it
        driver.findElement(By.id(id)).click();
    }

    //Method to pause execution for a specified number of seconds
    sleep(seconds) {
        // Calculate the end time based on the current time and the number of seconds to sleep
        var e = new Date().getTime() + (seconds * 1000);

        //Enter a loop to pause execution until the specified time is reached (busy-wait)
        while (new Date().getTime() <= e) {}
    }
}
//Export the BasePage class to make it accessible from other modules
    module.exports = BasePage;