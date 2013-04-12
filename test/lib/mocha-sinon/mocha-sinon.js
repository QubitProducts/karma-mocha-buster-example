define(function (require) {

  var _ = require("lodash");

  return function (sinon) {

    if (typeof beforeEach !== "function") {
      throw "mocha-sinon relies on mocha having been loaded.";
    }
    beforeEach(function () {
      this.sinon = sinon.sandbox.create();
      this.spy = _.bind(this.sinon.spy, this.sinon);
      this.stub = _.bind(this.sinon.stub, this.sinon);
    });

    afterEach(function () {
      this.sinon.restore();
    });
  };

});