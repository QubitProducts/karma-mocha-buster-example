// Karma configuration

// list of files / patterns to load in the browser
files = [

  // MOCHA,
  // MOCHA_ADAPTER,
  // we use our own mocha.js that contains a Buster-like-UI
  'test/lib/karma/adapters/lib/mocha-with-buster-ui.js',
  // we use our own mocha.js adapter to tweak some config settings and fix some
  // bugs with test.duration being null
  'test/lib/karma/adapters/mocha.js',


  REQUIRE,
  // REQUIRE_ADAPTER,
  // we use our own tweaked require.js adapter to correct the paths when
  // looking up cache timestamps
  'test/lib/karma/adapters/require.js',


  'test/config/amd_config.js',
  'test/test-main.js',


  {pattern: '**/*.js', included: false}

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
