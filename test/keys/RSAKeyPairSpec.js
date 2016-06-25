'use strict'

/**
 * Test dependencies
 */
const cwd = process.cwd()
const path = require('path')
const chai = require('chai')

/**
 * Assertions
 */
chai.should()
let expect = chai.expect

/**
 * Code under test
 */
const RSAKeyPair = require(path.join(cwd, 'src', 'keys', 'RSAKeyPair'))

/**
 * Tests
 */
describe('RSAKeyPair', () => {

  /**
   * Shema
   */
  describe('schema', () => {
    let {schema: {properties}} = RSAKeyPair


    it('should define type of "jwk"', () => {
      properties.jwk.type.should.equal('object')
    })

    it('should define type of "jwk.pub"', () => {
      properties.jwk.properties.pub.type.should.equal('object')
    })

    it('should define type of "jwk.prv"', () => {
      properties.jwk.properties.prv.type.should.equal('object')
    })

    it('should define type of "pem"', () => {
      properties.pem.type.should.equal('object')
    })

    it('should define type of "pem.pub"', () => {
      properties.pem.properties.pub.type.should.equal('string')
    })

    it('should define type of "pem.prv"', () => {
      properties.pem.properties.prv.type.should.equal('string')
    })
  })
})