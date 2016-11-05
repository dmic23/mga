(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('stopWatch', stopWatch);

    stopWatch.$inject = ['$sce', '$timeout', '$interval'];

    function stopWatch($sce, $timeout, $interval) {

        var directive = {
            restrict: 'EA',
            scope: {
                path: "=",
            },
            controller: function($scope, $element) {
                var timeoutId;
                $scope.seconds = 0;
                $scope.minutes = 0;
                $scope.milliseconds = 0;
                $scope.running = false;

                $scope.activeCard = false;

                $scope.tick = $sce.trustAsResourceUrl(static_path('sounds/tick.mp3'));

                $scope.stop = function() {
                    $interval.cancel(timeoutId);
                    $scope.running = false;
                };

                $scope.start = function() {
                    timer();
                    $scope.running = true;
                };

                $scope.clear = function() {
                    $scope.milliseconds = 0;
                    $scope.seconds = 0;
                    $scope.minutes = 0;
                };

                function timer() {
                    timeoutId = $interval(function() {
                        updateTime(); 
                    }, 10);
                }

                function updateTime() {
                    $scope.milliseconds++;
                    if ($scope.milliseconds === 100) {
                        $scope.milliseconds = 0;
                        $scope.seconds++;
                        if ($scope.seconds == 60){
                            $scope.seconds = 0;
                            $scope.minutes++;
                        }
                        
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
  