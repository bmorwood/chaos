(function(){
    /**
     * class of OverlayWindowManager.
     *
     * @class OverlayWindowManager
     * @constructor
     * @namespace chaos.viewmodels
     */
	var OverlayWindowManager = function() {
	};

	OverlayWindowManager.windows = [];


	OverlayWindowManager.addWindow = function($windowContainer){

		if(!OverlayWindowManager.windowExists($windowContainer.name))
			OverlayWindowManager.windows.push($windowContainer);

		OverlayWindowManager.open();

		if($windowContainer.isModal){
			$windowContainer.window.render(OverlayWindowManager.overlayContainer);
		} else {
			OverlayWindowManager.overlayContainer.hide();
			$windowContainer.window.render(OverlayWindowManager.mainContainer);
		}
	};

	OverlayWindowManager.windowExists = function($name){
		return !_.isEmpty(_.where(OverlayWindowManager.windows, {name:$name}));
	};

	OverlayWindowManager.open = function (){
		if(OverlayWindowManager.overlayContainer) {
			// OverlayWindowManager.closeAllModals();
			OverlayWindowManager.overlayContainer.show();
		} else{
			OverlayWindowManager.createContainer();
		}
	};

	OverlayWindowManager.closeAll = function(){
		for (var i = OverlayWindowManager.windows.length - 1; i >= 0; i--){
			OverlayWindowManager.windows[i].dispose();
		};

		OverlayWindowManager.overlayContainer.hide();
	};

	OverlayWindowManager.closeAllModals = function ($name){

		var allModals = _.where(OverlayWindowManager.windows, {isModal: true});

		for (var i = allModals.length - 1; i >= 0; i--){
			if(typeof allModals[i].window.dispose === 'function')
				allModals[i].window.dispose();
		};

		OverlayWindowManager.overlayContainer.hide();

	};

	OverlayWindowManager.close = function ($name){
		var container = OverlayWindowManager.getWindowByName($name, true);

		if(!container) return;

        if(typeof container.window.dispose === 'function')
            container.window.dispose();


		if(container.isModal)
			OverlayWindowManager.overlayContainer.hide();

	};

	OverlayWindowManager.createContainer = function (){

		OverlayWindowManager.mainContainer = $('#bike-builder-container');
		OverlayWindowManager.overlayContainer = $('<div>', {class:'ngp-overlay-window-background', style:'z-index:3'}).css('width', OverlayWindowManager.mainContainer.width()).css('height', OverlayWindowManager.mainContainer.height());
		OverlayWindowManager.mainContainer.append(OverlayWindowManager.overlayContainer);

		$(OverlayWindowManager.overlayContainer).bind('click',function(e){
			if(e.currentTarget === e.target){
				OverlayWindowManager.closeAllModals();
			}
		});

	};

	OverlayWindowManager.removeWindow = function ($name){
		OverlayWindowManager.close($name);
	};

	OverlayWindowManager.getWindowByName = function ($name, $includeContainer){
        //todo: remove dependencies on underscore
		var windowContainer = _.where(OverlayWindowManager.windows, {name:$name});

        //todo: remove dependencies on underscore
		if(_.isEmpty(windowContainer))
			return null;
		else
			return ($includeContainer === true) ? _.first(windowContainer) : _.first(windowContainer).window;
	};

	var p = OverlayWindowManager.prototype;
    /**
     * toString returns the class name.
     *
     * @method toString
     * @return {String} Class name.
     */
	p.toString = function (){
		return 'OverlayWindowManager';
	};

    Chaos.OverlayWindowManager = OverlayWindowManager;
}());