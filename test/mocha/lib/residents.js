const expect = require('chai').expect

const Residents = require('../../../server/lib/residents')
const { city, url } = require('../../../server/config')
const { cityData, schema } = require('../../support')

describe('Residents', async () => {
  // Arrange
  const residents = new Residents()

  describe('.get (Integration)', async () => {
    it('expects an array of objects with the correct keys to be returned', async () => {
      // Act
      const result = await residents.get(city)

      // Assert
      if (result.length) {
        expect(Object.keys(result[0])).to.eql(Object.keys(schema))
      }
    })

    it('expects an error to be thrown if the API url is incorrect', async () => {
      // Arrange
      const residents = new Residents('')

      try {
        // Act
        await residents.get(city)
      } catch (error) {
        // Assert
        expect(error.message).to.equal('only absolute urls are supported')
      }
    })
  })

  describe('.get (Unit)', async () => {
    context('NODE_ENV set to \'test\'', async () => {
      // Arrange
      beforeEach(async () => {
        process.env.NODE_ENV = 'test'
      })

      afterEach(async () => {
        delete process.env.NODE_ENV
      })

      it('expects an array of objects to be returned', async () => {
        // Act
        const result = await residents.get(city)

        // Assert
        expect(result.length).is.equal(4)
        expect(result[1].first_name).is.equal('Adam')
        expect(result[2].first_name).is.equal('Ben')
      })
    })

    context('API response mocked', async () => {
      const mock = require('fetch-mock')

      it('expects an array of objects to be returned', async () => {
        // Arrange
        mock.get(`${url}/city/${city}/users`, cityData())

        // Act
        const result = await residents.get(city)

        // Assert
        expect(result.length).is.equal(4)
        expect(result[1].first_name).is.equal('Adam')
        expect(result[2].first_name).is.equal('Ben')

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
