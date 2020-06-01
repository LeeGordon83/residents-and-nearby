process.env.NODE_ENV = 'test'

const expect = require('chai').expect

const index = require('../../server/routes')

const Nearby = require('../../server/lib/nearby')
const Residents = require('../../server/lib/residents')

const { data } = require('../support')

describe('The default route', () => {
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

  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Unit Test', () => {
    it('expects the view \'index.ejs\', no error, and an array of objects, to be returned as properties of the response object', async () => {
      // Arrange
      sandbox.stub(Nearby.prototype, 'get').returns(data)
      sandbox.stub(Residents.prototype, 'get').returns(data)

      // Act
      await index(_, res)

      // Assert
      expect(res.view).to.equal('index.ejs')
      expect(res.locals.error).to.equal(null)
      expect(res.locals.users.length).to.equal(4)
    })

    it('expects the view \'index.ejs\', a message, and no array of objects, to be returned as properties of the response object, when errors are thrown', async () => {
      // Arrange
      sandbox.stub(Nearby.prototype, 'get').throws(new Error('Error thrown by stub'))
      sandbox.stub(Residents.prototype, 'get').throws(new Error('Error thrown by stub'))

      // Act
      await index(_, res)

      // Assert
      expect(res.view).to.equal('index.ejs')
      expect(res.locals.error).to.equal('Unable to show results.')
      expect(res.locals.users.length).to.equal(0)
    })
  })
})
