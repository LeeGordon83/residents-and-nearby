const expect = require('chai').expect

const Users = require('../../../server/lib/users')
const { schema } = require('../../support')

context('Integration Tests', () => {
  describe('Users', () => {
    describe('.get', () => {
      it('expects an array of objects with the correct keys to be returned (genuine API call)', async () => {
      // Arrange
        const users = new Users()

        // Act
        const result = await users.get()

        // Assert
        if (result.length) {
          expect(Object.keys(result[0])).to.eql(Object.keys(schema))
        }
      })
    })
  })
})
