require('isomorphic-fetch')

const { url } = require('../config')

class Residents {
  async get (city) {
    return fetch(`${url}/city/${city}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Residents
