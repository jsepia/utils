import { expect } from 'chai'
import { deepMerge } from '../lib'

describe('object tests', () => {
  describe('deepMerge', () => {
    it('merges objects deeply', () => {
      const merged = deepMerge(
        {
          'body': {
            'ribs': 5,
            'neck': {
              'skull': null
            }
          }
        },
        {
          'body': {
            'hands': [
              {
                'thumb': [
                  'distal',
                  'proximal',
                  'metacarpal'
                ]
              }
            ]
          }
        },
        {
          'tail': true
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
          tail: true
        }
      )
    })
  }) // end parseUri
})
