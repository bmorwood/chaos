(function(){
    'use strict';
     var BaseClass = function(args){
         args = args || {};

         //todo: look into cloning of objects

         for (var prop in args) {
             this[prop] = args[prop];
         }
     };

     BaseClass.create = function(args){
         var Base = function(){
             if(Base.instance === null){
                 Base.instance = this;
                 this.initialize();
             }else{
                 Chaos.NS.logger.error('You should not call the constructor for ' + this.toString() + ' directly. It is a singleton, so you should use `getInstance()`.');
             }
         };

         Base.instance = null;

         Base.getInstance = function(){
             if(Base.instance === null){
                 Base.instance = new Base();
             }

             return Base.instance;
         };

         var p = Base.prototype = new Chaos.Core.BaseClass(args);

         //for backwards compatibility
         p.getInstance = function(){
             return this;
         };

         p.constructor = Base;

         p.toString = function (){
             return this.name;
         };

         Chaos.NS[args.name] = Base; //for namespace template

         return p;
     };

     Chaos.Core.BaseClass = BaseClass;
}());
