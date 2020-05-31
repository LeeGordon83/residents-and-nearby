const expect = require('chai').expect
const mock = require('fetch-mock')

const Users = require('../../../server/lib/users')
const { data } = require('../../support')
const { url } = require('../../../server/config')

context('Unit Tests', () => {
  describe('Users', () => {
    describe('.get', () => {
    // Arrange
      const users = new Users()

      it('expects an array of objects to be returned', async () => {
      // Arrange
        mock.get(`${url}/users`, data)

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
})
