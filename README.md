# Util

[![Build Status](https://travis-ci.org/jsepia/utils.svg?branch=master)](https://travis-ci.org/jsepia/utils) [![Coverage Status](https://coveralls.io/repos/github/jsepia/utils/badge.svg?branch=master)](https://coveralls.io/github/jsepia/utils?branch=master) [![NPM version](https://img.shields.io/npm/v/@jsepia/utils.svg)](https://npmjs.org/package/@jsepia/utils)

My utility library. Because some wheels still need to be reinvented.

# Utilities

## Feature detection

### isBrowser

```js
import {isBrowser} from '@jsepia/utils'

if (isBrowser()) {
  document.createElement('canvas')
}
```

## ID

### IDGenerator

```js
import {IDGenerator} from '@jsepia/utils'

const catIDGenerator = new IDGenerator()
const dogIDGenerator = new IDGenerator()

function createCat(name) {
  return {
    id: catIDGenerator.generateID()
    name: name,
    toy: 'scratcher'
  }
}

function createDog(name) {
  return {
    id: dogIDGenerator.generateID()
    name: name,
    toy: 'ball'
  }
}
```

### generate-id

```js
import {generateID} from '@jsepia/utils'

const entities = []

function spawnMonster() {
  entities[generateID()] = new Monster()
}

function spawnNPC() {
  entities[generateID()] = new NPC()
}

function getEntityType(id) {
  if (entities[id] instanceof Monster) {
    return 'monster'
  }
  else if (entities[id] instanceof NPC) {
    return 'npc'
  }
  return 'unknown'
}
```

## Object

### deepMerge

```js
import {deepMerge} from '@jsepia/utils'

const defaults = {
  targets: {
    'app.js': 'src/**/*.js',
    'tests.js': 'test/**/*.js'
  },
  verbose: false
}

const userPreferences = {
  targets: {
    'libs.js': 'lib/**/*.js'
  }
}

const commandLineParams = {
  verbose: true
}

const options = deepMerge(defaults, userPreferences, commandLineParams)
```

**Output:**

```json
{
  "targets": {
    "app.js": "src/**/*.js",
    "tests.js": "test/**/*.js",
    "libs.js": "lib/**/*.js",
  },
  "verbose": true
}
```

## URL/URI manipulation

### buildUri

```js
import {buildUri} from '@jsepia/utils'

buildUri({
  // it supports the basic options you would expect
  protocol: 'http',
  host: 'juliosepia.com',
  port: '8080',
  path: '/posts/util.html',
  anchor: 'introduction', // hash

  // you can pass credentials separately
  user: 'jsepia',
  password: 'hunter2',

  // or as a single string
  userInfo: 'jsepia:hunter2',

  // you can pass query params separately
  queryKey: {
    version: '1.0',
    format: 'html'
  },

  // or as a single string
  query: 'version=1.0&format=html',
})
```

**Output:**

```
http://jsepia:hunter2@juliosepia.com:8080/posts/util.html?version=1.0&format=html#introduction
```

### parseUri

[Original by Steven Levithan](http://blog.stevenlevithan.com/archives/parseuri)

```js
parseUri('http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction')
```

**Output:**

```json
{
  "anchor": "introduction",
  "authority": "jsepia:hunter2@juliosepia.com",
  "directory": "/posts/",
  "file": "util.html",
  "host": "juliosepia.com",
  "password": "hunter2",
  "path": "/posts/util.html",
  "port": "",
  "protocol": "http",
  "query": "version=1.0&format=html",
  "queryKey": {
    "format": "html",
    "version": "1.0",
  },
  "relative": "/posts/util.html?version=1.0&format=html#introduction",
  "source": "http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction",
  "user": "jsepia",
  "userInfo": "jsepia:hunter2"
}
```

## Validation

### isValidUrl

```js
import {isValidUrl} from '@jsepia/utils'

const url = prompt('enter URL here')
if (isValidUrl(url)) {
  request(url).then(
    (response) => handleResponse,
    (err) => handleError
  )
}
else {
  handleError(new Error(`Invalid URL: ${url}`))
}
```

## XHR

Functions that make AJAX requests and return promises.

### get

```js
import {get} from '@jsepia/utils'

get(
  '/api/posts',
  {limit: 10, offset: 50},
  'json'
  )
  .then(
    (successfulResponse) => {
      const posts = response.posts
      posts.forEach((post) => {
        renderPost(post)
      })
    },
    (errorResponse) => {
      if (errorResponse && errorResponse.errorMessage) {
        throw new Error(errorResponse.errorMessage)
      }
      else {
        throw new Error('Request failed')
      }
    }
  )
```

## TODO

* Test the exported library
* Customize neutrino-preset-web to not output any HTML.
