var nyc = nyc || {};

/**
 * @desc Abstract collapsible widget
 * @public
 * @class
 * @extends {nyc.EventHandling}
 * @constructor
 * @param {nyc.Collapsible.Options} options Constructor options
 */
nyc.Collapsible = function(options){
	var heading = $('<h3></h3>');

	this.currentVal = $('<span class="current-value"></span>');
	
	heading.html(options.title || '')
		.append(this.currentVal);
	
	$(options.target).prepend(heading)
		.collapsible()
		.collapsible('option', {collapsedIcon: 'carat-d', expandedIcon: 'carat-u'});
};

nyc.Collapsible.prototype = {
	/**
	 * @public
	 * @member {string}
	 */
	currentVal: null
};

nyc.inherits(nyc.Collapsible, nyc.EventHandling);

/**
 * @desc Constructor options for {@link nyc.Collapsible}
 * @public
 * @typedef
 * @property {string} value The value attribute for the HTML DOM node that will be created
 * @property {string} label The label for the HTML DOM node that will be created
 */
nyc.Collapsible.Options;
