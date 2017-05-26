import { expect } from 'chai'
import buildUri from '../src/uri/build-uri'
import parseUri from '../src/uri/parse-uri'

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
      expect(parsed).to.equal({})
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
  }) // end parseUri

  describe('buildUri', () => {
    it('can build basic URLs', () => {
      const uri = buildUri({
        protocol: 'http',
        host: 'juliosepia.com',
        path: '/posts/util.html',
        anchor: 'introduction'
      })
      expect(uri).to.equal('http://juliosepia.com/posts/util.html#introduction')
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
        path: '/posts/util.html',
        query: 'version=1.0&format=html',
        anchor: 'introduction'
      }
      const outputUrlParts = parseUri(buildUri(urlParts))
      expect(outputUrlParts).to.be.an('object')
      for (var key in urlParts) {
        expect(outputUrlParts[key]).to.equal(urlParts[key])
      }
    })
  })
})
