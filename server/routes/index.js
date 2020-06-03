const Nearby = require('../lib/nearby')
const Residents = require('../lib/residents')

const { city, location } = require('../config')
const { info, sort, warning } = require('../utils')

module.exports = async (req, res) => {
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
    _nearby.error = 'Unable to get nearby'

    warning('Error', `the following error was thrown: ${err}`)
  }

  try {
    _residents.data = await residents.get(city)

    info('Success', 'residents.get called successfully')
  } catch (err) {
    _residents.error = 'Unable to get residents'

    warning('Error', `the following error was thrown: ${err}`)
  }

  const _sort = req.query.sort

  sort(_nearby, _residents, _sort)

  res.render('index.ejs', { nearby: _nearby, residents: _residents, sort: _sort })
}
