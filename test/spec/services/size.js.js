'use strict';

describe('Service: SizeJs', function () {

  // load the service's module
  beforeEach(module('dubidubaApp'));

  // instantiate service
  var SizeJs;
  beforeEach(inject(function (_SizeJs_) {
    SizeJs = _SizeJs_;
  }));

  it('should do something', function () {
    expect(!!SizeJs).toBe(true);
  });

});
