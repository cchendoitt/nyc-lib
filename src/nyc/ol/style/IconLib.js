/**
 * @module nyc/ol/style/IconLib
 */

import $ from 'jquery'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

/**
 * @desc Class to load icons from a library
 * @public
 * @class
 */
class IconLib {
  /**
   * @desc Create an instance of IconLib
   * @public
   * @constructor
   * @param {string=} url The base URL for icon libraries
   */
  constructor(url) {
    this.url = url || IconLib.URL
    this.icons = {}
  }
  /**
   * @private
   * @method
   * @param {module:nyc/ol/style/IconLib~IconLib.Icon|string} icon The icon
   * @returns {module:nyc/ol/style/IconLib~IconLib.Icon} The icon
   */
  parseIcon(icon) {
    if (typeof icon === 'string') {
      const ico = icon.split('#')[0]
      return {
        library: ico.split('/')[0],
        name: ico.split('/')[1],
        color: `#${icon.split('#')[1]}`
      }
    }
    return icon
  }
  /**
   * @desc Create an icon style
   * @public
   * @method
   * @param {Object|string} icon The icon in the following format 'library-name/icon-name#hexclr'
   * @param {number} width The icon width
   * @return {ol.style.Style} The icon style
   */
  style(icon, width) {
    const ico = this.parseIcon(icon)
    const url = `${this.url}/${ico.library}/${ico.name}-15.svg`
    const style = new Style({})
    const scale = width / 15
    const src = this.icons[url]
    if (!src) {
      fetch(url).then(response => {
        response.text().then(txt => {
          const div = $('<div></div>').append($(txt)[2])
          const css = div.find('svg').attr('style') || ''
          div.find('svg').attr('style', `${css};fill:#${ico.color}`)
          this.icons[url] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(div.html())}`
          style.setImage(new Icon({src: this.icons[url], scale}))
        })
      })
    } else {
      style.setImage(new Icon({src, scale}))
    }
    return style
  }
}

/**
 * @desc Icon definition object
 * @public
 * @typedef {Object}
 * @property {string} library The icon library
 * @property {string} name The icon name
 * @property {string} color The icon color
 */
IconLib.Icon

/**
 * @private
 * @const
 * @type {string}
 */
IconLib.URL = 'https://maps.nyc.gov/nyc-lib/icons'

export default IconLib
