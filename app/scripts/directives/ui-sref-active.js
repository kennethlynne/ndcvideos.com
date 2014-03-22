'use strict';

angular.module('ndc')
    .directive('uiSrefActive', function $StateActiveDirective($state, $stateParams, $interpolate) {
        return {
            restrict: "A",
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var state, params, activeClass;

                // There probably isn't much point in $observing this
                activeClass = $interpolate($attrs.uiSrefActive || '', false)($scope);

                // Allow uiSref to communicate with uiSrefActive
                this.$$setStateInfo = function (newState, newParams) {
                    state = $state.get(newState, stateContext($element));
                    params = newParams;
                    update();
                };

                $scope.$on('$stateChangeSuccess', update);

                // Update route state
                function update() {
                    if ($state.$current.self === state && matchesParams()) {
                        $element.addClass(activeClass);
                    } else {
                        $element.removeClass(activeClass);
                    }
                }

                function matchesParams() {
                    return !params || equalForKeys(params, $stateParams);
                }
            }]
        };
    }
);
