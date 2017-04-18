/* eslint no-console: 0 */

import getDisplayName from './get-display-name'
import onMount from './on-mount'

/**
 * A function that logs a deprecation warning in the console every time a given function is called.
 * If you're deprecating a React component, use `deprecateComponent` as indicated in the example below.
 *
 * If no message is provided, the default deprecation message is:
 * - `<functionName> is deprecated and will be removed in the next version of this library.`
 * 
 * @param {Function} func - The function that is being deprecated
 * @param {String} [message] - A custom message to display
 * @param {Function} [log=console.warn] - A function for logging the message
 *
 * @example
 *
 * // In my-func.js
 *
 * function myFunc () {
 *   return 'hey!'
 * }
 * 
 * export default deprecate(myFunc, 'Do not use!')
 * 
 * // In another file:
 * 
 * import myFunc from './my-func'
 * 
 * myFunc() // -> 'hey!'
 * // Console will show warning: 'DEPRECATED: Do not use!'
 *
 *
 * // If you're deprecating a React component, use deprecateComponent as an HOC:
 *
 * const MyComponent = () => <p>Hi</p>
 * export default deprecateComponent('Do not use this component')(MyComponent)
 *
 * // When component is mounted, console will show warning: 'DEPRECATED: Do not use this component'
 *
 */

export function deprecate (func, message, log=console.warn) {
  if (typeof func !== 'function') throw 'You can only deprecate functions'
  const warning = message || defaultMessage(func)
  return function wrapped (...args) {
    log(`DEPRECATED: ${warning}`)
    return func(...args)
  }
}

// Uses onMount to display message on mount (instead of render)
export function deprecateComponent (message, log=console.warn) {
  return function wrap (Component) {
    const warning = message || defaultMessage(Component)
    return onMount(
      () => log(`DEPRECATED: ${warning}`)
    )(Component)
  }
}

function defaultMessage (func) {
  return `${getDisplayName(func)} is deprecated and will be removed in the next version of this library.`
}