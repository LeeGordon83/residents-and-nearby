const expect = require('chai').expect

const Nearby = require('../../../server/lib/nearby')
const { data } = require('../../support')

context('Unit Tests', () => {
  describe('Nearby', () => {
    describe('.get', () => {
    // Arrange
      const nearby = new Nearby(data)

      it('expects an array of objects to be returned, where the location is within x miles of the given latitute and longitude ', async () => {
      // Act
        const result = await nearby.get(47.608013, -122.335167)

        // Assert
        expect(result.length).is.eql(1)
        expect(result[0].first_name).is.eql('Rick')
      })
    })
  })
})
