const expect = require('chai').expect

const Residents = require('../../server/lib/residents')
const { schema } = require('../support')

describe('Residents', async () => {
  it('expects data for people who live in the given city to be returned from the API route', async () => {
    // Arrange
    const residents = new Residents()

    // Act
    const data = await residents.get('London')

    // Assert
    expect(data.length).is.above(0)
    expect(Object.keys(data[0])).to.eql(Object.keys(schema))
  })
})
