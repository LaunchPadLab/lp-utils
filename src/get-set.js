import React, { Component } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import getDisplayName from './get-display-name'

function getSet (names=[], options={}) {

  // Transform names to array
  const varNames = Array.isArray(names) ? names : [names]

  // Parse options
  const { initialValues={} } = options

  return WrappedComponent =>

    class Wrapper extends Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `GetSet(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      constructor () {
        super()
        this.state = getInitialState(varNames, initialValues)
        this.set = this.set.bind(this)
      }
      set (varName, value) {
        this.setState({ [varName]: value })
      }
      render () {
        return (
          <WrappedComponent {...{ 
            ...buildSetters(varNames, this.set),
            ...this.state,
            ...this.props,
          }}/>
        )
      }
    }
}

// Set initial values if defined
function getInitialState (varNames, initialValues) {
  const state = {}
  varNames.forEach(varName => {
    state[varName] = initialValues[varName] || null
  })
  return state
}

// Return a hash of setter functions
function buildSetters (varNames, set) {
  const setters = {}
  varNames.forEach(varName => {
    setters[setterFuncName(varName)] = (value) => set(varName, value)
  })
  return setters
}

function setterFuncName (varName) {
  return camelCase(['set', varName].join(' '))
}

export function getSetPropTypes (names=[]) {
  const varNames = Array.isArray(names) ? names : [names]
  const propTypes = {}
  varNames.forEach(varName => {
    propTypes[varName] = PropTypes.any
    propTypes[setterFuncName(varName)] = PropTypes.func
  })
  return propTypes
}

export default getSet