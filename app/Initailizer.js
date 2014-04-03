(function(){
    /**
     * AbstractInitializer is used as the base class for other events to extend from.
     *
     * @class AbstractInitializer
     * @constructor
     * @namespace chaos.initializers
     */
    var Initializer = Chaos.Class.extend({
        name: 'Initializer',
        successEventName: '',
        faultEventName:'',
        init: function ($name, $successEventName, $faultEventName) {
            this.name = $name;

            this.successEventName = $successEventName||'';
            this.faultEventName = $faultEventName||'';

            if (this.successEventName != '')
                Chaos.EventDispatcher.getInstance().addEventListener(this.successEventName, this.success, this);

            if (this.faultEventName != '')
                Chaos.EventDispatcher.getInstance().addEventListener(this.faultEventName, this.fault, this);
        },
        execute: function () {
            if (this.successEventName === '' && this.faultEventName === ''){
                Chaos.NS.logger.info('Initializer: ' + this.name + ' executed.');
                new Chaos.NS.InitializerSuccessEvent(this.name).dispatch();
            }
        },
        success: function () {
            this.removeCompletionListeners();
            Chaos.NS.logger.info('Initializer: ' + this.name + ' succeeded.');
            new Chaos.NS.InitializerSuccessEvent(this.name).dispatch();
        },
        fault: function() {
            this.removeCompletionListeners();
            Chaos.NS.logger.error('Initializer: ' + this.name + ' failed.');
            new Chaos.NS.InitializerFaultEvent(this.name).dispatch();
        },
        reset: function () {
            if (!_.isEmpty(this.successEventName) && !Chaos.EventDispatcher.getInstance().hasEventListener(this.successEventName, this.success, this))   {
                Chaos.EventDispatcher.getInstance().addEventListener(this.successEventName, this.success, this);
            }

            if (!_.isEmpty(this.faultEventName) && !Chaos.EventDispatcher.getInstance().hasEventListener(this.faultEventName, this.fault, this)) {
                Chaos.EventDispatcher.getInstance().addEventListener(this.faultEventName, this.fault, this);
            }
        },
        removeListeners: function() {
            Chaos.EventDispatcher.removeEventListener(this.successEventName, this.success, this);
            Chaos.EventDispatcher.removeEventListener(this.faultEventName, this.fault, this);
        }
    });

    Chaos.Initializer = Initializer;
}());