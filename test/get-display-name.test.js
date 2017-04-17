import React from 'react'
import { getDisplayName } from '../src'

describe('for an unnamed stateless functional compoment', () => {
  test('it returns `Component`', () => {
    expect(getDisplayName(() => <div></div>)).toEqual('Component')
  })
})

describe('for a named stateless functional compoment', () => {
  test('it returns the function name', () => {
    const Foo = () => <div></div>
    expect(getDisplayName(Foo)).toEqual('Foo')
  })
})

describe('for a named stateless functional compoment', () => {
  test('it returns the function name', () => {
    function Foo () { return <div></div> }
    expect(getDisplayName(Foo)).toEqual('Foo')
  })
})

describe('for a stateful compoment', () => {
  test('it returns the component name', () => {
    class Foo extends React.Component {
      render() { return <div></div> }
    }
    expect(getDisplayName(Foo)).toEqual('Foo')
  })
})

describe('when the `displayName` is explicitly set', () => {
  test('it returns the display name', () => {
    class Foo extends React.Component {
      static displayName = 'Bar'
      render() { return <div></div> }
    }

    expect(getDisplayName(Foo)).toEqual('Bar')
  })
})