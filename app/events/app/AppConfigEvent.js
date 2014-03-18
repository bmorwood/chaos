(function(){
    Chaos.Core.Event.register({
        name: 'AppConfigEvent',
        events: {
            CONFIG_READY: true,
            CONFIG_ERROR: true,
            CONFIG_LOAD: true
        }
    });
}());
