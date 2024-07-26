const homepage = require ( '../pageobjects/homepage' );

describe('This is the describe block', function () {
    this.timeout(50000);
    beforeEach(function(){
        //Enter action performed before test
    });

    afterEach(function(){
        //Enter action performed after test
    });

    it('POM Test Check', function () {
        //Enter test steps
        var baseurl ='https://www.google.com.my/';

        homepage.go_to_url(baseurl);
        homepage.enter_search('QA Underground Tutorial for beginners');
    })
})