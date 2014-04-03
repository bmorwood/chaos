(function(){
    'use strict';

    var Presenter = Chaos.Singleton.extend({
        id: '',
        container: '',
        modalBound: false,
        setModel: function() {
            if(this.modelBound){
                Chaos.NS.ModelBinder.update(model, this.model);
            }else{
                //this.model = Chaos.NS.ModelBinder.bind(model);
                this.model = Chaos.KOModelBinder.bind(model);
                this.modelBound = true;
            }
        },
        render: function () {
            if(!this.modelBound)this.setModel(this.model);

            this.elm = ChaosTemplates[this.template];
            src.append(this.elm);

            this.container = $('#' + this.id);
            //Chaos.NS.ModelBinder.render(this, this.container[0]);
            Chaos.KOModelBinder.render(this, this.container[0]);
            this.rendered();
        },
        rendered: function() {
            console.log('I am rendered... I should call add to stage now');
        }
    });

    //alias


    Chaos.Presenter = Presenter;
}());
