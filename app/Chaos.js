(function(){
    'use strict';
    
    var Chaos = function() {
        var app = {
            Version: '0.1b',
            Core: {

            },
            nameSpace: {},
            NS:{},
            setNameSpace: function($nameSpace){
                this[$nameSpace] = {};
                this.nameSpace = this.NS = this[$nameSpace];
                //window[$nameSpace] = this.nameSpace;
                return $nameSpace;
            }
        };

        return app;
    };

    window.Chaos = new Chaos();
}());
