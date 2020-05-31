const haversine = require('haversine')

const Users = require('../lib/users')

class Nearby {
  constructor (data = undefined) {
    this.data = data
    this.users = new Users()
  }

  async get (lat, long, miles = 50) {
    const users = this.data || await this.users.get()

    const nearby = users.filter(e => {
      const start = {
        latitude: parseFloat(lat),
        longitude: parseFloat(long)
      }

      const end = {
        latitude: parseFloat(e.latitude),
        longitude: parseFloat(e.longitude)
      }

      return haversine(start, end, { unit: 'mile' }) < miles
    })

    return nearby
  }
}

module.exports = Nearby
