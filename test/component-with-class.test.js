import React from 'react'
import { mount } from 'enzyme'
import { componentWithClass } from '../src/'

test('componentWithClass adds default class to functional components', () => {
  const Wrapped = () => <h1>hi</h1>
  const Wrapper = componentWithClass(Wrapped, 'foo')
  const component = mount(<Wrapper />)
  expect(component.find(Wrapped).props().className).toEqual('foo')
})

test('componentWithClass adds default class to string tags', () => {
  const Wrapper = componentWithClass('div', 'foo')
  const component = mount(<Wrapper />)
  expect(component.find('div').props().className).toEqual('foo')
})

test('componentWithClass extends className instead of overriding', () => {
  const Wrapper = componentWithClass('div', 'foo')
  const component = mount(<Wrapper className="bar" />)
  expect(component.find('div').props().className).toEqual('foo bar')
})

test('componentWithClass requires defaultClass to be provided', () => {
  expect(() => componentWithClass('div')).toThrow()
})