require('isomorphic-fetch')

class Users {
  async get () {
    return fetch('https://bpdts-test-app.herokuapp.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Bad response from server')
        return res.json()
      })
  }
}

module.exports = Users
