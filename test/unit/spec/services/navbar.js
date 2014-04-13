'use strict';

describe('Service: navbar', function () {

  var navbar;

  beforeEach(function () {

    module('ndc');

    inject(function (_navbar_) {
      navbar = _navbar_;
    });

  });

  it('should set active panel (settings)', function () {
    expect(navbar.setState('settings'));
    expect(navbar.templateSrc).toBe('components/navbar/panels/settings.html');
    expect(navbar.isActive('something')).toBeFalsy();
    expect(navbar.isActive('settings')).toBeTruthy();
  });

});