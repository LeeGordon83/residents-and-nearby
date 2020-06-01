process.env.NODE_ENV = 'test'

const expect = require('chai').expect

const index = require('../../server/routes')

const Nearby = require('../../server/lib/nearby')
const Residents = require('../../server/lib/residents')

const { data } = require('../support')

describe('The Default Route (Unit)', async () => {
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

  it('expects the view \'index.ejs\', no error, and an array of objects, to be returned as properties of the response object', async () => {
    // Arrange
    sandbox.stub(Nearby.prototype, 'get').returns(data())
    sandbox.stub(Residents.prototype, 'get').returns(data())

    // Act
    await index(_, res)

    // Assert
    expect(res.view).to.equal('index.ejs')
    expect(res.locals.nearby.error).to.equal(null)
    expect(res.locals.residents.error).to.equal(null)
    expect(res.locals.nearby.data.length).to.equal(2)
    expect(res.locals.residents.data.length).to.equal(2)
  })

  it('expects the view \'index.ejs\', a message, and no array of objects, to be returned as properties of the response object, when errors are thrown', async () => {
    // Arrange
    sandbox.stub(Nearby.prototype, 'get').throws(new Error('Error thrown by stub'))
    sandbox.stub(Residents.prototype, 'get').throws(new Error('Error thrown by stub'))

    // Act
    await index(_, res)

    // Assert
    expect(res.view).to.equal('index.ejs')
    expect(res.locals.nearby.error).to.equal('Unable to get results.')
    expect(res.locals.residents.error).to.equal('Unable to get results.')
    expect(res.locals.nearby.data.length).to.equal(0)
    expect(res.locals.residents.data.length).to.equal(0)
  })
})
