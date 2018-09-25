import { buildUri, isValidUrl, parseUri } from '../..'

describe('uri tests', () => {
  describe('parseUri', () => {
    it('parses remote URLs', () => {
      const parsed = parseUri(
        'http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction'
      )
      expect(parsed.protocol).toEqual('http')
      expect(parsed.user).toEqual('jsepia')
      expect(parsed.password).toEqual('hunter2')
      expect(parsed.userInfo).toEqual('jsepia:hunter2')
      expect(parsed.host).toEqual('juliosepia.com')
      expect(parsed.port).toEqual('')
      expect(parsed.path).toEqual('/posts/util.html')
      expect(parsed.file).toEqual('util.html')
      expect(parsed.query).toEqual('version=1.0&format=html')
      expect(parsed.queryKey).toEqual({
        version: '1.0',
        format: 'html'
      })
      expect(parsed.anchor).toEqual('introduction')
    })

    it('parses URIs', () => {
      const parsed = parseUri('/about')
      expect(parsed.protocol).toEqual('')
      expect(parsed.host).toEqual('')
      expect(parsed.port).toEqual('')
      expect(parsed.path).toEqual('/about')
      expect(parsed.file).toEqual('')
      expect(parsed.query).toEqual('')
    })

    it('supports loose mode', () => {
      const parsed = parseUri('juliosepia.com/posts')
      expect(parsed.path).toEqual('/posts')
    })

    it('supports strict mode', () => {
      const parsed = parseUri('juliosepia.com/posts', { strictMode: true })
      expect(parsed.path).toEqual('juliosepia.com/posts')
    })
  }) // end parseUri

  describe('buildUri', () => {
    it('can build basic URLs', () => {
      const uri = buildUri({
        protocol: 'http',
        host: 'juliosepia.com',
        port: 8080,
        path: '/posts/util.html',
        anchor: 'introduction'
      })
      expect(uri).toEqual('http://juliosepia.com:8080/posts/util.html#introduction')
    })
    it('can build login URLs from a userInfo string', () => {
      const uri = buildUri({
        protocol: 'ssh',
        userInfo: 'jsepia:hunter2',
        host: 'juliosepia.com'
      })
      expect(uri).toEqual('ssh://jsepia:hunter2@juliosepia.com')
    })
    it('can build login URLs from a user/password combination', () => {
      const uri = buildUri({
        protocol: 'ssh',
        user: 'jsepia',
        password: 'hunter2',
        host: 'juliosepia.com'
      })
      expect(uri).toEqual('ssh://jsepia:hunter2@juliosepia.com')
    })
    it('can build query strings from a search query string', () => {
      const uri = buildUri({
        protocol: 'http',
        host: 'juliosepia.com',
        path: '/',
        query: 'version=1.0&format=html'
      })
      expect(uri).toEqual('http://juliosepia.com/?version=1.0&format=html')
    })
    it('can build query strings from key/value pairs', () => {
      const uri = buildUri({
        protocol: 'http',
        host: 'juliosepia.com',
        path: '/',
        queryKey: {
          version: '1.0',
          format: 'html'
        }
      })
      expect(uri).toEqual('http://juliosepia.com/?version=1.0&format=html')
    })

    it('can build URIs without a protocol', () => {
      const uri = buildUri({
        path: '/api/posts',
        queryKey: {
          limit: 10,
          offset: 50
        }
      })
      expect(uri).toEqual('/api/posts?limit=10&offset=50')
    })

    it('can build URIs with a username but no password', () => {
      const uri = buildUri({
        protocol: 'ftp',
        host: 'ftp.juliosepia.com',
        user: 'anonymous'
      })
      expect(uri).toEqual('ftp://anonymous@ftp.juliosepia.com')
    })

    it('parses URIs in string form', () => {
      const uri = buildUri('http://juliosepia.com/?version=1.0&format=html')
      expect(uri).toEqual('http://juliosepia.com/?version=1.0&format=html')
    })

    it('throws if passed anything other than an object or a string', () => {
      const invalidBuildUriCall = () => {
        buildUri(14)
      }
      expect(invalidBuildUriCall).toThrow()
    })
  }) // end buildUri

  describe('integration', () => {
    it('parseUri -> buildUri', () => {
      const url =
        'http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction'
      const outputUrl = buildUri(parseUri(url))
      expect(outputUrl).toEqual(url)
    })
    it('buildUri -> parseUri', () => {
      const urlParts = {
        protocol: 'http',
        user: 'jsepia',
        password: 'hunter2',
        host: 'juliosepia.com',
        port: '80',
        path: '/posts/util.html',
        query: 'version=1.0&format=html',
        anchor: 'introduction'
      }
      const outputUrlParts = parseUri(buildUri(urlParts))
      expect(typeof outputUrlParts).toEqual('object')
      for (let key in urlParts) {
        expect(outputUrlParts[key]).toEqual(urlParts[key])
      }
    })
  })

  describe('isValidUrl', () => {
    it('identifies valid URLs', () => {
      expect(isValidUrl('ssh://juliosepia.xyz')).toBe(true)
      expect(isValidUrl('juliosepia.com:8080')).toBe(true)
      expect(isValidUrl('jsepia:hunter2@juliosepia.com')).toBe(true)
    })
    it('identifies valid URLs with empty segments', () => {
      expect(isValidUrl('http://@juliosepia.com')).toBe(true)
      expect(isValidUrl('http://juliosepia.com?')).toBe(true)
      expect(isValidUrl('http://juliosepia.com/?')).toBe(true)
      expect(isValidUrl('http://juliosepia.com#')).toBe(true)
      expect(isValidUrl('http://juliosepia.com/#')).toBe(true)
      expect(isValidUrl('http://juliosepia.com//util.html')).toBe(true)
    })
    it('identifies invalid URLs', () => {
      expect(isValidUrl('juliosepia')).toBe(false)
      expect(isValidUrl('juliosepia.com')).toBe(false)
      expect(isValidUrl('//juliosepia.com')).toBe(false)
      expect(isValidUrl('http://:juliosepia.com')).toBe(false)
      expect(isValidUrl('juliosepia.com/posts/util.html')).toBe(false)
      expect(isValidUrl('util.html')).toBe(false)
      expect(isValidUrl('/posts/util.html')).toBe(false)
      expect(isValidUrl('../posts/util.html')).toBe(false)
    })
  })
})
