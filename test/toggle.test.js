import React, { PropTypes } from 'react'
import { shallow } from 'enzyme'
import { toggle, togglePropTypes } from '../src/'


test('toggle provides a toggle value and setter function', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('test')(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { testActive, setTest } = component.props()
  expect(testActive).toBe(false)
  expect(typeof setTest).toBe('function')

  // Call setter
  setTest(true)
  expect(component.props().testActive).toBe(true)
  setTest(false)
  expect(component.props().testActive).toBe(false)

  // Don't allow non-bool values
  expect(() => setTest('string')).toThrow()
})

test('toggle provides a toggle value and toggle function', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('test')(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { testActive, toggleTest } = component.props()
  expect(testActive).toBe(false)
  expect(typeof toggleTest).toBe('function')

  // Call toggle
  toggleTest()
  expect(component.props().testActive).toBe(true)
  toggleTest()
  expect(component.props().testActive).toBe(false)
})

test('toggleProptypes creates proptypes with the correct name and value', () => {
  const expectedPropTypes = {
    testActive: PropTypes.bool,
    setTest: PropTypes.func,
    toggleTest: PropTypes.func,
    test2Active: PropTypes.bool,
    setTest2: PropTypes.func,
    toggleTest2: PropTypes.func,
  }
  expect(togglePropTypes('test', 'test2')).toEqual(expectedPropTypes)
})
