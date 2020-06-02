const Users = require('../lib/users')

const { distance } = require('../utils')

class Nearby {
  constructor (data = undefined) {
    this.data = data
    this.users = new Users()
  }

  async get (lat, long, miles = 50) {
    const users = this.data || await this.users.get()

    const nearby = users.filter(user => {
      user.distance = distance(lat, long, user).toFixed(2)

      return user.distance < miles
    })

    return nearby
  }
}

module.exports = Nearby
