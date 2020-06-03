module.exports = (key, order = 1) => {
  return (a, b) => {
    if (!a[key] || !b[key]) return 0

    const _a = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const _b = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    return (_a > _b ? 1 : _a < _b ? -1 : 0) * order
  }
}
