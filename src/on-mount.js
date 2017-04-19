import React from 'react'
import getDisplayName from './get-display-name'
/**
 * A function that returns a React HOC to handle logic to be run during the `componentDidMount` lifecycle event.
 *
 * See also: {@link onUpdate}.
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
          case 'string': {
            const func = this.props[onComponentDidMount]
            if (typeof func !== 'function')
              throw `
                OnMount: You specified a string argument of '${onComponentDidMount}'
                that should correspond to a function prop in ${getDisplayName(WrappedComponent)}
                but there is no function prop with that key
              `
            return func()
          }
          case 'function':
            return onComponentDidMount(this.props)
        }
        throw `
          OnMount: The argument provided to onMount must be a string or
          function, you provided ${onComponentDidMount}
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
