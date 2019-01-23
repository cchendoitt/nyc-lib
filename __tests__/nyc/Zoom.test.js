import ZoomSearch from 'nyc/Zoom'
import Container from 'nyc/Container'
import AutoComplete from 'nyc/AutoComplete'

test('FIX ME', () => {})
/*
let container
beforeEach(() => {
  container = $('<div id="map"></div>')
  $('body').append(container)
})

afterEach(() => {
  container.remove()
})

test('constructor', () => {
  expect.assertions(4)

  const zoomSearch = new ZoomSearch(container)
  expect(zoomSearch instanceof Container).toBe(true)
  expect(zoomSearch instanceof ZoomSearch).toBe(true)
  expect(zoomSearch.isAddrSrch).toBe(true)
  expect(zoomSearch.getContainer().hasClass('z-srch')).toBe(true)
})

test('abstract methods', () => {
  expect.assertions(2)

  const zoomSearch = new ZoomSearch(container)
  expect(() => {zoomSearch.zoom('event')}).toThrow('Not implemented')
  expect(() => {zoomSearch.featureAsLocation('feature', 'options')}).toThrow('Not implemented')
})

describe('hookupEvents called from constructor', () => {
  const key = ZoomSearch.prototype.key
  const zoom = ZoomSearch.prototype.zoom
  const geolocate = ZoomSearch.prototype.geolocate
  const listClick = ZoomSearch.prototype.listClick
  beforeEach(() => {
    ZoomSearch.prototype.key = jest.fn()
    ZoomSearch.prototype.zoom = jest.fn()
    ZoomSearch.prototype.geolocate = jest.fn()
    ZoomSearch.prototype.listClick = jest.fn()
  })
  afterEach(() => {
    ZoomSearch.prototype.key = key
    ZoomSearch.prototype.zoom = zoom
    ZoomSearch.prototype.geolocate = geolocate
    ZoomSearch.prototype.listClick = listClick
  })

  test('hookupEvents', () => {
    expect.assertions(21)

    const zoomSearch = new ZoomSearch(container)

    expect(zoomSearch.getContainer().html()).toBe($(ZoomSearch.HTML).html())

    expect(zoomSearch.input.length).toBe(1)
    expect(zoomSearch.input.get(0)).toBe(container.find('.srch input').get(0))

    expect(zoomSearch.list.length).toBe(1)
    expect(zoomSearch.list.get(0)).toBe(container.find('.srch ul').get(0))
    expect(zoomSearch.retention.length).toBe(1)
    expect(zoomSearch.retention.get(0)).toBe(container.find('ul.retention').get(0))

    zoomSearch.input.trigger('keyup')
    zoomSearch.input.trigger('change')
    expect(ZoomSearch.prototype.key).toHaveBeenCalledTimes(2)
    expect(ZoomSearch.prototype.key.mock.calls[0][0].type).toBe('keyup')
    expect(ZoomSearch.prototype.key.mock.calls[0][0].target).toBe(zoomSearch.input.get(0))
    expect(ZoomSearch.prototype.key.mock.calls[1][0].type).toBe('change')
    expect(ZoomSearch.prototype.key.mock.calls[1][0].target).toBe(zoomSearch.input.get(0))

    zoomSearch.input.trigger('focus')

    container.find('.btn-z-in, .btn-z-out').trigger('click')
    expect(ZoomSearch.prototype.zoom).toHaveBeenCalledTimes(2)
    expect(ZoomSearch.prototype.zoom.mock.calls[0][0].type).toBe('click')
    expect(ZoomSearch.prototype.zoom.mock.calls[0][0].target).toBe(container.find('.btn-z-in').get(0))
    expect(ZoomSearch.prototype.zoom.mock.calls[1][0].type).toBe('click')
    expect(ZoomSearch.prototype.zoom.mock.calls[1][0].target).toBe(container.find('.btn-z-out').get(0))

    container.find('.btn-geo').trigger('click')
    expect(ZoomSearch.prototype.geolocate).toHaveBeenCalledTimes(1)
    expect(ZoomSearch.prototype.geolocate.mock.calls[0][0].type).toBe('click')
    expect(ZoomSearch.prototype.geolocate.mock.calls[0][0].target).toBe(container.find('.btn-geo').get(0))

    $(document).trigger('mouseup')
    expect(ZoomSearch.prototype.listClick).toHaveBeenCalledTimes(1)
  })
})

test('key keyCode is 13 and isAddrSrch is true', () => {
  expect.assertions(3)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.triggerSearch = jest.fn()
  zoomSearch.filterList = jest.fn()
  zoomSearch.list.show()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.key({keyCode: 13})

  expect(zoomSearch.triggerSearch).toHaveBeenCalledTimes(1)
  expect(zoomSearch.filterList).toHaveBeenCalledTimes(0)

  return test().then(visible => expect(visible).toBe('none'))
})

test('key keyCode not 13 and isAddrSrch is true', () => {
  expect.assertions(3)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.triggerSearch = jest.fn()
  zoomSearch.filterList = jest.fn()
  zoomSearch.list.show()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.key({keyCode: 39})

  expect(zoomSearch.triggerSearch).toHaveBeenCalledTimes(0)
  expect(zoomSearch.filterList).toHaveBeenCalledTimes(1)

  return test().then(visible => expect(visible).toBe('block'))
})

test('key keyCode not 13 and isAddrSrch is false', () => {
  expect.assertions(3)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.isAddrSrch = false
  zoomSearch.triggerSearch = jest.fn()
  zoomSearch.filterList = jest.fn()
  zoomSearch.list.show()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.key({keyCode: 39})

  expect(zoomSearch.triggerSearch).toHaveBeenCalledTimes(0)
  expect(zoomSearch.filterList).toHaveBeenCalledTimes(1)

  return test().then(visible => expect(visible).toBe('block'))
})

test('key keyCode is 13 and isAddrSrch is false', () => {
  expect.assertions(3)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.isAddrSrch = false
  zoomSearch.triggerSearch = jest.fn()
  zoomSearch.filterList = jest.fn()
  zoomSearch.list.show()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.key({keyCode: 13})

  expect(zoomSearch.triggerSearch).toHaveBeenCalledTimes(0)
  expect(zoomSearch.filterList).toHaveBeenCalledTimes(1)

  return test().then(visible => expect(visible).toBe('block'))
})

test('clearTxt', () => {
  expect.assertions(3)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.val = jest.fn()
  zoomSearch.clearBtn = jest.fn()

  zoomSearch.clearTxt()

  expect(zoomSearch.val).toHaveBeenCalledTimes(1)
  expect(zoomSearch.val.mock.calls[0][0]).toBe('')
  expect(zoomSearch.clearBtn).toHaveBeenCalledTimes(1)
})

test('filterList no autoComplete', () => {
  expect.assertions(2)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.emptyList = jest.fn()
  zoomSearch.showList = jest.fn()

  zoomSearch.filterList()

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)
  expect(zoomSearch.showList).toHaveBeenCalledTimes(1)
})


test('filterList no input', () => {
  expect.assertions(2)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.autoComplete = 'mock-auto-complete'
  zoomSearch.emptyList = jest.fn()
  zoomSearch.showList = jest.fn()

  zoomSearch.filterList()

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)
  expect(zoomSearch.showList).toHaveBeenCalledTimes(1)
})

test('filterList has autoComplete and input', () => {
  expect.assertions(6)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.val('typed')
  zoomSearch.autoComplete = {filter: jest.fn()}
  zoomSearch.emptyList = jest.fn()
  zoomSearch.showList = jest.fn()

  zoomSearch.filterList()

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(0)
  expect(zoomSearch.showList).toHaveBeenCalledTimes(1)
  expect(zoomSearch.autoComplete.filter).toHaveBeenCalledTimes(1)
  expect(zoomSearch.autoComplete.filter.mock.calls[0][0]).toBe(zoomSearch.retention)
  expect(zoomSearch.autoComplete.filter.mock.calls[0][1]).toBe(zoomSearch.list)
  expect(zoomSearch.autoComplete.filter.mock.calls[0][2]).toBe('typed')
})

test('showList with focus', () => {
  expect.assertions(4)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.list.append('<li data-id="one"><a href="#">one</li><li data-id="two"><a href="#">two</a></li>').hide()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 1000)
    })
  }

  zoomSearch.showList(true)

  return test().then(visible => {
    expect(visible).toBe('block')
    expect(zoomSearch.list.children().length).toBe(2)
    expect(zoomSearch.list.children().first().find('a').attr('tabindex')).toBe('0')
    expect(zoomSearch.list.children().first().find('a').is(':focus')).toBe(true)
  })
})

test('showList without focus', () => {
  expect.assertions(4)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.list.append('<li>one</li><li>two</li>').hide()

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 1000)
    })
  }

  zoomSearch.showList(false)

  return test().then(visible => {
    expect(visible).toBe('block')
    expect(zoomSearch.list.children().length).toBe(2)
    expect(zoomSearch.list.children().first().attr('tabindex')).not.toBe('0')
    expect(zoomSearch.list.children().first().is(':focus')).not.toBe(true)
  })
})

test('geolocated', () => {
  expect.assertions(2)

  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.on('geolocate', handler)
  zoomSearch.val('something')

  zoomSearch.geolocate()

  expect(zoomSearch.val()).toBe('')
  expect(handler).toHaveBeenCalledTimes(1)
})

test('triggerSearch has value', () => {
  expect.assertions(2)

  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.input.val('an address')
  zoomSearch.on('search', handler)

  zoomSearch.triggerSearch()

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler.mock.calls[0][0]).toBe('an address')
})

test('triggerSearch no value', () => {
  expect.assertions(1)

  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.input.val('')
  zoomSearch.on('search', handler)

  zoomSearch.triggerSearch()

  zoomSearch.input.val(' ')

  zoomSearch.triggerSearch()

  expect(handler).toHaveBeenCalledTimes(0)
})

test('val', () => {
  expect.assertions(4)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.input.val('an address')

  expect(zoomSearch.val()).toBe('an address')
  expect(zoomSearch.input.val()).toBe('an address')

  expect(zoomSearch.val('another address')).toBe('another address')
  expect(zoomSearch.input.val()).toBe('another address')
})

test('disambiguate no possible', () => {
  expect.assertions(1)

  const ambiguous = {
    input: 'an address',
    possible: []
  }

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.showList = jest.fn()

  zoomSearch.disambiguate(ambiguous)

  expect(zoomSearch.showList).toHaveBeenCalledTimes(0)
})

test('disambiguate has possible', () => {
  expect.assertions(9)

  const ambiguous = {
    input: 'an address',
    possible: [{name: 'possible 1'}, {name: 'possible 2'}]
  }

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.listItem = (options, data) => {
    return $('<li></li>')
		  .addClass(options.layerName)
      .html(data.name)
  }
  zoomSearch.emptyList = jest.fn()
  zoomSearch.showList = jest.fn()

  zoomSearch.disambiguate(ambiguous)

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)
  expect(zoomSearch.showList).toHaveBeenCalledTimes(1)
  expect(zoomSearch.list.children().length).toBe(2)
  expect(zoomSearch.list.children().get(0).tagName.toUpperCase()).toBe('LI')
  expect($(zoomSearch.list.children().get(0)).html()).toBe('possible 1')
  expect($(zoomSearch.list.children().get(0)).hasClass('addr')).toBe(true)
  expect(zoomSearch.list.children().get(1).tagName.toUpperCase()).toBe('LI')
  expect($(zoomSearch.list.children().get(1)).html()).toBe('possible 2')
  expect($(zoomSearch.list.children().get(1)).hasClass('addr')).toBe(true)
})

test('setFeatures/sortAlphapetically no nameField no displayField has placeholder', () => {
  expect.assertions(26)

  const options = {
    layerName: 'a-layer',
    placeholder: 'a placeholder...',
    features: [
      {properties: {name: 'feature 3'}},
      {properties: {name: 'feature 1'}},
      {properties: {name: 'feature 2'}},
      {properties: {name: 'feature 2'}},
      {properties: {name: 'feature 4'}}
    ]
  }

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.emptyList = jest.fn()
  zoomSearch.listItem = (options, data) => {
    return $('<li></li>')
		  .addClass(options.layerName)
      .html(data.name)
  }
  zoomSearch.featureAsLocation = (feature, opts) => {
    expect(opts).toBe(options)
    return feature.properties
  }

  expect(zoomSearch.autoComplete).toBe(null)

  zoomSearch.setFeatures(options)

  expect(zoomSearch.autoComplete instanceof AutoComplete).toBe(true)

  expect(zoomSearch.input.attr('placeholder')).toBe('a placeholder...')
  expect(container.find('.retention').children().length).toBe(5)
  expect($(container.find('.retention').children().get(0)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(0)).html()).toBe('feature 1')
  expect($(container.find('.retention').children().get(1)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(1)).html()).toBe('feature 2')
  expect($(container.find('.retention').children().get(2)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(2)).html()).toBe('feature 2')
  expect($(container.find('.retention').children().get(3)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(3)).html()).toBe('feature 3')
  expect($(container.find('.retention').children().get(4)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(4)).html()).toBe('feature 4')

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)

  const autoComplete = zoomSearch.autoComplete
  zoomSearch.setFeatures(options)
  expect(autoComplete).toBe(zoomSearch.autoComplete)
})

test('setFeatures/sortAlphapetically has nameField has displayField no placeholder', () => {
  expect.assertions(18)

  const options = {
    layerName: 'a-layer',
    nameField: 'label',
    displayField: 'label',
    features: [
      {
        properties: {label: 'feature 3'},
        get(prop) {return this.properties[prop]}
      },
      {
        properties: {label: 'feature 1'},
        get(prop) {return this.properties[prop]}
      },
      {
        properties: {label: 'feature 2'},
        get(prop) {return this.properties[prop]}
      }
    ]
  }

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.emptyList = jest.fn()
  zoomSearch.listItem = (options, data) => {
    return $('<li></li>')
		  .addClass(options.layerName)
      .html(data.label)
  }
  zoomSearch.featureAsLocation = (feature, opts) => {
    expect(opts).toBe(options)
    return feature.properties
  }

  expect(zoomSearch.autoComplete).toBe(null)

  zoomSearch.setFeatures(options)

  expect(zoomSearch.autoComplete instanceof AutoComplete).toBe(true)

  expect(zoomSearch.input.attr('placeholder')).toBe('Search for an address...')
  expect(container.find('.retention').children().length).toBe(3)
  expect($(container.find('.retention').children().get(0)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(0)).html()).toBe('feature 1')
  expect($(container.find('.retention').children().get(1)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(1)).html()).toBe('feature 2')
  expect($(container.find('.retention').children().get(2)).hasClass('a-layer')).toBe(true)
  expect($(container.find('.retention').children().get(2)).html()).toBe('feature 3')

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)

  const autoComplete = zoomSearch.autoComplete
  zoomSearch.setFeatures(options)
  expect(autoComplete).toBe(zoomSearch.autoComplete)
})

test('removeFeatures', () => {
  expect.assertions(4)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.list.html('<li class="a-layer"></li><li class="b-layer"></li><li class="a-layer"></li>')
  container.find('.retention').html('<li class="a-layer"></li><li class="a-layer"></li><li class="b-layer"></li>')

  zoomSearch.removeFeatures('a-layer')

  expect(zoomSearch.list.children().length).toBe(1)
  expect($(zoomSearch.list.children().get(0)).hasClass('a-layer')).toBe(false)
  expect(container.find('.retention').children().length).toBe(1)
  expect($(container.find('.retention').children().get(0)).hasClass('a-layer')).toBe(false)
})

test('listItem addr no displayField', () => {
  expect.assertions(13)

  const options = {
    layerName: 'addr',
    nameField: 'name',
    displayField: 'display'
  }
  const data = {name: 'a name', data: {}}

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.disambiguated = jest.fn()

  const li = zoomSearch.listItem(options, data)

  expect(li.length).toBe(1)
  expect(li.get(0).tagName.toUpperCase()).toBe('LI')
  expect(li.hasClass('addr')).toBe(true)
  expect(li.hasClass('feature')).toBe(false)
  expect(li.hasClass('notranslate')).toBe(true)
  expect(li.attr('translate')).toBe('no')
  expect(li.html()).toBe('<a href="#">a name</a>')
  expect(li.data('nameField')).toBe('name')
  expect(li.data('displayField')).toBe('display')
  expect(li.data('location')).toBe(data)

  li.trigger('click')
  expect(zoomSearch.disambiguated).toHaveBeenCalledTimes(1)
  expect(zoomSearch.disambiguated.mock.calls[0][0].type).toBe('click')
  expect(zoomSearch.disambiguated.mock.calls[0][0].currentTarget).toBe(li.get(0))
})

test('listItem not addr has displayField', () => {
  expect.assertions(13)

  const options = {
    layerName: 'a-layer',
    nameField: 'name',
    displayField: 'label'
  }

  const data = {name: 'a name', data: {label: 'a label'}}

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.disambiguated = jest.fn()

  const li = zoomSearch.listItem(options, data)

  expect(li.length).toBe(1)
  expect(li.get(0).tagName.toUpperCase()).toBe('LI')
  expect(li.hasClass('addr')).toBe(false)
  expect(li.hasClass('feature')).toBe(true)
  expect(li.hasClass('notranslate')).toBe(true)
  expect(li.attr('translate')).toBe('no')
  expect(li.html()).toBe('<a href="#">a label</a>')
  expect(li.data('nameField')).toBe('name')
  expect(li.data('displayField')).toBe('label')
  expect(li.data('location')).toBe(data)

  li.trigger('click')
  expect(zoomSearch.disambiguated).toHaveBeenCalledTimes(1)
  expect(zoomSearch.disambiguated.mock.calls[0][0].type).toBe('click')
  expect(zoomSearch.disambiguated.mock.calls[0][0].currentTarget).toBe(li.get(0))
})

test('emptyList', () => {
  expect.assertions(9)
  const zoomSearch = new ZoomSearch(container)

  zoomSearch.list.append('<li data-id="one"><a href="#">one</li><li data-id="two"><a href="#">two</a></li>')

  zoomSearch.emptyList()

  expect(zoomSearch.list.children().length).toBe(0)
  expect(zoomSearch.retention.children().length).toBe(2)
  expect($(zoomSearch.retention.children().get(0)).find('a').html()).toBe('one')
  expect($(zoomSearch.retention.children().get(1)).find('a').html()).toBe('two')

  zoomSearch.list.append('<li data-id="one"><a href="#">one</li><li data-id="three"><a href="#">three</a></li>')
  
  zoomSearch.emptyList()

  expect(zoomSearch.list.children().length).toBe(0)
  expect(zoomSearch.retention.children().length).toBe(3)
  expect($(zoomSearch.retention.children().get(0)).find('a').html()).toBe('one')
  expect($(zoomSearch.retention.children().get(1)).find('a').html()).toBe('two')
  expect($(zoomSearch.retention.children().get(2)).find('a').html()).toBe('three')
})

test('disambiguated is LI', () => {
  expect.assertions(6)

  const handler = jest.fn()
  const data = {name: 'a name', data: {label: 'a label'}}
  const li = $('<li class="feature">a label</li>')
    .data('location', data)

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.emptyList = jest.fn()
  zoomSearch.list.append(li).show()
  zoomSearch.on('disambiguated', handler)

  zoomSearch.disambiguated({currentTarget: li.get(0)})

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler.mock.calls[0][0]).toBe(data)
  expect(handler.mock.calls[0][0].isFeature).toBe(true)
  expect(zoomSearch.val()).toBe('a name')

  expect(zoomSearch.emptyList).toHaveBeenCalledTimes(1)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }
  return test().then(visible => expect(visible).toBe('none'))
})

test('listClick list closed', () => {
  expect.assertions(1)

  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  const li = $('<li></li>')
  const event = {
    originalEvent: {
      target: li.get(0)
    }
  }
  zoomSearch.list.append(li).hide()
  li.on('click', handler)

  zoomSearch.listClick(event)
  expect(handler).toHaveBeenCalledTimes(0)
})

test('listClick list open but not clicked', () => {
  expect.assertions(2)
  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  const li = $('<li></li>')
  const event = {
    originalEvent: {
      target: document.body
    }
  }
  zoomSearch.list.append(li).show()
  li.on('click', handler)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.listClick(event)

  expect(handler).toHaveBeenCalledTimes(0)
  return test().then(visible => expect(visible).toBe('none'))
})

test('listClick list open is clicked but no autoComplete', () => {
  expect.assertions(2)
  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  const li = $('<li></li>')
  const event = {
    originalEvent: {
      target: li.get(0)
    }
  }
  zoomSearch.list.append(li).show()
  li.on('click', handler)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.listClick(event)

  expect(handler).toHaveBeenCalledTimes(0)
  return test().then(visible => expect(visible).toBe('block'))
})

test('listClick list open is clicked and has autoComplete', () => {
  expect.assertions(2)
  const handler = jest.fn()

  const zoomSearch = new ZoomSearch(container)

  zoomSearch.autoComplete = 'mock-auto-complete'

  const li = $('<li></li>')
  const event = {
    originalEvent: {
      target: li.get(0)
    }
  }
  zoomSearch.list.append(li).show()
  li.on('click', handler)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(zoomSearch.list.css('display'))
      }, 500)
    })
  }

  zoomSearch.listClick(event)

  expect(handler).toHaveBeenCalledTimes(1)
  return test().then(visible => expect(visible).toBe('block'))
})
*/