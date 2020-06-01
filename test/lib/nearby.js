const expect = require('chai').expect

const Nearby = require('../../server/lib/nearby')
const { data } = require('../support')

describe('Nearby', () => {
  describe('.get', () => {
    context('Integration Test', () => {
      // Arrange
      const nearby = new Nearby()

      it('expects an array of objects to be returned, where the location is within x miles of the given latitute and longitude ', async () => {
        // Act
        const result = await nearby.get(47.608013, -122.335167, 24902)

        // Assert
        expect(result.length).to.be.above(0)
      })
    })

    context('Unit Test', () => {
      // Arrange
      const nearby = new Nearby(data)

      it('expects an array of objects to be returned, where the location is within x miles of the given latitute and longitude ', async () => {
        // Act
        const result = await nearby.get(47.608013, -122.335167)

        // Assert
        expect(result.length).is.equal(1)
        expect(result[0].first_name).is.equal('Rick')
      })
    })
  })
})
