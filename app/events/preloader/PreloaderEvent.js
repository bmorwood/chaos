(function(){
    /**
     * event of PreloaderEvent.
     *
     * @class PreloaderEvent
     * @constructor
     * @param {Event} $type event type.
     * @param {Number} $percentage the current percentage that the pre-loader should display.
     * @namespace chaos.events.preloader
     * @extends chaos.AbstractEvent
     */

    Chaos.Core.Event.register({
        name: 'PreloaderEvent',
        events: {
            COMPLETE: true,
            STEP: true
        }
    });
}());
