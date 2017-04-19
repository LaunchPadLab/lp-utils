import React from 'react'
import { mount } from 'enzyme'
import onMount from '../src/on-mount'

test('`componentDidMount` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = jest.fn()
  const Wrapper = onMount(componentDidMount)(Wrapped)
  mount(<Wrapper greeting='hola' />)

  expect(componentDidMount).toHaveBeenCalledWith({ greeting: 'hola' })
})

test('`componentDidMount` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = 'mountFunction'
  const Wrapper = onMount(componentDidMount)(Wrapped)
  const mountFunction = jest.fn()
  mount(<Wrapper mountFunction={mountFunction} />)

  expect(mountFunction).toHaveBeenCalled()
})

test('`componentDidMount` throws when string param prop is not found, or is not a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = 'mountFunction'
  const Wrapper = onMount(componentDidMount)(Wrapped)
  expect(() => mount(<Wrapper />)).toThrow()
  expect(() => mount(<Wrapper mountFunction="not a function" />)).toThrow()
})


test('`componentDidMount` throws when param is not a string or a function', () => {
  const Wrapped = () => <h1>hi</h1>
  let Wrapper = onMount(25)(Wrapped)
  expect(() => mount(<Wrapper />)).toThrow()
  Wrapper = onMount(null)(Wrapped)
  expect(() => mount(<Wrapper />)).toThrow()
  Wrapper = onMount(undefined)(Wrapped)
  expect(() => mount(<Wrapper />)).toThrow()
})
