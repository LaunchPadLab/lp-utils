import React from 'react'
import { mount } from 'enzyme'
import { onUpdate } from '../src/'

test('update function is called with when props are updated', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidUpdate = jest.fn()
  const Wrapper = onUpdate(componentDidUpdate)(Wrapped)

  const initialProps = { foo: 0, bar: true }
  const component = mount(<Wrapper { ...initialProps }/>)

  expect(component.find('h1').exists()).toBe(true)

  const newProps = { foo: 1, bar: false }
  component.setProps(newProps)

  expect(componentDidUpdate).toHaveBeenCalled()
})

test('update function is called with current and previous props', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidUpdate = jest.fn()
  const Wrapper = onUpdate(componentDidUpdate)(Wrapped)

  const initialProps = { foo: 0, bar: true }
  const component = mount(<Wrapper { ...initialProps }/>)

  expect(component.find('h1').exists()).toBe(true)

  const newProps = { foo: 1, bar: false }
  component.setProps(newProps)

  const functionCall = componentDidUpdate.mock.calls.pop()
  const [firstArg, secondArg] = functionCall

  expect(firstArg).toEqual(newProps)
  expect(secondArg).toEqual(initialProps)
})
