(function(){
    'use strict';

    Chaos.Core.Event.register({
        name: 'LocalizationEvent',
        events: {
            REPOPULATED: true,
            LOCALIZATION_CONTENT_READY: true
        }
    });
}());
