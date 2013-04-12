# Buster.js tests on Karma

This is an example project that shows how Buster.js tests can be run in Karma + Mocha, side by side with Mocha tests (using AMD all the way).

As the number of tests grew in our project, we've experienced some stability issues with Buster.js and decided to give Karma a go. We also wanted to migrate from buster.js xunit style and buster assertions to mocha BDD style and chai assertions. The main reason for that is that chai is easy to drop in, whereas it's really hard to use buster-assertions in non buster environment, as you'll see from the setup in this project - buster uses referee, that depepnds on samsam and bane, and mixes in custom sinon integrations, etc.

This is just an example of how we've setup our test environment to enable the migration from buster to karma+mocha.

To run this rig just do

```
karma start
```

Note: if you were using Buster's BDD style, be careful, because mocha's before() hook is different than buster's before(). `buster.before === `mocha.beforeEach` - that's not something that's taken into account in this example project.