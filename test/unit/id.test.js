import { expect } from 'chai'
import { generateID } from '../../lib'

describe('ID tests', () => {
  describe('generateID', () => {
    it('generates a numeric ID', () => {
      expect(generateID()).to.be.a('number')
    })

    it('generates auto-incremental IDs', () => {
      expect(generateID()).to.equal(generateID() - 1)
    })
  }) // end generateID
})
