(function(){
    'use strict';
    
    Chaos.Core.Event.register({
        name: 'SystemDownDisplayEvent',
        events: {
            SHOW: true,
            HIDE: true
        }
    });

    /**
     * service of SystemDownDisplayEvent.
     *
     * @class SystemDownDisplayEvent
     * @constructor
     * @param {Event} $type event type.
     * @namespace chaos.events.system
     * @extends chaos.AbstractEvent
     */
}());
