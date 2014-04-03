(function(){
    'use strict';
    var BaseClass = function() { };

    BaseClass.extend = function($obj){

        var p = this.prototype = new this();
        p.constructor = BaseClass;

        $obj = $obj || {};
        Chaos.Utils.extend(p, $obj);

        Chaos.NS[$obj.name] = p;

        return p;
    };

    var p = BaseClass.prototype;

    p.toString = function (){
        return this.name;
    };

    Chaos.BaseClass = BaseClass;
}());
