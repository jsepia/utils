import isInteger from './is-integer'

export default function isNaturalNumber(thing) {
  return isInteger(thing) && parseInt(thing) >= 0
}
