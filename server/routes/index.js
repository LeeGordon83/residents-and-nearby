const Nearby = require('../lib/nearby')
const Residents = require('../lib/residents')

const { city, location } = require('../config')

module.exports = async (_, res) => {
  const nearby = new Nearby()
  const residents = new Residents()

  const a = await nearby.get(location.latitude, location.longitude)
  const b = await residents.get(city)

  const users = a.concat(b)

  res.render('index.ejs', { users: users })
}
