import React from 'react'
import { mount } from 'enzyme'
import onLoad from '../src/on-load'

test('`renderWhen` is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const renderWhen = ({ renderMe }) => renderMe
  const Wrapper = onLoad(renderWhen)(Wrapped)
  const component = mount(<Wrapper renderMe={ false }/>)

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ renderMe: true })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ renderMe: false })

  expect(component.find('h1').exists()).toBe(false)
})

test('`renderWhen` is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const renderWhen = 'hello'
  const Wrapper = onLoad(renderWhen)(Wrapped)
  const component = mount(<Wrapper hello={ null }/>)

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ hello: 'loading' })

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ hello: 'done!' })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ hello: { status: 'done' } })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ hello: undefined })

  expect(component.find('h1').exists()).toBe(false)
})

test('`renderWhen` is an array', () => {
  const Wrapped = () => <h1>hi</h1>
  const renderWhen = ['uno', 'dos']
  const Wrapper = onLoad(renderWhen)(Wrapped)
  const component = mount(<Wrapper uno={ null }/>)

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ uno: 'hi' })

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ uno: 'hi', dos: 'bye' })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ uno: 'hello', dos: 'bye' })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ uno: 'loading', dos: 'bye' })

  expect(component.find('h1').exists()).toBe(false)
})

test('`renderWhen` is an object', () => {
  const Wrapped = () => <h1>hi</h1>
  const renderWhen = { uno: 'hi', dos: 'bye' }
  const Wrapper = onLoad(renderWhen)(Wrapped)
  const component = mount(<Wrapper uno={ null }/>)

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ uno: 'hi' })

  expect(component.find('h1').exists()).toBe(false)

  component.setProps({ uno: 'hi', dos: 'bye' })

  expect(component.find('h1').exists()).toBe(true)

  component.setProps({ uno: 'hello', dos: 'bye' })

  expect(component.find('h1').exists()).toBe(false)
})

test('`renderWhen` is something else', () => {
  const Wrapped = () => <h1>hi</h1>
  const renderWhen = 7
  const Wrapper = onLoad(renderWhen)(Wrapped)
  const component = mount(<Wrapper uno={ null }/>)

  expect(component.find('h1').exists()).toBe(true)
})

test('a custom loading component is used', () => {
  const Wrapped = () => <h1>hi</h1>
  const LoadingComponent = () => <label> I am loading </label>
  const Wrapper = onLoad('doLoad', LoadingComponent)(Wrapped)
  const component = mount(<Wrapper />)
  expect(component.find('label').exists()).toBe(true)
  component.setProps({ doLoad: true })
  expect(component.find('label').exists()).toBe(false)
})
