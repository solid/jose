'use strict'

/**
 * Test dependencies
 */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

/**
 * Assertions
 */
chai.should()
chai.use(chaiAsPromised)
let expect = chai.expect

/**
 * Code under test
 */
const { NotSupportedError } = require('../../src/errors')
const JWA = require('../../src/jose/JWA')
const { getPublicKey, getPrivateKey } = require('../keys')

/**
 * Tests
 */
describe('JWA', () => {
  const alg = { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } }

  const data ='signed with Chrome webcrypto'
  const signature = 'VLW6eetMx2aufbDYXr7zydty4z02wu0O-Mx4bfnc5VAsMFaFYIFV1UYTfgCgWxK5yGa0tUUborW9brxwfF050FuOtsBXp8FvWAX0bMiWhUSQ0Bub3tW94JzifEGyRUc_840DftHtLbPw_8L1K5R7YazvqN0sukjCHQmrZ322J1-jUAPQuLgwcocHb3ImGRzqUhIxcRT7O5POB4YPvcn98XjsOuuUG8zppR8b3xwK1p9tuu9HfhI_b8Zz4u2RGgx4OKYNw0ELcpWR__Jhvv_K25BT7vC2UqXldpIdX39MvPeK_kgS-yp2nOVCCGo3alPo6hfDoKeFDrV-BSSdAlGQUw'

  let publicKey, privateKey

  describe('sign', () => {
    before(async () => {
      privateKey = await getPrivateKey()
    })

    it('should return a promise', () => {
      return JWA.sign('RS256', privateKey, 'data')
        .should.be.fulfilled
    })

    it('should reject unsupported algorithm', () => {
      return JWA.sign('RS257', privateKey, 'data')
        .should.be.rejectedWith(NotSupportedError)
    })

    it('should reject mismatching key')

    it('should resolve a signature', () => {
      return JWA.sign('RS256', privateKey, data)
        .should.eventually.equal(signature)
    })
  })

  describe('verify', () => {
    before(async () => {
      publicKey = await getPublicKey()
    })

    it('should return a promise', () => {
      JWA.verify('RS256', publicKey, signature, data)
        .should.be.fulfilled
    })

    it('should reject unsupported algorithm', () => {
      return JWA.verify('RS257', privateKey, signature, data)
        .should.be.rejectedWith(NotSupportedError)
    })

    it('should reject mismatching key')

    it('should resolve a boolean', () => {
      return JWA.verify('RS256', publicKey, signature, data)
        .should.eventually.equal(true)
    })
  })
})
