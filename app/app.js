require('dotenv').config({ path: '.env.local'})
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { PATH_FRONT, PATH_FRONT2 } = process.env
console.log('PATH_FRONT:', PATH_FRONT)

const app = express()

app.use(cors({
    origin: [ `${PATH_FRONT2}` , `${PATH_FRONT}`],
    credentials: true
}))
app.use(morgan('dev'))

app.get('/', async (req, res) => {
    console.log('getHeader:', res.getHeader('Access-Control-Allow-Origin'))
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