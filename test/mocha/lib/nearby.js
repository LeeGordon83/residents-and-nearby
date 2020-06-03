const expect = require('chai').expect

const Nearby = require('../../../server/lib/nearby')
const { location } = require('../../../server/config')
const { userData } = require('../../support')

describe('Nearby', async () => {
  describe('.get (Integration)', async () => {
    it('expects an array of objects to be returned, where the location is within x miles of the given latitute and longitude ', async () => {
      // Arrange
      const nearby = new Nearby()

      // Act
      const result = await nearby.get(location.latitude, location.longitude, 24902)

      // Assert
      expect(result.length).to.be.above(0)
    })
  })

  describe('.get (Unit)', async () => {
    it('expects an array of objects to be returned, where the location is within x miles of the given latitute and longitude ', async () => {
      // Arrange
      const nearby = new Nearby(userData())

      // Act
      const result = await nearby.get(location.latitude, location.longitude)

      // Assert
      expect(result.length).is.equal(4)
      expect(result[0].first_name).is.equal('Carl')
      expect(result[3].first_name).is.equal('David')
    })
  })
})
