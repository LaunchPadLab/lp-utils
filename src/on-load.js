import React from 'react'
import getOr from 'lodash/fp/getOr'
import stubTrue from 'lodash/stubTrue'
import getDisplayName from './get-display-name'

/**
 * A function that returns a React HOC to handle renderWhen logic for loading state.
 *
 * For the renderWhen param, the type can be one of the following:
 * * String - The name of a prop to wait for. When the prop is defined and not equal to 'loading', the component will render.
 * * Function - A function that recieves the component props and returns a boolean. When it returns true, the component will render.
 * * Array - An array of prop names to wait for. Each prop name will be evaluated using the `String` rules.
 * * Object - An object where the keys are prop names and the values are expected values. When the prop values are equal to the expected values, the component will render.
 *
 * @param {(String|Function|Object)} renderWhen - A rule indicating when the wrapped component may render.
 * @param {Function} [LoadingComponent = null] - A component to render during the loading state, will be passed the current props. If not provided, `<p>Loading...</p>` will be rendered.
 * @returns {Function} - Returns a higher order component (HOC) to handle conditional logic for loading states.
 * @example
 *
 *  function MyComponent (name) {
 *    return (
 *      <p>{name}</p>
 *    )
 *  }
 *
 *  const renderWhen = 'name'
 *
 *  onLoad(renderWhen, MyComponent)
 *  // When prop 'name' value evaluates to true, MyComponent will be rendered.
 *  // Otherwise, <p>Loading...</p> will be rendered.
**/

export default function onLoad (renderWhen, LoadingComponent=null) {

  const doRender = getRenderCondition(renderWhen)

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
        if (doRender(this.props)) {
          return <WrappedComponent { ...this.props }/>
        }

        if (LoadingComponent) {
          return <LoadingComponent { ...this.props }/>
        }

        return <p>Loading...</p>
      }
    }
}

function getRenderCondition (renderWhen) {

  let type = typeof renderWhen
  if (Array.isArray(renderWhen)) type = 'array'

  switch(type) {
    case 'function':
      return renderWhen
    case 'string':
      return function (props) {
        return propIsPresent(renderWhen, props)
      }
    case 'array':
      return function (props) {
        return renderWhen.every(propName => {
          return propIsPresent(propName, props)
        })
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

// Returns true if prop is truthy and doesn't equal 'loading'
function propIsPresent (propName, props) {
  const value = getOr(null, propName, props)
  return value && value !== 'loading'
}
