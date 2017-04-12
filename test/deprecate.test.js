import { deprecate } from '../src'

test('logs out default message', () => {

  const logger = jest.fn()

  const func = () => 'hi'
  const deprecatedFunc = deprecate(func, '', logger)
  
  const defaultMessage = 'DEPRECATED: func is deprecated and will be removed in the next version of this library.'
  const messageLogged = logger.mock.calls.pop().pop()

  expect(messageLogged).toEqual(defaultMessage)
  expect(deprecatedFunc()).toEqual('hi')
})

test('logs out custom message', () => {

  const logger = jest.fn()

  const func = () => 'hi'
  const deprecatedFunc = deprecate(func, 'this is a custom deprecation message!', logger)
  
  const defaultMessage = 'DEPRECATED: this is a custom deprecation message!'
  const messageLogged = logger.mock.calls.pop().pop()

  expect(messageLogged).toEqual(defaultMessage)
  expect(deprecatedFunc()).toEqual('hi')
})

test('rejects non-functions', () => {
  expect(() => deprecate()(666)).toThrow()
})
