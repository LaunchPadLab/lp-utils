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
