'use strict';

describe('Filter: funcParams', function () {

  // load the filter's module
  beforeEach(module('elastularApp'));

  // initialize a new instance of the filter before each test
  var funcParams;
  beforeEach(inject(function ($filter) {
    funcParams = $filter('funcParams');
  }));

  it('should return the input prefixed with "funcParams filter:"', function () {
    var text = 'angularjs';
    expect(funcParams(text)).toBe('funcParams filter: ' + text);
  });

});
