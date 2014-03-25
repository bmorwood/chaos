(function(){
    'use strict';
    var Utils = function(args){};

    Utils.extend = function($this, $args){
        for (var prop in $args) {
            $this[prop] = $args[prop];
        }
    };

    Chaos.Utils = Utils;
}());
