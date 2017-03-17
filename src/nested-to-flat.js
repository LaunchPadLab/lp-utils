
/**
 * Returns an object where the keys are string paths converted from nested objects. This is the opposite of {@link flatToNested}.
 * 
 * @param {Object} obj - A nested object
 * @param {String} [prefix] - A string prefix to prepend to the keys of root object, typically only used internally.
 * @returns {Object} - An object of key-value pairs where the keys are strings of the form `part1[.part2, ...]`
 * @example
 * const nestedObj = {
 *   foo: {
 *     bar: {
 *       baz: 'hello'
 *     }
 *   },
 *   space: 'world'
 * }
 * 
 * nestedToFlat(nestedObj)
 * 
 * // {
 * //   'foo.bar.baz': 'hello',
 * // }
 */

export default function nestedToFlat (obj, prefix=null) {
  if (!obj) return obj
  return Object
    .keys(obj)
    .reduce((result, key) => {
      const value = obj[key]
      if (typeof value === 'object' && !(value instanceof Array)) {
        return { ...result, ...nestedToFlat(value, pre(key, prefix)) }
      } else {
        return { ...result, [pre(key, prefix)]: value }
      }
    }, {})
}

function pre (key, prefix) {
  return prefix ? `${prefix}.${key}` : key
}
