const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.status(200).send('Esto es una api para las cookies!')
})

app.get('/cookie', async (req, res) => {
    const cookie = "myCookie=galleta"
    res.setHeader('Set-Cookie', cookie)
    res.status(200).send('Acabas de solicitar una cookie')
})

app.get('/noCookie', async(req,res) => {
    res.status(200).send('Esta es una ruta libre de cookies')
})

module.exports = app