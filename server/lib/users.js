require('isomorphic-fetch')

const { url } = require('../config')

class Users {
  constructor (_url = url) {
    this.url = _url
  }

  async get () {
    return fetch(`${this.url}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Users
