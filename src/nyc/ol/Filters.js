  /**
 * @module nyc/ol/Filters
 */

import $ from 'jquery'

import nyc from 'nyc'
import Container from 'nyc/Container'
import Collapsible from 'nyc/Collapsible'
import Choice from 'nyc/Choice'

/**
 * @desc Class for managing controls for filtering a FilterAndSort source
 * @public
 * @class
 * @extends module:nyc/Container~Container
 */
class Filters extends Container {
  /**
   * @desc Create an instance of Filters
   * @public
   * @constructor
   * @param {module:nyc/ol/Filters~Filters.Options}
   */
  constructor(options) {
    super(options.target)
    /**
     * @private
     * @member {Array<Choice>}
     */
    this.choiceControls = []
    /**
     * @private
     * @member {module:nyc/ol/source/FilterAndSort~FilterAndSort}
     */
    this.source = options.source
    options.choiceOptions.forEach(choiceOptions => {
      const target = $(`<div class="${nyc.nextId('filter')}"></div>`)
      choiceOptions.target = choiceOptions.target || $(`<div class="${nyc.nextId('filter-chc')}"></div>`)
      this.append($(target))
      const choice = new Choice(choiceOptions)
      const collapsible = new Collapsible({
        target: target,
        title: choiceOptions.title,
        content: choice.getContainer()
      })
      choice.on('change', $.proxy(this.filter, this))
      this.choiceControls.push(choice)
    })
  }
  /**
   * @private
   * @method
   */
  filter() {
    const namedFilters = {}
    const filters = []
    this.choiceControls.forEach(filterControl => {
      filterControl.val().forEach(choice => {
        const filter = namedFilters[choice.name] || []
        namedFilters[choice.name] = filter.concat(choice.values)
      })
    })
    Object.keys(namedFilters).forEach(name => {
      filters.push({property: name, values: namedFilters[name]})
    })
    this.source.filter(filters)
    this.trigger('change', this)
  }
}

/**
 * @desc Constructor options for {@link module:nyc/ol/Filters~Filters}
 * @public
 * @typedef {Object}
 * @property {jQuery|Element|string} target The DOM node in which to create the Filters
 * @property {Array<Filters.ChoiceOptions>} choiceOptions The filter choices
 * @property {nyc.ol.source.FilterAndSort} source The source to filter
 */
Filters.Options

/**
 * @desc Object type to hold choice options
 * @public
 * @typedef {Object}
 * @property {string} title
 * @property {Array<Choice.Options>} choiceOptions
 */
Filters.ChoiceOptions

export default Filters
