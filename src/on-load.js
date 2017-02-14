import React from 'react'
import getOr from 'lodash/fp/getOr'
import getDisplayName from './get-display-name'

/*
 * A function that returns a React HOC to handle renderWhenal logic for loading
 * state.
 */
export default function (renderWhen, LoadingComponent=null) {

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

      renderWhenFn () {
        if (typeof renderWhen === 'function') {
          return renderWhen(this.props)
        }
        if (typeof renderWhen === 'string') {
          return getOr(null, renderWhen, this.props) !== 'loading'
        }
        return true
      }

      render () {
        if (this.renderWhenFn()) {
          return <WrappedComponent { ...this.props }/>
        }

        if (LoadingComponent) {
          return <LoadingComponent { ...this.props }/>
        }

        return <p>Loading...</p>
      }
    }
}
