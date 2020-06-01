const expect = require('chai').expect

const index = require('../../server/routes')

const Nearby = require('../../server/lib/nearby')
const Residents = require('../../server/lib/residents')

const { data } = require('../support')

describe('The default route', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Unit Test', () => {
    it('expects the view \'index.ejs\', and an array of objects, to be returned as properties of the response object', async () => {
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

      sandbox.stub(Nearby.prototype, 'get').returns(data)
      sandbox.stub(Residents.prototype, 'get').returns(data)

      // Act
      await index(_, res)

      // Assert
      expect(res.view).to.equal('index.ejs')
      expect(res.locals).to.not.equal(undefined)
      expect(res.locals.users).to.not.equal(undefined)
      expect(Array.isArray(res.locals.users)).to.equal(true)
      expect(res.locals.users.length).to.equal(4)
    })
  })
})
