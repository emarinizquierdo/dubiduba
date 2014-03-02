'use strict';

describe('Service: Maininfo', function () {

  // load the service's module
  beforeEach(module('dubidubaApp'));

  // instantiate service
  var Maininfo;
  beforeEach(inject(function (_Maininfo_) {
    Maininfo = _Maininfo_;
  }));

  it('should do something', function () {
    expect(!!Maininfo).toBe(true);
  });

});
