import React from 'react'
import getDisplayName from './get-display-name'
/**
 * A function that returns a React HOC to handle logic to be run during the `componentWillUnmount` lifecycle event.
 *
 * See also: {@link onMount}, {@link onUpdate}
 *
 * @param {Function|String} onComponentWillUnmount - A function or a string reference to a function that will be executed with the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function componentWillUnmount (props) {
 *    console.log('Our current props: ', props)
 *  }
 *
 *  export default onUnmount(componentWillUnmount)(MyComponent)
 *
**/

export default function onUnmount (onComponentWillUnmount) {

  return WrappedComponent =>

    class Wrapper extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `OnUnmount(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Invoke the provided function before the component unmounts, passing in
       * any props.
       */
      componentWillUnmount () {
        const type = typeof onComponentWillUnmount
        switch(type) {
          case 'string': {
            const func = this.props[onComponentWillUnmount]
            if (typeof func !== 'function')
              throw `
                OnUnmount: You specified a string argument of '${onComponentWillUnmount}'
                that should correspond to a function prop in ${getDisplayName(WrappedComponent)}
                but there is no function prop with that key
              `
            return func()
          }
          case 'function':
            return onComponentWillUnmount(this.props)
        }
        throw `
          OnMount: The argument provided to onUnmount must be a string or
          function, you provided ${onComponentWillUnmount}
        `
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}
