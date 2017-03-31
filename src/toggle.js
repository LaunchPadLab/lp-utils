import React, { PropTypes } from 'react'
import camelCase from 'lodash/camelCase'
import getDisplayName from './get-display-name'

/**
 * A function that returns a React HOC that provides a toggle value and toggle function to the wrapped component.
 * For each toggle name given, the wrapped component will receive the following props:
 *
 * `<toggleName>Active`: a boolean with the current state of the toggle value, default = false.
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
         * The toggle functions
         */
        this.toggles = toggles.reduce((togglers, toggle) =>
          ({ ...togglers, [toggleFuncName(toggle)]: this.toggle.bind(this, toggleStateName(toggle)) }),
          {}
        )
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
            { ...this.toggles }
          />
        )
      }
    }
}

function toggleStateName (toggle) {
  return camelCase([toggle, 'active'].join(' '))
}

function toggleFuncName (toggle) {
  return camelCase(['toggle', toggle].join(' '))
}

export function togglePropTypes (...toggles) {
  const propTypes = {}
  toggles.forEach((toggle) => {
    propTypes[toggleStateName(toggle)] = PropTypes.bool
    propTypes[toggleFuncName(toggle)] = PropTypes.func
  })
  return propTypes
}

