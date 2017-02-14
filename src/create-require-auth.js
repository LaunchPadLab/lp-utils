import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import getDisplayName from './get-display-name'

export default function ({ isAuthenticated, onNotAuthenticated }) {

  function mapStateToProps (state) {
    return {
      authenticated: () => isAuthenticated(state),
    }
  }

  return WrappedComponent => {

    class RequireAuth extends React.Component {

      static propTypes = {
        authenticated: PropTypes.func,
        dispatch: PropTypes.func,
      }

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `RequireAuth(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      componentDidMount () {
        if (!this.props.authenticated())
          this.props.dispatch(onNotAuthenticated())
      }

      render () {
        return (
          <WrappedComponent { ...this.props }/>
        )
      }
    }

    return connect(mapStateToProps)(RequireAuth)
  }
}
