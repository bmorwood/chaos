(function(){
    'use strict';

    var Controller = function(args){
        args = args || {};
        _.extend(this, args);

        Controller.commands = [];
        Controller.enabled = true;

        var p = Controller.prototype = Chaos.Core.BaseClass.create(args);

        p.initialize = function(){};

        p.addCommand = function ($eventName, $command){
            if(!AbstractController.commands[$eventName]){
                Chaos.Core.EventDispatcher.getInstance().addEventListener($eventName, AbstractController.handleEvent, this);
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
                Chaos.NS.EventDispatcher.getInstance().removeEventListener($eventName, AbstractController.handleEvent, this);
                Controller.commands[$eventName] = null;
                delete Controller.commands[$eventName];
            }
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

                var classRef = AbstractController.commands[$event.type];
            }
        };

        Chaos.NS[args.name] = p;

        return p;
    };

    Chaos.Core.Controller = Controller;
}());