const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const { info } = require('./server/utils')

app.set('views', './server/views')

app.use(express.static('./server/public'))

app.get('/', require('./server/routes'))

info('Running', `App now running at http://localhost:${port}`, true)

app.listen(port)
