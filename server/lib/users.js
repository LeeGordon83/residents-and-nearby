require('isomorphic-fetch')

const { url } = require('../config')

class Users {
  async get () {
    return fetch(`${url}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Users
