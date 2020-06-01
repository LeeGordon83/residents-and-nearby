const Nearby = require('../lib/nearby')
const Residents = require('../lib/residents')

const { city, location } = require('../config')
const { info, warning } = require('../utils')

module.exports = async (_, res) => {
  const nearby = new Nearby()
  const residents = new Residents()

  let error = null
  let users = []

  try {
    const a = await nearby.get(location.latitude, location.longitude)
    const b = await residents.get(city)

    users = a.concat(b)

    info('Success', 'nearby.get and residents.get called successfully')
  } catch (err) {
    error = 'Unable to show results.'

    warning('Error', `the following error was thrown: ${err}`)
  }

  res.render('index.ejs', { error: error, users: users })
}
