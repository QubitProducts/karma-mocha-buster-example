(function(window) {

var formatError = function(error) {
  var stack = error.stack;
  var message = error.message;

  if (stack) {
    var firstLine = stack.substring(0, stack.indexOf('\n'));
    if (message && firstLine.indexOf(message) === -1) {
      stack = message + '\n' + stack;
    }

    // remove mocha stack entries
    stack = stack.replace(/\n.+\/adapters\/mocha.js\?\d*\:.+(?=(\n|$))/g, '');
    stack = stack.replace(/\n.+mocha-with-buster-ui.js\?\d*\:.+(?=(\n|$))/g, '');

    return stack;
  }

  return message;
};


var createMochaReporterConstructor = function(tc) {

  // TODO(vojta): error formatting
  return function(runner) {
    // runner events
    // - start
    // - end
    // - suite
    // - suite end
    // - test
    // - test end
    // - pass
    // - fail

    runner.on('start', function() {
      tc.info({total: runner.total});
    });

    runner.on('end', function() {
      tc.complete({
        coverage: window.__coverage__
      });
    });

    runner.on('test', function(test) {
      test.$errors = [];
    });

    runner.on('fail', function(test, error) {
      if ('hook' === test.type || error.uncaught) {
        test.$errors = [formatError(error)];
        runner.emit('test end', test);
      } else {
        test.$errors.push(formatError(error));
      }
    });

    runner.on('test end', function(test) {
      var result = {
        id: '',
        description: test.title,
        suite: [],
        success: test.state === 'passed',
        skipped: test.pending === true,
        time: test.duration || 0,
        log: test.$errors || []
      };

      var pointer = test.parent;
      while (!pointer.root) {
        result.suite.unshift(pointer.title);
        pointer = pointer.parent;
      }

      tc.result(result);
    });
  };
};


var createMochaStartFn = function(mocha) {
  return function(config) {
    mocha.run();
  };
};

var createDumpFn = function(tc, serialize) {
  return function() {

    var args = Array.prototype.slice.call(arguments, 0);

    if (serialize) {
      for (var i = 0; i < args.length; i++) {
        args[i] = serialize(args[i]);
      }
    }

    tc.info({dump: args});
  };
};


window.__karma__.start = createMochaStartFn(window.mocha);
window.dump = createDumpFn(window.__karma__, function(value) {
  return window.angular && window.angular.mock && window.angular.mock.dump(value) || value;
});
window.mocha.setup({
  reporter: createMochaReporterConstructor(window.__karma__),
  ui: 'bdd',
  globals: ['__cov*', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval']
});

})(window);
