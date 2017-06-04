import { expect } from 'chai'
import { isBrowser } from '../lib'

describe('feature detection tests', () => {
  describe('isBrowser', () => {
    it('returns false for headless environments', () => {
      expect(isBrowser()).to.be.false
    })

    it('returns true for browser environments', () => {
      // TODO find a decent way to test it
      // (function() {
      //   class Window {}
      //   class Document {}
      //   const window = new Window()
      //   const document = new Document()
      //   expect(window).to.be.an('object')
      //   expect(document).to.be.an('object')
      //   expect(window).to.be.an.instanceof(Window)
      //   expect(document).to.be.an.instanceof(Document)
      //   expect(isBrowser()).to.be.true
      // })()
    })
  }) // end parseUri
})
