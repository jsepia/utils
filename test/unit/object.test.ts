import { deepMerge, extend } from '../..'

describe('object tests', () => {
  describe('deepExtend', () => {
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
                thumb: ['distal', 'proximal', 'metacarpal']
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
      expect(merged).toEqual({
        body: {
          hands: [
            {
              thumb: ['distal', 'proximal', 'metacarpal']
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
      })
    })

    it('does not merge non-objects', () => {
      expect(deepMerge([1, 2, 3], ['a', 'b', 'c'])).toEqual([1, 2, 3])
    })

    it('does not modify the original object', () => {
      const originalObject = { a: 1 }
      const result = deepMerge(originalObject, { b: 2 })
      expect(result).toBe(originalObject)
    })
  }) // end deepMerge

  describe('extend', () => {
    let feline

    beforeEach(() => {
      feline = {
        fur: true,
        cuteness: 5
      }
    })

    it('creates new keys', () => {
      extend(feline, { msg: 'meow' })
      expect(feline).toHaveProperty('msg')
    })

    it('overrides existing keys', () => {
      extend(feline, { cuteness: 10 })
      expect({ cuteness: 10 }.propertyIsEnumerable('cuteness')).toBe(true)
      expect(Object.getOwnPropertyDescriptor(feline, 'cuteness').writable).toBe(true)
      expect(feline.cuteness).toEqual(10)
    })

    it('shallow-clones', () => {
      const stripes = ['#fff', '#fc0', '#000', '#fc0', '#000', '#fc0', '#fff']
      extend(feline, { stripes: stripes })
      expect(feline.stripes).toBe(stripes)
    })

    it('skips non-writable properties', () => {
      const constants = {
        paws: 4
      }
      Object.freeze(constants)
      extend(constants, { paws: 8 })
      expect(constants.paws).toEqual(4)
    })
  })
})
