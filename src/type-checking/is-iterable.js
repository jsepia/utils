export default function isIterable(thing) {
  return (
    thing != null &&
    typeof thing[Symbol.iterator] === 'function'
  )
}
