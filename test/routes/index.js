const expect = require('chai').expect

const index = require('../../server/routes')

describe('The default route', () => {
  context('Unit Test', () => {
    it('expects the view \'index.ejs\' to be returned as a property of the response object', () => {
    // Arrange
      const _ = {}
      const res = {
        view: '',
        locals: {},
        render: function (view, locals) {
          this.view = view
          this.locals = locals
        }
      }

      // Act
      index(_, res)

      // Assert
      expect(res.view).to.equal('index.ejs')
    })
  })
})
