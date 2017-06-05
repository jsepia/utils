# Util

[![Build Status](https://travis-ci.org/jsepia/util.svg?branch=master)](https://travis-ci.org/jsepia/util) [![Coverage Status](https://coveralls.io/repos/github/jsepia/util/badge.svg?branch=master)](https://coveralls.io/github/jsepia/util?branch=master)

My utility library. Because some wheels still need to be reinvented.

# Utilities

## Feature detection

### isBrowser

```js
import {isBrowser} from '@jsepia/util'

if (isBrowser()) {
  document.createElement('canvas')
}
```

## Object

### deepMerge

```js
import {deepMerge} from '@jsepia/util'

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
import {buildUri} from '@jsepia/util'

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
import {isValidUrl} from '@jsepia/util'

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
import {get} from '@jsepia/util'

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
