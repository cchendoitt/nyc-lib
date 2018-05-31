/**
 * @module nyc/mta/TripPlanHack
 */

/**
 * @desc Class to hack calls to MTA TripPlanner
 * @public
 * @class
 * @constructor
 */
class TripPlanHack {
  /**
   * @desc Intiate jump to MTA TripFinder
   * @public
   * @method
   * @param {module:nyc/mta/TripPlanHack~TripPlanHack.SaneRequest} request The trip request
   */
  directions(request) {
    const args = {
      jsonpacket: this.jsonpacket(request),
      rand: this.randomParamCopiedFromMtaCode()
    }
    const qstr = $.param(args)
    window.open().document.write(TripPlanHack.JUMP_PAGE.replace(/%QSTR%/, qstr))
  }
  /**
   * @private
   * @method
   * @param {module:nyc/mta/TripPlanHack~TripPlanHack.SaneRequest} request
   * @returns {string}
   */
  jsonpacket(request) {
    return JSON.stringify(this.insanifyRequest(request))
  }
  /**
   * @private
   * @method
   * @returns {number}
   */
  randomParamCopiedFromMtaCode() {
    return Math.floor(Math.random() * 11)
  }
  /**
   * @private
   * @method
   * @returns {Object<string, Object>}
   */
  now() {
    const now = new Date()
    const hour = now.getHours()
    return {
      date: `${(now.getMonth() + 1)}/${now.getDate()}/${now.getFullYear()}`,
      hour: hour < 13 ? hour : hour - 12,
      minute: now.getMinutes(),
      ampm: hour < 12 ? 'am' : 'pm'
    }
  }
  /**
   * @private
   * @method
   * @returns {string}
   */
  insanifyLocation(location) {
    const coord = proj4(location.projection || 'EPSG:3857', 'EPSG:4326', location.coordinate)
    return `${coord[1]}$${coord[0]}$${location.name}$0`
  }
  /**
   * @private
   * @method
   * @param {module:nyc/mta/TripPlanHack~TripPlanHack.SaneRequest} request
   * @returns {Object<string, Object>}
   */
  insanifyRequest(request) {
    const origin = request.origin
    const destination = request.destination
    const projection = request.projection
    const date = this.now()
    return {
      RequestDevicename: 'DESKTOP',
      OriginInput: origin.name,
      DestinationInput: destination.name,
      Arrdep:	'D',
      Hour:	date.hour,
      Minute:	date.minute,
      Ampm:	date.ampm,
      InputDate: date.date,
      Minimize: 'X',
      Walkdist: '0.50',
      Mode:	'FRBC12',
      LineStart: '',
      LineEnd: '',
      Accessible: request.accessible ? 'Y' : 'N',
      OriginCoordinates: this.insanifyLocation(origin),
      DestinationCoordinates: this.insanifyLocation(destination),
      LocationType: '',
      StartServiceType: 'train',
      StartTrainType: 'subway',
      StartBorough: '',
      EndBorough: '',
      Walkincrease: '',
      Maxinitialwait: '',
      Maxtriptime: '',
      Maxtransfers: ''
    }
  }
}

/**
 * @desc Object to define TripPlanHack locations
 * @public
 * @typedef {Object}
 * @property {string} name
 * @property {Array<number>} coordinate projection
 * @property {string} [projection=EPSG:3857]
 */
TripPlanHack.Location

/**
 * @desc Object to pass reasonable parameters to TripPlanHack
 * @public
 * @typedef {Object}
 * @property {TripPlanHack.Location} origin
 * @property {TripPlanHack.Location} destination
 * @property {boolean} accessible
 */
TripPlanHack.SaneRequest

/**
 * @desc Object type to pass to MTA TripPlanner
 * @private
 * @property {string} RequestDevicename
 * @property {string} OriginInput
 * @property {string} DestinationInput
 * @property {string} Arrdep
 * @property {string} Hour
 * @property {string} Minute
 * @property {string} Ampm
 * @property {string} InputDate
 * @property {string} Minimize
 * @property {string} Walkdist
 * @property {string} Mode
 * @property {string} LineStart
 * @property {string} LineEnd
 * @property {string} Accessible
 * @property {string} OriginCoordinates
 * @property {string} DestinationCoordinates
 * @property {string} LocationType
 * @property {string} StartServiceType
 * @property {string} StartTrainType
 * @property {string} StartBorough
 * @property {string} EndBorough
 * @property {string} Walkincrease
 * @property {string} Maxinitialwait
 * @property {string} Maxtriptime
 * @property {string} Maxtransfers
*/
TripPlanHack.InsaneRequest

/**
 * @private
 * @const {string}
 */
TripPlanHack.JUMP_PAGE = '<!DOCTYPE html>' +
'<html>' +
  '<head>' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
  	'<meta charset="utf-8">' +
  	'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">' +
    '<title>Redirecting to MTA TripPlanner...</title>' +
    '<style>' +
      'body, html {' +
        'padding: 0;' +
        'margin: 0;' +
      '}' +
      '#container {' +
        'position: fixed;' +
        'left: 0;' +
        'top: 0;' +
        'bottom: 0;' +
        'right: 0;' +
        'padding: 0 20px;' +
        'background-size: 100px;' +
        'background-position: center 10px;' +
        'background-repeat: no-repeat;' +
        'background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.st0%7Bfill%3A%230039A6%3B%7D.st1%7Bfill%3A%23fff%3B%7D.st2%7Bfill%3Anone%3Bstroke%3A%23fff%3Bstroke-width%3A5%3Bstroke-linecap%3Around%3B%7D%3C%2Fstyle%3E%3Cg%20transform%3D%22translate(28.11026%2C6)%22%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M%200.4%2C106.9%20C%2045.6%2C42.3%20120.6%2C0%20205.4%2C0%20c%20138.1%2C0%20250%2C111.9%20250%2C250%200%2C138.1%20-111.9%2C250%20-250%2C250%20C%20124%2C500%2051.6%2C461%206%2C400.8%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m%2034%2C395.8%20c%200%2C0%200%2C-87.4%20-0.8%2C-97.3%200%2C-9.5%20-4.7%2C-64.2%20-3.7%2C-73.4%20l%202.6%2C0.1%2032.8%2C165.3%2045.9%2C-8.1%2026.7%2C-153.1%20c%200.8%2C0%202.2%2C0%203%2C0%201.4%2C9.4%20-2.4%2C53.8%20-2.4%2C63.3%20-0.8%2C9.9%20-0.8%2C85%20-0.8%2C85%20l%2046.5%2C-8.1%200%2C-230.5%20-72.6%2C-12.6%20-20.4%2C141.2%20C%2090.1%2C267.6%2070.2%2C119.2%2070.2%2C119.2%20L%200%2C107%205.7%2C400.8%22%2F%3E%3Cpolygon%20class%3D%22st1%22%20points%3D%22329.4%2C321.1%20351.8%2C318.2%20354.7%2C339.6%20380.9%2C335.1%20355.8%2C169.2%20324.6%2C163.8%20293%2C350.5%20326.3%2C344.6%22%2F%3E%3Cpolygon%20class%3D%22st1%22%20points%3D%22195.9%2C200.5%20231.1%2C203.6%20231.2%2C361.2%20274.2%2C353.7%20274.2%2C207.4%20302%2C209.7%20302%2C159.5%20195.9%2C141.1%22%2F%3E%3Cpolygon%20class%3D%22st0%22%20points%3D%22339.4%2C225.6%20334.4%2C281.2%20347.3%2C280.4%20342.5%2C225.6%22%2F%3E%3Cpath%20class%3D%22st2%22%20d%3D%22M%200.4%2C106.9%20C%2045.6%2C42.3%20120.6%2C0%20205.4%2C0%20c%20138.1%2C0%20250%2C111.9%20250%2C250%200%2C138.1%20-111.9%2C250%20-250%2C250%20C%20124%2C500%2051.6%2C461%206%2C400.8%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");' +
      '}' +
      'body * {' +
        'font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;' +
        'font-size: 24px;' +
        'font-weight: bold;' +
        'color: #0039A6;' +
      '}' +
      'h1 {' +
        'margin: 120px 0 -6px 0;' +
        'overflow: hidden;' +
      '}' +
      'button {' +
        'background-color: rgba(181,181,181,.1);' +
        'border: 1px solid rgb(221,221,221);' +
        'border-radius: 3px;' +
        'margin: 120px auto 0 auto;' +
        'padding: 10px;' +
        'height: auto;' +
        'width: auto;' +
        'display: block;' +
      '}' +
      'button:hover {' +
        'background-color: rgba(181,181,181,.3);' +
      '}' +
      '#msg, h2 {' +
        'text-align: center;' +
      '}' +
      '#msg {' +
        'display: none;' +
      '}' +
      'iframe {' +
        'visibility: hidden;' +
      '}' +
    '</style>' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.js"></script>' +
  '<head>' +
'<body>' +
  '<div id="container">' +
    '<button onclick="redirect();">Click to be redirected to the MTA TripPlanner</button>' +
    '<h1 id="msg" onclick="redirect();">Redirecting to the MTA TripPlanner<br>&bull;</h1>' +
    '<h2>Depending on your browser settings you may be required to reenter your trip information</h2>' +
  '</div>' +
  '<script>' +
    'var REQUEST_URL = "http://tripplanner.mta.info/MyTrip/handler/customplannerHandler.ashx?";' +
    'var RESPONSE_URL = "http://tripplanner.mta.info/MyTrip/ui_web/customplanner/results.aspx";' +
    'function redirect(){' +
      '$("button").hide();' +
      'var msg = $("#msg").show();' +
      'var iframe = $("<iframe></iframe>");' +
      'setInterval(function(){' +
        'msg.html(msg.html() + "&bull;");' +
      '}, 300);' +
      '$("#container").append(iframe);' +
      'iframe.load(function(){' +
        'document.location = RESPONSE_URL;' +
      '});' +
      'iframe.attr("src", REQUEST_URL + "%QSTR%");' +
    '};' +
  '</script>' +
'</body>' +
'</html>'

export default TripPlanHack