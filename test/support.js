module.exports.data = () => {
  return [
    {
      id: 1,
      first_name: 'Rick',
      last_name: 'Sanchez',
      email: 'abc@xyz.co.uk',
      ip_address: '192.168.1.1',
      latitude: 47.608013,
      longitude: -121.2623
    },
    {
      id: 2,
      first_name: 'Morty',
      last_name: 'Smith',
      email: 'abc@xyz.co.uk',
      ip_address: '192.168.1.1',
      latitude: 47.608013,
      longitude: -121.2620
    }
  ]
}

module.exports.schema = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  ip_address: '',
  latitude: 0,
  longitude: 0
}
