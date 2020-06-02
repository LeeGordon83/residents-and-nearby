module.exports = {
  info: (prefix, content) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`\x1b[94;1m${prefix}: \x1b[0m${content}`)
    }
  },

  warning: (prefix, content) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`\x1b[95;1m${prefix}: \x1b[0m${content}`)
    }
  }
}
