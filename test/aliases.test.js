import { expect } from 'chai'
import { deepExtend, deepMerge } from '../lib'

describe('aliases tests', () => {
  it('deepExtend is an alias for deepMerge', () => {
    expect(deepExtend === deepMerge).to.be.true
  })
})
