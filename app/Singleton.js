(function(){
    'use strict';

        Chaos.Singleton = Chaos.BaseClass.extend({
        name:'Singleton',
        initialize: function(){
            console.log('hello');
        },
        extend: function($obj) {

            var Base = function(){

                if(this.instance === null){
                    this.instance = this;
                    this.initialize();
                }else{

                    Chaos.NS.logger.error('You should not call the constructor for ' + this.toString() + ' directly. It is a singleton, so you should use `getInstance()`.');
                }
            }

            var p = Base.prototype = Chaos.BaseClass.extend($obj);
            p.constructor = Base;

            p.instance = null;

            p.getInstance = function(){
                if(this.instance === null){
                    this.instance = new Base();
                }

                return this.instance;
            };

            Chaos.NS[$obj.name] = p;

            return p;
        }
    });

}());
