import React from 'react'
import { mount } from 'enzyme'
import onMount from '../src/on-mount'

test('`componentDidMount` is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = jest.fn()
  const Wrapper = onMount(componentDidMount)(Wrapped)
  const component = mount(<Wrapper />)

  expect(componentDidMount).toHaveBeenCalled()
})

test('`componentDidMount` is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = 'mountFunction'
  const Wrapper = onMount(componentDidMount)(Wrapped)
  const mountFunction = jest.fn()
  const component = mount(<Wrapper mountFunction={mountFunction} />)

  expect(mountFunction).toHaveBeenCalled()
})
