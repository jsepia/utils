import { expect } from 'chai'
import { buildUri, isValidUrl, parseUri } from '../../lib'

describe('uri tests', () => {
  describe('parseUri', () => {
    it('parses remote URLs', () => {
      const parsed = parseUri('http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction')
      expect(parsed.protocol).to.equal('http')
      expect(parsed.user).to.equal('jsepia')
      expect(parsed.password).to.equal('hunter2')
      expect(parsed.userInfo).to.equal('jsepia:hunter2')
      expect(parsed.host).to.equal('juliosepia.com')
      expect(parsed.port).to.equal('')
      expect(parsed.path).to.equal('/posts/util.html')
      expect(parsed.file).to.equal('util.html')
      expect(parsed.query).to.equal('version=1.0&format=html')
      expect(parsed.queryKey).to.deep.equal({
        version: '1.0',
        format: 'html'
      })
      expect(parsed.anchor).to.equal('introduction')
    })

    it('parses URIs', () => {
      const parsed = parseUri('/about')
      expect(parsed.protocol).to.equal('')
      expect(parsed.host).to.equal('')
      expect(parsed.port).to.equal('')
      expect(parsed.path).to.equal('/about')
      expect(parsed.file).to.equal('')
      expect(parsed.query).to.equal('')
    })

    it('supports loose mode', () => {
      const parsed = parseUri('juliosepia.com/posts')
      expect(parsed.path).to.equal('/posts')
    })

    it('supports strict mode', () => {
      const parsed = parseUri('juliosepia.com/posts', { strictMode: true })
      expect(parsed.path).to.equal('juliosepia.com/posts')
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
      expect(uri).to.equal('http://juliosepia.com:8080/posts/util.html#introduction')
    })
    it('can build login URLs from a userInfo string', () => {
      const uri = buildUri({
        protocol: 'ssh',
        userInfo: 'jsepia:hunter2',
        host: 'juliosepia.com'
      })
      expect(uri).to.equal('ssh://jsepia:hunter2@juliosepia.com')
    })
    it('can build login URLs from a user/password combination', () => {
      const uri = buildUri({
        protocol: 'ssh',
        user: 'jsepia',
        password: 'hunter2',
        host: 'juliosepia.com'
      })
      expect(uri).to.equal('ssh://jsepia:hunter2@juliosepia.com')
    })
    it('can build query strings from a search query string', () => {
      const uri = buildUri({
        protocol: 'http',
        host: 'juliosepia.com',
        path: '/',
        query: 'version=1.0&format=html'
      })
      expect(uri).to.equal('http://juliosepia.com/?version=1.0&format=html')
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
      expect(uri).to.equal('http://juliosepia.com/?version=1.0&format=html')
    })

    it('can build URIs without a protocol', () => {
      const uri = buildUri({
        path: '/api/posts',
        queryKey: {
          limit: 10,
          offset: 50
        }
      })
      expect(uri).to.equal('/api/posts?limit=10&offset=50')
    })

    it('can build URIs with a username but no password', () => {
      const uri = buildUri({
        protocol: 'ftp',
        host: 'ftp.juliosepia.com',
        user: 'anonymous'
      })
      expect(uri).to.equal('ftp://anonymous@ftp.juliosepia.com')
    })

    it('parses URIs in string form', () => {
      const uri = buildUri('http://juliosepia.com/?version=1.0&format=html')
      expect(uri).to.equal('http://juliosepia.com/?version=1.0&format=html')
    })

    it('throws if passed anything other than an object or a string', () => {
      const invalidBuildUriCall = () => {
        buildUri(14)
      }
      expect(invalidBuildUriCall).to.throw()
    })
  }) // end buildUri

  describe('integration', () => {
    it('parseUri -> buildUri', () => {
      const url = 'http://jsepia:hunter2@juliosepia.com/posts/util.html?version=1.0&format=html#introduction'
      const outputUrl = buildUri(parseUri(url))
      expect(outputUrl).to.equal(url)
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
      expect(outputUrlParts).to.be.an('object')
      for (let key in urlParts) {
        expect(outputUrlParts[key]).to.equal(urlParts[key])
      }
    })
  })

  describe('isValidUrl', () => {
    it('identifies valid URLs', () => {
      expect(isValidUrl('ssh://juliosepia.xyz')).to.be.true
      expect(isValidUrl('juliosepia.com:8080')).to.be.true
      expect(isValidUrl('jsepia:hunter2@juliosepia.com')).to.be.true
    })
    it('identifies valid URLs with empty segments', () => {
      expect(isValidUrl('http://@juliosepia.com')).to.be.true
      expect(isValidUrl('http://juliosepia.com?')).to.be.true
      expect(isValidUrl('http://juliosepia.com/?')).to.be.true
      expect(isValidUrl('http://juliosepia.com#')).to.be.true
      expect(isValidUrl('http://juliosepia.com/#')).to.be.true
      expect(isValidUrl('http://juliosepia.com//util.html')).to.be.true
    })
    it('identifies invalid URLs', () => {
      expect(isValidUrl('juliosepia')).to.be.false
      expect(isValidUrl('juliosepia.com')).to.be.false
      expect(isValidUrl('//juliosepia.com')).to.be.false
      expect(isValidUrl('http://:juliosepia.com')).to.be.false
      expect(isValidUrl('juliosepia.com/posts/util.html')).to.be.false
      expect(isValidUrl('util.html')).to.be.false
      expect(isValidUrl('/posts/util.html')).to.be.false
      expect(isValidUrl('../posts/util.html')).to.be.false
    })
  })
})
