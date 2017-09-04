import isPlainObject from '../type-checking/is-plain-object'

function deepClone()

export default function clone(value) {
  switch (typeof value) {
    case 'object':
      return deepClone(value)
  }
}