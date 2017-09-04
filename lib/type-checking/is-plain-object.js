import isArray from './is-array'
import isObject from './is-object'

function isNonArrayObject(obj) {
  return isObject(obj) || !isArray(obj)
}

export default function isPlainObject(obj) {
  if (obj === null || typeof obj === 'undefined') {
    return false
  }

  if (!isNonArrayObject(obj)) {
    return false
  }

  const constructor = obj.constructor
  if (typeof constructor !== 'function') {
    return false
  }

  if (constructor !== Object) {
    return false
  }

  return true
}