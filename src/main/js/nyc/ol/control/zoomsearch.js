var nyc = nyc || {};
nyc.ol = nyc.ol || {};
/** 
 * @public 
 * @namespace
 */
nyc.ol.control = nyc.ol.control || {};

/**
 * @desc Class for providing a set of buttons to zoom and search.
 * @public
 * @class
 * @extends {nyc.ZoomSearch}
 * @constructor
 * @param {ol.Map} map The OpenLayers map that will be controlled 
 * @param {boolean} [useSearchTypeMenu=false] Use search types menu
 * @fires nyc.ZoomSearch#search
 * @fires nyc.ZoomSearch#geolocate
 * @fires nyc.ZoomSearch#disambiguated
 */
nyc.ol.control.ZoomSearch = function(map, useSearchTypeMenu){
	this.map = map;
	this.view = map.getView();
	nyc.ZoomSearch.apply(this, [useSearchTypeMenu]);
	$('#ctl-z-srch').on('click dblclick mouseover mousemove', function(){$('.feature-tip').hide();});
};

nyc.ol.control.ZoomSearch.prototype = {
	/**
	 * @private
	 * @member {ol.Map}
	 */
	map: null,
	/**
	 * @private
	 * @member {ol.View}
	 */
	view: null,
	/**
	 * @desc A method to return the map container  HTML element wrapped in a JQuery
	 * @public
	 * @override
	 * @method
	 * @return {JQuery} The the map container HTML element wrapped in a JQuery
	 */
	container: function(){
		return $(this.map.getViewport()).find('.ol-overlaycontainer-stopevent');
	},
	/**
	 * @desc Handle the zoom event triggered by user interaction
	 * @public
	 * @override
	 * @method
	 * @param event The DOM event triggered by the zoom buttons
	 */
	zoom: function(event){
		var view = this.view;
		this.map.beforeRender(ol.animation.zoom({resolution: view.getResolution()}));
		view.setZoom(view.getZoom() + $(event.target).data('zoom-incr'));
	}
};

nyc.inherits(nyc.ol.control.ZoomSearch, nyc.ZoomSearch);
