(function(){
    'use strict';

    var Controller = function(args){
        args = args || {};
        Chaos.Utils.extend(this, args);

        Controller.commands = [];
        Controller.enabled = true;

        //todo: remove add somewhere else like an event or Chaos package Event for application Initial

        Controller.NOTIFY_APPLICATION_ACTIVATED = 'controller::notify.application.activated';

        var p = Controller.prototype = Chaos.Singleton.extend(args);

        p.initialize = function(){};

        p.addCommand = function ($eventName, $command){
            if(!Controller.commands[$eventName]){
                Chaos.EventDispatcher.getInstance().addEventListener($eventName, Controller.handleEvent, this);
                Controller.commands[$eventName] = [];
                Controller.commands[$eventName].push({event:$eventName, command:$command});
            }else{
                Controller.commands[$eventName].push({event:$eventName, command:$command});
            }
        };

        p.removeCommand = function ($eventName, $command){

            var commands = Controller.commands[$eventName];

            if(!commands) return false;

            for (var i = commands.length - 1; i >= 0; i--){
                if(commands[i].event === $eventName && commands[i].command ===  $command){
                    commands[i] = null;
                    delete commands[i];
                    commands.splice(i, 1);
                }
            }

            if(Controller.commands[$eventName].length <= 0){
                Chaos.NS.EventDispatcher.getInstance().removeEventListener($eventName, Controller.handleEvent, this);
                Controller.commands[$eventName] = null;
                delete Controller.commands[$eventName];
            }
        };

        Chaos.NS[args.name] = p;

        return p;
    };

    Controller.handleEvent = function ($event) {

        if (Controller.enabled) {

            var classRefs = Controller.commands[$event.type];
            if(!classRefs) return false;

            for (var i = classRefs.length - 1; i >= 0; i--){

                if(classRefs[i] != null){
                    //NGP.logger.log(this, eventListeners[i], $event );
                    var classRef = classRefs[i].command;
                    if(!classRef){
                        Chaos.NS.logger.warn("command class not found for event type", $event.type);
                    } else {
                        var commandClass = new classRef();
                        commandClass.execute($event);
                    }
                }
            };

            var classRef = Controller.commands[$event.type];
        }
    };

    Controller.extend = function($args){
        return new Controller($args);
    };

    Chaos.Controller = Controller;
}());