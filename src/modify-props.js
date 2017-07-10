import React from 'react'

/**
 * A function that returns a React HOC that modifies a component's props using a given function.
 *
 * The given `modFunction`, called with the component's props,
 * should return an object that will be merged with those props.
 *
 * 
 * This HOC can be used to combine props and build functions
 * that don't belong in `mapStateToProps` or `mapDispatchToProps`.
 *
 * @name modifyProps
 * @type Function
 * @param {Function} modFunction - A function that modifies the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * // modifyProps is used to create a custom saving function by combining
 * // props created by mapStateToProps() and mapDispatchToProps()
 *
 * function SaveableProfile ({ name, save }) {
 *   return (
 *     <div>
 *       <h1>{ name }</h1>
 *       <button onClick={ save }>
 *         Save this profile
 *       </button>
 *     </div>
 *   )
 * }
 *
 * function mapStateToProps (state) {
 *    return {
 *       id: selectors.profileId(state)
 *    }
 * }
 * 
 * const mapDispatchToProps = { 
 *    saveProfile: actions.saveProfile
 * }
 *
 * function modify ({ id, saveProfile }) {
 *    return {
 *       save: () => saveProfile(id)
 *    }
 * }
 * 
 * export default compose(
 *    connect(mapStateToProps, mapDispatchToProps),
 *    modifyProps(modify),
 * )(SaveableProfile)
 *
**/

const returnEmptyObj = () => ({})

export default function modifyProps (modFunction=returnEmptyObj) {
  return WrappedComponent =>
    function Wrapper (props) {
      const newProps = { ...props, ...modFunction(props) }
      return <WrappedComponent { ...newProps } />
    }
}
