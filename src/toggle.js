import React from 'react'
import camelCase from 'lodash/camelCase'
import getDisplayName from './get-display-name'

/*
 * A function that returns a React HOC to handle basic toggling logic.
 */
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
