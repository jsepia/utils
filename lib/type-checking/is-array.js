import isObject from './is-object'

export default function isArray(thing) {
  return isObject(thing) && typeof thing.length === 'number'
}
