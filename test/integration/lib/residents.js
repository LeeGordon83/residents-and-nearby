const expect = require('chai').expect

const Residents = require('../../../server/lib/residents')
const { schema } = require('../../support')

context('Integration Tests', () => {
  describe('Residents', () => {
    describe('.get', () => {
      it('expects an array of objects with the correct keys to be returned', async () => {
      // Arrange
        const city = 'London'
        const residents = new Residents()

        // Act
        const result = await residents.get(city)

        // Assert
        if (result.length) {
          expect(Object.keys(result[0])).to.eql(Object.keys(schema))
        }
      })
    })
  })
})
