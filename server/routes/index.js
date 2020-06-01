const Nearby = require('../lib/nearby')
const Residents = require('../lib/residents')

const { city, location } = require('../config')
const { info, warning } = require('../utils/logger')

module.exports = async (_, res) => {
  const nearby = new Nearby()
  const residents = new Residents()

  const _nearby = {
    data: [],
    error: null
  }

  const _residents = {
    data: [],
    error: null
  }

  try {
    _nearby.data = await nearby.get(location.latitude, location.longitude)

    info('Success', 'nearby.get called successfully')
  } catch (err) {
    _nearby.error = 'Unable to get results.'

    warning('Error', `the following error was thrown: ${err}`)
  }

  try {
    _residents.data = await residents.get(city)

    info('Success', 'residents.get called successfully')
  } catch (err) {
    _residents.error = 'Unable to get results.'

    warning('Error', `the following error was thrown: ${err}`)
  }

  res.render('index.ejs', { nearby: _nearby, residents: _residents })
}
