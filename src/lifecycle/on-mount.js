import React from 'react'
import getDisplayName from '../get-display-name'
import { callWithProps } from './helpers'

/**
 * A function that returns a React HOC to handle logic to be run during the `componentDidMount` lifecycle event.
 *
 * See also: {@link onUnmount}, {@link onUpdate}
 *
 * @param {Function|String} onComponentDidMount - A function or a string reference to a function that will be executed with the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function componentDidMount (props) {
 *    console.log('Our current props: ', props)
 *  }
 *
 *  export default onMount(componentDidMount)(MyComponent)
 *
**/

export default function onMount (onComponentDidMount) {

  return WrappedComponent =>

    class Wrapper extends React.Component {

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
        callWithProps(onComponentDidMount, this.props)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}
