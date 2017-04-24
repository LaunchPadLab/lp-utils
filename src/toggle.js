import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import getDisplayName from './get-display-name'

/**
 * A function that returns a React HOC that provides a toggle value and toggle function to the wrapped component.
 * For each toggle name given, the wrapped component will receive the following props:
 *
 * `<toggleName>Active`: a boolean with the current state of the toggle value, default = false.
 *
 * `set<ToggleName>`: a function that will set the toggle value to a given boolean value.
 *
 * `toggle<ToggleName>`: a function that will toggle the toggle value.
 *
 * Toggle also exposes a `togglePropTypes` function to automatically generate PropTypes for these props.
 * 
 * @param {...string} toggles - One or more toggle names.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 *
 * @example
 *
 * function ComponentWithTooltip ({ message, tooltipActive, toggleTooltip, ... }) {
 *   return (
 *     <div>
 *       <button onClick={ toggleTooltip }>Click Me</button>
 *       { 
 *         tooltipActive &&
 *         <div className="tooltip">
 *           { message }
 *         </div>
 *       }
 *     </div>
 *   )
 * }
 * 
 * ComponentWithTooltip.propTypes = {
 *   ...togglePropTypes('tooltip'),
 *   message: PropTypes.string
 *
**/

export default function (...toggles) {

  return WrappedComponent =>

    class Toggle extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `Toggle(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      constructor (props) {
        super(props)

        /*
         * The active state of each toggle
         */
        this.state = toggles.reduce((state, toggle) =>
          ({ ...state, [toggleStateName(toggle)]: false }),
          {}
        )

        /*
         * The setter functions
         */
        this.setters = toggles.reduce((setters, toggle) =>
          ({ ...setters, [setterFuncName(toggle)]: (val) => this.set.bind(this, toggleStateName(toggle), val)() }),
          {}
        )

        /*
         * The toggle functions
         */
        this.toggles = toggles.reduce((togglers, toggle) =>
          ({ ...togglers, [toggleFuncName(toggle)]: this.toggle.bind(this, toggleStateName(toggle)) }),
          {}
        )
      }

      /*
       * Set the active state for the provided toggle name
       */
      set (toggleName, val) {
        if (typeof val !== 'boolean') throw 'Toggle can only be set to a boolean value.'
        this.setState({ [toggleName]: val })
      }

      /*
       * Toggle the active state for the provided toggle name
       */
      toggle (toggleName) {
        this.setState(prevState => ({ ...prevState, [toggleName]: !prevState[toggleName] }))
      }

      /*
       * Render the wrapped component with provided props, the active states of
       * the toggles and the toggle functions.
       */
      render () {
        return (
          <WrappedComponent
            { ...this.props }
            { ...this.state }
            { ...this.setters }
            { ...this.toggles }
          />
        )
      }
    }
}

function toggleStateName (toggle) {
  return camelCase([toggle, 'active'].join(' '))
}

function setterFuncName (toggle) {
  return camelCase(['set', toggle].join(' '))
}

function toggleFuncName (toggle) {
  return camelCase(['toggle', toggle].join(' '))
}

export function togglePropTypes (...toggles) {
  const propTypes = {}
  toggles.forEach((toggle) => {
    propTypes[toggleStateName(toggle)] = PropTypes.bool
    propTypes[setterFuncName(toggle)] = PropTypes.func
    propTypes[toggleFuncName(toggle)] = PropTypes.func
  })
  return propTypes
}

