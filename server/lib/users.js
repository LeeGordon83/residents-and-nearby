require('isomorphic-fetch')

const { url } = require('../config')
const { userData } = require('../../test/support')

class Users {
  constructor (_url = url) {
    this.url = _url
  }

  async get () {
    const test = process.env.NODE_ENV === 'test'

    return test ? userData() : fetch(`${this.url}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Users
