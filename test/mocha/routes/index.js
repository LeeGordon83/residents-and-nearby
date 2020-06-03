const expect = require('chai').expect

const index = require('../../../server/routes')

const Nearby = require('../../../server/lib/nearby')
const Residents = require('../../../server/lib/residents')

const { cityData, userData } = require('../../support')

describe('The Default Route (Unit)', async () => {
  // Arrange
  const req = {
    query: ''
  }
  const res = {
    view: '',
    locals: {},
    render: function (view, locals) {
      this.view = view
      this.locals = locals
    }
  }

  let sandbox

  beforeEach(async () => {
    process.env.NODE_ENV = 'test'

    sandbox = require('sinon').createSandbox()
  })

  afterEach(async () => {
    delete process.env.NODE_ENV

    sandbox.restore()
  })

  it('expects the view \'index.ejs\', no error, and an array of objects, to be returned as properties of the response object', async () => {
    // Arrange
    sandbox.stub(Nearby.prototype, 'get').returns(userData())
    sandbox.stub(Residents.prototype, 'get').returns(cityData())

    // Act
    await index(req, res)

    // Assert
    expect(res.view).to.equal('index.ejs')
    expect(res.locals.nearby.error).to.equal(null)
    expect(res.locals.residents.error).to.equal(null)
    expect(res.locals.nearby.data.length).to.equal(8)
    expect(res.locals.residents.data.length).to.equal(4)
  })

  it('expects the view \'index.ejs\', a message, and no array of objects, to be returned as properties of the response object, when errors are thrown', async () => {
    // Arrange
    sandbox.stub(Nearby.prototype, 'get').throws(new Error('Error thrown by stub'))
    sandbox.stub(Residents.prototype, 'get').throws(new Error('Error thrown by stub'))

    // Act
    await index(req, res)

    // Assert
    expect(res.view).to.equal('index.ejs')
    expect(res.locals.nearby.error).to.equal('Unable to get nearby')
    expect(res.locals.residents.error).to.equal('Unable to get residents')
    expect(res.locals.nearby.data.length).to.equal(0)
    expect(res.locals.residents.data.length).to.equal(0)
  })
})
