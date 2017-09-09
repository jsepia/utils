export default function extend(original, overrides) {
  const props = Object.getOwnPropertyNames(overrides)
  props.forEach((prop) => {
    original[prop] = overrides[prop]
  })
  return original
}
