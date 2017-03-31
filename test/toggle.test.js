import React, { PropTypes } from 'react'
import { mount } from 'enzyme'
import compose from 'lodash/fp/compose'
import { toggle, togglePropTypes, onUpdate, onMount } from '../src/'

test('toggle provides a toggle value and function', (done) => {

  // Calls the toggle function on mount, then makes sure the value is toggled on update

  const Wrapped = () => <h1>Hi</h1>

  const onMountFunction = ({ testActive, toggleTest }) => {
    expect(testActive).toBe(false)
    toggleTest()
  }

  const onUpdateFunction = ({ testActive }) => {
    expect(testActive).toBe(true)
    done()
  }

  const Wrapper = compose(
    toggle('test'),
    onMount(onMountFunction),
    onUpdate(onUpdateFunction),
  )(Wrapped)

  mount(<Wrapper/>)
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
