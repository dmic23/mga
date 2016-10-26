// angular.module('stopwatch', []).
//   directive('khs', function($timeout) {
//     return {
//       restrict: 'E',
//       transclude: true,
//       scope: {},
//       controller: function($scope, $element) {
//         var timeoutId;
//         $scope.seconds = 0;
//         $scope.minutes = 0;
//         $scope.running = false;
 
//         $scope.stop = function() {
//           $timeout.cancel(timeoutId);
//           $scope.running = false;
//         };
        
//         $scope.start = function() {
//           timer();
//           $scope.running = true;
//         };
        
//         $scope.clear = function() {
//           $scope.seconds = 0;
//           $scope.minutes = 0;
//         };
        
//         function timer() {
//           timeoutId = $timeout(function() {
//             updateTime(); // update Model
//             timer();
//           }, 1000);
//         }
        
//         function updateTime() {
//           $scope.seconds++;
//           if ($scope.seconds === 60) {
//             $scope.seconds = 0;
//             $scope.minutes++;
//           }
//         }
//       },
//       template:
//         '<div class="blueborder">' +
//           '<div>{{minutes|numberpad:2}}:{{seconds|numberpad:2}}</div><br/>' +
//           '<input type="button" ng-model="startButton" ng-click="start()" ng-disabled="running" value="START" />' +
//           '<input type="button" ng-model="stopButton" ng-click="stop()" ng-disabled="!running" value="STOP" />' +
//           '<input type="button" ng-model="clearButton" ng-click="clear()" ng-disabled="running" value="CLEAR" />' +
//         '</div>',
//       replace: true
//     };
//   }).
//   filter('numberpad', function() {
//     return function(input, places) {
//       var out = "";
//       if (places) {
//         var placesLength = parseInt(places, 10);
//         var inputLength = input.toString().length;
      
//         for (var i = 0; i < (placesLength - inputLength); i++) {
//           out = '0' + out;
//         }
//         out = out + input;
//       }
//       return out;
//     };
//   });  



(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('stopWatch', stopWatch);

    stopWatch.$inject = ['$sce', '$timeout'];

    function stopWatch($sce, $timeout) {

        var directive = {
            restrict: 'EA',
            scope: {},
            controller: function($scope, $element) {
                var timeoutId;
                $scope.seconds = 0;
                $scope.minutes = 0;
                $scope.running = false;

                $scope.stop = function() {
                    $timeout.cancel(timeoutId);
                    $scope.running = false;
                };

                $scope.start = function() {
                    timer();
                    $scope.running = true;
                };

                $scope.clear = function() {
                    $scope.seconds = 0;
                    $scope.minutes = 0;
                };

                function timer() {
                    timeoutId = $timeout(function() {
                        updateTime(); // update Model
                        timer();
                    }, 1000);
                }

                function updateTime() {
                    $scope.seconds++;
                    if ($scope.seconds === 60) {
                        $scope.seconds = 0;
                        $scope.minutes++;
                    }
                }
            },
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/stopwatch.directive.html'));
            }
        }
        return directive;
    }
})();
  