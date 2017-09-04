import { expect } from 'chai'
import { isArray, isDefined, isIterable, isObject, isPlainObject } from '../lib'

describe('type detection tests', () => {
  describe('isArray', () => {
    it('returns true for arrays', () => {
      expect(isArray([])).to.be.true
    })

    it('returns false for non-arrays', () => {
      expect(isArray(null)).to.not.be.true
      expect(isArray({})).to.not.be.true
      expect(isArray('')).to.not.be.true
    })
  }) // end isArray

  describe('isDefined', () => {
    it('identifies truthy things as defined', () => {
      expect(isDefined(true)).to.be.true
      expect(isDefined(NaN)).to.be.true
      expect(isDefined(1)).to.be.true
      expect(isDefined('a')).to.be.true
      expect(isDefined({a:1})).to.be.true
    })

    it('correctly identifies falsy things that are defined', () => {
      expect(isDefined(false)).to.be.true
      expect(isDefined('')).to.be.true
      expect(isDefined({})).to.be.true
    })

    it('returns false for undefined things', () => {
      const kitty = {}
      expect(isDefined(undefined)).to.not.be.true
      expect(isDefined(kitty.wings)).to.not.be.true
    })
  }) // end isDefined

  describe('isIterable', () => {
    it('returns true for objects that have a numeric length property', () => {
      expect(isIterable([])).to.be.true
      expect(isIterable('')).to.be.true
      expect(isDefined({length:0})).to.be.true
    })

    it('returns false for things that aren\'t iterable', () => {
      expect(isIterable()).to.not.be.true
      expect(isIterable(null)).to.not.be.true
      expect(isIterable(true)).to.not.be.true
      expect(isIterable(1)).to.not.be.true
      expect(isIterable({})).to.not.be.true
      expect(isIterable({length: true})).to.not.be.true
    })
  }) // end isIterable

  describe('isObject', () => {
    it('returns true for objects', () => {
      expect(isObject({})).to.be.true
      expect(isObject(new Boolean())).to.be.true
      expect(isObject(new Number())).to.be.true
      expect(isObject(new String())).to.be.true

      class MyClass {}
      expect(isObject(new MyClass())).to.be.true
    })

    it('returns false for primitives that occasionally exhibit object-like behavior', () => {
      expect(isObject(3)).to.not.be.true
      expect(isObject('')).to.not.be.true
    })

    it('returns false for non-objects', () => {
      expect(isObject(undefined)).to.not.be.true
      expect(isObject(null)).to.not.be.true
      expect(isObject(NaN)).to.not.be.true
    })
  }) // end isObject
  
  describe('isPlainObject', () => {
    it('returns true for plain objects', () => {
      expect(isPlainObject({})).to.be.true
    })

    it('returns false for arrays', () => {
      expect(isPlainObject([])).to.not.be.true
    })
    
    it('returns false for instances', () => {
      expect(isPlainObject(new Boolean())).to.not.be.true
      expect(isPlainObject(new Number())).to.not.be.true
      expect(isPlainObject(new String())).to.not.be.true

      class MyClass {}
      expect(isPlainObject(new MyClass())).to.not.be.true
    })
    
    it('returns false for primitives that occasionally exhibit object-like behavior', () => {
      expect(isPlainObject(3)).to.not.be.true
      expect(isPlainObject('')).to.not.be.true
    })

    it('returns false for objects with a custom constructor', () => {
      var MyClass = function MyClass() {}
      MyClass.prototype.constructor = {}
      expect(isPlainObject(new MyClass())).to.not.be.true
    })

    it('returns false for non-objects', () => {
      expect(isPlainObject(undefined)).to.not.be.true
      expect(isPlainObject(null)).to.not.be.true
      expect(isPlainObject(NaN)).to.not.be.true
    })
  }) // end isPlainObject
})
