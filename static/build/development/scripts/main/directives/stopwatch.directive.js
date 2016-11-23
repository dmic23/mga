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
            link: function(scope, elem, attrs) {
                var timeoutId;
                scope.seconds = 0;
                scope.minutes = 0;
                scope.hours = 0;
                scope.running = false;

                scope.activeCard = false;

                scope.tick = $sce.trustAsResourceUrl(static_path('sounds/tick.mp3'));
                scope.tock = $sce.trustAsResourceUrl(static_path('sounds/tock.wav'));

                function activate(){
                    scope.twelve = [];
                    scope.sixty = [];
                    for(var s = 0; s < 60; s++){
                        scope.sixty.push(s);
                    }
                    for(var t = 0; t <= 12; t++){
                        scope.twelve.push(t);
                    }
                }

                scope.setTime = function(){
                    if(scope.setHours > 0){
                        scope.hours = scope.setHours;
                    } else {
                        scope.hours = 0;
                    }
                    if(scope.setMinutes > 0){
                        scope.minutes = scope.setMinutes;
                    } else {
                        scope.minutes = 0;
                    }
                    scope.seconds = 0;
                }

                scope.stop = function() {
                    $interval.cancel(timeoutId);
                    scope.running = false;
                };

                scope.start = function() {
                    if(scope.seconds == 0 && scope.minutes == 0 && scope.hours == 0){
                        scope.setTime();
                    }
                    timer();
                    scope.running = true;
                };

                scope.clear = function() {
                    scope.hours = 0;
                    scope.seconds = 0;
                    scope.minutes = 0;
                };

                function timer() {
                    timeoutId = $interval(function() {
                        updateTime(); 
                    }, 1000);
                }

                function updateTime() {
                    if(scope.seconds == 0){
                        scope.seconds = 59;
                        if(scope.minutes == 0){
                            scope.minutes = 59;
                            if(scope.hours > 0){
                                scope.hours --;
                            }
                        } else if(scope.minutes == 1){
                            scope.minutes = 0;
                        } else if(scope.minutes > 1){
                            scope.minutes --;
                        }
                    } else {
                        if(scope.seconds == 1 && scope.minutes == 0 && scope.hours == 0){
                            scope.seconds = 0;
                            scope.stop();
                        } else if(scope.seconds >= 1){
                            scope.seconds --;
                        }
                    }

                }

                activate();
            },

            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/stopwatch.directive.html'));
            }
        }
        return directive;
    }
})();
  