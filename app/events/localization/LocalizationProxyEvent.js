(function(){
    'use strict';

    Chaos.Core.Event.register({
        name: 'LocalizationProxyEvent',
        events: {
            LOAD_LOCALIZATION_CONTENT: true,
            LOAD_LOCALIZATION_CONTENT_SUCCESS: true,
            LOAD_LOCALIZATION_CONTENT_FAULT: true,
            REPOPULATED: true,
            LOCALIZATION_CONTENT_READY: true
        }
    });
}());
