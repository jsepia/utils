// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import isBrowser from './feature-detection/is-browser'
import generateID from './id/generate-id'
import IDGenerator from './id/id-generator'
import deepExtend from './object/deep-extend'
import extend from './object/extend'
import indexOfRegex from './string/index-of-regex'
import lastIndexOfRegex from './string/last-index-of-regex'
import isArray from './type-checking/is-array'
import isDefined from './type-checking/is-defined'
import isInteger from './type-checking/is-integer'
import isIterable from './type-checking/is-iterable'
import isNaturalNumber from './type-checking/is-natural-number'
import isNumeric from './type-checking/is-numeric'
import isObject from './type-checking/is-object'
import isPlainObject from './type-checking/is-plain-object'
import buildUri from './uri/build-uri'
import parseUri from './uri/parse-uri'
import isValidUrl from './validation/is-valid-url'

// aliases for backwards compatibility
const deepMerge = deepExtend

export {
  isBrowser,
  generateID,
  IDGenerator,
  deepExtend,
  deepMerge,
  extend,
  indexOfRegex,
  lastIndexOfRegex,
  isArray,
  isDefined,
  isInteger,
  isIterable,
  isNaturalNumber,
  isNumeric,
  isObject,
  isPlainObject,
  buildUri,
  parseUri,
  isValidUrl
}
