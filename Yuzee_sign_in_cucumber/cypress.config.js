const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");


module.exports = defineConfig({
 e2e: {
   baseUrl: 'https://dev.yuzee.click/',
   specPattern: "**/*.feature",
   env: {
     MAILOSAUR_API_KEY: "" //optional
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
