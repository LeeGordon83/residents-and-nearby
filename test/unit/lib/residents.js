const expect = require('chai').expect
const mock = require('fetch-mock')

const Residents = require('../../../server/lib/residents')
const { data } = require('../../support')
const { url } = require('../../../server/config')

context('Unit Tests', () => {
  describe('Residents', () => {
    describe('.get', () => {
    // Arrange
      const city = 'London'
      const residents = new Residents()

      it('expects an array of objects to be returned', async () => {
      // Arrange
        mock.get(`${url}/city/${city}/users`, data)

        // Act
        const result = await residents.get(city)

        // Assert
        expect(result.length).is.eql(2)
        expect(result[0].first_name).is.eql('Rick')
        expect(result[1].first_name).is.eql('Morty')

        mock.reset()
      })

      it('expects a bad response to be handled', async () => {
      // Arrange
        mock.get(`${url}/city/${city}/users`, 404)

        try {
        // Act
          await residents.get(city)
        } catch (error) {
        // Assert
          expect(error.message).to.equal('Bad response from server')
        }

        mock.reset()
      })
    })
  })
})
