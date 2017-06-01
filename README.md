# Util

[![Build Status](https://travis-ci.org/jsepia/util.svg?branch=master)](https://travis-ci.org/jsepia/util) [![Coverage Status](https://coveralls.io/repos/github/jsepia/util/badge.svg?branch=master)](https://coveralls.io/github/jsepia/util?branch=master)

My utility library. Because some wheels still need to be reinvented.

# Utilities

## URL/URI manipulation

### buildUri

```js
import buildUri from '@jsepia/util'

buildUri({
  // it supports the basic options you would expect
  protocol: 'http',
  host: 'juliosepia.com',
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

### parseUri

[Original by Steven Levithan](http://blog.stevenlevithan.com/archives/parseuri)

```js
parseUri('http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction')

/*

Output:

{
  "anchor": "introduction"
  "authority": "jsepia:hunter2@juliosepia.com"
  "directory": "/posts/"
  "file": "util.html"
  "host": "juliosepia.com"
  "password": "hunter2"
  "path": "/posts/util.html"
  "port": ""
  "protocol": "http"
  "query": "version=1.0&format=html"
  "queryKey": {
    "format": "html"
    "version": "1.0"
  }
  "relative": "/posts/util.html?version=1.0&format=html#introduction"
  "source": "http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction"
  "user": "jsepia"
  "userInfo": "jsepia:hunter2"
}

 */
```

## TODO

* Test the exported library
* Customize neutrino-preset-web to not output any HTML.
