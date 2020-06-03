require('isomorphic-fetch')

const { cityData } = require('../../test/support')
const { url } = require('../config')

class Residents {
  constructor (_url = url) {
    this.url = _url
  }

  async get (city) {
    const test = process.env.NODE_ENV === 'test'

    return test ? cityData() : fetch(`${this.url}/city/${city}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Residents
