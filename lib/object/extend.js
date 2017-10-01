import isDefined from '../type-checking/is-defined'

function isPropertyWritable(object, propertyName) {
  const descriptor = Object.getOwnPropertyDescriptor(object, propertyName)
  if (descriptor) {
    return isDefined(descriptor.writable) ? descriptor.writable : true
  }
  else {
    return true
  }
}

function isPropertyEnumerable(object, propertyName) {
  return object.propertyIsEnumerable(propertyName)
}

export default function extend(original, ...overrides) {
  if (!overrides.length) {
    return original
  }

  const override = overrides.shift()
  const props = Object.getOwnPropertyNames(override)
  props.forEach((prop) => {
    if (
      isPropertyEnumerable(override, prop) &&
      isPropertyWritable(original, prop)
    ) {
      original[prop] = override[prop]
    }
  })

  return extend(original, ...overrides)
}
