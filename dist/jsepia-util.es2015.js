// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri(str) {
  var o = parseUri.options;
  var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
  var uri = {};
  var i = 14;

  while (i--) { uri[o.key[i]] = m[i] || ''; }

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) { uri[o.q.name][$1] = $2; }
  });

  return uri
}

parseUri.options = {
  strictMode: false,
  key: [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor'
  ],
  q: {
    name: 'queryKey',
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

function buildQueryString(keyValues) {
  var pairs = [];
  for (var key in keyValues) {
    var value = keyValues[key];
    pairs.push(((encodeURIComponent(key)) + "=" + (encodeURIComponent(value))));
  }
  return ("?" + (pairs.join('&')))
}

function buildUri(parts) {
  if (typeof parts === 'string') {
    parts = parseUri(parts);
  }
  else if (typeof parts !== 'object') {
    throw new Error('You need to pass an object or a string')
  }

  var uri = '';

  if (parts.protocol) {
    uri += (parts.protocol) + "://";
  }

  if (parts.host) {
    if (parts.userInfo) {
      uri += (parts.userInfo) + "@";
    }
    else if (parts.user) {
      var userInfo = parts.user;
      if (parts.password) {
        userInfo += ":" + (parts.password);
      }
      uri += userInfo + "@";
    }

    uri += parts.host;

    if (parts.port) {
      uri += ":" + (parts.port);
    }
  }

  if (parts.path) {
    uri += parts.path;

    if (parts.queryKey) {
      uri += buildQueryString(parts.queryKey);
    }
    else if (parts.query) {
      uri += "?" + (parts.query);
    }
  }

  if (parts.anchor) {
    uri += "#" + (parts.anchor);
  }

  return uri
}

var index = {
  buildUri: buildUri,
  parseUri: parseUri,
};

export default index;
