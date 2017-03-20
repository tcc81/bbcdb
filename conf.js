// An example configuration file.

//import failFast from 'protractor-fail-fast';

exports.config = {
  //plugins: [  failFast.init(),  ],
  // Capabilities to be passed to the webdriver instance.
  capabilities: {'browserName': 'chrome'},
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',
  //local webdriver server
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Spec file
   specs: ['bbhk_testsuite.js'],
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
	  showColors : true,
	  defaultTimeoutInterval: 30000
	  },
  onPrepare: function () {	
         browser.ignoreSynchronization = true;
      }
	  
};