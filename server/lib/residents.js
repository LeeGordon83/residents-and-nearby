require('isomorphic-fetch')

class Residents {
  async get (city) {
    return fetch(`https://bpdts-test-app.herokuapp.com/city/${city}/users`)
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Residents
