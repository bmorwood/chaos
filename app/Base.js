(function(){

    // The base Class implementation (does nothing)
    var Base = Chaos.Class.extend({
        name: 'barry morwood class',
        init: function($name) {
            this.name = $name || this.name;
          console.log('constructor ?');
        },
        toString: function() {
            console.log('my tostring')
            return this.name;
        }
    });

    Chaos.Base = Base;
})();

