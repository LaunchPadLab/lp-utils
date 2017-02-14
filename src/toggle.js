import React from 'react'
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

      constructor () {
        super()
        this.state = toggles.reduce((state, toggle) =>
          ({ ...state, [toggleStateName(toggle)]: false }),
          {}
        )
        this.toggles = toggles.reduce((togglers, toggle) =>
          ({ ...togglers, [toggleFuncName(toggle)]: this.toggle.bind(this, toggleStateName(toggle)) }),
          {}
        )
      }

      toggle (toggleName) {
        this.setState(prevState => ({ ...prevState, [toggleName]: !prevState[toggleName] }))
      }

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
  return `${toggle}Active`
}

function toggleFuncName (toggle) {
  return `toggle${toggle}`
}
