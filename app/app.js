const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.status(200).send('Esto es una api para las cookies!')
})

app.get('/cookie', async (req, res) => {
    const cookie = "myCookie=galleta"
    res.setHeader('Set-Cookie', cookie)
    res.status(200).send('Acabas de solicitar una cookie')
})

module.exports = app