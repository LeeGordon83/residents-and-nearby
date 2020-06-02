const haversine = require('haversine')

module.exports = (lat, long, user) => {
  const start = {
    latitude: parseFloat(lat),
    longitude: parseFloat(long)
  }

  const end = {
    latitude: parseFloat(user.latitude),
    longitude: parseFloat(user.longitude)
  }

  return haversine(start, end, { unit: 'mile' })
}
