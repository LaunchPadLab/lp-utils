import React from 'react'
import { mount } from 'enzyme'
import { onUnmount } from '../src'

test('`componentWillUnmount` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentWillUnmount = jest.fn()
  const UnmountWrapper = onUnmount(componentWillUnmount)(Wrapped)
  const wrapper = mount(<UnmountWrapper greeting='hola' />)
  expect(componentWillUnmount).not.toHaveBeenCalled()
  wrapper.unmount()
  expect(componentWillUnmount).toHaveBeenCalledWith({ greeting: 'hola' })
})

test('`componentWillUnmount` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const UnmountWrapper = onUnmount('unmountFunctionName')(Wrapped)
  const unmountFunction = jest.fn()
  const wrapper = mount(<UnmountWrapper unmountFunctionName={unmountFunction} />)
  expect(unmountFunction).not.toHaveBeenCalled()
  wrapper.unmount()
  expect(unmountFunction).toHaveBeenCalled()
})

test('`componentWillUnmount` throws when string param prop is not found, or is not a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentWillUnmount = 'mountFunction'
  const UnmountWrapper = onUnmount(componentWillUnmount)(Wrapped)
  expect(() => mount(<UnmountWrapper />).unmount()).toThrow()
  expect(() => mount(<UnmountWrapper mountFunction="not a function" />).unmount()).toThrow()
})


test('`componentWillUnmount` throws when param is not a string or a function', () => {
  const Wrapped = () => <h1>hi</h1>
  let UnmountWrapper = onUnmount(25)(Wrapped)
  expect(() => mount(<UnmountWrapper />).unmount()).toThrow()
  UnmountWrapper = onUnmount(null)(Wrapped)
  expect(() => mount(<UnmountWrapper />).unmount()).toThrow()
  UnmountWrapper = onUnmount(undefined)(Wrapped)
  expect(() => mount(<UnmountWrapper />).unmount()).toThrow()
})
