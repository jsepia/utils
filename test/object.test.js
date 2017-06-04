import { expect } from 'chai'
import { deepMerge } from '../lib'

describe('object tests', () => {
  describe('deepMerge', () => {
    it('merges objects deeply', () => {
      const merged = deepMerge(
        {
          body: {
            ribs: 5,
            neck: {
              skull: null
            }
          }
        },
        {
          body: {
            hands: [
              {
                thumb: [
                  'distal',
                  'proximal',
                  'metacarpal'
                ]
              }
            ]
          }
        },
        {
          tail: {
            length: 9
          }
        }
      )
      expect(merged).to.deep.equal(
        {
          body: {
            hands: [
              {
                thumb: [
                  'distal',
                  'proximal',
                  'metacarpal'
                ]
              }
            ],
            neck: {
              skull: null
            },
            ribs: 5
          },
          tail: {
            length: 9
          }
        }
      )
    })

    it('does not merge non-objects', () => {
      expect(deepMerge([1, 2, 3], ['a', 'b', 'c'])).to.deep.equal([1, 2, 3])
    })

    it('does not modify the original object', () => {
      const originalObject = { a: 1 }
      const result = deepMerge(originalObject, {b:2})
      expect(result).to.deep.equal(originalObject)
    })
  }) // end deepMerge
})
