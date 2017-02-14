import set from 'lodash/fp/set'

export default function (obj) {
  if (!obj) return obj
  return Object
    .keys(obj)
    .reduce((result, key) => {
      const value = obj[key]
      return set(key, value, result)
    }, {})
}
