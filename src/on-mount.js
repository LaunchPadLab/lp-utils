import React from 'react'
import getDisplayName from './get-display-name'

/*
 * A function that returns a React HOC to handle logic to be run during
 * the `componentDidMount` lifecycle event.
 */
export default function (onComponentDidMount) {

  return WrappedComponent =>

    class OnMount extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `OnMount(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Invoke the provided function after the component mounts, passing in
       * any props.
       */
      componentDidMount () {
        const type = typeof onComponentDidMount
        switch(type) {
          case 'string':
            return this.props[onComponentDidMount]()
          case 'function':
            return onComponentDidMount(this.props)
        }
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}
