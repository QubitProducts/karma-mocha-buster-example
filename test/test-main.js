// get the list of tests
var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/_test\.js$/).test(file);
});

// rewrite some of the paths to work with RequireJS
tests = tests.map(function (file) {
  if (file[0] === "/") {
    file = file.substr(1);
  }
  return file
    .replace(/\.js$/, "")
    .replace(/^base\//, "");
});

require([
  "referee",
  "referee/expect",
  "sinon",
  "mocha-sinon",
  "buster-assertion-extensions"
], function (referee, expect, sinon, mochaSinon, enhanceReferee) {

  // add expect onto referee object to be consistent with assert/refute
  referee.expect = expect;

  // enhance referee assertions with sinon assertions (to better match the
  // original buster-assertions)
  enhanceReferee(referee, sinon);

  // also (optionally for better backwards compat with buster), expose
  // the referee assertion functions to global scope
  window.assert = referee.assert;
  window.refute = referee.refute;
  window.expect = referee.expect;

  // add sinon support straight into mocha
  mochaSinon(sinon);

  // now that environment is all configured, load the tests and start karma!
  require(tests, window.__karma__.start);
});
