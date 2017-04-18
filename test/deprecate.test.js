import React from 'react'
import { mount } from 'enzyme'
import { deprecate, deprecateComponent } from '../src'

test('deprecate() logs out default message', () => {
  const logger = jest.fn()

  const func = () => 'hi'
  const deprecatedFunc = deprecate(func, '', logger)

  const val = deprecatedFunc()
  
  const defaultMessage = 'DEPRECATED: func is deprecated and will be removed in the next version of this library.'
  expect(logger).toHaveBeenCalledWith(defaultMessage)
  expect(val).toEqual('hi')
})

test('deprecate() logs out custom message', () => {
  const logger = jest.fn()

  const func = () => 'hi'
  const deprecatedFunc = deprecate(func, 'this is a custom deprecation message!', logger)

  const val = deprecatedFunc()
  
  const defaultMessage = 'DEPRECATED: this is a custom deprecation message!'
  expect(logger).toHaveBeenCalledWith(defaultMessage)
  expect(val).toEqual('hi')
})

test('deprecate() rejects non-functions', () => {
  expect(() => deprecate()(666)).toThrow()
})

test('deprecateComponent() logs out default message', () => {
  const logger = jest.fn()

  const MyComponent = () => <p>Hi!</p>
  const Deprecated = deprecateComponent('', logger)(MyComponent)
  mount(<Deprecated/>)

  const defaultMessage = 'DEPRECATED: MyComponent is deprecated and will be removed in the next version of this library.'
  expect(logger).toHaveBeenCalledWith(defaultMessage)
})