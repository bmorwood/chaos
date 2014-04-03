(function(){
    'use strict';

    var Controller = Chaos.Singleton.extend({
        addCommand:function ($eventName, $command){
            if(!Controller.commands[$eventName]){
                Chaos.EventDispatcher.addEventListener($eventName, Controller.handleEvent, this);
                Controller.commands[$eventName] = [];
                Controller.commands[$eventName].push({event:$eventName, command:$command});
            }else{
                Controller.commands[$eventName].push({event:$eventName, command:$command});
            }
        },
        removeCommand: function($eventName, $command) {
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
                Chaos.EventDispatcher.removeEventListener($eventName, Controller.handleEvent, this);
                Controller.commands[$eventName] = null;
                delete Controller.commands[$eventName];
            }
        }
    });

    Controller.commands = [];
    Controller.enabled = true;

    Controller.NOTIFY_APPLICATION_ACTIVATED = 'controller::notify.application.activated';

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

    Chaos.Controller = Controller;
}());