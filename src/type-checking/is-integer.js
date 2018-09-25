import isNumeric from './is-numeric'

export default function isInteger(thing) {
  if (isNumeric(thing)) {
    const parsed = parseFloat(thing)
    return parsed === Math.floor(parsed)
  }
  else {
    return false
  }
}
