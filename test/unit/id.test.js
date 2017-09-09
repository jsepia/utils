import { expect } from 'chai'
import { generateID, IDGenerator } from '../../lib'

describe('ID tests', () => {
  describe('generateID', () => {
    it('generates a numeric ID', () => {
      expect(generateID()).to.be.a('number')
    })

    it('generates auto-incremental IDs', () => {
      expect(generateID()).to.equal(generateID() - 1)
    })
  }) // end generateID

  describe('IDGenerator', () => {
    let generator

    beforeEach(() => {
      generator = new IDGenerator()
    })

    it('starts at zero', () => {
      expect(generator.generateID()).to.equal(0)
    })

    it('generates auto-incremental IDs', () => {
      expect(generator.generateID()).to.equal(generator.generateID() - 1)
    })

    it('multiple generators are independent of each other', () => {
      const generator2 = new IDGenerator()
      generator2.generateID()
      generator2.generateID()
      generator2.generateID()
      expect(generator2.generateID()).to.equal(3)
      expect(generator.generateID()).to.equal(0)
    })
  }) // end IDGenerator
})
