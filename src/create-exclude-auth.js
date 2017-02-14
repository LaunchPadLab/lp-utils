import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import getDisplayName from './get-display-name'

export default function ({ isAuthenticated, onAuthenticated }) {

  function mapStateToProps (state) {
    return {
      authenticated: () => isAuthenticated(state),
    }
  }

  return WrappedComponent => {

    class ExcludeAuth extends React.Component {

      static propTypes = {
        authenticated: PropTypes.func,
        dispatch: PropTypes.func,
      }

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = `ExcludeAuth(${getDisplayName(WrappedComponent)})`

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      componentDidMount () {
        if (this.props.authenticated())
          this.props.dispatch(onAuthenticated())
      }

      render () {
        return (
          <WrappedComponent { ...this.props }/>
        )
      }
    }

    return connect(mapStateToProps)(ExcludeAuth)
  }
}
