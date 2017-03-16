import { PropTypes } from 'react'
import { togglePropTypes } from '../src/'

test('toggleProptypes create proptypes with the correct name and value', () => {
  const expectedPropTypes = {
    testActive: PropTypes.bool,
    toggleTest: PropTypes.func,
    test2Active: PropTypes.bool,
    toggleTest2: PropTypes.func,
  }
  expect(togglePropTypes('test', 'test2')).toEqual(expectedPropTypes)
})
