const expect = require('chai').expect
const mock = require('fetch-mock')

const Users = require('../../../server/lib/users')
const { data, schema } = require('../../support')
const { url } = require('../../../server/config')

describe('Users', () => {
  // Arrange
  const users = new Users()

  describe('.get (Integration)', () => {
    it('expects an array of objects with the correct keys to be returned', async () => {
      // Act
      const result = await users.get()

      // Assert
      if (result.length) {
        expect(Object.keys(result[0])).to.eql(Object.keys(schema))
      }
    })

    it('expects an error to be thrown if the API url is incorrect', async () => {
      // Arrange
      const users = new Users('')

      try {
        // Act
        await users.get()
      } catch (error) {
        // Assert
        expect(error.message).to.equal('only absolute urls are supported')
      }
    })
  })

  describe('.get (Unit)', () => {
    it('expects an array of objects to be returned', async () => {
      // Arrange
      mock.get(`${url}/users`, data())

      // Act
      const result = await users.get()

      // Assert
      expect(result.length).is.equal(2)
      expect(result[0].first_name).is.equal('Rick')
      expect(result[1].first_name).is.equal('Morty')

      mock.reset()
    })

    it('expects a bad response to be handled', async () => {
      // Arrange
      mock.get(`${url}/users`, 404)

      try {
        // Act
        await users.get()
      } catch (error) {
        // Assert
        expect(error.message).to.equal('Bad response from server')
      }

      mock.reset()
    })
  })
})
