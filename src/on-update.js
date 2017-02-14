import React from 'react'
import getDisplayName from './get-display-name'

/*
 * A function that returns a React HOC to handle logic to be run during
 * the `componentDidUpdate` lifecycle event.
 */
export default function (onComponentDidUpdate) {

  return WrappedComponent =>

    class OnUpdate extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `OnUpdate(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Invoke the provided function after the component updates, passing in
       * the current and previous props.
       */
      componentDidUpdate (prevProps) {
        onComponentDidUpdate(this.props, prevProps)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}
