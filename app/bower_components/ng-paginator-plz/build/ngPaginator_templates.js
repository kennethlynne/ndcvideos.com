angular.module('ngPaginatorPlz').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/paginator.html',
    "<ul ng-class=\"{'visibility-hidden': paginator.pages.length==1}\">\n" +
    "\n" +
    "   <li ng-class=\"{disabled:!paginator.hasPrevious()}\">\n" +
    "      <a ng-click=\"paginator.previous()\" ng-disabled=\"!paginator.hasPrevious()\">Previous page</a>\n" +
    "   </li>\n" +
    "\n" +
    "   <li ng-repeat=\"page in paginator.pages\" ng-class=\"{active: (paginator.getCurrentPageNumber()==$index+1)}\">\n" +
    "      <a ng-click=\"paginator.setPage($index+1)\">{{$index+1}}</a>\n" +
    "   </li>\n" +
    "\n" +
    "   <li ng-show=\"paginator.pages.length > 1\" ng-class=\"{disabled:!paginator.hasNext()}\">\n" +
    "      <a ng-click=\"paginator.next()\" ng-disabled=\"!paginator.hasNext()\">Next page</a>\n" +
    "   </li>\n" +
    "\n" +
    "</ul>\n"
  );

}]);
