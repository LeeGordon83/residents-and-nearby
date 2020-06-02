const compare = require('./compare')

module.exports = (nearby, residents, sort) => {
  switch (sort) {
    case 'first-name':
      nearby.data.sort(compare('first_name'))
      residents.data.sort(compare('first_name'))
      break
    case 'last-name':
      nearby.data.sort(compare('last_name'))
      residents.data.sort(compare('last_name'))
      break
    case 'distance-ascending':
      nearby.data.sort(compare('distance'))
      break
    case 'distance-descending':
      nearby.data.sort(compare('distance', -1))
      break
    default:
      nearby.data.sort(compare('id'))
      residents.data.sort(compare('id'))
  }
}
