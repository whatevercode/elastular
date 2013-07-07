'use strict';

describe('Controller: ExplorCtrl', function () {

  // load the controller's module
  beforeEach(module('elastularApp'));

  var ExplorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExplorCtrl = $controller('ExplorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
