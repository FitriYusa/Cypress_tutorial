const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");


module.exports = defineConfig({
 e2e: {
   baseUrl: 'https://env3.yuzee.click',
   specPattern: "**/*.feature",
   env: {
     MAILOSAUR_API_KEY: "xURp09fCK65YF4m3HelcRWRSuIp9heZu", //optional
   },
   async setupNodeEvents(on, config) {
     await addCucumberPreprocessorPlugin(on, config);
     on(
       "file:preprocessor",
       createBundler({
         plugins: [createEsbuildPlugin(config)],
       })
     );
     return config;
   },
 },
});
