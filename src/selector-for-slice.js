import getOr from 'lodash/fp/getOr'

export default function (slicePath) {
  return function (path, defaultValue=null) {
    return function (state) {
      return getOr(defaultValue, `${slicePath}.${path}`, state)
    }
  }
}