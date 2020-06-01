require('isomorphic-fetch')

const { url } = require('../config')

class Residents {
  constructor (_url = url) {
    this.url = _url
  }

  async get (city) {
    return fetch(`${this.url}/city/${city}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Residents
