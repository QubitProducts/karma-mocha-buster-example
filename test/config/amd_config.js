// Add extra AMD config for tests on top of the main app AMD config if any
require.config({

  baseUrl: "base",

  // these libs will be used in tests
  paths: {
    // samsam, bane and lodash are deps for referee
    "samsam": "test/lib/samsam/samsam",
    "bane": "test/lib/bane/bane",
    "lodash": "test/lib/lodash/lodash",

    // sinon is cool and we'll use it even in mocha tests
    "sinon": "test/lib/sinon/sinon",
    // but we need to make sure that stub and spy are attached to the context
    // like they are in buster
    "mocha-sinon": "test/lib/mocha-sinon/mocha-sinon",
    // finally, we need to tweak referee to act more like buster-assertions,
    // with all of the sinon extensions, e.g. assert.calledOnceWith
    "buster-assertion-extensions":
      "test/lib/buster-assertion-extensions/buster-assertion-extensions",

    // moving forward, we'll switch to chai assertions for the new mocha tests
    "chai": "test/lib/chai/chai"
  },
  // referee is an assertion library used in buster
  packages: [
    {name: "referee", main: "referee", location: "test/lib/referee"}
  ],

  // sinon is not and AMD module
  shim: {
    "sinon": {
      exports: "sinon"
    }
  }
});