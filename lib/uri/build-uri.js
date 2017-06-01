import parseUri from './parse-uri'

function buildQueryString(keyValues) {
  const pairs = []
  for (let key in keyValues) {
    const value = keyValues[key]
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  return `?${pairs.join('&')}`
}

export default function buildUri(parts) {
  if (typeof parts === 'string') {
    parts = parseUri(parts)
  }
  else if (typeof parts !== 'object') {
    throw new Error('You need to pass an object or a string')
  }

  let uri = ''

  if (parts.protocol) {
    uri += `${parts.protocol}://`
  }

  if (parts.host) {
    if (parts.userInfo) {
      uri += `${parts.userInfo}@`
    }
    else if (parts.user) {
      let userInfo = parts.user
      if (parts.password) {
        userInfo += `:${parts.password}`
      }
      uri += `${userInfo}@`
    }

    uri += parts.host

    if (parts.port) {
      uri += `:${parts.port}`
    }
  }

  if (parts.path) {
    uri += parts.path

    if (parts.queryKey) {
      uri += buildQueryString(parts.queryKey)
    }
    else if (parts.query) {
      uri += `?${parts.query}`
    }
  }

  if (parts.anchor) {
    uri += `#${parts.anchor}`
  }

  return uri
}
