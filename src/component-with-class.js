import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * A function that adds a default className to a React component or DOM element.
 *
 * This className will be extended by any additional classNames given to the component.
 * 
 * @name componentWithClass
 * @type Function
 * @param {Function|String} component - The React component or DOM element that will receive the default class
 * @param {String} defaultClass - The default class to add to the component
 *
 * @example
 *
 * const Block = componentWithClass('section', 'section-block')
 * const Header = componentWithClass('div', 'section-header')
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

function componentWithClass (WrappedComponent, defaultClass) {
  if (!defaultClass) throw new Error('You must provide a default className to componentWithClass()')
  function ClassWrapper ({ children, className, ...rest }) {
    return (
      <WrappedComponent 
        className={ classnames(defaultClass, className) }
        { ...rest }
      >
        { children }
      </WrappedComponent>
    )
  }
  ClassWrapper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }
  return ClassWrapper
}

export default componentWithClass