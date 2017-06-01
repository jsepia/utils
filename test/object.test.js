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
  }) // end parseUri
})
