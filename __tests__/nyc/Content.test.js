import Content from 'nyc/Content'
import ReplaceTokens from 'nyc/ReplaceTokens'
import $ from '../jquery.mock'

const values = {
    speed: 'quick',
    color: 'brown',
    animal: 'fox',
    action: 'jumped over',
    otherAnimal: 'lazy dog',
}
const messages = [
  {
    animal: '${color} ${animal} ',
    action: '${action} the ${otherAnimal}',
    when: '${when} the ${clock}',
    '.set-html': 'hello',
    '#yup': 'hello ${name}'
  },
  {
    speed: 'the ${speed} ${animal} ',
    when: '${when} the ${clock}'
  }
]
const url = 'https://maps.nyc.gov/data.csv'
const csv = 'key,value\nspeed,the ${speed} ${animal} \nwhen,${when} the ${clock}'

const warn = console.warn
let div0, div1
beforeEach(() => {
  div0 = $('<div class="set-html"></div>')
  div1 = $('<div id="yup"></div>')
  $('body').append(div0).append(div1)
  console.warn = jest.fn()
  fetch.resetMocks()
})
afterEach(() => {
  div0.remove()
  div1.remove()
  console.warn = warn
})

test('constructor', () => {
  expect.assertions(5)

  const content = new Content(messages)

  expect(content instanceof ReplaceTokens).toBe(true)
  expect(content instanceof Content).toBe(true)

  expect(content.messages).toEqual({
      animal: '${color} ${animal} ',
      action: '${action} the ${otherAnimal}',
      when: '${when} the ${clock}',
      speed: 'the ${speed} ${animal} ',
    '.set-html': 'hello',
    '#yup': 'hello ${name}'
  })

  expect(console.warn).toHaveBeenCalledTimes(1)
  expect(console.warn.mock.calls[0][0]).toBe("Overwriting message with key 'when'")
})

test('message', () => {
  expect.assertions(3)

  const content = new Content(messages)

  expect(content.message('foo', values)).toBe('')
  expect(content.message('animal', values)).toBe('brown fox ')
  expect(content.message('action', null)).toBe('${action} the ${otherAnimal}')
})

test('loadCsv returns Promise', () => {
  expect.assertions(3)

  fetch.mockResponseOnce(csv)

  expect(Content.loadCsv({
    url: url
  }) instanceof Promise).toBe(true)

  expect(fetch.mock.calls.length).toEqual(1)
  expect(fetch.mock.calls[0][0]).toEqual(url)
})

test('loadCsv with provided messages', () => {
  expect.assertions(6)

  fetch.mockResponseOnce(csv)

  return Content.loadCsv({
    url: url,
    messages: [messages[0]]
  }).then(content => {
    expect(content instanceof Content).toBe(true)

    expect(content.messages).toEqual({
      animal: '${color} ${animal} ',
      action: '${action} the ${otherAnimal}',
      when: '${when} the ${clock}',
      speed: 'the ${speed} ${animal} ',
      '.set-html': 'hello',
      '#yup': 'hello ${name}'
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(url)

    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn.mock.calls[0][0]).toBe("Overwriting message with key 'when'")
  })
})

test('loadCsv with no messages', () => {
  expect.assertions(4)

  fetch.mockResponseOnce(csv)

  return Content.loadCsv({
    url: url
  }).then(content => {
    expect(content instanceof Content).toBe(true)
    expect(content.messages).toEqual({
      when: '${when} the ${clock}',
      speed: 'the ${speed} ${animal} '
    })
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(url)
  })
})

test('applyToDom', () => {
  expect.assertions(4)

  const content = new Content(messages)

  expect(div0.html()).toBe('')
  expect(div1.html()).toBe('')

  content.applyToDom({name: 'fred'})

  expect(div0.html()).toBe('hello')
  expect(div1.html()).toBe('hello fred')

})