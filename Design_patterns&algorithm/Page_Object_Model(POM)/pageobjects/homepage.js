// Import the 'Key' module from 'selenium-webdriver' to work with special keys
const { Key } = require('selenium-webdriber');

// Import the 'BasePage module from '../pageobjects/basepage'
var BasePage = require( '../pageobjects/basepage');

//Define a 'HomePage' class that exttends the 'BasePage' class
Class HomePage extends BasePage {

    //Define a CSS selector for the search fields element on the page
    searchField = 'input[name-q]';

    //Method to enter a search query and press the 'Enter' key
    enter_search(searchText) {
        //This will enter text into the serach field using the 'enterTextByCss' method from the 'BasePage'
        this.enterTextByCss(this.searchField.searchText);

        //This will send the 'Enter' key to the search fields using the 'Key.RETURN' constant
        this.enterTextByCss(this.searchField, Key.RETURN);
    }
}

// Export an instance of the 'HomePage' class to make it accessible from other modules
module.exports = new HomePage();