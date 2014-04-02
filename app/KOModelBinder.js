(function(){
    'use strict';

    Chaos.KOModelBinder = {
        bind: function(obj){
            return ko.mapping.fromJS(obj);
        },

        update: function(obj, ctx){
            ko.mapping.fromJS(obj, ctx);
        },

        render: function(ctx, view){
            ko.applyBindings(ctx, view);
        }
    };
}());
