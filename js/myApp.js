var myApp = angular.module('myApp', []);

// myApp.controller('MainCtrl', ['$scope', function ($scope) {
//   $scope.text = 'Hello, Dmitri.';
// }]);

// myApp.controller('NavCtrl', ['$scope', function ($scope) {...}]);

myApp.controller('UserCtrl', ['$scope', function ($scope) {
  $scope.user           = {};
    $scope.user.details = {
      "username": "Dmitri Gnahc",
      "id": "12345678"
    };
}]);

myApp.directive('customButton', function() {
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    template: '<a href="" class="myawesomebutton" ng-transcludeE>' +
              '<i class="icon-ok-sign"></i>' +
              '</a>',
    link: function (scope, element, attrs) {
      // DOM manipulation/ eventst here!
    }
  };
});