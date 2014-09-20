var expect = require('expect.js'),
    services = require('..');

describe('services', function() {
  it('should say hello', function(done) {
    expect(services()).to.equal('Hello, world');
    done();
  });
});
