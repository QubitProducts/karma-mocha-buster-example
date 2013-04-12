define(function (require) {

  // as you can see, we can also run mocha BDD style tests

  var expect = require("chai").expect;

  var add = require("./example_module");

  describe("Example module", function () {

    it("should add numbers", function () {
      expect(add(2,5)).to.be.equal(7);
    });

  });

});