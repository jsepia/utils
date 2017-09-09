import assert from 'assert'
import * as utils from '../..'

assert(utils.isDefined(true))
assert(!utils.isDefined(undefined))
