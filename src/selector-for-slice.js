import getOr from 'lodash/fp/getOr'

/**
 *
 * A Redux helper.
 * Given the path of a certain state slice, it returns a function that can be used to create state selectors (helpful for `mapStateToProps()`).
 *
 * @param {String} slicePath - Path to slice of state.
 * @returns {Function} - A function that can be used to create state selectors.
 *
 *
 * @example
 *
 *import { selectorForSlice } from 'lp-utils'
 *
 * const state = {
 *   userSlice: {
 *     user: {
 *       name: 'test'
 *     }
 *   }
 * }
 *
 * const select = selectorForSlice('userSlice')
 *
 * //The resulting select() function has arguments (path, defaultValue)
 *
 * const Selectors = {}
 * Selectors.user = select('user')
 * Selectors.username = select('user.name', 'defaultName')
 *
 * export { Selectors }
 *
 * // These selectors can be called in mapStateToProps() like so:
 * // Selectors.user(state) => { name: 'test' }
 * // Selectors.username(state) => 'test'
 *
 *
**/

export default function selectorForSlice (slicePath) {
  return function (path, defaultValue=null) {
    return function (state) {
      return getOr(defaultValue, `${slicePath}.${path}`, state)
    }
  }
}
