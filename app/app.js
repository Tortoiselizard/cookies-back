const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.status(200).json('Esto es una api para las cookies!')
})

app.get('/cookie', async (req, res) => {
    const cookie = "myCookie=galleta; SameSite=None; Secure"
    res.setHeader('Set-Cookie', cookie)
    res.status(200).json('Acabas de solicitar una cookie')
})

app.get('/noCookie', async(req,res) => {
    res.status(200).json('Esta es una ruta libre de cookies')
})

module.exports = app