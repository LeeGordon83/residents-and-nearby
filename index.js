const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('views', './server/views')

app.use(express.static('./server/public'))

app.get('/', require('./server/routes'))

app.listen(port)
