(function(){
    'use strict';
    
    /**
     * The class dispatches events so listeners can react accordingly.
     *
     * @class EventDispatcher
     * @constructor
     * @param {Object} $target assign a object to the event.
     * @namespace chaos.events
     */

    var EventDispatcher = Chaos.Singleton.extend({name: 'EventDispatcher'});

    EventDispatcher.target = null;
    EventDispatcher.events = [];

    /**
     * used to find the event(s) and associated listener(s) calls their assigned methods.
     *  __example__
     *  ```
     *  new chaos.LocalizationEvent(chaos.LocalizationEvent.LOCALIZATION_CONTENT_READY).dispatch();
     *  ```
     * @method dispatchEvent
     * @param {Event} $event is the event that is used to call the listeners assigned methods.
     * @return {Boolean} returns 'true' a listener was found and called and 'false' if no listeners were found.
     */
    EventDispatcher.dispatchEvent = function ( $event )
    {
        $event.target = (this.target ? this.target : $event.target);

        var eventListeners = this.events[$event.type];
        if(eventListeners){
            for (var i = eventListeners.length - 1; i >= 0; i--){
                eventListeners[i].listener.call(eventListeners[i].context, $event);
            }

            return true;
        }

        return false;
    };

    //alias
    EventDispatcher.emit = EventDispatcher.dispatchEvent;
    /**
     * Find the event(s) and associated listener(s) and calls their assigned methods.
     *  __example__
     *  ```
     *  chaos.EventDispatcher.getInstance().addEventListener(chaos.LocalizationEvent.LOCALIZATION_CONTENT_READY, this.updateCopy, this);
     *  ```
     * @method addEventListener
     * @param {Event} $type is the event that is used to call the listeners assigned methods.
     * @param {Method} $listener is the method to call when the an event is dispatched.
     * @param {Object} $context holds the class reference that is used to call the method and keep it in the relevant context of the class.
     */
    EventDispatcher.addEventListener = function( $type, $listener, $context)
    {
        if($context === undefined) {debugger}
        if($listener === undefined) {debugger}
        if($type === undefined) {debugger}

        if(this.hasEventListener($type, $listener, $context)) chaos.logger.log('hasEventListener ' + $type);

        if(!this.events[$type]){
            this.events[$type] = [{listener: $listener, context: $context}];
        }else{
            this.events[$type].push({listener: $listener, context: $context});
        }
    };

    //alias
    EventDispatcher.on = EventDispatcher.addEventListener;

     /**
     * Remove an event listener.
     *  __example__
     *  ```
     *  chaos.EventDispatcher.getInstance().removeEventListener(chaos.LocalizationEvent.LOCALIZATION_CONTENT_READY, this.updateCopy, this);
     *  ```
     * @method removeEventListener
     * @param {Event} $type is the event that is used to call the listeners assigned methods.
     * @param {Method} $listener is the method to call when the an event is dispatched.
     * @param {Object} $context holds the class reference that is used to call the method and keep it in the relevant context of the class.
     */
    EventDispatcher.removeEventListener = function( $type, $listener, $context )
    {

        if($context === undefined) {debugger}
        if($listener === undefined) {debugger}
        if($type === undefined) {debugger}

        var eventListeners = this.events[$type];

        if(!eventListeners) return false;
        for (var i = eventListeners.length - 1; i >= 0; i--){
            if(eventListeners[i].listener === $listener && eventListeners[i].context ===  $context){
                eventListeners[i] = null;
                delete eventListeners[i];
                eventListeners.splice(i, 1);
            }
        }

        if(this.events[$type].length <= 0){
            this.events[$type] = null;
            delete this.events[$type];
        }
    };
    /**
     * Check to see if there are any event listeners for event, method and context.
     *  __example__
     *  ```
     *  chaos.EventDispatcher.getInstance().hasEventListener(chaos.LocalizationEvent.LOCALIZATION_CONTENT_READY, this.updateCopy, this);
     *  ```
     * @method hasEventListener
     * @param {Event} $type is the event that is used to call the listeners assigned methods.
     * @param {Method} $listener is the method to call when the an event is dispatched.
     * @param {Object} $context holds the class reference that is used to call the method and keep it in the relevant context of the class.
     * @return {Boolean} 'true' if event listener is assigned already.'false' if no event listener was found.
     */
    EventDispatcher.hasEventListener = function ($type, $listener, $context){

        if($context === undefined) {debugger}

        var listeners = this.events[$type];
        if(!listeners) return false;

        for (var i = listeners.length - 1; i >= 0; i--){
            if(listeners[i].listener === $listener && listeners[i].context === $context) return true;
        }

        return false;
    };
    /**
     * Check to see if there are any event listeners for event, method and context.
     *  __example__
     *  ```
     *  chaos.EventDispatcher.getInstance().getListenersForEvent(chaos.LocalizationEvent.LOCALIZATION_CONTENT_READY);
     *  ```
     * @method getListenersForEvent
     * @param {Event} $event is the event that is used to call the listeners assigned methods.
     * @return {Array} returns an 'Array' of classes that are assigned to an 'Event'.
     */
    EventDispatcher.getListenersForEvent = function($event){

        //return Chaos.utils.pluck(this.events[$event], 'context');
    };

    //alias
    Chaos.Emitter = Chaos.EventDispatcher = EventDispatcher;
}());
