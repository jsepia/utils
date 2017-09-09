const assert = require('assert')
const utils = require('../..')

assert(utils.isDefined(true))
assert(!utils.isDefined(undefined))
