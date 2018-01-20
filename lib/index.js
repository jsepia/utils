import isBrowser from './feature-detection/is-browser'
import generateID from './id/generate-id'
import IDGenerator from './id/id-generator'
import deepExtend from './object/deep-extend'
import extend from './object/extend'
import indexOfRegex from './string/index-of-regex'
import lastIndexOfRegex from './string/last-index-of-regex'
import isArray from './type-checking/is-array'
import isDefined from './type-checking/is-defined'
import isIterable from './type-checking/is-iterable'
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
  isIterable,
  isNumeric,
  isObject,
  isPlainObject,
  buildUri,
  parseUri,
  isValidUrl,
}

export default {
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
  isIterable,
  isNumeric,
  isObject,
  isPlainObject,
  buildUri,
  parseUri,
  isValidUrl,
}
