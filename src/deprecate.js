/* eslint no-console: 0 */

function defaultMessage (func) {
  return `${func.name} is deprecated and will be removed in the next version of this library.`
}

export default function deprecate (func, message, log=console.warn) {
  if (typeof func !== 'function') throw 'You can only deprecate functions'
  const warning = message || defaultMessage(func)
  log(`DEPRECATED: ${warning}`)
  return func
}
