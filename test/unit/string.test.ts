import { indexOfRegex, lastIndexOfRegex } from '../..'

describe('string tests', () => {
  describe('indexOfRegex', () => {
    it('finds the first index of a regex in a string', () => {
      expect(indexOfRegex('are you my mommy?', /m/)).toEqual(8)
    })

    it('supports the start parameter', () => {
      expect(indexOfRegex('are you my mommy?', /m/, 9)).toEqual(11)
    })

    it('returns -1 when no occurrences are found', () => {
      expect(indexOfRegex('are you my mommy?', /\d/)).toEqual(-1)
    })
  }) // end indexOfRegex

  describe('lastIndexOfRegex', () => {
    it('finds the last index of a regex in a string', () => {
      expect(lastIndexOfRegex('are you my mommy?', /m/g)).toEqual(14)
    })

    it('supports non-global regexes', () => {
      expect(lastIndexOfRegex('are you my mommy?', /m/, 9)).toEqual(8)
    })

    it('supports the start parameter', () => {
      expect(lastIndexOfRegex('are you my mommy?', /m/g, 9)).toEqual(8)
    })

    it('supports out-of-bounds values for the start parameter', () => {
      expect(lastIndexOfRegex('are you my mommy?', /m/g, -999)).toEqual(-1)
    })

    it('returns -1 when no occurrences are found', () => {
      expect(lastIndexOfRegex('are you my mommy?', /\d/g)).toEqual(-1)
    })
  }) // end lastIndexOfRegex
})
