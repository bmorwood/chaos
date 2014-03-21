(function(){
    'use strict';

    var Presenter = function(args){
        args = args || {};
        args.model = args.model || {};
        _.extend(this, args);

        var p = Presenter.prototype = Chaos.Core.BaseClass.create(args);
        p.id = '';
        p.container = '';
        p.modelBound = false;

        p.rendered = function(){};
        p.initialize = function(){};

        p.setModel = function(model){
            if(this.modelBound){
                Chaos.NS.ModelBinder.update(model, this.model);
            }else{
                this.model = Chaos.NS.ModelBinder.bind(model);
                this.modelBound = true;
            }
        };

        p.render = function(src){
            if(!this.modelBound)this.setModel(this.model);

            this.elm = Chaos.NS.templates[this.template]();
            src.append(this.elm);

            this.container = $('#' + this.id);
            Chaos.NS.ModelBinder.render(this, this.container[0]);
            this.rendered();
        };

        Chaos.NS[args.name] = p;

        return p;
    };

    Chaos.Core.Presenter = Presenter;
}());
