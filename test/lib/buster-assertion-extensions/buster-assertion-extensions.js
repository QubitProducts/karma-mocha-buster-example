define(function () {
  return function (referee, sinon) {
    // ALSO extend referee with assertions found in buster-assertions
    function slice(arr, from, to) {
      return [].slice.call(arr, from, to);
    }
    function verifyFakes() {
      var method, isNot;

      for (var i = 0, l = arguments.length; i < l; ++i) {
        method = arguments[i];
        isNot = (method || "fake") + " is not ";

        if (!method) { this.fail(isNot + "a spy"); }
        if (typeof method !== "function") { this.fail(isNot + "a function"); }
        if (typeof method.getCall !== "function") { this.fail(isNot + "stubbed"); }
      }

      return true;
    }
    function formattedArgs(args, i) {
      for (var l = args.length, result = []; i < l; ++i) {
        result.push(sinon.format(args[i]));
      }

      return result.join(", ");
    }
    function spyAndCalls(spy) {
      return [spy, formattedArgs(arguments, 1), spy.printf && spy.printf("%C")];
    }

    var sf = sinon.spy.formatters;
    var spyValues = function (spy) { return [spy, sf.c(spy), sf.C(spy)]; };

    referee.add("called", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.called;
      },
      assertMessage: "Expected ${0} to be called at least once but was never called",
      refuteMessage: "Expected ${0} to not be called but was called ${1}${2}",
      expectation: "toHaveBeenCalled",
      values: spyValues
    });

    referee.add("calledWith", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.calledWith.apply(spy, slice(arguments, 1));
      },
      assertMessage: "Expected ${0} to be called with arguments ${1}${2}",
      refuteMessage: "Expected ${0} not to be called with arguments ${1}${2}",
      expectation: "toHaveBeenCalledWith",
      values: spyAndCalls
    });

    referee.add("calledOnceWith", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.calledOnce && spy.calledWith.apply(spy, slice(arguments, 1));
      },
      assertMessage: "Expected ${0} to be called once with arguments ${1}${2}",
      refuteMessage: "Expected ${0} not to be called once with arguments ${1}${2}",
      expectation: "toHaveBeenCalledOnceWith",
      values: spyAndCalls
    });

    referee.add("alwaysCalledWith", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.alwaysCalledWith.apply(spy, slice(arguments, 1));
      },
      assertMessage: "Expected ${0} to always be called with arguments ${1}${2}",
      refuteMessage: "Expected ${0} not to always be called with arguments${1}${2}",
      expectation: "toHaveAlwaysBeenCalledWith",
      values: spyAndCalls
    });

    referee.add("calledOnceWith", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.calledOnce && spy.calledWith.apply(spy, slice(arguments, 1));
      },
      assertMessage: "Expected ${0} to be called once with arguments ${1}${2}",
      refuteMessage: "Expected ${0} not to be called once with arguments ${1}${2}",
      expectation: "toHaveBeenCalledOnceWith",
      values: spyAndCalls
    });

    referee.add("calledWithExactly", {
      assert: function (spy) {
        verifyFakes.call(this, spy);
        return spy.calledWithExactly.apply(spy, slice(arguments, 1));
      },
      assertMessage: "Expected ${0} to be called with exact arguments ${1}${2}",
      refuteMessage: "Expected ${0} not to be called with exact arguments${1}${2}",
      expectation: "toHaveBeenCalledWithExactly",
      values: spyAndCalls
    });






    referee.assert.pass = function (assertion) {
      referee.emit("pass", assertion);
    };

    referee.assert.fail = function (message) {
      referee.fail(message);
    };


    function verifyIsStub() {
      var method;

      for (var i = 0, l = arguments.length; i < l; ++i) {
        method = arguments[i];

        if (!method) {
          assert.fail("fake is not a spy");
        }

        if (typeof method !== "function") {
          assert.fail(method + " is not a function");
        }

        if (typeof method.getCall !== "function") {
          assert.fail(method + " is not stubbed");
        }
      }
    }

    function failAssertion(object, msg) {
      object = object || window;
      var failMethod = object.fail || assert.fail;
      failMethod.call(object, msg);
    }

    function mirrorPropAsAssertion(name, method, message) {
      if (arguments.length === 2) {
        message = method;
        method = name;
      }

      referee.assert[name] = function (fake) {
        verifyIsStub(fake);

        var args = slice.call(arguments, 1);
        var failed = false;

        if (typeof method === "function") {
          failed = !method(fake);
        } else {
          failed = typeof fake[method] === "function" ?
              !fake[method].apply(fake, args) : !fake[method];
        }

        if (failed) {
          failAssertion(this, fake.printf.apply(fake, [message].concat(args)));
        } else {
          referee.assert.pass(name);
        }
      };
    }

    mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called");
    mirrorPropAsAssertion("notCalled", function (spy) { return !spy.called; },
                          "expected %n to not have been called but was called %c%C");
    mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C");
    mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C");
    mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C");
    mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t");
    mirrorPropAsAssertion("alwaysCalledOn", "expected %n to always be called with %1 as this but was called with %t");
    mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
    mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new");
    mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %*%C");
    mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %*%C");
    mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %*%C");
    mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %*%C");
    mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %*%C");
    mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %*%C");
    mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C");
    mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C");
    mirrorPropAsAssertion("threw", "%n did not throw exception%C");
    mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");
  };
});