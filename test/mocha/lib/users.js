const expect = require('chai').expect
const mock = require('fetch-mock')

const Users = require('../../../server/lib/users')
const { userData, schema } = require('../../support')
const { url } = require('../../../server/config')

describe('Users', async () => {
  // Arrange
  const users = new Users()

  describe('.get (Integration)', async () => {
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
        const result = await users.get()

        // Assert
        expect(result.length).is.equal(8)
        expect(result[2].first_name).is.equal('Adam')
        expect(result[3].first_name).is.equal('Ben')
        expect(result[6].first_name).is.equal('Carl')
        expect(result[7].first_name).is.equal('David')
      })
    })

    context('API response mocked', async () => {
      it('expects an array of objects to be returned', async () => {
        // Arrange
        mock.get(`${url}/users`, userData())

        // Act
        const result = await users.get()

        // Assert
        expect(result.length).is.equal(8)
        expect(result[2].first_name).is.equal('Adam')
        expect(result[3].first_name).is.equal('Ben')
        expect(result[6].first_name).is.equal('Carl')
        expect(result[7].first_name).is.equal('David')

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
