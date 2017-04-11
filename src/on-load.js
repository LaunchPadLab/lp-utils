import React from 'react'
import getOr from 'lodash/fp/getOr'
import stubTrue from 'lodash/stubTrue'
import getDisplayName from './get-display-name'

/**
 * A function that returns a React HOC to handle renderWhenal logic for loading state.
 *
 * @param {(String|Function|Object)} renderWhen - Returns true when the wrapped component may render. Will be passed the current props.
 * @param {Function} [LoadingComponent = null] - A component to render during the loading state, will be passed the current props. If not provided, `<p>Loading...</p>` will be rendered.
 * @returns {Function} - Returns a higher order component (HOC) to handle conditional logic for loading states.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  let renderWhen = 'name'
 *
 *  export default onLoad(renderWhen, MyComponent)
**/

export default function onLoad (renderWhen, LoadingComponent=null) {

  const renderWrapped = getRenderWrapped(renderWhen)

  return WrappedComponent =>

    class OnLoad extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `OnLoad(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      render () {
        if (renderWrapped(this.props)) {
          return <WrappedComponent { ...this.props }/>
        }

        if (LoadingComponent) {
          return <LoadingComponent { ...this.props }/>
        }

        return <p>Loading...</p>
      }
    }
}

function getRenderWrapped (renderWhen) {

  const type = typeof renderWhen

  switch(type) {
    case 'function':
      return renderWhen
    case 'string':
      return function (props) {
        const value = getOr(null, renderWhen, props)
        return value && value !== 'loading'
      }
    case 'object':
      return function (props) {
        return Object.keys(renderWhen).every(prop => {
          const value = getOr(null, prop, props)
          return value && value === renderWhen[prop]
        })
      }
    default:
      return stubTrue
  }
}
