(function(){
    /**
     * class of OverlayContainerWindow.
     *
     * @class OverlayContainerWindow
     * @constructor
     * @namespace chaos.viewmodels
     */
	var OverlayContainerWindow = function($name, $window, $isModal, $x, $y) {
		this.name = $name;
		this.window = $window;
		this.isModal = _.isUndefined($isModal) ? false : $isModal;
		this.x = _.isUndefined($x) ? 0 : $x;
		this.y = _.isUndefined($y) ? 0 : $y;
	};
	
	var p = OverlayContainerWindow.prototype;
	
	p.name;
	p.window;
	p.isModal;
	p.y;
	p.x;
    /**
     * toString returns the class name.
     *
     * @method toString
     * @return {String} Class name.
     */
	p.toString = function (){
		return 'OverlayContainerWindow';
	};

    Chaos.OverlayContainerWindow = OverlayContainerWindow;
}());