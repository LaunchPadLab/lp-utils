import React, { PropTypes } from 'react'
import { shallow } from 'enzyme'
import compose from 'lodash/fp/compose'
import { toggle, togglePropTypes } from '../src/'

test('toggle provides a toggle value and function', () => {

  const Wrapped = () => <h1>Hi</h1>

  const Wrapper = compose(
    toggle('test')
  )(Wrapped)

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
    toggleTest: PropTypes.func,
    test2Active: PropTypes.bool,
    toggleTest2: PropTypes.func,
  }
  expect(togglePropTypes('test', 'test2')).toEqual(expectedPropTypes)
})
