const expect = require('chai').expect
const mock = require('fetch-mock')

const Users = require('../../server/lib/users')
const { data, schema } = require('../support')

describe('Users', async () => {
  describe('.get', () => {
    // Arrange
    const users = new Users()

    it('expects an array of objects to be returned', async () => {
      // Arrange
      mock.get('https://bpdts-test-app.herokuapp.com/users', data)

      // Act
      const result = await users.get()

      // Assert
      expect(result.length).is.eql(2)
      expect(result[0].first_name).is.eql('Rick')
      expect(result[1].first_name).is.eql('Morty')

      mock.reset()
    })

    it('expects a bad response to be handled', async () => {
      // Arrange
      mock.get('https://bpdts-test-app.herokuapp.com/users', 404)

      try {
        // Act
        await users.get()
      } catch (error) {
        // Assert
        expect(error.message).to.equal('Bad response from server')
      }

      mock.reset()
    })

    it('expects an array of objects with the correct keys to be returned (genuine API call)', async () => {
      // Act
      const result = await users.get()

      // Assert
      if (result.length) {
        expect(Object.keys(result[0])).to.eql(Object.keys(schema))
      }
    })
  })
})
