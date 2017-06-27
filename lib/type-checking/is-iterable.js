import isArray from './is-array'

export default function isIterable(thing) {
  return (
    isArray(thing) ||
    typeof thing === 'string'
  ) && typeof thing.length === 'number'
}