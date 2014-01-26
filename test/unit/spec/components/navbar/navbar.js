'use strict';

describe('Component: navbarComponent', function () {

    describe('Directive: navbarComponent', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<navbar-component></navbar-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('navbar-component');
        });

    });

    describe('Controller: navbarComponentCtrl', function () {

        var Ctrl, scope, element, authentication, isLoggedIn = false;

        beforeEach(function () {

            authentication = {
                logout: jasmine.createSpy('authentication.logout'),
                isAuthenticated: jasmine.createSpy('authentication.isAuthenticated').andCallFake(function () {
                    return isLoggedIn;
                })
            };

            module('ndc', function ($provide) {
                $provide.value('authentication', authentication)
            });

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<navbar-component></navbar-component>');
                Ctrl = $controller('navbarComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        it('should sign a user out a message', function () {
            scope.signout();
            expect(authentication.logout).toHaveBeenCalled();
        });

        it('should output the authentication state', function() {
            isLoggedIn = false;
            expect(scope.isAuthenticated()).toBeFalsy();
            isLoggedIn = true;
            expect(scope.isAuthenticated()).toBeTruthy();
        });
    });

});
