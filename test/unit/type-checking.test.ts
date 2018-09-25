import {
  isArray,
  isDefined,
  isInteger,
  isIterable,
  isNaturalNumber,
  isNumeric,
  isObject,
  isPlainObject
} from '../..'

describe('type detection tests', () => {
  describe('isArray', () => {
    it('returns true for arrays', () => {
      expect(isArray([])).toBe(true)
    })

    it('returns false for non-arrays', () => {
      expect(isArray(null)).toBe(false)
      expect(isArray({})).toBe(false)
      expect(isArray({ length: 2 })).toBe(false)
      expect(isArray('')).toBe(false)
    })
  }) // end isArray

  describe('isDefined', () => {
    it('identifies truthy things as defined', () => {
      expect(isDefined(true)).toBe(true)
      expect(isDefined(NaN)).toBe(true)
      expect(isDefined(1)).toBe(true)
      expect(isDefined('a')).toBe(true)
      expect(isDefined({ a: 1 })).toBe(true)
    })

    it('correctly identifies falsy things that are defined', () => {
      expect(isDefined(false)).toBe(true)
      expect(isDefined('')).toBe(true)
      expect(isDefined({})).toBe(true)
    })

    it('returns false for undefined things', () => {
      const kitty = {}
      expect(isDefined(undefined)).toBe(false)
      expect(isDefined(kitty['wings'])).toBe(false)
    })
  }) // end isDefined

  describe('isIterable', () => {
    it('returns true for objects that have a numeric length property', () => {
      expect(isIterable([])).toBe(true)
      expect(isIterable('')).toBe(true)
      expect(isDefined({ length: 0 })).toBe(true)
    })

    it("returns false for things that aren't iterable", () => {
      expect(isIterable()).toBe(false)
      expect(isIterable(null)).toBe(false)
      expect(isIterable(true)).toBe(false)
      expect(isIterable(1)).toBe(false)
      expect(isIterable({})).toBe(false)
      expect(isIterable({ length: true })).toBe(false)
    })
  }) // end isIterable

  describe('isInteger', () => {
    it('returns true for integer numbers and strings that represent integers', () => {
      expect(isInteger(-95)).toBe(true)
      expect(isInteger('5')).toBe(true)
      expect(isInteger('-5')).toBe(true)
    })

    it('returns false for numbers that are not integers', () => {
      expect(isInteger(Math.PI)).toBe(false)
    })

    it('returns false for strings that are not integers', () => {
      expect(isInteger('5.5')).toBe(false)
    })

    it('returns false for things that are not numbers or strings', () => {
      expect(isNumeric()).toBe(false)
      expect(isNumeric(null)).toBe(false)
      expect(isNumeric(true)).toBe(false)
      expect(isNumeric({})).toBe(false)
      expect(isNumeric([])).toBe(false)
    })
  }) // end isInteger

  describe('isNaturalNumber', () => {
    it('returns true for natural numbers and strings that represent natural numbers', () => {
      expect(isNaturalNumber(0)).toBe(true)
      expect(isNaturalNumber(95)).toBe(true)
      expect(isNaturalNumber('0')).toBe(true)
      expect(isNaturalNumber('5')).toBe(true)
    })

    it('returns false for negative numbers', () => {
      expect(isNaturalNumber(-1)).toBe(false)
    })

    it('returns false for decimal numbers', () => {
      expect(isNaturalNumber(Math.PI)).toBe(false)
    })

    it('returns false for strings that are not natural numbers', () => {
      expect(isNaturalNumber('5.5')).toBe(false)
      expect(isNaturalNumber('-5')).toBe(false)
    })

    it('returns false for things that are not numbers or strings', () => {
      expect(isNaturalNumber()).toBe(false)
      expect(isNaturalNumber(null)).toBe(false)
      expect(isNaturalNumber(true)).toBe(false)
      expect(isNaturalNumber({})).toBe(false)
      expect(isNaturalNumber([])).toBe(false)
    })
  }) // end isNaturalNumber

  describe('isNumeric', () => {
    it('returns true for numbers and numeric strings', () => {
      expect(isNumeric(-95)).toBe(true)
      expect(isNumeric('5.6')).toBe(true)
      expect(isNumeric('-5.6')).toBe(true)
      expect(isNumeric('5px')).toBe(true)
    })

    it('returns false for strings that are not numeric', () => {
      expect(isNumeric('five')).toBe(false)
      expect(isNumeric('E79')).toBe(false)
    })

    it('returns false for things that are not numbers or strings', () => {
      expect(isNumeric()).toBe(false)
      expect(isNumeric(null)).toBe(false)
      expect(isNumeric(true)).toBe(false)
      expect(isNumeric({})).toBe(false)
      expect(isNumeric([])).toBe(false)
    })
  }) // end isNumeric

  describe('isObject', () => {
    it('returns true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject(new Boolean())).toBe(true)
      expect(isObject(new Number())).toBe(true)
      expect(isObject(new String())).toBe(true)

      class MyClass {}
      expect(isObject(new MyClass())).toBe(true)
    })

    it('returns false for primitives that occasionally exhibit object-like behavior', () => {
      expect(isObject(3)).toBe(false)
      expect(isObject('')).toBe(false)
    })

    it('returns false for non-objects', () => {
      expect(isObject(undefined)).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject(NaN)).toBe(false)
    })
  }) // end isObject

  describe('isPlainObject', () => {
    it('returns true for plain objects', () => {
      expect(isPlainObject({})).toBe(true)
    })

    it('returns false for arrays', () => {
      expect(isPlainObject([])).toBe(false)
    })

    it('returns false for instances', () => {
      expect(isPlainObject(new Boolean())).toBe(false)
      expect(isPlainObject(new Number())).toBe(false)
      expect(isPlainObject(new String())).toBe(false)

      class MyClass {}
      expect(isPlainObject(new MyClass())).toBe(false)
    })

    it('returns false for primitives that occasionally exhibit object-like behavior', () => {
      expect(isPlainObject(3)).toBe(false)
      expect(isPlainObject('')).toBe(false)
    })

    it('returns false for objects with a custom constructor', () => {
      var MyClass = function MyClass() {}
      MyClass.prototype.constructor = {}
      expect(isPlainObject(new MyClass())).toBe(false)
    })

    it('returns false for non-objects', () => {
      expect(isPlainObject(undefined)).toBe(false)
      expect(isPlainObject(null)).toBe(false)
      expect(isPlainObject(NaN)).toBe(false)
    })
  }) // end isPlainObject
})
