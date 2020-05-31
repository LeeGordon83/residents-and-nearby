const fetch = require('node-fetch')

class Residents {
  async get (city) {
    return fetch(`https://bpdts-test-app.herokuapp.com/city/${city}/users`)
      .then(res => res.json())
  }
}

module.exports = Residents
