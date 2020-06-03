const Users = require('../lib/users')

const { distance } = require('../utils')
const { miles } = require('../config')

class Nearby {
  constructor (data = undefined) {
    this.data = data
    this.users = new Users()
  }

  async get (lat, long, _miles = miles) {
    const users = this.data || await this.users.get()

    const nearby = users.filter(user => {
      user.distance = distance(lat, long, user).toFixed(2)

      return user.distance < _miles
    })

    return nearby
  }
}

module.exports = Nearby
