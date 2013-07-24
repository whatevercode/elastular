'use strict';

describe('Service: explore', function () {

  // load the service's module
  beforeEach(module('elastularApp'));

  // instantiate service
  var explore;
  beforeEach(inject(function (_explore_) {
    explore = _explore_;
  }));

  it('should do something', function () {
    expect(!!explore).toBe(true);
  });

});
