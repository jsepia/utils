export default function isNumeric(thing) {
  if (typeof thing === 'number') {
    return true
  }
  else if (typeof thing === 'string') {
    return !isNaN(parseInt(thing))
  }
  return false
}
