(function(){

    // The base Class implementation (does nothing)
    var Base2 = Chaos.Singleton.extend({
        name: 'base2',
        init: function($name) {
            this.name = $name || this.name;
            console.log('single 2 ?');
        }
    });

    Chaos.Base2 = Base2;
})();

