import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC that adds a default className to the wrapped React component.
 *
 * This className will be extended by any additional classNames given to the component.
 * 
 * @name addDefaultClass
 * @type Function
 * @param {String} defaultClass - The default class to add to the component
 *
 * @example
 *
 * const Block = addDefaultClass('section-block')('section')
 * const Header = addDefaultClass('section-header')('div')
 *
 * function Content () {
 *   return (
 *     <Block>
 *       <Header className="highlighted">
 *         This is some header text!
 *       </Header>
 *     </Block>
 *   )
 * }
 * 
 * // This is equivalent to:
 * // function Content () {
 * //   return (
 * //     <section className="section-block">
 * //       <div className="section-header highlighted">
 * //         This is some header text!
 * //       </div>
 * //     </section>
 * //   )
 * // }
 *
 */

function componentWithClass (defaultClass) {
  return Wrapped => {
    function Wrapper ({ className, ...rest }) {
      return <Wrapped className={ classnames(defaultClass, className) } { ...rest } />
    }
    Wrapper.displayName = wrapDisplayName(Wrapped, 'addDefaultClass')
    Wrapper.propTypes = {
      className: PropTypes.string,
    }
    return Wrapper
  }
}

export default componentWithClass