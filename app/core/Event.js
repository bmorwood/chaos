(function(){
    'use strict';

    var Event = function(args){
        args = args || {};

        _.extend(this, args);
    };

    Event.register = function(args){
        args = args || {};

        //TODO validate name exists - it's mandatory

        Chaos.NS[args.name] = new Function(
            "return function " + args.name + "(args){ args = args || {}; _.extend(this, args); return this;}"
        )();

        if(args.events){
            for(var name in args.events){
                if(args.events[name] === true){
                    Chaos.NS[args.name][name] = 'chaos.' + args.name.toLowerCase() + '::' + name;
                }
            }
        }

        var p = Chaos.NS[args.name].prototype;
        p.type = '';
        p.target = null;
        p.initialize = function(){};
        p.events = args.events;
        p.name = args.name;

        p.dispatch = function(){
            if(!this.type || this.type === ''){
                switch(_.size(this.events)){
                    case 0:
                        Chaos.NS.logger.error('there are no events associated to this event [' + this.toString() + ']');
                        return;
                        break;
                    case 1:
                        //default to the only event available
                        this.type = chaos[this.name][getFirstPropertyName(this.events)];
                        break;
                    default:
                        Chaos.NS.logger.error('you have multiple events associated to this event [' + this.toString() + '] but you did not specify which one you were looking to trigger. The events available are: ' + JSON.stringify(this.events));
                        return;
                        break;
                }
            }

            Chaos.Core.EventDispatcher.dispatchEvent(this);
        };

        //alias
        p.emit = p.dispatch;

        p.toString = function(){
            return this.name;
        };

        return Chaos.NS[args.name];
    };

    var p = Event.prototype;

    p.type = '';
    p.target = null;

    p.initialize = function(){};

    p.dispatch = function () {
        Chaos.Core.EventDispatcher.dispatchEvent(this);
    };

    p.toString = function(){
        return this.name;
    };

    Chaos.Core.Event = Event;

    function getFirstPropertyName(obj){
        for(var name in obj){
            return name;
        }
    }
}());
