(function () {
    'use strict';

    angular
        .module('main.filters')
        .filter('numberpad', function(){
            return function(input, places) {
                var out = "";
                if (places){
                    var placesLength = parseInt(places, 10);
                    var inputLength = input.toString().length;

                    for (var i = 0; i < (placesLength - inputLength); i++) {
                        out = '0' + out;
                    }   
                    out = out + input;
                }
                return out;
            };
        }); 

})();
