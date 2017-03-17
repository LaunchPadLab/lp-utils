import set from 'lodash/fp/set'

/**
 * Returns an object where the keys are converted from string paths to nested objects.  This is the opposite of {@link nestedToFlat}.
 * 
 * @param {Object} obj - An object of key-value pairs where the keys are strings of the form `part1[.part2, ...]`
 * @returns {Object} A potentially nested object
 * @example
 * const flatObj = {
 *   'foo.bar.baz': 'hello',
 *   space: 'world'
 * }
 * 
 * flatToNested(flatObj)
 * 
 * // {
 * //   foo: {
 * //     bar: {
 * //       baz: 'hello'
 * //     }
 * //   },
 * //   space: 'world'
 * // }
 */

export default function flatToNested (obj) {
  if (!obj) return obj
  return Object
    .keys(obj)
    .reduce((result, key) => {
      const value = obj[key]
      return set(key, value, result)
    }, {})
}
