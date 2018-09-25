import { deepExtend, deepMerge } from '../../'

describe('aliases tests', () => {
  it('deepExtend is an alias for deepMerge', () => {
    expect(deepExtend === deepMerge).toBe(true)
  })
})
