define(function (require) {

  // In addition to mocha BDD style tests, we can also run all old buster tests

  var add = require("./example_module");

  buster.testCase("Example Module", {

    setUp: function () {
      this.foo = 1;

      // we can use sinon like we did in buster
      this.example = this.stub();
    },

    "it should add numbers": function () {
      // we can use referee assertions (lib used as buster assertions)
      assert.equals(add(2, 3), 5);

      // we can use buster specific assertions that combine referee+sinon
      this.example();
      assert.calledOnce(this.example);
    },

    // we can skip and rocket tests
    "// this test is skipped": function () {
      assert(false);
    }

  });

});