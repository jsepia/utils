import { generateID } from '../..'

describe('ID tests', () => {
  describe('generateID', () => {
    it('generates a numeric ID', () => {
      expect(typeof generateID()).toBe('number')
    })

    it('generates auto-incremental IDs', () => {
      expect(generateID()).toEqual(generateID() - 1)
    })
  }) // end generateID
})
